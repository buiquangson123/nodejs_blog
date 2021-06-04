const routerClient = require('./client');
const routerAdmin = require('./admin');
const routerSites = require('./sites');

function route(app) {
    app.use('/client', routerClient);
    app.use('/admin', routerAdmin)
    app.use('/', routerSites);
}

module.exports = route;
