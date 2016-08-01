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

var intermediateStocks = [];
var prevStocks = [];
var firstTime = true;

var first = [];
var second = [];

var api = express();
var stocks = [];
setInterval(function(){
    stocks = [{
        id : '1',
        code : 'amz',
        name : 'Amazon',
        price : Math.floor((Math.random() * 500) + 50),
        prevPrice :""
    },
        {
            id : '2',
            code : 'fb',
            name : 'Facebook',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:""
        },
        {
            id : '3',
            code : 'yh',
            name : 'Yahoo',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:""
        },
        {
            id : '4',
            code : 'hp',
            name : 'HP',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:""
        },
        {
            id : '5',
            code : 'ik',
            name : 'Ikea',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:""
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
    first = second.slice();
    second = stocks.slice();
    if(first.length !== 0){
        for(var key in stocks)
        {
            stocks[key].prevPrice = first[key].price;
        }
    }
    res.send(stocks);
});

api.get('/getPrevStocks', function(req, res) {
    res.send(first);
});

api.locals.attributes = {
    name: plugin.name,
    version: plugin.version,
    prefix: plugin.prefix
};
module.exports = api;