const express = require('express');
const router = express.Router();

const meControlller = require('../app/controllers/MeController');

router.get('/courses', meControlller.showCourses);
router.get('/trash/courses', meControlller.showDeletedCourses);

module.exports = router;
