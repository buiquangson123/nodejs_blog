const express = require('express');
const router = express.Router();

const meControllers = require('../app/controllers/meControllers');

router.get('/stored/courses', meControllers.storedCourses);
router.get('/trash/courses', meControllers.trashCourses);

module.exports = router;