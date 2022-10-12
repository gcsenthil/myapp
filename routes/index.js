var express = require('express');
var router = express.Router();
var base_path = __basedir

/* GET home page. */
router.get('/', function(req, res, next) {
  var newsdata= require(base_path +'/data/news.json')   
  res.render('home',{
  pageTitleDesc:"Northeast India's premier news, views website.",
  pageTitle:"Home",
  metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
  allnews:newsdata.news.all,
  latestnews:newsdata.news.latest,
  flashnews:newsdata.news.flash,
  global:newsdata.news.global});
});

module.exports = router;
