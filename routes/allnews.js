var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("allnews");
  var newsdata= require(__dirname +'/data/news.json')   
  var cat=req.query.category;
  var selectedNews=[];
 

  for(i=0;i<newsdata.news.all.length;i++){
    console.log(newsdata.news.all[i].category);
    if(newsdata.news.all[i].category==cat)
      selectedNews.push(newsdata.news.all[i]);
  }
  
  res.render('allnews',{title:"allnews",category:cat,allnews:selectedNews,latestnews:newsdata.news.all.latest});
});

module.exports = router;
