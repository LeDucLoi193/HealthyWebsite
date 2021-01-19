const {
  getUserSheet,
  testGetSpreadSheetValues
} = require('../models/health.model');

var md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken');
let users = {};

const sheetName = 'User';
let data = {};

module.exports.login = async function (req, res) {
  try {
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
    data = await testGetSpreadSheetValues(sheetName);
    for (const element of data.data.values) {
      if (username === element[1]) {
        if (md5(password, process.env.KEY_MD5) !== element[3]) {
          flag = 2;
          break;
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
        message: 'Tên người dùng không tồn tại'
      })
    }
    else if (flag === 2) {
        res.status(500).send({
        message: 'Sai mật khẩu'
      })
    }
    else {
      //store the refresh token in the user array
      const sheet = await getUserSheet(); // or use doc.sheetsById[id]
      const rows = await sheet.getRows();

      rows[id-1].refreshToken = refreshToken;
      await rows[id-1].save();

      //send the access token to the client inside a cookie
      if (username === "admin") {
        res
        .cookie('jwt', accessToken)
        .status(200)
        .json({
          message: "admin"
        })
      }
      else {
        res
        .cookie('jwt', accessToken)
        .status(200)
        .send()
      }
    }
    return;
  } catch(err) {
    console.log(err)
  }

  return;
}

module.exports.signUp = async function (req, res) {
  try {
    const sheet = await getUserSheet(); // or use doc.sheetsById[id]
    const data = await testGetSpreadSheetValues(sheetName);
    req.body.password = md5(req.body.password, process.env.KEY_MD5);

    await sheet.addRow({
      id: data.data.values.length,
      ...req.body
    })

    res.status(200).json({
      message: "Đăng ký thành công"
    })
  } catch(err) {
    console.log(err)
  } 
}

module.exports.logOut = function (req, res) {
  try {
    res 
    .clearCookie('jwt', {domain: 'localhost', path:'/'})
    .status(200)
    .send()
  } catch(err) {
    console.log(err)
  } 
}