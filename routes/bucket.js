var express = require('express');
var router = express.Router();
var homejson = require('../JSON/mainpage.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('bucket', {});
});





module.exports = router;
