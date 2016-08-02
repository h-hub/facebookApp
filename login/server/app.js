/**
 * Created by harsha.kj89@gmail.com on 7/28/2016.
 */
var express = require('express');
var path = require('path');
var pkg = require('./package.json');
var Framework = require('framework');
var Http = Framework.HttpSelector;
var Config = Framework.Config;
var Logger = Framework.Logger;
var bodyParser = require('body-parser');
var db  = Framework.db;
var cookieParser = require('cookie-parser');

var loginApp = express();

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

//validate user with username and password
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

loginApp.set('views', path.join(__dirname, 'views'));
loginApp.set('view engine', 'jade');
loginApp.use(bodyParser.urlencoded({ extended: false }));
loginApp.use(bodyParser.json());
loginApp.use(cookieParser());

loginApp.get('/', function(req, res, next){
    res.render('index',{
        package: {
            version: plugin.version
        },
        runner: {
            version: Config.package.version
        }
    });
});

loginApp.post('/validate', function(req, res){
    res.cookie("key" , req.body.username).send(validateUser(req.body));
});

loginApp.use('/static/:version/:folder/:file', function (req, res) {
    AssetsHandler.staticFileHandler.call(AssetsHandler, req, res);
});

loginApp.locals.attributes = {
    name: plugin.name,
    version: plugin.version,
    prefix: plugin.prefix
};

module.exports = loginApp;