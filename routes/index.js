var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var newsdata= require(__dirname +'/data/news.json')   
  res.render('home',{title:"Home Page",allnews:newsdata.news.all,
  latestnews:newsdata.news.latest,flashnews:newsdata.news.flash});
});

module.exports = router;
