const Course = require('../models/Course');
const Acount = require('../models/Acount');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeControllers {

    
    //[GET]/me/stored/courses
    storedCourses(req, res, next) {
        // let courseQuery = Course.find({}).lean();
        // //sort => nhận value: asc, desc, ascending, descending, 1, và -1.
        
        // //req.query: tìm thuộc tính trên local
        // if(req.query.hasOwnProperty('_sort')){
        //     const isValidType = ['asc', 'desc'].includes(req.query.type);
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: isValidType ? req.query.type : 'desc',
        //     });
        // }
        console.log(Course.query);
        Promise.all([
            Course.find({}).lean().sortable(req), 
            Course.findDeleted({}).lean()
        ])
            .then(([courses, coursess]) =>{
                var deleteCountNew = 0;
                coursess.map(course => {
                    if(course.deleted === true){
                        deleteCountNew ++;
                    } 
                });
                res.render('me/stored-courses', {
                    deleteCountNew,
                    courses,
                })
            })
            .catch(next)

        // Course.find({}).lean()
        //     .then( courses =>  res.render('me/stored-courses', {        
        //         courses,
        //     } ))
        //     .catch(next);
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

    //[GET]/me/stored/acounts
    storedAcounts(req, res, next) {
        Acount.find({}).lean()
            .then( acounts => {
                res.render('me/stored-acounts', { acounts,})
            }) 
            .catch(next);
    }

    
}

module.exports = new MeControllers();
