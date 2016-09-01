"use strict";
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

module.exports = function (app) {

    var root = app.getValue('projectRoot');

    var npmPath = path.join(root, './node_modules');
    var publicPath = path.join(root, './public');
    var browserPath = path.join(root, './browser');
    // FCM: Added to statically serve js folder with serviceWorkers script
    var jsPath = path.join(root, './server/app/js')

    // if(path.extname(jsPath + 'serviceWorkers.js') == '.js'){
    //   res.setHeader('content-type', 'application/javascript');
    // }

    app.use(favicon(app.getValue('faviconPath')));
    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));
    app.use(express.static(jsPath));

};
