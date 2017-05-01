var express = require('express');
var router = express.Router();
var url = require('url');


router.get('/', function(req, res, next) {
    var movies = require ('../../JSON' + req.originalUrl.slice(0, -5) + '.json');
    var name = require('../../JSON/titlebar.json');
    res.render('homemovies/1st', {movies : movies , name : name[req.originalUrl]});
});


module.exports = router;





