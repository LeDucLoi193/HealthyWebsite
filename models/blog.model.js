const { GoogleSpreadsheet } = require('google-spreadsheet');
const {testGetSpreadSheetValues} = require('../models/health.model');

const spreadsheetId = '1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg';

const doc = new GoogleSpreadsheet(spreadsheetId);

const sheetBlogName = 'Blog';

async function getIdUser(req) {
  let title;
  let content

  // get id of user
  const data = await testGetSpreadSheetValues(sheetBlogName);
  // for (const element of data.data.values) {
  //   if (decoded.username === element[1]) {
  //     id = element[1]
  //   }
  // }
  console.log(data.data.values);
}

async function getBlog() {
  const data = await testGetSpreadSheetValues(sheetBlogName);

  return data;
}

module.exports = {
  getBlog,
  getIdUser
};

  