const {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
} = require('../models/login.model');

const { GoogleSpreadsheet } = require('google-spreadsheet');
var md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken');
let users = {};

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg');

const spreadsheetId = '1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg';
const sheetName = 'Sheet1';
let data = {};


const testGetSpreadSheetValues = async () => {
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

module.exports.login = async function (req, res) {
  try {
    console.log(req.body)
    const { username, password } = req.body.data;
    let flag = 0;
    let id = 0;

    let payload = {username};

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

    // check request
    data = await testGetSpreadSheetValues();
    for (const element of data.data.values) {
      if (username === element[1]) {
        if (md5(password, process.env.KEY_MD5) !== element[3]) {
          flag = 2;
        }
        else {
          flag = 0;
          id = element[0];
        }
        break;
      } 
      else {
        flag = 1;
      }
    }
    if (flag === 1) {
      res.status(500).send({
        message: 'Username is not exist.'
      })
    }
    else if (flag === 2) {
        res.status(500).send({
        message: 'Wrong password.'
      })
    }
    else {
      //store the refresh token in the user array
      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
  
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      const rows = await sheet.getRows();

      rows[id-1].refreshToken = refreshToken;
      await rows[id-1].save();

      //send the access token to the client inside a cookie
      res
        .cookie('jwt', accessToken)
        .status(200)
        .send()
    }
    return;
  } catch(err) {
    console.log(err)
  }

  return;
}

module.exports.signUp = async function (req, res) {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    
    const data = await testGetSpreadSheetValues();

    req.body.password = md5(req.body.password, process.env.KEY_MD5);
    console.log(req.body);

    await sheet.addRow({
      id: data.data.values.length,
      ...req.body
    })

    res.status(200).json({
      message: "Sign up successfully."
    })
  } catch(err) {
    console.log(err)
  } 
}