/**
 * Created by UJAYAH1 on 7/31/2016.
 */
angular.module('login.utils').service('http', function ($q, $http, $rootScope) {

    var httpRequest = function (url, method, payLoad, headers) {
        var deferred = $q.defer();

        var requestStart = new Date().getTime();

        headers = {'Content-Type': 'application/json' };

        $http({
            method: method,
            url: url,
            headers: headers,
            data: payLoad,
            timeout: 20000000
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status, headers, config) {
            var responseEnd = new Date().getTime() - requestStart;
            if (responseEnd >= config.timeout) {
                $rootScope.$broadcast('httpRequestTimeout');
            }

            var dataDefault = { status: 0, data: 'Service Timeout' };
            data = data || dataDefault;

            if (data.code === 401) {
                //checkSessionIsValid(function () {
                //    deferred.reject(data);
                //});

                return;
            }

            deferred.reject(data);
        });

        return deferred.promise;
    };

    this.get = function (requestConfig) {
        return httpRequest(requestConfig.url, 'GET', null);
    };
    this.post = function (requestConfig, payLoad) {
        return httpRequest(requestConfig.url, 'POST', requestConfig.payLoad);
    };
    this.delete = function (requestConfig) {
        return httpRequest(requestConfig.url, 'DELETE', null);
    };
    this.put = function (requestConfig, payLoad) {
        return httpRequest(requestConfig.url, 'PUT', requestConfig.payLoad);
    };
})
