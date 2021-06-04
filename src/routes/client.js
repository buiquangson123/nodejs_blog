const express = require('express');
const router = express.Router();

const acountControllers = require('../app/controllers/acountControllers');
const courseControllers = require('../app/controllers/courseControllers');
const siteControllers = require('../app/controllers/siteControllers');

const verifyToken = require('../app/middlewares/authMiddleware');

//Chi tiết hhóa học
//:slug mỗi khóa học tồn tại duy nhất 1 slug(tin-moi-nodejs...)
router.get('/courses/:slug', courseControllers.show); //chi tiết một khóa học(trang chủ)

router.get('/home', verifyToken, siteControllers.homeClient); //trang chủ khi người dùng đăng nhập

module.exports = router;