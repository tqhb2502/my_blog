const Course = require('../models/Course');
const { toObjectArray } = require('../../util/mongoose');

class MeController {
    // [GET] /me/courses
    showCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/courses', {
                    courses: toObjectArray(courses),
                    deletedCount
                })
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    showDeletedCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/deleted-courses', {
                courses: toObjectArray(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController;
