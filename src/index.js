var express = require('express');
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var path = require('path');
// nếu chỉ viết tên thư mục, tự động import từ file index.js
var route = require('./routes');

var app = express();
var port = 3000;
var hbs = exphbs.create({
    extname: '.hbs'
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

// HTTP logger
// app.use(morgan('combined'));

// template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'res/views'));

// routes init
route(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
