const {
  getLoangXuongSheet,
  getViemPhoiSheet,
  getViemPhoiXNSheet,
  getGoutSheet,
  testGetSpreadSheetValues
} = require('../models/health.model');

const jwt = require('jsonwebtoken')
const params = require('../param.json');

const sheetNameUser = 'User';
const sheetNameLoangXuong = 'LoangXuong';

async function getIdUser(req) {
  const decoded = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET)
  let id;

  // get id of user
  const data = await testGetSpreadSheetValues(sheetNameUser);
  for (const element of data.data.values) {
    if (decoded.username === element[1]) {
      id = element[0]
    }
  }

  return id;
}

// handle LoangXuong
module.exports.getDataLoangXuong = async function (req, res) {
  const id = await getIdUser(req)
  let indexs = [];
  let result = [];

  // get max, min of loangxuong param
  let { max, min } = params.loangxuong;
  max = - max;
  min = - min;

  // save user's healthy info
  const data = await testGetSpreadSheetValues(sheetNameLoangXuong);
  
  for (const element of data.data.values) {
    if (id === element[0]) {
      indexs = element.slice(2)
      break;
    }
  }

  for (let index of indexs) {
    result.push((-index / min) * 100) // change to percentage
  }
  console.log(result)
  return res.status(200).json({
    data: result
  });
}

// handle LoangXuong
module.exports.getDataViemPhoi = async function (req, res) {
  const id = await getIdUser(req)

  // save user's healthy info
  const sheet1 = await getViemPhoiSheet() // sheet 'ViemPhoi'
  const sheet2 = await getViemPhoiXNSheet() // sheet 'ViemPhoiXN'


  return res.status(200).send('Add LoangXuong data successfully.');
}

// handle LoangXuong
module.exports.getDataGout = async function (req, res) {
  const id = await getIdUser(req)

  // save user's healthy info
  const sheet = await getGoutSheet() // sheet 'Gout'

  return res.status(200).send('Add LoangXuong data successfully.');
}
