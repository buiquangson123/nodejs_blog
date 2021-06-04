const Acount = require('../models/Acount');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController{
    login(req, res, next) {
        res.render('login/login', { layout: false,})
    }

    handleLogin(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        
        Acount.findOne({username: username}).lean() 
            .then(acount => {
                
                if(!acount) return res.status(400).json({ msg: "Sai tên đăng nhập hoặc mật khẩu"});
                
                bcrypt.compare(password, acount.password, function(err, result) {
                    if(result){
                        const accessToken = jwt.sign({_id: acount._id, username: acount.username}, process.env.ACCESS_TOKEN_SECRET);
                        res.cookie('auth', accessToken);
                        if(acount.role === 'admin'){
                            return res.redirect('/admin/home');
                        }else if(acount.role === 'client'){
                            return res.redirect('/client/home');
                        }
                    } 
                });
            })
            .catch(err => {

            })
    }

    logout(req, res, next) {
        res.clearCookie('auth');
        res.clearCookie('username');
        res.render('login/login', { layout: false,})
    }
}

module.exports = new AuthController();
