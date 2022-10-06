const Course = require('../models/Course');
const { toObjectArray, toSingleObject } = require('../../util/mongoose');

class CoursesController {
    // [GET] /courses
    show(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('courses', {
                    courses: toObjectArray(courses)
                });
            })
            .catch(next);
    }

    // [GET] /courses/:slug
    detail(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/detail', {
                    course: toSingleObject(course)
                });
            })
            .catch(next);
    }
}

module.exports = new CoursesController;
