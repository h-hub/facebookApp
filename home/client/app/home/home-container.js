/**
 * Created by harsha.kj89@gmail.com on 7/30/2016.
 */
'use strict';
var app = angular.module('home.container', []);



app.factory('facebookService', function ($q) {
    return {
        getMyLastName: function () {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
        ,

        getPageFeed: function () {
            var deferred = $q.defer();
            FB.api('/techblogharsha/feed', function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

    }
});

app.controller('homeController', function ($rootScope,$scope, $templateCache, $window, stockService, $interval, socket, MessageLogger, Session, facebookService,facebook) {

    $scope.stocks = [];
    $scope.data = [];
    $scope.orderByString = "change";
    $scope.btnClass = "glyphicon glyphicon-sort-by-attributes-alt";

    $scope.getFeed = function () {
        facebookService.getPageFeed()
            .then(function (response) {
                console.log(response);
            }
            );
    }

    $scope.getStocks = function () {
        $rootScope.$on('fb.auth.authResponseChange', function (event, response) {
            if (response.status == 'connected') {
                facebook.api('techblogharsha/feed').then(function (result) {
                    $rootScope.userInfo2 = result;
                });
            } else {
                $rootScope.userInfo = null;
            }
        });

        stockService.getStocks(function (stocks) {
            $scope.stocks = stocks;
        }, function (error) {

            MessageLogger.logError({
                class: 'homeContainer',
                method: 'getStocks',
                message: {
                    payload: {
                        credentials: Session.getKey
                    },
                    stacktrace: error,
                    status: 'fail'
                }
            });

            $scope.message = "Unable to fetch data. Disconnected from the service.";
        });
    };

    $scope.toggleOrder = function () {
        if ($scope.orderByString === 'change') {
            $scope.orderByString = "-change";
            $scope.btnClass = "glyphicon glyphicon-sort-by-attributes-alt";
        } else {
            $scope.orderByString = "change";
            $scope.btnClass = "glyphicon glyphicon-sort-by-attributes";
        }
    };

    socket.on('stockDetails', function (data) {
        $scope.$apply(function () {
            $scope.stocks = data;
        });
    });

});
