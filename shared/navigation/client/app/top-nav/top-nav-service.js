'use strict';

(function (module) {
    module.service('Navigation', function ($http, $cookies) {

        var navigationConfigs = null;

        //set the navigation related configurations from the framework config
        function setNavigationConfigs() {
            navigationConfigs = sharedServiceVars;
        }

        this.getServiceVars = function () {
            return typeof manageCourse !== 'undefined' ? manageCourse : typeof serviceVars !== 'undefined' ? serviceVars : '';
        };

        //return the configs to the directives
        this.navigationConfigs = function () {
            if (!navigationConfigs) {
                setNavigationConfigs();
            }
            return navigationConfigs;
        };

        this.updateWhatsNewStatus = function (payload, successFn, errorFn) {
            var portalApiUrl = navigationConfigs.portalApi.hostUrl + 'v2/userassistance?key=' + $cookies.get('key');
            var requestConfig = {
                method: 'POST',
                url: portalApiUrl,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data: {
                    doNotShow: payload.doNotShow
                }
            };

            $http(requestConfig).then(function (response) {
                successFn(response);
            }, function (exception) {
                errorFn(exception);
            });
        };

        setNavigationConfigs();
    });

})(angular.module('portal-shared.navigation-topnav'));