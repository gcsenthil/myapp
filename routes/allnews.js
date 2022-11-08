var express = require('express');
var router = express.Router();
var base_path = __basedir

/* GET users listing. */
router.get('/:category', function(req, res, next) {
  console.log("allnews");
  var newsdata= require(base_path +'/data/news.json')   
  var cat=req.params.category;
  var selectedNews=[];
  selectedNews=newsdata.news[cat];

  if(selectedNews!=null && selectedNews.length>0)
  {
    res.render('allnews',{
      pageTitleDesc:"All Northeast India's premier news, views",
      pageTitle:cat.toLowerCase() +" News",
      metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
      title:cat.toUpperCase() +" NEWS",
      category:cat.toLowerCase(),
      allnews:selectedNews,
      latestnews:[]});
  }
  else
  res.render('404',{title:"No item found!!"});
});


module.exports = router;
