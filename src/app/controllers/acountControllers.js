const Acount = require('../models/Acount');
const bcrypt = require('bcrypt');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class AcountControllers {

    //[GET]/acounts/create
    createAcount(req, res, next) {
        res.render('acounts/create');
    }

    //[POST]/acounts/store
    storeAcount(req, res, next) {

        if (!(req.body.username && req.body.password)) {
            return res.status(400).send({ error: "Lỗi định dạng dữ liệu" });
        }
        const acount = new Acount(req.body);
        acount.avatar = req.file.filename;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                acount.password = hash;
                acount.save()
                    .then(() => {
                        res.redirect('/admin/me/stored/acounts')
                    })
                    .catch(err => {
        
                    });
            });
        });
    }

    //[GET]/acount/id/edit
    editAcount(req, res, next) {
        Acount.findById(req.params.id).lean()
            .then(acount => res.render('acounts/edit', {acount}))
            .catch(next);
    }

    //[PUT]/acount/id
    updateAcount(req, res, next) {
        Acount.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/me/stored/acounts'))    //redirect: chuyển hướng
            .catch(next);
    }

    //[DELETE]/acount/id
    deleteAcount(req, res, next) {
        Acount.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back')) 
            .catch(next);
    }

    //[POST]/acounts/handle-action-form
    handleActionForm(req, res, next) {
        switch(req.body.action) {
            case 'delete': 
                Acount.deleteOne( {_id: {$in: req.body.acountIds} })
                    .then(() => res.redirect('back'))   
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!!!'});
        }
    }
}

module.exports = new AcountControllers();
