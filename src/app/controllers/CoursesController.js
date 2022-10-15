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
            .then(() => res.redirect('/me/courses'))
            .catch(err => {
                res.send('ERROR!');
            });
    }

    // [GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: toSingleObject(course)
            }))
            .catch(next);
    }

    // [PUT] courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/courses'))
            .catch(next);
    }

    // [DELETE] courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CoursesController;
