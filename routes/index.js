var express = require('express');
var router = express.Router();
var base_path = __basedir

/* GET home page. */
router.get('/', function(req, res, next) {
  var newsdata= require(base_path +'/data/news.json')   
  res.render('home',{title:"Home Page",allnews:newsdata.news.all,
  latestnews:newsdata.news.latest,flashnews:newsdata.news.flash});
});

module.exports = router;
