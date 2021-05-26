
class NewsControlller {

    //[GET]/news
    index(req, res) {
        res.render('new');
    }

    //[GET]/news/tintuc
    show(req, res) {
        res.send('Thông tin các tin tức');
    }
}

module.exports = new NewsControlller;