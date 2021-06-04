const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    
    //nếu token là fake => catch()
    try {
        const token = req.cookies.auth;
        if(!token){
            return res.redirect('/login');
        } 

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.json(error)
    }
}

module.exports = verifyToken;