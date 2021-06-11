const Course = require('../models/Course');
const upload = require('../middlewares/uploadMiddleware');

const { mongooseToObject } = require('../../util/mongoose');

class CourseControllers {
    //chi tiết khóa học
    //[GET]/courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug}).lean()
            .then(course => res.render('courses/show', {
                course,
                layout: false,
            }))
            .catch(next);
    }

    //[GET]/courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST]/courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        //course.imageURL = req.file.filename;
        course.save()
            .then(() => res.redirect('/admin/me/stored/courses'))
            .catch(err => {

            });
    }

    //[GET]/courses/id/edit
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then(course => res.render('courses/edit', {course}))
            .catch(next);
    }

    //[PUT]/courses/id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/me/stored/courses'))    //redirect: chuyển hướng
            .catch(next);
    }

    //[DELETE]/courses/id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))    //redirect: chuyển hướng , back: quay lại trang vừa nãy
            .catch(next);
    }
    
    //[DELETE]/courses/id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back')) 
            .catch(next);
    }

    //[PATCH]/courses/id/restore
    restoreCourse(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back')) 
            .catch(next);
    }

    //[POST]/courses/handle-action-form
    handleActionForm(req, res, next) {
        switch(req.body.action) {
            case 'delete': 
                Course.delete( {_id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))   
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!!!'});
        }
    }

    //[POST]/courses/handle-action-form-trash
    handleActionFormTrash(req, res, next) {
        switch(req.body.action) {
            case 'delete': 
                Course.deleteMany( {_id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))   
                    .catch(next);
                break;
            case 'patch': 
                Course.restore( {_id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))   
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!!!'});
        }
    }

}

module.exports = new CourseControllers();
