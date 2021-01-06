const {
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
  let allIndexes = [];
  let resultL1 = [], resultL2 = [], resultL3 = [], resultL4 = [], resultTotal = []
  let resultIndex = [], resultMin = []
  let resultsLine = [];
  let resultsRadar = [];
  let firstTime = false;

  // get max, min of loangxuong param
  let { max, min } = params.loangxuong;
  max = - max;
  min = - min;

  // get user's LoangXuong index
  const data = await testGetSpreadSheetValues(sheetNameLoangXuong);
  
  for (const element of data.data.values) {
    if (id === element[0]) {
      allIndexes.push(element.slice(3))
    }
  }

  if (allIndexes.length === 0) {
    return res.status(404).json({
      message: "Khong co du lieu"
    });
  }
  else if (allIndexes.length === 1) {
    firstTime = true;
  }

  for (let i = 0; i < allIndexes.length; ++i) {
    resultL1.push(-( allIndexes[i][0].replace(',', '.') / min) * 100)
    resultL2.push(-( allIndexes[i][1].replace(',', '.') / min) * 100)
    resultL3.push(-( allIndexes[i][2].replace(',', '.') / min) * 100)
    resultL4.push(-( allIndexes[i][3].replace(',', '.') / min) * 100)
    resultTotal.push(-( allIndexes[i][4].replace(',', '.') / min) * 100)
    
    if (i === allIndexes.length - 1) {
      for (let index of allIndexes[i]) {
        resultIndex.push(-( index.replace(',', '.') / min) * 100) // change to percentage
        resultMin.push((max / min) * 100) // change to percentage
      }
    }
  }
  resultsLine.push(resultL1, resultL2, resultL3, resultL4, resultTotal)
  resultsRadar.push(resultIndex, resultMin)
  
  return res.status(200).json({
    resultsLine,
    resultsRadar,
    message: "Loang Xuong",
    firstTime
  });
}

// handle ViemPhoi
module.exports.getDataViemPhoi = async function (req, res) {
  const id = await getIdUser(req)
  let indexes = [];
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
      indexes = element.slice(3)
      break;
    }
  }
  
  if (indexes.length !== 0) {
    // huyetap
    const { max1, min1, max2, min2 } = huyetap
    const huyetapIndexes = indexes[0].split('/');
    let huyetapIndexMax = parseInt(huyetapIndexes[0]);
    let huyetapIndexMin = parseInt(huyetapIndexes[1]);
    resultVP.push(huyetapIndexMax / max1 * 100, huyetapIndexMin / max2 * 100);
    resultVPMin.push(min1 / max1 * 100, min2 / max2 * 100);

    // BMI
    const maxBMI = BMI.max, minBMI = BMI.min;
    resultVP.push(indexes[1] / maxBMI * 100);
    resultVPMin.push(minBMI / maxBMI * 100);

    // nhiptim
    const maxNhipTim = nhiptim.max, minNhipTim = nhiptim.min;
    resultVP.push(indexes[2] / maxNhipTim * 100);
    resultVPMin.push(minNhipTim / maxNhipTim * 100);

    // nhiptho
    const maxNhipTho = nhiptho.max, minNhipTho = nhiptho.min;
    resultVP.push(indexes[3] / maxNhipTho * 100);
    resultVPMin.push(minNhipTho / maxNhipTho * 100);

    // viemphoiXN
    // get user's ViemPhoiXN index
    const dataXN = await testGetSpreadSheetValues(sheetNameVPXetNghiem);
      
    for (const element of dataXN.data.values) {
      if (id === element[0]) {
        indexes = element.slice(3)
        break;
      }
    }
    
    // RBC
    const maxRBC = RBC.max, minRBC = RBC.min;
    resultVPXN.push(indexes[0].replace(',', '.') / maxRBC * 100);
    resultVPXNMin.push(minRBC / maxRBC * 100);
    // WBC
    const maxWBC = WBC.max, minWBC = WBC.min;
    resultVPXN.push(indexes[1].replace(',', '.') / maxWBC * 100);
    resultVPXNMin.push(minWBC / maxWBC * 100);
    // PLT
    const maxPLT = PLT.max, minPLT = PLT.min;
    resultVPXN.push(indexes[2] / maxPLT * 100);
    resultVPXNMin.push(minPLT / maxPLT * 100);
    // Ure
    const maxUre = Ure.max, minUre = Ure.min;
    resultVPXN.push((indexes[3].replace(',', '.') / maxUre) * 100);
    resultVPXNMin.push(minUre / maxUre * 100);
    // Glucose
    const maxGlucose = Glucose.max, minGlucose = Glucose.min;
    resultVPXN.push((indexes[4].replace(',', '.') / maxGlucose) * 100);
    resultVPXNMin.push(minGlucose / maxGlucose * 100);
    // Creatinin
    const maxCreatinin = Creatinin.max, minCreatinin = Creatinin.min;
    resultVPXN.push(indexes[5].replace(',', '.') / maxCreatinin * 100);
    resultVPXNMin.push(minCreatinin / maxCreatinin * 100);
    // proBNP
    const minproBNP = proBNP.min;
    resultVPXN.push(indexes[6].replace(',', '.') / minproBNP * 100);
    resultVPXNMin.push(100);
    
    results.push(resultVP, resultVPMin, resultVPXN, resultVPXNMin)
    return res.status(200).json({
      data: results,
      message: "Viem Phoi"
    });
  }
  else {
    return res.status(404).json({
      message: "Khong co du lieu"
    });
  }
}

