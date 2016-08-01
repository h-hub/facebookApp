var Bunyan = require('bunyan');
var Config = require('./config');

module.exports  = (function(){
    var app = 'UI';
    var product = Config.logging.product;
    var ringbuffer = new Bunyan.RingBuffer({ limit: 100 });

    function reqSerializer(req) {
        return {
            method: req.method,
            url: req.headers.referer,
            headers: req.headers
        };
    }
    
     function bodySerializer(body) {
        var log = {
            systemlevel01: app, // Application name 
            systemlevel02: body.class, // Class name 
            systemlevel03: body.method, // Method 
            logtype: body.logtype,
            workflow: body.workflow,
            userId: body.userId,
            username: body.username,
            logtime: body.logtime,
            status: body.status,
            product: body.product
        };

        if(body.logtype === 'info'){
            log.message = body.message;
        }else if(body.logtype === 'error'){
            log.stacktrace = body.message;
        }

        return log;
    }

    return Bunyan.createLogger({
        name: Config.logging.application,
        src:true,
        streams: [
            {
                level: 'info',
                path: Config.logging.infoFile
            },
            {
                level: 'trace',
                type: 'raw',    // use 'raw' to get raw log record objects 
                stream: ringbuffer
            },
            {
                level: 'error',
                path: Config.logging.errorFile
            }
        ],
        serializers: {
            req: reqSerializer,
            body: bodySerializer
        }
    });
    
})();


