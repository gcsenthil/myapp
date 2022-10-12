var express = require('express');
var base_path = __basedir
var router = express.Router();
var gdata= require(base_path +'/data/chiefminister.json')  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('chiefminister',
  {
    pageTitleDesc:"About Tripura ChiefMinister",
    pageTitle:"Our ChiefMinister ",
    metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
    title:"Our ChiefMinister",
    data:gdata
  });
});

module.exports = router;
