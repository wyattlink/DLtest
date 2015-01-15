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
  res.send("Not Authenticated");
}

module.exports = function(passport){

  //API get all download records
  router.get('/models', passport.authenticate('api_auth',{ session : false }), function(req, res) {
    models.download_record.findAll().then(function(err,downloadRecords){
      if (err)
        res.send(err);

      res.json(downloadRecords);
    });
  });

  //API get download records for certain model
  router.get('/models/:product_id', passport.authenticate('api_auth',{ session : false }), function(req, res) {
    models.download_record.findAll({
      where: {product_info_product_id: req.param('product_id')}
    }).success(function(err,downloadRecords){
                if (err)
                  res.send(err);

                  res.json(downloadRecords);
    });
  });


  return router;
}

//  module.exports = router;
