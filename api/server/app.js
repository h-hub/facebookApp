/**
 * Created by harsha.kj89@gmail.com on 7/28/2016.
 */
var express = require('express');
var pkg = require('./package.json');
var Framework = require('framework');
var Http = Framework.HttpSelector;
var Config = Framework.Config;
var Logger = Framework.Logger;

var prevValues = [];
var newValues = [];

var api = express();
var stocks = [];

setInterval(function(){
    stocks = [{
            id : '1',
            code : 'amz',
            name : 'Amazon',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice :"",
            change : ""
        },
        {
            id : '2',
            code : 'fb',
            name : 'Facebook',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:"",
            change : ""
        },
        {
            id : '3',
            code : 'yh',
            name : 'Yahoo',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:"",
            change : ""
        },
        {
            id : '4',
            code : 'hp',
            name : 'HP',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:"",
            change : ""
        },
        {
            id : '5',
            code : 'ik',
            name : 'Ikea',
            price : Math.floor((Math.random() * 500) + 50),
            prevPrice:"",
            change : ""
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

function calculateChange(){
    prevValues = newValues.slice();
    newValues = stocks.slice();

    if(prevValues.length !== 0){
        for(var key in newValues)
        {
            newValues[key].prevPrice = prevValues[key].price;
            newValues[key].change = (((newValues[key].price - newValues[key].prevPrice)/newValues[key].price) * 100).toFixed(1) + "%";
        }
    }

    return newValues;
};

function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};

api.get('/', function(req, res, next){
    res.send('api server is working fine');
});

api.get('/getStocks', function(req, res) {
    res.send(stocks);
});

api.get('/getPrevStocks', function(req, res) {
    res.send(prevValues);
});

api.locals.regSocket = function(io){
    io.on('connection', function (socket) {
        setInterval(function () {
            interval(function(){
                socket.emit("stockDetails", calculateChange());
            }, 20000, 5);
        }, 160000);
    });
};

api.locals.attributes = {
    name: plugin.name,
    version: plugin.version,
    prefix: plugin.prefix
};

module.exports = api;