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
const sheetNameViemPhoi = 'ViemPhoi';
const sheetNameVPXetNghiem = 'VPXetNghiem';
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

// handle LoangXuong
module.exports.getDataLoangXuong = async function (req, res) {
  const id = await getIdUser(req)
  let indexs = [];
  let resultIndex = [];
  let resultMin = [];
  let results = []

  // get max, min of loangxuong param
  let { max, min } = params.loangxuong;
  max = - max;
  min = - min;

  // get user's LoangXuong index
  const data = await testGetSpreadSheetValues(sheetNameLoangXuong);
  
  for (const element of data.data.values) {
    if (id === element[0]) {
      indexs = element.slice(2)
      break;
    }
  }

  if (indexs.length !== 0) {
    for (let index of indexs) {
      resultIndex.push(( - index.replace(',', '.') / min) * 100) // change to percentage
      resultMin.push((max / min) * 100) // change to percentage
    }
    results.push(resultIndex, resultMin)
    return res.status(200).json({
      data: results,
      message: "Loang Xuong"
    });
  } else {
    return res.status(404).json({
      message: "No data"
    });
  }
}

// handle ViemPhoi
module.exports.getDataViemPhoi = async function (req, res) {
  const id = await getIdUser(req)
  let indexs = [];
  let results = [];
  let resultVP = [];
  let resultVPMin = [];
  let resultVPXN = [];
  let resultVPXNMin = [];

  // get max, min of indexes
  const { huyetap, BMI, nhiptim, nhiptho } = params.viemphoi
  const { RBC, WBC, PLT, Ure, Glucose, Creatinin, proBNP } = params.viemphoiXN

  // viemphoi
  // get user's ViemPhoi index
  const data = await testGetSpreadSheetValues(sheetNameViemPhoi);
    
  for (const element of data.data.values) {
    if (id === element[0]) {
      indexs = element.slice(2)
      break;
    }
  }
  
  if (indexs.length !== 0) {
    // huyetap
    const { max1, min1, max2, min2 } = huyetap
    const huyetapIndexes = indexs[0].split('/');
    let huyetapIndexMax = parseInt(huyetapIndexes[0]);
    let huyetapIndexMin = parseInt(huyetapIndexes[1]);
    console.log(huyetapIndexMax, huyetapIndexMin)
    resultVP.push(huyetapIndexMax / max1 * 100, huyetapIndexMin / max2 * 100);
    resultVPMin.push(min1 / max1 * 100, min2 / max2 * 100);

    // BMI
    const maxBMI = BMI.max, minBMI = BMI.min;
    resultVP.push(indexs[1] / maxBMI * 100);
    resultVPMin.push(minBMI / maxBMI * 100);

    // nhiptim
    const maxNhipTim = nhiptim.max, minNhipTim = nhiptim.min;
    resultVP.push(indexs[2] / maxNhipTim * 100);
    resultVPMin.push(minNhipTim / maxNhipTim * 100);

    // nhiptho
    const maxNhipTho = nhiptho.max, minNhipTho = nhiptho.min;
    resultVP.push(indexs[3] / maxNhipTho * 100);
    resultVPMin.push(minNhipTho / maxNhipTho * 100);

    // viemphoiXN
    // get user's ViemPhoiXN index
    const dataXN = await testGetSpreadSheetValues(sheetNameVPXetNghiem);
      
    for (const element of dataXN.data.values) {
      if (id === element[0]) {
        indexs = element.slice(2)
        break;
      }
    }
    
    // RBC
    const maxRBC = RBC.max, minRBC = RBC.min;
    resultVPXN.push(indexs[0].replace(',', '.') / maxRBC * 100);
    resultVPXNMin.push(minRBC / maxRBC * 100);
    // WBC
    const maxWBC = WBC.max, minWBC = WBC.min;
    resultVPXN.push(indexs[1].replace(',', '.') / maxWBC * 100);
    resultVPXNMin.push(minWBC / maxWBC * 100);
    // PLT
    const maxPLT = PLT.max, minPLT = PLT.min;
    resultVPXN.push(indexs[2] / maxPLT * 100);
    resultVPXNMin.push(minPLT / maxPLT * 100);
    // Ure
    const maxUre = Ure.max, minUre = Ure.min;
    resultVPXN.push((indexs[3].replace(',', '.') / maxUre) * 100);
    resultVPXNMin.push(minUre / maxUre * 100);
    console.log(typeof(indexs[3]), indexs[3])
    // Glucose
    const maxGlucose = Glucose.max, minGlucose = Glucose.min;
    resultVPXN.push((indexs[4].replace(',', '.') / maxGlucose) * 100);
    resultVPXNMin.push(minGlucose / maxGlucose * 100);
    // Creatinin
    const maxCreatinin = Creatinin.max, minCreatinin = Creatinin.min;
    resultVPXN.push(indexs[5].replace(',', '.') / maxCreatinin * 100);
    resultVPXNMin.push(minCreatinin / maxCreatinin * 100);
    // proBNP
    const minproBNP = proBNP.min;
    resultVPXN.push(indexs[6].replace(',', '.') / minproBNP * 100);
    resultVPXNMin.push(100);
    
    results.push(resultVP, resultVPMin, resultVPXN, resultVPXNMin)
    return res.status(200).json({
      data: results,
      message: "Viem Phoi"
    });
  }
  else {
    return res.status(404).json({
      message: "No data"
    });
  }
}

