const Course = require('../models/Course');
const Acount = require('../models/Acount');
 

const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteControllers {

    home(req, res, next) {
        Course.find({}).lean()
        .then(courses =>{
            res.render('home', {
                courses,
                layout: false,
            });
        })
            .catch(next);
        }

    homeClient(req, res, next) {
        Course.find({}).lean()
        .then(courses =>{
            const user = req.username
            res.cookie("username", user);
            res.render('home', {
                courses,
                layout: false,
            });
        })
            .catch(next);
        }

    homeAdmin(req, res, next) {
        Course.find({}).lean()
        .then(courses =>{
            const user = req.username
            res.cookie("username", user);
            res.render('homeAdmin');
        })
            .catch(next);
        }
}

    
    
    module.exports = new SiteControllers();
    
    
    // course.find({}, function (err, course) {
    //     if(!err){
    //         res.render('home');
    //     }else{
    //         res.status(400).json({err : 'Lỗi!!!'})
    //     }
    // })