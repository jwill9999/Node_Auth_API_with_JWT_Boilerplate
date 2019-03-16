const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const Cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');

const mongoose = require('mongoose');

/************************db setup***********************************************/
/********add and replace your own database connection here in .env file ********/
/*******************************************************************************/

mongoose.Promise = global.Promise;


/**
 * Mongoose Database connection
 * @params connection {string}
 * @returns {promise} 
 */
mongoose.connect(process.env.DATABASE_CONNECTION, { userNewUrlParser: true }).then(
	() => { console.log("\x1b[32m%s\x1b[0m", 'Connected to Mongodb :- DataBase listening on Port 27017'); },
	err => { console.log("\x1b[31m%s\x1b[0m", 'ERROR :- Could not connect to your MongoDb DataBase', err); }
);


const app = express();



//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Cors());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
