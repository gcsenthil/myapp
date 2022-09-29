var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {   
    try {       
  var videosdata= require(__basedir +'/data/youtube.json')  
 

  if(videosdata.videos[req.query.id]!=null)  {
  console.log(videosdata.videos[0]);
    res.render('youtube',{title:"youtube videos",
       data:videosdata.videos[req.query.id]});
  }
    else
    res.render('404',{title:"No Video found!!"});
    }
    catch (e) {      
        console.log(e);      
      }
   
 });


module.exports = router;
