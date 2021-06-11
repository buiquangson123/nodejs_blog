const express = require('express');
const router = express.Router();

const meControllers = require('../app/controllers/meControllers');
const acountControllers = require('../app/controllers/acountControllers');
const courseControllers = require('../app/controllers/courseControllers');
const siteControllers = require('../app/controllers/siteControllers');

const verifyToken = require('../app/middlewares/authMiddleware');
const upload = require('../app/middlewares/uploadMiddleware');

//Thêm, sửa, xóa, danh sách Khóa học
router.get('/courses/create', courseControllers.create); //giao diện thêm khóa học
router.post('/courses/store', courseControllers.store);   //post khóa học mới đc thêm mới
router.get('/courses/:id/edit', courseControllers.edit);    //giao diện sửa khóa học
router.post('/courses/handle-action-form', courseControllers.handleActionForm);   //xóa hết khóa học 
router.post('/courses/handle-action-form-trash', courseControllers.handleActionFormTrash); //trash
router.patch('/courses/:id/restore', courseControllers.restoreCourse); //Khôi  phục 1 khóa học ở thùng rác
router.put('/courses/:id', courseControllers.update);       //cập nhật khóa học vừa sửa              
router.delete('/courses/:id', courseControllers.delete);            //Xóa một khóa học
router.delete('/courses/:id/force', courseControllers.forceDelete); //Xóa vĩnh viễn 
router.get('/me/stored/courses', meControllers.storedCourses);  //danh sách khóa học
router.get('/me/trash/courses', meControllers.trashCourses);      //danh sách khóa học trong thùng rác

//Thêm, danh sách Người dùng
router.get('/acounts/create', acountControllers.createAcount);  //giao diện thêm người dùng
router.post('/acounts/store', upload.single('avatar'), acountControllers.storeAcount);   //post người dùng mới thêm
router.get('/me/stored/acounts', meControllers.storedAcounts);     //danh sách người dùng
router.post('/acounts/handle-action-form', acountControllers.handleActionForm);   //xóa hết khóa học 
router.get('/acounts/:id/edit', acountControllers.editAcount);  //giao diện sửa người dùng
router.delete('/acounts/:id', acountControllers.deleteAcount);  //Xóa người dùng
router.put('/acounts/:id', acountControllers.updateAcount);   //cập nhật người dùng vừa sửa


router.get('/home', siteControllers.homeAdmin);


module.exports = router;