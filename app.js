var createError = require('http-errors');
var express = require('express');
var sassMiddleware = require('node-sass-middleware')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const mysql = require('mysql');


// Validate our settings schema
const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });


var app = express();


app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  helpers: require(__dirname +"\\public\\javascripts\\helpers.js").helpers,
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log( __dirname + '/public/scss');
app.use(
  sassMiddleware ({
      src: __dirname + '/public/scss', 
      dest: __dirname + '/public',
      debug: true,       
  })
);   
app.use(express.static(path.join(__dirname, 'public')));


 
//routes
app.use('/', require('./routes/index'));
app.use('/magazine', require('./routes/magazine'));
app.use('/contactus', require('./routes/contactus'));
app.use('/users', require('./routes/users'));
app.use('/business', require('./routes/business'));
app.use('/art', require('./routes/art'));
app.use('/allnews', require('./routes/allnews'));
app.use('/sports', require('./routes/sports'));
app.use('/travel', require('./routes/travel'));
app.use('/login', require('./routes/login')); 
app.use('/auth', require('./routes/auth'))
app.use('/news', require('./routes/news'))
app.use('/youtube', require('./routes/youtube'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