// handle Gout
module.exports.getDataGout = async function (req, res) {
  const id = await getIdUser(req)

  // get max, min of indexes
  const { axid_uric, CRP_hs, WBC, pH, glucose, cortisol } = params.gout
  let allIndexes = [];
  let gender;
  let results = [];
  let resultAD = [], resultCRP = [], resultWBC = [], resultNEUT = [], resultLYM = [], resultpH = [], resultGlu = [], resultCor = []
  let resultsLine = [], resultsRadar = []
  let resultIndex = [], resultMin = [];
  let firstTime = false;

  // Gout
  // get user's Gout index
  const data = await testGetSpreadSheetValues(sheetNameGout);
    
  for (const element of data.data.values) {
    if (id === element[0]) {
      gender = element[2];
      allIndexes.push(element.slice(3))
    }
  }
  
  if (allIndexes.length === 0) {
    return res.status(404).json({
      message: "Khong co du lieu"
    })
  }
  else if (allIndexes.length === 1) {
    firstTime = true;
  }

  for (let i = 0; i < allIndexes.length; ++i) {
    // axid_uric
    const maxMaleAU = axid_uric.male.max, minMaleAU = axid_uric.male.min;
    const maxFemaleAU = axid_uric.female.max, minFemaleAU = axid_uric.female.min;

    if (gender === 'male') {
      resultAD.push(allIndexes[i][0] / maxMaleAU * 100)
      if (i === allIndexes.length-1) {
        resultIndex.push(allIndexes[i][0] / maxMaleAU * 100)
        resultMin.push(minMaleAU / maxMaleAU * 100)
      }
    } else {
      resultAD.push(allIndexes[i][0] / maxFemaleAU * 100);
      if (i === allIndexes.length-1) {
        resultIndex.push(allIndexes[i][0] / maxFemaleAU * 100)
        resultMin.push(minFemaleAU / maxFemaleAU * 100)
      }
    }
    // CRP_hs
    const minCRP_hs = CRP_hs.min;
    resultCRP.push(allIndexes[i][1].replace(',', '.') / minCRP_hs * 100);
    if (i === allIndexes.length-1) {
      resultIndex.push(allIndexes[i][1].replace(',', '.') / minCRP_hs * 100)
      resultMin.push(100)
    }
    // WBC
    const maxWBC = WBC.max, minWBC = WBC.min;
    resultWBC.push(allIndexes[i][2].replace(',', '.') / maxWBC * 100);
    if (i === allIndexes.length-1) {
      resultIndex.push(allIndexes[i][2].replace(',', '.') / maxWBC * 100)
      resultMin.push(minWBC / maxWBC * 100)
    }
    // NEUT
    resultNEUT.push(Number(allIndexes[i][3]))
    if (i === allIndexes.length-1) {
      resultIndex.push(Number(allIndexes[i][3]))
      resultMin.push(0)
    }
    // LYM
    resultLYM.push(Number(allIndexes[i][4]))
    if (i === allIndexes.length-1) {
      resultIndex.push(Number(allIndexes[i][4]))
      resultMin.push(0)
    }
    // pH
    const maxpH = pH.max, minpH = pH.min;
    resultpH.push(allIndexes[i][5].replace(',', '.') / maxpH * 100);
    if (i === allIndexes.length-1) {
      resultIndex.push(allIndexes[i][5].replace(',', '.') / maxpH * 100)
      resultMin.push(minpH / maxpH * 100)
    }
    // glucose
    const maxglucose = glucose.max, minglucose = glucose.min;
    resultGlu.push(allIndexes[i][6].replace(',', '.') / maxglucose * 100);
    if (i === allIndexes.length-1) {
      resultIndex.push(allIndexes[i][6].replace(',', '.') / maxglucose * 100)
      resultMin.push(minglucose / maxglucose * 100)
    }
    // cortisol
    const maxAMcortisol = cortisol.AM.max, minAMcortisol = cortisol.AM.min;
    const maxPMcortisol = cortisol.PM.max, minPMcortisol = cortisol.PM.min;

    resultCor.push(allIndexes[i][7] / maxAMcortisol * 100);
    if (i === allIndexes.length-1) {
      resultIndex.push(allIndexes[i][7] / maxAMcortisol * 100)
      resultMin.push(minAMcortisol / maxAMcortisol * 100)
    }
  }
  resultsLine.push(resultAD, resultCRP, resultWBC, resultNEUT, resultLYM, resultpH, resultGlu, resultCor)
  resultsRadar.push(resultIndex, resultMin)

  return res.status(200).json({
    resultsLine,
    resultsRadar,
    message: "Gout",
    firstTime
  })
}
