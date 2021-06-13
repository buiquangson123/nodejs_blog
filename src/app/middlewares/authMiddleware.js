const jwt = require('jsonwebtoken');
const Acount = require('../models/Acount');

const verifyToken = (req, res, next) => {
    
    try {
        const token = req.cookies.auth;
        if(!token){
            return res.redirect('/login');
        } 

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.session.username = decoded.username;
        req.session.avatar = decoded.avatar;
        next();
    } catch (error) {
        return res.json(error)
    }
}

const roleAuth = (req, res, next) => {
    
    try {
        const token = req.cookies.auth;
        if(!token){
            return next();
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const roleURL = req.originalUrl.split('/')[1];

        if(roleURL === 'client' && decoded.role === 'admin'){
            return res.json({'err': 'Không có quyền truy cập'})
        }else if(roleURL === 'admin' && decoded.role === 'client'){
            return res.json({'err': 'Không có quyền truy cập'})
        }else if(roleURL !== 'client' && roleURL !== 'admin'){
            return res.redirect(`\/${decoded.role}/home`);
        }
            
        next();
    } catch (error) {
        return res.json(error)
    }
}


module.exports = {verifyToken, roleAuth};