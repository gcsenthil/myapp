var express = require('express');
var path = require('path');
var router = express.Router();
var base_path = __basedir

router.get('/:category/:id', function(req, res, next) {   
    try {       
    var newsdata= require(base_path +'/data/news.json')    
    var selectednews;
    var newsid=req.params.id
    var cat=req.params.category
    selectednews=newsdata.news[cat];
    
   
   if(selectednews!=null && selectednews.length>0){

    selectednews=selectednews.filter(it => it.id === newsid);     
    if(selectednews!=null && selectednews.length>0){
    
    res.render('news',{pageTitleDesc:selectednews[0].title,
      pageTitle:"News",      
      metaDesc:selectednews[0].description,
      title:selectednews[0].title,
      category:cat,
      data:selectednews[0]});
    }
    else{
    res.render('404',{title:"No item found!!"});
    }
  }
  else{
    res.render('404',{title:"No item found!!"});
    }

  }
    catch (e) {      
        console.log(e);      
      }
   
 });


module.exports = router;
