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
                
                if(!acount) return res.render('login/login',{ 
                                        error: "Sai tên đăng nhập hoặc mật khẩu",
                                        layout: false,
                                    });
                
                bcrypt.compare(password, acount.password, function(err, result) {
                    if(result){
                        const accessToken = jwt.sign({
                            _id: acount._id, 
                            username: acount.username,
                            role: acount.role,
                        }, process.env.ACCESS_TOKEN_SECRET);
                        res.cookie('auth', accessToken);
                        if(acount.role === 'admin'){
                            return res.redirect('/admin/home');
                        }else if(acount.role === 'client'){
                            return res.redirect('/client/home');
                        }
                    }else{
                        return res.render('login/login',{ 
                            error: "Sai tên đăng nhập hoặc mật khẩu",
                            layout: false,
                        });
                    }
                });
            })
            .catch(err => {
                return res.json({"err": 'Lỗi kết nối'})
            })
    }

    logout(req, res, next) {
        res.clearCookie('auth');
        res.render('login/login', { layout: false,})
    }
}

module.exports = new AuthController();
