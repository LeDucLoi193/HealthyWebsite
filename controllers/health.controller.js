const {
  getLoangXuongSheet,
  getViemPhoiSheet,
  getViemPhoiXNSheet,
  getGoutSheet,
  testGetSpreadSheetValues
} = require('../models/health.model');

const jwt = require('jsonwebtoken')

const sheetNameUser = 'User';

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
module.exports.postLoangXuong = async function (req, res) {
  const id = await getIdUser(req)

  // save user's healthy info
  const sheet = await getLoangXuongSheet() // sheet 'LoangXuong'

  await sheet.addRow({
    id: id,
    ...req.body.data
  })

  return res.status(200).send('Add LoangXuong data successfully.');
}

// handle ViemPhoi
module.exports.postViemPhoi = async function (req, res) {
  const id = await getIdUser(req);

  // save user's healthy info
  const sheet = await getViemPhoiSheet() // sheet 'ViemPhoi'

  await sheet.addRow({
    id: id,
    ...req.body.data
  })
  
  return res.status(200).send('Add Viem Phoi data successfully.');
}

module.exports.postViemPhoiXN = async function (req, res) {
  const id = await getIdUser(req);
  
  // save user's healthy info
  const sheet = await getViemPhoiXNSheet() // sheet 'VPXetNghiem'
 
  await sheet.addRow({
    id: id,
    ...req.body.data
  })
  
  return res.status(200).send('Add Viem Phoi xet nghiem data successfully.');
}

// handle Gout
module.exports.postGout = async function (req, res) {
  const id = await getIdUser(req);

  // save user's healthy info
  const sheet = await getGoutSheet() // sheet 'Gout'

  await sheet.addRow({
    id: id,
    ...req.body.data
  })
  
  return res.status(200).send('Add Gout data successfully.');
}