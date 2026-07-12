## Plan: Live test the Case History form → Google Sheet

**Goal:** Submit a dummy entry via the live form and verify the row lands in the connected Google Sheet.

### Steps

1. **Submit a dummy entry via Playwright** against the running preview at `http://localhost:8080/case-history`:
   - Fill required fields (Full Name: "Test Dummy — please ignore", Phone: "+91 0000000000") plus a few extras (email, city, height/weight, goal, notes) so the row is clearly a test.
   - Click **Submit case history**.
   - Screenshot the success state ("Thank you!" screen) as visible confirmation.
   - Capture any console/network errors.

2. **Verify the row in the Google Sheet** via the connector gateway:
   - Read the last few rows from `Sheet1` of `CASE_HISTORY_SHEET_ID` using `standard_connectors--call_gateway_connection` (Google Sheets `values.get`).
   - Confirm the dummy row (matching name + phone + recent timestamp) is present, and that the header row exists.

3. **Report back** with:
   - Screenshot of the success page
   - The matched row from the sheet (or the raw error if it failed)
   - Cleanup note: tell you which row to delete from the sheet since it's a test entry (I won't delete it automatically).

### Notes
- No code changes. Read-only verification of the existing integration.
- If the POST fails, I'll pull `stack_modern--server-function-logs` to diagnose (likely `CASE_HISTORY_SHEET_ID`, `LOVABLE_API_KEY`, or Sheets connector auth).
