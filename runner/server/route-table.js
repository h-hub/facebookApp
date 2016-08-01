/**
 * Created by harsha on 7/28/2016.
 */
var Framework = require('framework');
var Config = Framework.Config;
var Logger = Framework.Logger;

module.exports = (function () {
    var server;

    function registerIndex(){
        server.get('/index', function(req, res, next){
            res.render('page');
        });
    }

    function registerStatusCheck(){
        server.get('/status', function(req, res, next){
            res.send('server is working fine');
        });
    }

    function registerInstrumentation() {

    }

    function registerErrorLog() {

    }

    function registerAuthentication(){

    }

    function registerStaticFileHandlers() {
        var assetsConfig = {
            basePath: __dirname,
            version: Config.package.version
        };

        var AssetsHandler = new Framework.StaticFileHandler(assetsConfig);

        //server.route({
        //    method: "GET",
        //    path: "/static/{version}/{folder}/{file}",
        //    handler: function (request, reply) {
        //        AssetsHandler.staticFileHandler.call(AssetsHandler, request, reply);
        //    }
        //});
        //
        //server.route({
        //    method: "GET",
        //    path: "/shared/static/{version}/{path*}",
        //    handler: function (request, reply) {
        //        AssetsHandler.sharedFileHandler.call(AssetsHandler, request, reply);
        //    }
        //});

        server.use('/static/:version/:folder/:file', function (req, res) {
            AssetsHandler.staticFileHandler.call(AssetsHandler, req, res);
        });

        server.use('/vendor/:components/:version/:path*', function (req, res) {
            AssetsHandler.vendorFileHandler.call(AssetsHandler, req, res);
        });
    }

    function register(expressApp){
        server = expressApp;

        if (!server) {
            throw('Server not provided');
        }

        registerIndex();
        registerStatusCheck();
        registerInstrumentation();
        registerErrorLog();
        registerAuthentication();
        registerStaticFileHandlers();
    }

    return {
        registerAllRoutes: register
    };

})();