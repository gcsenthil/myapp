var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('ministers',{
    pageTitleDesc:"Ministers",
    pageTitle:"Ministers",
    metaDesc:"Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.",
    title:"Our Minsters"
  });
});

module.exports = router;
