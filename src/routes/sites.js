const express = require('express');
const router = express.Router();

const siteControllers = require('../app/controllers/siteControllers');
const authController = require('../app/controllers/authController');

router.get('/login', authController.login);                //form login
router.post('/handle-login', authController.handleLogin);  //post login
router.get('/logout', authController.logout); //logout

router.get('/home', siteControllers.home);     //trang chủ khi người dùng chưa đăng nhập

module.exports = router;
