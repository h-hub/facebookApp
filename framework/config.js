module.exports = (function () {
    var extend = require('extend');
    var environment,baseConfig,envConfig;

    //set default environment to development
    environment = 'local';

    //accept only supporting environments
    if(['local','dev','cert','staging','production'].indexOf(process.env.NODE_ENV) > -1){
        environment = process.env.NODE_ENV;
    }

    baseConfig = require('../config/config.json');
    envConfig = require('../config/' + environment + '/config.json');

    //merge two config together and extend baseConfig;
    extend(true,baseConfig,envConfig);

    //TODO:add comment
    baseConfig.server.hostUrl = baseConfig.server.protocol + '://' + baseConfig.server.hostUrl;
    baseConfig.portalApi.hostUrl = baseConfig.portalApi.protocol + '://' + baseConfig.portalApi.hostUrl;

    if(baseConfig.portalApi.hostUrl.substring(baseConfig.portalApi.hostUrl.length - 1) !== '/'){
        baseConfig.portalApi.hostUrl += '/';
    }

    return baseConfig;
})();