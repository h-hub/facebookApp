/**
 * Created by harsha.kj89@gmail.com on 7/31/2016.
 */

'use strict';
var app = angular.module('login', ['login.templates', 'login-modules']);


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
    }
});

app.controller('loginController', function ($rootScope, $scope, $window, loginService, MessageLogger, facebookService, Session, Config) {


    $window.fbAsyncInit = function () {
        FB.init({
            appId: Config.get().fb.appId,
            status: Config.get().fb.status,
            cookie: Config.get().fb.cookie,
            xfbml: Config.get().fb.xfbml,
            version: Config.get().fb.version
        });
    };

    $scope.loginPopup = function () {

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    };

    function statusChangeCallback(response) {
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            $window.location.href = '/home';
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            $scope.status = 'Please log into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            $scope.status = 'Please log into Facebook.';
            // the user isn't logged in to Facebook.
            FB.login(function (response) {
                // Handle the response object, like in statusChangeCallback() in our demo
                // code.
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        $window.location.href = '/home';
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }
    }

});