import { google } from 'googleapis';
const sheets = google.sheets('v4');

export async function CreateSpreadsheet() {
  const auth = new google.auth.GoogleAuth({
    // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    // keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ],
  });
  const authClient = await auth.getClient();

  google.options({ auth: authClient as any });

  console.log(sheets.spreadsheets.values);
  console.log('test');

  const shettss = await sheets.spreadsheets.values.get({
    spreadsheetId: '1RJp6NQOBpggFlMCDL7yCekvbLarim_nQ5Mw_DjPjKpo',
    range: 'Sheet1!A1:A2',
  });

  console.log(process);

  // const [title] = shettss.data.values && shettss.data.values[0];

  return <p>{JSON.stringify(shettss.data.values)}</p>;
}
