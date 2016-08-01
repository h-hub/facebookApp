/**
 * Created by UJAYAH1 on 7/29/2016.
 */
module.exports = (function(){
    var Path = require('path');
    var Fs = require('fs');
    var Config = require('./config');

    var staticFileCache = [];

    function Handler(options){
        this.basePath = options.basePath;
        this.assetsVersion = options.version;
    }

    Handler.prototype.staticFileHandler = function(request,reply){
        var folder = encodeURIComponent(request.params.folder);
        var version = encodeURIComponent(request.params.version);
        var file = encodeURIComponent(request.params.file);

        if(version !== this.assetsVersion){
            replyFileNotFound(reply);
            return;
        }

        var filePath = Path.join(this.basePath, 'public/assets/' + folder + '/' + file);
            Fs.stat(filePath,function(error){
                if(!error){
                    staticFileCache.push(filePath);
                    sendFile(reply,filePath);
                }else{
                    replyFileNotFound(reply);
                }
            });
    };

    Handler.prototype.vendorFileHandler = function(request, reply) {
        var file = (request.params[0]);
        var version = encodeURIComponent(request.params.version);
        var path = decodeURIComponent(request.params.path);

        if (version !== this.assetsVersion) {
            replyFileNotFound(reply);
            return;
        }

        var filePath = Path.join(this.basePath, 'public/bower_components/' + path + file);

            Fs.stat(filePath, function(error) {
                if (!error) {
                    //staticFileCache.push(filePath);
                    sendFile(reply, filePath);
                } else {
                    //replyFileNotFound(reply);
                    console.log('not found');
                }
            });
    };

    Handler.prototype.sharedFileHandler = function(request,reply){
        var version = encodeURIComponent(request.params.version);
        var path = decodeURIComponent(request.params.path);

        if(version !== this.assetsVersion){
            replyFileNotFound(reply);
            return;
        }

        var filePath = Path.join(this.basePath, 'public/shared/' + path);

        if(staticFileCache.indexOf(filePath) > -1){
            sendFile(reply,filePath);
        }else{
            Fs.stat(filePath,function(error){
                if(!error){
                    staticFileCache.push(filePath);
                    sendFile(reply,filePath);
                }else{
                    replyFileNotFound(reply);
                }
            });
        }
    };

    function replyFileNotFound(reply){
        //reply('HTTP 404 : File not found.').code(404);
        reply.send('File not found.');
    }

    function sendFile(reply,path){
            reply.sendFile(path);
    }

    return Handler;

})();