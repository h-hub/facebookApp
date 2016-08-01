/**
 * Created by UJAYAH1 on 7/28/2016.
 */
var express = require('express');

var path = require('path');
var urlParser = require('url');
var pkg = require('./package.json');
var querystring = require('querystring');
var Framework = require('framework');
var Http = Framework.HttpSelector;
var Config = Framework.Config;
var Logger = Framework.Logger;


var api = express();
var stocks = [];
setInterval(function(){
    /// call your function here
    console.log("seconds");
    stocks = [{
        id : '1',
        code : 'amz',
        name : 'Amazon',
        price : Math.floor((Math.random() * 500) + 50)
    },
        {
            id : '2',
            code : 'fb',
            name : 'Facebook',
            price : Math.floor((Math.random() * 500) + 50)
        },
        {
            id : '3',
            code : 'yh',
            name : 'Yahoo',
            price : Math.floor((Math.random() * 500) + 50)
        },
        {
            id : '4',
            code : 'hp',
            name : 'HP',
            price : Math.floor((Math.random() * 500) + 50)
        },
        {
            id : '5',
            code : 'ik',
            name : 'Ikea',
            price : Math.floor((Math.random() * 500) + 50)
        }];
}, 1000);

var plugin = (function () {
    var apps = Config.plugins.apps || [];

    for (var i = 0; i < apps.length; i++) {
        if (apps[i].name === pkg.plugin) {
            return apps[i];
        }
    }

    throw 'Unable to find configurations for api module';

})();

api.get('/', function(req, res, next){
    res.send('api server is working fine');
});

api.get('/getStocks', function(req, res) {
    res.send(stocks);
});

api.get('/getPrevStocks', function(req, res) {
    var prevStocks = stocks.slice();
    res.send(stocks);
});

api.locals.attributes = {
    name: plugin.name,
    version: plugin.version,
    prefix: plugin.prefix
};
console.log(plugin.prefix+"------");
module.exports = api;