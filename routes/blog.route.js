const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog.controller');

router.get('/', blogController.viewListBlog);
router.get('/:blogId',blogController.viewBlog);

module.exports = router;