var Config = require('./config');
var isHttpsEnabled = Config.portalApi.protocol === "https";

module.exports = (function () {
    return isHttpsEnabled ? require('https') : require('http');
})();
