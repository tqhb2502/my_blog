const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;
const hbs = exphbs.create({
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

// routing
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/search', (req, res) => {
    res.send('');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));