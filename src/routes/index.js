const routerClient = require('./client');
const routerAdmin = require('./admin');
const routerSites = require('./sites');
const {verifyToken, roleAuth} = require('../app/middlewares/authMiddleware');

function route(app) {
    app.use('/client/*', roleAuth);
    app.use('/admin/*', roleAuth);
    app.use('/client', verifyToken, routerClient);
    app.use('/admin', verifyToken, routerAdmin)
    app.use('/', routerSites);
}

module.exports = route;
