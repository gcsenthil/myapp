var express = require('express');
var path = require('path');
var router = express.Router();
var base_path = __basedir

router.get('/', function(req, res, next) {   
    try {       
    var newsdata= require(base_path +'/data/news.json')    
    var selectednews;
    for(i=0;i<newsdata.news.all.length;i++){   
      console.log(newsdata.news.all[i].id + " ="+req.query.id) 
      if(newsdata.news.all[i].id==req.query.id){
       selectednews=newsdata.news.all[i];
          break;
      }
    }

    if(selectednews!=null)
    res.render('news',{pageTitleDesc:selectednews.title,
      pageTitle:"News",      
      metaDesc:selectednews.description,
      title:selectednews.title,
      data:selectednews});
      else
    res.render('404',{title:"No item found!!"});
  
  }
    catch (e) {      
        console.log(e);      
      }
   
 });


module.exports = router;
