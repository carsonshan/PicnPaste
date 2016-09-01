'use strict';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
// var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding', parameterLimit:5000000 })


module.exports = function (app) {

    // Important to have this before any session middleware
    // because what is a session without a cookie?
    // No session at all.
    app.use(cookieParser());

    // Parse our POST and PUT bodies.
    // app.use(bodyParser.json());
    app.use(bodyParser.json({limit: '50mb'}) );
    app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit:50000
    }));
    // app.use(bodyParser.urlencoded({ extended: true }));

};
