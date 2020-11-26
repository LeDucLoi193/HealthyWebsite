const express = require('express');
const router = express.Router();
// const todoController = require('../controllers/todo.controller');
const homeController = require('../controllers/home.controller');

router.get('/', homeController.getHome);

module.exports = router;