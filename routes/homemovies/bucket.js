var express = require('express');
var router = express.Router();
var url = require('url');


router.get('/', function(req, res, next) {
    var movies = require ('../../JSON/movies/bucket.json');
    var fs = require('fs');
    fs.readFile('./JSON/movies/bucket.json' , function (err,data) {
        if (err) {
            return next(err);
        }
        res.render('homemovies/bucket', {movies:JSON.parse(data)});
    });
});

module.exports = router;





