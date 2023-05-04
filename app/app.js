const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const middleware = require('./middleware/view-variables');

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

// middleware
app.use('/', middleware);

//mount routing
app.use(require('./routes/web'));

module.exports = app;
