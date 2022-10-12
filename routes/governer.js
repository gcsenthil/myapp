var express = require('express');
var base_path = __basedir
var router = express.Router();
var gdata= require(base_path +'/data/governer.json')  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('governer',{
    pageTitleDesc:"Governer",
    pageTitle:"Our Governer",
    metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
    title:"Our Governer",
    data:gdata});
});

module.exports = router;
