const Course = require('../models/Course');

const { mongooseToObject } = require('../../util/mongoose');

class MeControllers {

    //[GET]/me/stored/courses
    storedCourses(req, res, next) {
        Course.find({}).lean()
            .then(courses =>  res.render('me/stored-courses', {
                courses,
            }))
            .catch(next);
    }
}

module.exports = new MeControllers();
