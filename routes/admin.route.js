const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.get('/users', adminController.getUsers);
router.get('/users/delete/:id', adminController.deleteUser);
router.get('/blogs', adminController.getBlogs);
router.get('/blogs/delete/:id', adminController.deleteBlog);
router.post('/blogs/edit/:id', adminController.editBlog);
router.post('/blogs/add', adminController.postAddBlog);

module.exports = router;