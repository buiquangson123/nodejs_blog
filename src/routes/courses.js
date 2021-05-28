const express = require('express');
const router = express.Router();

const courseControllers = require('../app/controllers/courseControllers');

router.get('/create', courseControllers.create);
router.post('/store', courseControllers.store);
router.get('/:slug', courseControllers.show);
router.get('/:id/edit', courseControllers.edit);
router.patch('/:id/restore', courseControllers.restoreCourse);
router.put('/:id', courseControllers.update);
router.delete('/:id', courseControllers.delete);
router.delete('/:id/force', courseControllers.forceDelete);

module.exports = router;