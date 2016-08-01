/**
 * Created by UJAYAH1 on 7/27/2016.
 */
var express = require('express');
var path = require('path');
//
//var Framework = require('framework');
//var Config = Framework.Config;
var PluginsRunner = require('./plugin-runner');
var RouteTable = require('./route-table');

//var port = process.env.PORT | Config.server.port | 8080;
//// Create a server with a host and port
//var server = new Hapi.Server();


var app = express();

function createServer(){

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use('/static', express.static('public'));

}

function startServer(){
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
}

// init runner server
(function () {
    createServer();
    startServer();
    RouteTable.registerAllRoutes(app);
    PluginsRunner.load(app);
})();