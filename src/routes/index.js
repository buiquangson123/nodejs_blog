const routerNews = require('./news');
const routerSites = require('./sites');
const routerCourses = require('./courses');
const routerMe = require('./me');

function route(app) {
    app.use('/news', routerNews);

    app.use('/courses', routerCourses);

    app.use('/me', routerMe);

    app.use('/', routerSites);
}

module.exports = route;
