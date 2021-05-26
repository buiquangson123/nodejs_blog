
const routerNews = require('./news');
const routerSites = require('./sites');

function route(app) {

    app.use('/news', routerNews);

    app.use('/', routerSites);
    
}

module.exports = route;