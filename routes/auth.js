var express = require('express');
var router = express.Router();


router.post('/', function(request, response) {	
	console.log("auth js****");
	let username = request.body.username;
	let password = request.body.password;
    console.log(username);
	response.redirect('/');		
});

module.exports = router;
