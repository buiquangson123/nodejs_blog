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
        const user = req.session.username;
        Promise.all([
            Course.find({}).lean(), 
            Acount.findOne({username: user}).lean(),
        ])
            .then(([courses, acount]) =>{
                
                res.render('home', {
                    courses,
                    acount,
                    layout: false,
                });
            })
            .catch(next);
        }

    homeAdmin(req, res, next) {
        const user = req.session.username;
        Acount.findOne({username: user}).lean()
            .then(acount => 
                res.render('admin/homeAdmin', {acount})  
            )
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