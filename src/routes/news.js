const express = require('express');
const router = express.Router();

const newsControllers = require('../app/controllers/newsControllers');

router.get('/:slug', newsControllers.show);

//đường dẫn chính đến trang news
router.get('/', newsControllers.index);

module.exports = router;
