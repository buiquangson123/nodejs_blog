const express = require('express');
const router = express.Router();

const acountControllers = require('../app/controllers/acountControllers');
const courseControllers = require('../app/controllers/courseControllers');
const siteControllers = require('../app/controllers/siteControllers');

const verifyToken = require('../app/middlewares/authMiddleware');


router.get('/courses/:slug', courseControllers.show); 

router.get('/home', siteControllers.homeClient);

module.exports = router;