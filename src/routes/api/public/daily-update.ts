export const runtime = "nodejs";
import { createFileRoute } from "@tanstack/react-router";
import { google } from "googleapis";

import { Readable } from "stream";

const TAB = "Daily Updates";

const HEADERS = [
  "Timestamp",
  "Date",
  "Full Name",
  "Phone",
  "Weight (kg)",
  "Steps",
  "Meals (B/L/D/S)",
  "Cheat Meal",
  "Notes",
  "Photo",
];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const drive = google.drive({
  version: "v3",
  auth,
});

/**
 * Ensure "Daily Updates" sheet exists.
 * If not, create it and insert headers.
 */
async function ensureTab(sheetId: string) {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: "sheets.properties(title,sheetId)",
  });

  const exists = meta.data.sheets?.some(
    (sheet) => sheet.properties?.title === TAB
  );

  if (exists) return true;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: TAB,
            },
          },
        },
      ],
    },
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${TAB}!A1:J1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [HEADERS],
    },
  });

  return true;
}

/**
 * Upload image to Google Drive
 */
async function uploadImageToDrive(
  file: File,
  filename: string
): Promise<string | null> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID not configured");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const response = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType: file.type,
      body: Readable.from(buffer),
    },
    fields: "id",
  });

  const fileId = response.data.id;

  if (!fileId) return null;

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return `https://drive.google.com/file/d/${fileId}/view`;
}
export const Route = createFileRoute("/api/public/daily-update")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sheetId = process.env.CASE_HISTORY_SHEET_ID;

        if (!sheetId) {
          return Response.json(
            { error: "Sheet not configured." },
            { status: 500 }
          );
        }

        let form: FormData;

        try {
          form = await request.formData();
        } catch {
          return Response.json(
            { error: "Invalid form data" },
            { status: 400 }
          );
        }

        const s = (k: string, max = 500) => {
          const value = form.get(k);
          return typeof value === "string"
            ? value.trim().slice(0, max)
            : "";
        };

        const fullName = s("fullName", 120);
        const phone = s("phone", 40);

        if (!fullName || !phone) {
          return Response.json(
            {
              error: "Name and phone are required.",
            },
            {
              status: 400,
            }
          );
        }

        const date =
          s("date", 20) || new Date().toISOString().slice(0, 10);

        const weight = s("weight", 20);
        const steps = s("steps", 20);
        const meals = s("meals", 2000);
        const cheatMeal = s("cheatMeal", 500);
        const notes = s("notes", 1000);

        let photoUrl = "";

        const image = form.get("image");

        if (image instanceof File && image.size > 0) {
          if (image.size > 8 * 1024 * 1024) {
            return Response.json(
              {
                error: "Image too large (max 8MB).",
              },
              {
                status: 400,
              }
            );
          }

          const extMatch = /\.([a-zA-Z0-9]+)$/.exec(image.name);

          const ext = extMatch
            ? extMatch[1].toLowerCase()
            : image.type.split("/")[1] || "jpg";

          const safeName = `${date}_${fullName}_${phone}`
            .replace(/[^a-zA-Z0-9._-]+/g, "-");

          const url = await uploadImageToDrive(
            image,
            `${safeName}.${ext}`
          );

          if (url) {
            photoUrl = url;
          }
        }

        try {
          await ensureTab(sheetId);

          const existingHeaders =
            await sheets.spreadsheets.values.get({
              spreadsheetId: sheetId,
              range: `${TAB}!A1:J1`,
            });

          if (
            !existingHeaders.data.values ||
            existingHeaders.data.values.length === 0
          ) {
            await sheets.spreadsheets.values.update({
              spreadsheetId: sheetId,
              range: `${TAB}!A1:J1`,
              valueInputOption: "RAW",
              requestBody: {
                values: [HEADERS],
              },
            });
          }

          const row = [
            new Date().toISOString(),
            date,
            fullName,
            phone,
            weight,
            steps,
            meals,
            cheatMeal,
            notes,
            photoUrl,
          ];

          await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${TAB}!A:J`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
              values: [row],
            },
          });

          return Response.json({
            ok: true,
            photoUrl,
          });
        } catch (err) {
          console.error(err);

          return Response.json(
            {
              error: "Server error",
            },
            {
              status: 500,
            }
          );
        }
      },
    },
  },
});