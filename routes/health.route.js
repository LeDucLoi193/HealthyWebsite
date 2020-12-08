const express = require('express');
const router = express.Router();

const healthController = require('../controllers/health.controller');

router.post('/loang-xuong', healthController.postLoangXuong);
router.post('/viem-phoi', healthController.postViemPhoi);
router.post('/viem-phoi-xn', healthController.postViemPhoiXN);
router.post('/gout', healthController.postGout);

module.exports = router;