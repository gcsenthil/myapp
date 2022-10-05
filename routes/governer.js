var express = require('express');
var base_path = __basedir
var router = express.Router();
var gdata= require(base_path +'/data/governer.json')  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('governer',{title:"Our Governer",data:gdata});
});

module.exports = router;
