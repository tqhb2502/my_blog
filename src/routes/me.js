const express = require('express');
const router = express.Router();

const meControlller = require('../app/controllers/MeController');

router.get('/courses', meControlller.showCourses);

module.exports = router;
