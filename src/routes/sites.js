const express = require('express');
const router = express.Router();

const siteControllers = require('../app/controllers/siteControllers');
const authController = require('../app/controllers/authController');
const {verifyToken, roleAuth} = require('../app/middlewares/authMiddleware');

router.get('/login', authController.login);                
router.post('/handle-login', authController.handleLogin);  
router.get('/logout', authController.logout); 

router.get('/home', roleAuth, siteControllers.home);     

module.exports = router;
