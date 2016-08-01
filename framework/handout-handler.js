module.exports = (function(){
    var Path = require('path');
    var Fs = require('fs');
    var Config = require('./config');
    
    var handoutFileCache = [];
    var requestedFile = 'registration-instruction.pdf';
    
    function Handler(options){
        this.handoutBasePath = options.handoutBasePath;
    }    
    
    Handler.prototype.handoutFileHandler = function(request, reply){
        var courseId = decodeURIComponent(request.params.courseId);
        var file = encodeURIComponent(request.params.file);
        if(requestedFile !== file){
            replyFileNotFound(reply);
            return;
        }

        var filePath = Path.join(this.handoutBasePath, '/student-registration-handout-' + courseId);   
        
        if(handoutFileCache.indexOf(filePath) > -1){
            sendFile(reply, filePath);
        }else{
            Fs.stat(filePath, function(error){
                if(!error){
                    handoutFileCache.push(filePath);
                    sendFile(reply, filePath);
                }else{
                    replyFileNotFound(reply);
                }
            });
        }
    };
    
    function replyFileNotFound(reply){
        reply('HTTP 404 : File not found.').code(404);
    }
    
    function sendFile(reply, path){
        reply.file(path).type('application/pdf;');
    }
    
    return Handler;
    
})();