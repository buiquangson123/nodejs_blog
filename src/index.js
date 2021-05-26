const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

//tự mặc định trỏ đến file có tên index.js
const route = require('./routes');

//Tạo đường dẫn tĩnh
app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');

//Câu hình from data khi submit form
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(morgan('combined'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
