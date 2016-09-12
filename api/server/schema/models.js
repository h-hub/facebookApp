/**
 * Created by harsha.kj89@gmail.com on 8/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var Stock = new Schema({
        code: String,
        name : String
    });

    var models = {
        Stocks : mongoose.model('Stocks', Stock)
    };

    return models;

}