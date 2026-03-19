import { google } from "googleapis";

type RsvpSubmission = {
  eventSlug: string;
  eventTitle: string;
  name: string;
  email: string;
  affiliation: string;
  interestNote: string;
  timestamp: string;
};

function getPrivateKey() {
  return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getConfig() {
  return {
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: getPrivateKey(),
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    worksheetName: process.env.GOOGLE_SHEETS_WORKSHEET_NAME || "RSVPs"
  };
}

export function isSheetsConfigured() {
  const { clientEmail, privateKey, spreadsheetId } = getConfig();
  return Boolean(clientEmail && privateKey && spreadsheetId);
}

export async function appendRsvpSubmission(submission: RsvpSubmission) {
  const { clientEmail, privateKey, spreadsheetId, worksheetName } = getConfig();

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets integration is not configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${worksheetName}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          submission.timestamp,
          submission.eventSlug,
          submission.eventTitle,
          submission.name,
          submission.email,
          submission.affiliation,
          submission.interestNote
        ]
      ]
    }
  });
}

export async function appendSheetRow(range: string, values: string[]) {
  const { clientEmail, privateKey, spreadsheetId } = getConfig();

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets integration is not configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values]
    }
  });
}
