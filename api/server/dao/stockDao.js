/**
 * Created by harsha.kj89@gmail.com on 8/9/2016.
 */
var mongoose = require('mongoose');
var mongoUtil = require('../mongoUtil');
var db = mongoUtil.getDb();
var Schema = mongoose.Schema;
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);
var Q = require('q');
var deferred = Q.defer();
var models = require('../schema/models')(mongoose);


var stockDao = {

    push : function(stockObj){
        
        var stock = new models.Stocks(stockObj);

        stock.saveAsync()
        .then(function() {
            deferred.resolve(true);
        })
        .catch(function(err) {
            deferred.reject(false);
        })

        return deferred.promise;
    },

    getAll : function(){

        models.Stocks.findAsync()
        .then(function(stocks) {
            deferred.resolve(JSON.stringify(stocks));
        })
        .catch(function(err) {
            deferred.reject(false);
        })

        return deferred.promise;
    }
};

module.exports = stockDao;