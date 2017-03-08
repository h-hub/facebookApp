/**
 * Created by UJAYAH1 on 7/30/2016.
 */
var app = angular.module('home', ['ngRoute', 'home.modules-all', 'home.templates']);

app.config(['facebookProvider', '$routeProvider', function (facebookProvider, $routeProvider) {
    $routeProvider
        .when('/hometab', {
            templateUrl: 'home/home-container.html'
        })
        .when('/stock/:id', {
            templateUrl: 'details/details.html'
        })
        .when('/buy', {
            templateUrl: 'pages/buy.html'
        })
        .when('/about', {
            templateUrl: 'pages/about.html'
        })
        .otherwise({
            redirectTo: '/hometab'
        });

    if (!facebookProvider.initialized) {
        facebookProvider.init();
    }
}]);

app.run(['$rootScope', 'facebook', function ($rootScope, facebook) {
    $rootScope.$on('fb.auth.authResponseChange', function (event, response) {
        if (response.status == 'connected') {
            facebook.api('me').then(function (result) {
                $rootScope.userInfo = result;
            });
        } else {
            $rootScope.userInfo = null;
        }
    });
}]);

app.controller('SessionController', function ($scope) {
    $scope.home = "home of the application";
});

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