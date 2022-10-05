var express = require('express');
var base_path = __basedir
var router = express.Router();
var gdata= require(base_path +'/data/chiefminister.json')  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('chiefminister',{title:"Our ChiefMinister",data:gdata});
});

module.exports = router;
