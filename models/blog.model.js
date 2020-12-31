const { GoogleSpreadsheet } = require('google-spreadsheet');

const {
  getAuthToken,
  getSpreadSheetValues
} = require('./login.model');

const spreadsheetId = '1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg';

const doc = new GoogleSpreadsheet(spreadsheetId);

const sheetBlog = 'Blog';

async function getIdUser(req) {
  let title;
  let content

  // get id of user
  const data = await testGetSpreadSheetValues(sheetBlog);
  // for (const element of data.data.values) {
  //   if (decoded.username === element[1]) {
  //     id = element[1]
  //   }
  // }
  console.log(data.data.values);
}

async function getBlog() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[5]; // sheet 'Blog'

  return sheet;
}

  module.exports = {
    getBlog,
    getIdUser
  }
  ;

  