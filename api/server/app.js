/**
 * Created by harsha.kj89@gmail.com on 7/28/2016.
 */
var express = require('express');
var pkg = require('./package.json');
var Framework = require('framework');
var Http = Framework.HttpSelector;
var Config = Framework.Config;
var Logger = Framework.Logger;
var mongo = require('mongodb').MongoClient;
var fs = fs = require('fs');
var route = express.Router();
var bodyParser = require('body-parser');
var mongoUtil = require('./mongoUtil');
var database;

var api = express();
var stocks = [
    {
        id: '1',
        code: 'amz',
        name: 'Amazon',
        price: Math.floor((Math.random() * 500) + 50),
        prevPrice: "",
        change: ""
    },
    {
        id: '2',
        code: 'fb',
        name: 'Facebook',
        price: Math.floor((Math.random() * 500) + 50),
        prevPrice: "",
        change: ""
    },
    {
        id: '3',
        code: 'yh',
        name: 'Yahoo',
        price: Math.floor((Math.random() * 500) + 50),
        prevPrice: "",
        change: ""
    },
    {
        id: '4',
        code: 'hp',
        name: 'HP',
        price: Math.floor((Math.random() * 500) + 50),
        prevPrice: "",
        change: ""
    },
    {
        id: '5',
        code: 'ik',
        name: 'Ikea',
        price: Math.floor((Math.random() * 500) + 50),
        prevPrice: "",
        change: ""
    }
];


var plugin = (function () {
    var apps = Config.plugins.apps || [];

    for (var i = 0; i < apps.length; i++) {
        if (apps[i].name === pkg.plugin) {
            return apps[i];
        }
    }

    throw 'Unable to find configurations for stickerApi module';
})();

api.use(bodyParser.urlencoded());

api.use('/', require('./routes'));

api.get('/', function(req, res){
    res.send('api is up and running');
});

api.locals.initMongo = function(){
    mongoUtil.connectToServer( function( err ) {
        // start the rest of your app here
        if(!err){
            console.log('connected to DB');
        }else{
            console.log('could not connect to DB');
            process.exit(1);
        }
    });
};

api.locals.attributes = {
    name: plugin.name,
    version: plugin.version,
    prefix: plugin.prefix
};

module.exports = api;