/**
 * Created by harsha.kj89@gmail.com on 7/27/2016.
 */
var express = require('express');
var path = require('path');
var PluginsRunner = require('./plugin-runner');
var RouteTable = require('./route-table');
var Framework = require('framework');
var Config = Framework.Config;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

function createServer(){
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use('/static', express.static('public'));
};

function startServer(){
    server.listen(3000, function () {
        console.log('app listening on port 3000!');
    });
};

function registerApi(){
    var pluginsFolderPath = Config.plugins.folderPath;
    var packgeJson = require(pluginsFolderPath + '/' + 'api' + '/package.json');
    var pth = pluginsFolderPath + '/' + packgeJson.plugin + '/app';
    var runner = require(pth);
    var attributes = runner.locals.attributes;
    runner.locals.regSocket(io);
    app.use(attributes.prefix, runner);

};



// init runner server
(function () {
    createServer();
    startServer();
    RouteTable.registerAllRoutes(app);
    PluginsRunner.load(app);
    registerApi();
})();