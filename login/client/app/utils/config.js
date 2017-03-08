'use strict';

angular.module('login.utils').service('Config', function () {
    var config = function() {
        return serviceVars;
    };

    this.get = function() {
        return config();
    };
});
