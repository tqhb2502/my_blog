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

    // [GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/courses'))
            .catch(err => {
                res.send('ERROR!');
            });
    }

    // [GET] courses/:id/update
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: toSingleObject(course)
            }))
            .catch(next);
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/courses'))
            .catch(next);
    }
}

module.exports = new CoursesController;
