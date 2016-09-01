'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Image = mongoose.model('Image');
// var Promise = require('bluebird');
module.exports = router;


router.post('/', function(req, res, next) {
    Image.create(req.body)
    .then(function(image) {
        console.log("Image in images post route", image)
        res.send(image)
    })
    .catch(next)
});

router.get('/:userId', function(req, res, next) {
    Image.find({user: req.params.userId})
    .then(function(images){
        res.status(200).send(images)
    })
    .catch(next)
});
