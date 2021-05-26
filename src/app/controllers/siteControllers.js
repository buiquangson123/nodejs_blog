const Course = require('../models/Course');

const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteControllers {
    home(req, res, next) {
        // course.find({}, function (err, course) {
        //     if(!err){
        //         res.render('home');
        //     }else{
        //         res.status(400).json({err : 'Lỗi!!!'})
        //     }
        // })

        //promise .lean()
        Course.find({})
            .then(courses =>{
                //courses = courses.map(course => course.toObject());
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteControllers();
