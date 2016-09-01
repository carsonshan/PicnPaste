'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
    name: {
        type: String
    }
});

mongoose.model('Image', schema);
