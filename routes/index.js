var express = require('express');
var router = express.Router();
var base_path = __basedir



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(base_path)
  var latestnews=[];
  var newsdata= require(base_path +'/data/news.json')  

  if(newsdata.news.tripura.length>0){  
   news= newsdata.news.tripura.slice(0,1)[0] 
   news.newsCategory="tripura"
    latestnews.push(news);   
  }
    if(newsdata.news.international.length>0){
      news= newsdata.news.international.slice(0,1)[0] 
      news.newsCategory="international"
       latestnews.push(news);     
  }
    if(newsdata.news.politics.length>0){
      news= newsdata.news.politics.slice(0,1)[0] 
      news.newsCategory="politics"
       latestnews.push(news);        
    } 
 

   
  res.render('home',{
  pageTitleDesc:"Northeast India's premier news, views website.",
  pageTitle:"Home",
  metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
  allnews:newsdata.news.all,
  latestnews:latestnews.slice(0,3),
  tripuranews:newsdata.news.tripura.slice(0,3),
  global:newsdata.news.global.slice(0,1),
  national:newsdata.news.national.slice(0,3),
  politics:newsdata.news.politics.slice(0,3),
  sports:newsdata.news.sports.slice(0,3),
  international:newsdata.news.international.slice(0,3),
  region:newsdata.news.region.slice(0,3),
  tourism:newsdata.news.tourism.slice(0,3),
  health:newsdata.news.health.slice(0,1),
  healthdesc:newsdata.news.health.slice(1,5),
  entertainment:newsdata.news.entertainment.slice(0,3),
  imggallery:newsdata.news.imagegallery.slice(0,10)
  });
});

module.exports = router;
