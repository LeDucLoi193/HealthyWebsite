const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post('/', loginController.login);
router.post('/sign-up', loginController.signUp);
router.get('/log-out', loginController.logOut);

module.exports = router;