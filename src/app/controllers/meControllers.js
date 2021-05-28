const Course = require('../models/Course');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeControllers {

    //[GET]/me/stored/courses
    storedCourses(req, res, next) {
        Course.find({}).lean()
            .then( courses =>  res.render('me/stored-courses', {        
                courses,
            } ))
            .catch(next);
    }

    //[GET]/me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({}).lean()
            .then( courses => {
                var coursesNew = [];
                courses.map(course => {
                    if(course.deleted === true){
                        coursesNew.push(course);
                    } 
                });
                res.render('me/trash-courses', { coursesNew,})
            }) 
            .catch(next);
    }
}

module.exports = new MeControllers();
