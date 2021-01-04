const {
  getLoangXuongSheet,
  getViemPhoiSheet,
  getViemPhoiXNSheet,
  getGoutSheet,
  testGetSpreadSheetValues
} = require('../models/health.model');

const jwt = require('jsonwebtoken');

const sheetNameUser = 'User';
const sheetNameLoangXuong = 'LoangXuong';
const sheetNameViemPhoi = 'ViemPhoi';
const sheetNameVPXetnghiem = 'VPXetnghiem';
const sheetNameGout = 'Gout';

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

async function getLastTime(id, sheetName) {
  // get the last time of posted data
  const data = await testGetSpreadSheetValues(sheetName);
  const elements = data.data.values;

  for (let i=elements.length-1; i >=0; --i) {
    if (elements[i][0] === id) {
      return elements[i][1];
    }
  }

  return 0;
}

// handle LoangXuong
module.exports.postLoangXuong = async function (req, res) {
  const id = await getIdUser(req)
  const lastTime = await getLastTime(id, sheetNameLoangXuong);

  // save user's healthy info
  const sheet = await getLoangXuongSheet() // sheet 'LoangXuong'

  await sheet.addRow({
    id: id,
    Times: parseInt(lastTime, 10) + 1,
    ...req.body.data
  })

  return res.status(200).send('Add LoangXuong data successfully.');
}

// handle ViemPhoi
module.exports.postViemPhoi = async function (req, res) {
  const id = await getIdUser(req);
  const lastTime = await getLastTime(id, sheetNameViemPhoi);

  // save user's healthy info
  const sheet = await getViemPhoiSheet() // sheet 'ViemPhoi'

  await sheet.addRow({
    id: id,
    Times: parseInt(lastTime, 10) + 1,
    ...req.body.data
  })
  
  return res.status(200).send('Add Viem Phoi data successfully.');
}

module.exports.postViemPhoiXN = async function (req, res) {
  const id = await getIdUser(req);
  const lastTime = await getLastTime(id, sheetNameVPXetnghiem);
  
  // save user's healthy info
  const sheet = await getViemPhoiXNSheet() // sheet 'VPXetNghiem'
 
  await sheet.addRow({
    id: id,
    Times: parseInt(lastTime, 10) + 1,
    ...req.body.data
  })
  
  return res.status(200).send('Add Viem Phoi xet nghiem data successfully.');
}

// handle Gout
module.exports.postGout = async function (req, res) {
  const id = await getIdUser(req);
  const lastTime = await getLastTime(id, sheetNameGout);

  // save user's healthy info
  const sheet = await getGoutSheet() // sheet 'Gout'

  await sheet.addRow({
    id: id,
    Times: parseInt(lastTime, 10) + 1,
    ...req.body.data
  })
  
  return res.status(200).send('Add Gout data successfully.');
}