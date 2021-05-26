const course = require('../models/Course');
class SiteControllers {
    home(req, res) {
        course.find({}, function (err, course) {
            if(!err){
                res.json(course)
            }else{

                res.status(400).json({err : 'Lỗi!!!'})
            }
        })
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteControllers();
