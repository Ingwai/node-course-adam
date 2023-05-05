const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

// init
require('./db/mongoose');

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));
// set layout
app.use(ejsLayouts);
app.set('layout', 'layouts/main');
// public folder
app.use(express.static('public'));

// body parser
// body parser jest już wbudowany w expressa nie trzeba go zaciągać z zew biblioteki
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded wysyłanie przez formularz

// { extended: true } oznacza że parser rozpozna nie tylko tekst i tablice ale też inne typy danych

// gdy wysyłamy przez api wtedy przez application/json
// app.use(express.json());

// middleware
app.use('/', require('./middleware/view-variables'));

//mount routing
app.use(require('./routes/web'));

module.exports = app;
