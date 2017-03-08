'use strict';

(function (module) {
    module.service('MessageLogger', function ($cookies, $http) {

        this.logError = function (exception) {
            try {
                angular.extend(exception, {
                    logtype: 'error',
                    userId: $cookies.get('key'),
                    logtime: new Date(),
                    workflow: 'navigation'
                });

                return $http.post('/log/error', exception);
            } catch (e) {
                return;
            }
        };

        this.logInstrumentation = function (info) {
            try {
                angular.extend(info, {
                    logtype: 'info',
                    userId: $cookies.get('key'),
                    logtime: new Date(),
                    workflow: 'navigation'
                });

                return $http.post('/log/instrumentation', info);
            } catch (e) {
                return;
            }
        };
    });
})(angular.module('portal-shared.navigation.utils'));