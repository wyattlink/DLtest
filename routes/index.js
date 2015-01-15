var models  = require('../models');
var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
console.log("@@@@@@@@@@@@@@ isAuthenticated Over");
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	
	router.get('/home', isAuthenticated, function(req, res) {
		models.product_info.findAll().then(function(products) {
			models.country_w.findAll().then(function(countries) {
				res.render('indexoc', {
				title: 'Download Site',
				products: products,
				countries: countries
				})});
		});
	});



	router.post('/download', isAuthenticated, function(req, res) {
		console.log("route_download req: " + " @product_info_product_id: " + req.param('productid') + " @user_name: " + req.param('useremail') + " @user_email: " + req.param('useremail') + " @user_gender: " + req.param('usergender') + " @user_company: " + req.param('usercompany') + " @country_t_country_id: " + req.param('Country'));
		//Create a download log and save it into database
		models.download_record.create({
	    //download_id:null,
			product_info_product_id: req.param('productid'),
			user_name: req.param('username'),
			user_email: req.param('useremail'),
			user_gender: req.param('usergender'),
			user_company: req.param('usercompany'),
			country_w_country_id: req.param('Country'),
		}).then(function() {
			models.product_info.find({
			where: {product_id: req.param('productid')}
			}).success(function(product){
				console.log("@@@@@ download path:" +  "..\\" +  product.file_url)
				//res.download("..\\" +  product.file_url);
				res.download("D:/work/FirtTest/DLpage/download/001.mov");		})
	    //res.redirect('/');
	  });
	}


	);



	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
/* GET home page. */



//module.exports = router;
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
*/
