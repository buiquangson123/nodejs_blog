const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const sortMiddleware = require('./app/middlewares/sortMiddleware');
const route = require('./routes');

const app = express();
app.use(cookieParser());
const port = 3000;

//cấu hình db
const db = require('./config/db')
db.connect();

//tự mặc định trỏ đến file có tên index.js

//session
// app.use(session({
//     secret: 'ssshhhhh',
//     saveUninitialized: true,
//     resave: false, 
//     cookie: {
//         secure: false,
//         maxAge: 30 * 24 * 60 * 60 * 1000 // Set cookie 30 days.
//     }
// }));

//Tạo đường dẫn tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.use(sortMiddleware);

//template engine
app.engine('hbs', handlebars({ 
    extname: '.hbs',
    helpers: require('./helper/handlebars'),
}));
app.set('view engine', 'hbs');

//Câu hình from data khi submit form
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//set đường dẫn đến thư mục views, __dirname:đường dẫn ...src/ => sau khi cấu hình ...src/resources/views
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(morgan('combined'));

app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
