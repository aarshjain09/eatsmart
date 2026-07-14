import { createFileRoute } from "@tanstack/react-router";
import { google } from "googleapis";

const HEADERS = [
  "Timestamp",
  "Full Name",
  "Age",
  "Gender",
  "Email",
  "Phone",
  "City",
  "Height (cm)",
  "Weight (kg)",
  "Goal",
  "Neck (cm)",
  "Chest (cm)",
  "Waist (cm)",
  "Hip (cm)",
  "Medical Conditions",
  "Medications",
  "Allergies",
  "Diet Preference",
  "Meals per Day",
  "Water (L/day)",
  "Sleep (hrs)",
  "Activity Level",
  "Occupation",
  "Typical Day Food",
  "Notes",
];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export const Route = createFileRoute("/api/public/case-history")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const spreadsheetId = process.env.CASE_HISTORY_SHEET_ID;

        if (!spreadsheetId) {
          return Response.json(
            {
              error: "CASE_HISTORY_SHEET_ID is missing",
            },
            {
              status: 500,
            }
          );
        }

        let body: Record<string, unknown>;

        try {
          body = await request.json();
        } catch {
          return Response.json(
            {
              error: "Invalid JSON",
            },
            {
              status: 400,
            }
          );
        }

        const s = (v: unknown, max = 500) =>
          typeof v === "string" ? v.trim().slice(0, max) : "";

        const n = (v: unknown) => {
          const num = Number(v);
          return Number.isFinite(num) ? String(num) : "";
        };

        const fullName = s(body.fullName, 120);
        const phone = s(body.phone, 40);

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
          // Find first sheet name
          const metadata = await sheets.spreadsheets.get({
            spreadsheetId,
            fields: "sheets.properties.title",
          });

          const sheetName =
            metadata.data.sheets?.[0]?.properties?.title || "Sheet1";

          // Check if headers exist
          const existing = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:Y1`,
          });

          if (
            !existing.data.values ||
            existing.data.values.length === 0
          ) {
            await sheets.spreadsheets.values.update({
              spreadsheetId,
              range: `${sheetName}!A1:Y1`,
              valueInputOption: "RAW",
              requestBody: {
                values: [HEADERS],
              },
            });
          }

          // Append data
          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${sheetName}!A:Y`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
              values: [row],
            },
          });

          return Response.json({
            success: true,
          });
        } catch (err) {
          console.error(err);

          return Response.json(
            {
              error: "Failed to write to Google Sheet",
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