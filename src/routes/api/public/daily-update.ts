import { createFileRoute } from "@tanstack/react-router";

const TAB = "Daily Updates";
const HEADERS = [
  "Timestamp","Date","Full Name","Phone",
  "Weight (kg)","Steps","Meals (B/L/D/S)","Cheat Meal","Notes","Photo",
];

function gatewayHeaders() {
  const key = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  const driveKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!key || !sheetsKey) throw new Error("Google Sheets not configured");
  return { key, sheetsKey, driveKey };
}

async function callSheets(path: string, init: RequestInit) {
  const { key, sheetsKey } = gatewayHeaders();
  return fetch(`https://connector-gateway.lovable.dev/google_sheets/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "X-Connection-Api-Key": sheetsKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function ensureTab(sheetId: string) {
  const metaRes = await callSheets(
    `/spreadsheets/${sheetId}?fields=sheets.properties(title,sheetId)`,
    { method: "GET" },
  );
  if (!metaRes.ok) return false;
  const meta = (await metaRes.json()) as { sheets?: { properties?: { title?: string } }[] };
  const has = meta.sheets?.some((s) => s.properties?.title === TAB);
  if (has) return true;

  const addRes = await callSheets(
    `/spreadsheets/${sheetId}:batchUpdate`,
    {
      method: "POST",
      body: JSON.stringify({
        requests: [{ addSheet: { properties: { title: TAB } } }],
      }),
    },
  );
  if (!addRes.ok) {
    console.error("addSheet failed", addRes.status, await addRes.text());
    return false;
  }
  // Write header row
  await callSheets(
    `/spreadsheets/${sheetId}/values/${encodeURIComponent(TAB)}!A1:J1?valueInputOption=RAW`,
    { method: "PUT", body: JSON.stringify({ values: [HEADERS] }) },
  );
  return true;
}

async function uploadImageToDrive(file: File, filename: string): Promise<string | null> {
  const { key, driveKey } = gatewayHeaders();
  if (!driveKey) return null;

  const boundary = `----lovable${Date.now()}${Math.random().toString(36).slice(2)}`;
  const metadata = { name: filename, mimeType: file.type || "application/octet-stream" };
  const enc = new TextEncoder();
  const pre = enc.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: ${metadata.mimeType}\r\n\r\n`,
  );
  const post = enc.encode(`\r\n--${boundary}--`);
  const fileBytes = new Uint8Array(await file.arrayBuffer());
  const body = new Uint8Array(pre.length + fileBytes.length + post.length);
  body.set(pre, 0);
  body.set(fileBytes, pre.length);
  body.set(post, pre.length + fileBytes.length);

  const upRes = await fetch(
    `https://connector-gateway.lovable.dev/google_drive/upload/drive/v3/files?uploadType=multipart&fields=id`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "X-Connection-Api-Key": driveKey,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    },
  );
  if (!upRes.ok) {
    console.error("Drive upload failed", upRes.status, await upRes.text());
    return null;
  }
  const { id } = (await upRes.json()) as { id?: string };
  if (!id) return null;

  // Make it viewable to anyone with the link
  const permRes = await fetch(
    `https://connector-gateway.lovable.dev/google_drive/drive/v3/files/${id}/permissions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "X-Connection-Api-Key": driveKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "reader", type: "anyone" }),
    },
  );
  if (!permRes.ok) {
    console.error("Drive permission failed", permRes.status, await permRes.text());
    // Still return the view URL; owner can view
  }
  return `https://drive.google.com/file/d/${id}/view`;
}

export const Route = createFileRoute("/api/public/daily-update")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sheetId = process.env.CASE_HISTORY_SHEET_ID;
        if (!sheetId) {
          return Response.json({ error: "Sheet not configured." }, { status: 500 });
        }

        let form: FormData;
        try { form = await request.formData(); } catch {
          return Response.json({ error: "Invalid form data" }, { status: 400 });
        }

        const s = (k: string, max = 500) => {
          const v = form.get(k);
          return typeof v === "string" ? v.trim().slice(0, max) : "";
        };

        const fullName = s("fullName", 120);
        const phone = s("phone", 40);
        if (!fullName || !phone) {
          return Response.json({ error: "Name and phone are required." }, { status: 400 });
        }

        const date = s("date", 20) || new Date().toISOString().slice(0, 10);
        const weight = s("weight", 20);
        const steps = s("steps", 20);
        const meals = s("meals", 2000);
        const cheatMeal = s("cheatMeal", 500);
        const notes = s("notes", 1000);

        let photoUrl = "";
        const image = form.get("image");
        if (image instanceof File && image.size > 0) {
          if (image.size > 8 * 1024 * 1024) {
            return Response.json({ error: "Image too large (max 8MB)." }, { status: 400 });
          }
          const extMatch = /\.([a-zA-Z0-9]+)$/.exec(image.name || "");
          const ext = extMatch ? extMatch[1].toLowerCase() : (image.type.split("/")[1] || "jpg");
          const safeName = `${date}_${fullName}_${phone}`.replace(/[^a-zA-Z0-9._-]+/g, "-");
          const url = await uploadImageToDrive(image, `${safeName}.${ext}`);
          if (url) photoUrl = url;
        }

        try {
          const ok = await ensureTab(sheetId);
          if (!ok) {
            return Response.json({ error: "Could not access sheet." }, { status: 502 });
          }

          const row = [
            new Date().toISOString(),
            date, fullName, phone,
            weight, steps, meals, cheatMeal, notes, photoUrl,
          ];
          const range = `${encodeURIComponent(TAB)}!A1:J1`;
          const appendRes = await callSheets(
            `/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
            { method: "POST", body: JSON.stringify({ values: [row] }) },
          );
          if (!appendRes.ok) {
            console.error("append failed", appendRes.status, await appendRes.text());
            return Response.json({ error: "Could not save. Please try WhatsApp." }, { status: 502 });
          }
          return Response.json({ ok: true, photoUrl });
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});
