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

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: false, 
    cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//đường dẫn đến thư mục views
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(morgan('combined'));

app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
