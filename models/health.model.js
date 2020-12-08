const { GoogleSpreadsheet } = require('google-spreadsheet');

const {
  getAuthToken,
  getSpreadSheetValues
} = require('./login.model');

// spreadsheet key is the long id in the sheets URL
const spreadsheetId = '1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg';

const doc = new GoogleSpreadsheet(spreadsheetId);

// get value of sheet with sheetname
const testGetSpreadSheetValues = async (sheetName) => {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    })
    // console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
    return response;
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

async function getUserSheet() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // sheet 'User'

  return sheet;
}

async function getLoangXuongSheet() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[1]; // sheet 'Loang Xuong'

  return sheet;
}

async function getViemPhoiSheet() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[2]; // sheet 'Viem Phoi'

  return sheet;
}

async function getViemPhoiXNSheet() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[3]; // sheet 'Viem Phoi Xet Nghiem'

  return sheet;
}

async function getGoutSheet() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[4]; // sheet 'Gout'

  return sheet;
}

module.exports = {
  getUserSheet,
  getLoangXuongSheet,
  getViemPhoiSheet,
  getViemPhoiXNSheet,
  getGoutSheet,
  testGetSpreadSheetValues
}