/**
 * Created by UJAYAH1 on 7/29/2016.
 */
(function(){
    /*
     accept node arguments
     param : -env (local | development | cert | staging | production)
     default : development
     ex : node app -env=production
     */
    process.argv.forEach(function (val, index, array) {
        if(val){
            switch(val){
                case '-env=local':
                case '-env=dev':
                case '-env=cert':
                case '-env=staging':
                case '-env=production':
                    process.env.NODE_ENV = val.substring(val.indexOf('=') + 1, val.length);
                    break;
            }
        }
    });

    var maxSockets = require('./config').server.maxSockets;
    if(maxSockets){
        require('./http-selector').globalAgent.maxSockets = maxSockets;
    }

    module.exports = {
        Config : require('./config'),
        Logger : require('./logger'),
        StaticFileHandler : require('./assets-handler'),
        HttpSelector : require('./http-selector'),
        HandoutFileHandler : require('./handout-handler'),
        db : require('./getdb')
    };

})();
