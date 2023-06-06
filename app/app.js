const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKeySecret } = require('./config');

// init
require('./db/mongoose');

//middlware session logowania
app.use(
	session({
		secret: sessionKeySecret,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, //1 dzień
			resave: false,
		},
	})
);

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
app.use('/', require('./middleware/view-variables-middleware'));
app.use('/', require('./middleware/user-middleware'));
app.use('/admin', require('./middleware/is-auth-middleware'));

//mount routing
app.use(require('./routes/web'));

module.exports = app;
