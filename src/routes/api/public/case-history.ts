import { createFileRoute } from "@tanstack/react-router";

const HEADERS = [
  "Timestamp","Full Name","Age","Gender","Email","Phone","City",
  "Height (cm)","Weight (kg)","Goal","Neck (cm)","Chest (cm)","Waist (cm)","Hip (cm)",
  "Medical Conditions","Medications",
  "Allergies","Diet Preference","Meals per Day","Water (L/day)",
  "Sleep (hrs)","Activity Level","Occupation","Typical Day Food",
  "Notes",
];

async function callSheets(path: string, init: RequestInit) {
  const key = process.env.LOVABLE_API_KEY;
  const connKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!key || !connKey) throw new Error("Google Sheets not configured");
  const res = await fetch(`https://connector-gateway.lovable.dev/google_sheets/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  return res;
}

export const Route = createFileRoute("/api/public/case-history")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sheetId = process.env.CASE_HISTORY_SHEET_ID;
        if (!sheetId) {
          return Response.json(
            { error: "Sheet not configured. Set CASE_HISTORY_SHEET_ID." },
            { status: 500 },
          );
        }

        let body: Record<string, unknown>;
        try { body = await request.json(); } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        // Basic validation + length caps
        const s = (v: unknown, max = 500) =>
          typeof v === "string" ? v.trim().slice(0, max) : "";
        const n = (v: unknown) => {
          const x = Number(v);
          return Number.isFinite(x) ? String(x) : "";
        };

        const fullName = s(body.fullName, 120);
        const phone = s(body.phone, 40);
        if (!fullName || !phone) {
          return Response.json({ error: "Name and phone are required." }, { status: 400 });
        }

        const row = [
          new Date().toISOString(),
          fullName,
          n(body.age),
          s(body.gender, 20),
          s(body.email, 200),
          phone,
          s(body.city, 80),
          n(body.heightCm),
          n(body.weightKg),
          s(body.goal, 200),
          n(body.neckCm),
          n(body.chestCm),
          n(body.waistCm),
          n(body.hipCm),
          s(body.conditions, 500),
          s(body.medications, 300),
          s(body.allergies, 300),
          s(body.diet, 40),
          n(body.mealsPerDay),
          n(body.waterLiters),
          n(body.sleepHours),
          s(body.activity, 40),
          s(body.occupation, 120),
          s(body.typicalDay, 1200),
          s(body.notes, 1200),
        ];

        try {
          // Discover the first sheet/tab name (don't assume "Sheet1")
          const metaRes = await callSheets(
            `/spreadsheets/${sheetId}?fields=sheets.properties.title`,
            { method: "GET" },
          );
          if (!metaRes.ok) {
            const text = await metaRes.text();
            console.error("Sheets metadata failed", metaRes.status, text);
            return Response.json({ error: "Could not save. Please try WhatsApp." }, { status: 502 });
          }
          const meta = (await metaRes.json()) as { sheets?: { properties?: { title?: string } }[] };
          const tab = meta.sheets?.[0]?.properties?.title || "Sheet1";
          const range = `${tab}!A1:Y1`;

          // Ensure header row exists (idempotent — appends only if empty)
          const headerRes = await callSheets(
            `/spreadsheets/${sheetId}/values/${range}`,
            { method: "GET" },
          );
          if (headerRes.ok) {
            const j = (await headerRes.json()) as { values?: string[][] };
            if (!j.values || j.values.length === 0) {
              await callSheets(
                `/spreadsheets/${sheetId}/values/${range}?valueInputOption=RAW`,
                { method: "PUT", body: JSON.stringify({ values: [HEADERS] }) },
              );
            }
          }

          const appendRes = await callSheets(
            `/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
            { method: "POST", body: JSON.stringify({ values: [row] }) },
          );
          if (!appendRes.ok) {
            const text = await appendRes.text();
            console.error("Sheets append failed", appendRes.status, text);
            return Response.json({ error: "Could not save. Please try WhatsApp." }, { status: 502 });
          }
          return Response.json({ ok: true });
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});
