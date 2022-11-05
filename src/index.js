const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
// nếu chỉ viết tên thư mục, tự động import từ file index.js
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/sortMiddleware');

// connect to DB
db.connect();

const app = express();
const port = 3000;
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
});

// static file
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bscss', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/bsjs', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));

// body parse
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// method override
app.use(methodOverride('_method'));

// custom middlewares
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'res/views'));

// routes init
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
