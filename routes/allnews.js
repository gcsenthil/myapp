var express = require('express');
var router = express.Router();
var base_path = __basedir

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("allnews");
  var newsdata= require(base_path +'/data/news.json')   
  var cat=req.query.category;
  var selectedNews=[];
 

  for(i=0;i<newsdata.news.all.length;i++){
    console.log(newsdata.news.all[i].category);
    if(newsdata.news.all[i].category==cat)
      selectedNews.push(newsdata.news.all[i]);
  }
  
  res.render('allnews',{
    pageTitleDesc:"All Northeast India's premier news, views",
    pageTitle:"All News",
    metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
    title:"allnews",
    category:cat,allnews:selectedNews,latestnews:newsdata.news.all.latest});
});

module.exports = router;
