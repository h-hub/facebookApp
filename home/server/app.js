/**
 * Created by UJAYAH1 on 7/28/2016.
 * home app.js
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
var db  = Framework.db;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var homeApp = express();

var plugin = (function () {
    var apps = Config.plugins.apps || [];

    for (var i = 0; i < apps.length; i++) {
        if (apps[i].name === pkg.plugin) {
            return apps[i];
        }
    }

    throw 'Unable to find configurations for home module';

})();

var assetsConfig = {
    basePath: __dirname,
    version: Config.package.version
};

var AssetsHandler = new Framework.StaticFileHandler(assetsConfig);

function validateUser(credentials){
    var username = credentials.username;
    var password = credentials.password;

    var users = db.users;

    for(var key in users)
    {
        if(users[key].email === username && users[key].password === password) return true

    }
    return false;

};

homeApp.set('views', path.join(__dirname, 'views'));
homeApp.set('view engine', 'jade');
homeApp.use(cookieParser());
homeApp.use(bodyParser.urlencoded({ extended: false }));
homeApp.use(bodyParser.json());

homeApp.get('/', function(req, res, next){
    res.render('index',{
        package: {
            version: plugin.version
        },
        runner: {
            version: Config.package.version
        },
        facebook : {
            appId: Config.fb.appId,
            status: Config.fb.status, 
            cookie: Config.fb.cookie, 
            xfbml: Config.fb.xfbml,
            version: Config.fb.version
        }
    });
});

homeApp.post('/validate', function(req, res){
    if(validateUser(req.body)){
        res.send(true);
    }else{
        res.send(false);
    }
});

homeApp.use('/static/:version/:folder/:file', function (req, res) {
    AssetsHandler.staticFileHandler.call(AssetsHandler, req, res);
});

homeApp.locals.attributes = {
    name: plugin.name,
    version: plugin.version,
    prefix: plugin.prefix
};

module.exports = homeApp;