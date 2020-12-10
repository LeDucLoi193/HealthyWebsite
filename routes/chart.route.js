const express = require('express');
const router = express.Router();

const chartController = require('../controllers/chart.controller');

router.get('/loang-xuong', chartController.getDataLoangXuong);
router.get('/viem-phoi', chartController.getDataViemPhoi);
router.get('/gout', chartController.getDataGout);

module.exports = router;