// handle Gout
module.exports.getDataGout = async function (req, res) {
  const id = await getIdUser(req)

  // get max, min of indexes
  const { axid_uric, CRP_hs, WBC, pH, glucose, cortisol } = params.gout
  let indexs = [];
  let gender;
  let resultIndex = [];
  let resultMin = [];
  let results = [];

  // Gout
  // get user's Gout index
  const data = await testGetSpreadSheetValues(sheetNameGout);
    
  for (const element of data.data.values) {
    if (id === element[0]) {
      gender = element[1];
      indexs = element.slice(2)
      break;
    }
  }
  
  if (indexs.length !== 0) {
    // axid_uric
    const maxMaleAU = axid_uric.male.max, minMaleAU = axid_uric.male.min;
    const maxFemaleAU = axid_uric.female.max, minFemaleAU = axid_uric.female.min;

    if (gender === 'male') {
      resultIndex.push(indexs[0] / maxMaleAU * 100)
      resultMin.push(minMaleAU / maxMaleAU * 100)
    } else {
      resultIndex.push(indexs[0] / maxFemaleAU * 100);
      resultMin.push(minFemaleAU / maxFemaleAU * 100)
    }
    // CRP_hs
    const minCRP_hs = CRP_hs.min;
    resultIndex.push(indexs[1].replace(',', '.') / minCRP_hs * 100);
    resultMin.push(100)
    // WBC
    const maxWBC = WBC.max, minWBC = WBC.min;
    resultIndex.push(indexs[2].replace(',', '.') / maxWBC * 100);
    resultMin.push(minWBC / maxWBC * 100)
    // NEUT
    resultIndex.push(Number(indexs[3]))
    resultMin.push(0)
    // LYM
    resultIndex.push(Number(indexs[4]))
    resultMin.push(0)
    // pH
    const maxpH = pH.max, minpH = pH.min;
    resultIndex.push(indexs[5].replace(',', '.') / maxpH * 100);
    resultMin.push(minpH / maxpH * 100)
    // glucose
    const maxglucose = glucose.max, minglucose = glucose.min;
    resultIndex.push(indexs[6].replace(',', '.') / maxglucose * 100);
    resultMin.push(minglucose / maxglucose * 100)
    // cortisol
    const maxAMcortisol = cortisol.AM.max, minAMcortisol = cortisol.AM.min;
    const maxPMcortisol = cortisol.PM.max, minPMcortisol = cortisol.PM.min;

    resultIndex.push(indexs[7] / maxAMcortisol * 100);
    resultMin.push(minAMcortisol / maxAMcortisol * 100)
    results.push(resultIndex, resultMin)
    return res.status(200).json({
      data: results,
      message: "Gout"
    })
  }
  else {
    return res.status(404).json({
      message: "No data"
    })
  }
}
