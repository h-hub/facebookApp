/**
 * Created by harsha on 7/28/2016.
 */
var Framework = require('framework');
var Config = Framework.Config;
var Logger = Framework.Logger;

module.exports = (function () {
    var server;

    function registerIndex(){
        server.get('/index', function(req, res){
            res.render('page');
        });
    }

    function registerStatusCheck(){
        server.get('/status', function(req, res, next){
            res.send('server is working fine');
        });
    }

    function registerInstrumentation() {

        server.post('/log/instrumentation', function(req, res){
                try{
                    if (req.payload) {
                        var info = req.payload;

                        Logger.info({
                            req: req,
                            body: info
                        });
                    }
                }catch(exception){
                    console.log('Error saving instrumentation', exception);
                }

                res.send({
                    "code" : 200,
                    "status" : "success",
                    "data" : null
                }).type('application/json;');
        });
    }

    function registerErrorLog() {

        server.post('/log/error', function(req, res){
            try{
                if (req.payload) {
                    var info = req.payload;

                    Logger.info({
                        req: req,
                        body: info
                    });
                }
            }catch(exception){
                console.log('Error saving error', exception);
            }

            res.set({
                "code" : 200,
                "status" : "success",
                "data" : null
            });
        });
    };

    function registerAuthentication(){

    };

    function registerStaticFileHandlers() {
        var assetsConfig = {
            basePath: __dirname,
            version: Config.package.version
        };

        var AssetsHandler = new Framework.StaticFileHandler(assetsConfig);

        server.use('/static/:version/:folder/:file', function (req, res) {
            AssetsHandler.staticFileHandler.call(AssetsHandler, req, res);
        });

        server.use('/vendor/:components/:version/:path*', function (req, res) {
            AssetsHandler.vendorFileHandler.call(AssetsHandler, req, res);
        });
    };

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
    };

    return {
        registerAllRoutes: register
    };

})();