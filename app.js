var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var cssdirect = express.static(__dirname + '/public/stylesheets/');
var jsdirect = express.static(__dirname + '/public/javascripts/');
var jsondirect = express.static(__dirname + 'JSON');
var imagedirect = express.static(__dirname + "/public/images/");
var homemovies = require('./routes/homemovies/1st');
var about = require('./routes/about');
var bucket = require('./routes/bucket');
var bucketmovies = require('./routes/homemovies/bucket');

var app = express();



app.locals.navcoll = require(path.resolve(__dirname,'JSON/navigationbar.json'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css' , cssdirect);
app.use('/js' ,  jsdirect);
app.use('/json' , jsondirect);
app.use('/images' , imagedirect);

app.use('/', index);

app.use('/about', about);
app.use('/bucket' , bucket);

app.use('/movies/1st.html', homemovies);
app.use('/movies/2nd.html', homemovies);
app.use('/movies/3rd.html' , homemovies);
app.use('/movies/4th.html' , homemovies);
app.use('/movies/5th.html' , homemovies);

app.use('/movies/Oscar.html', homemovies);
app.use('/movies/animation.html' , homemovies);
app.use('/movies/comedy.html' , homemovies);
app.use('/movies/drama.html' , homemovies);
app.use('/movies/melodrama.html' , homemovies);
app.use('/movies/bucket.html' , bucketmovies);


app.use('/users', users);

app.post('/notes' , function (req , res) {
  var data = req.body;
  var wholemovies = require("./JSON/movies/wholemovies.json");
 console.log(data);

  var resmovies = [];
  for (var i = 0 ; i < wholemovies.length ; ++i){
      var movieid = wholemovies[i].id;
      for (var j = 0 ; j < data.length ; ++j) {
        var id = data[j];
        if (movieid == id) {
          resmovies.push(wholemovies[i]);
          break;
        }
      }
  }

  var fs = require('fs');
  fs.writeFile("./JSON/movies/bucket.json" , JSON.stringify(resmovies) , "utf8" , function () {});

  res.send({"data":"data"});

});


app.use(function (req , res, next) {
    if (req.method == 'POST') {
        var movies = require ('./JSON/movies/bucket.json');
        console.log("haha i know");
        res.render('./views/homemovies/bucket' , {movies:movies});
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
