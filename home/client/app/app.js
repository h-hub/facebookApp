/**
 * Created by UJAYAH1 on 7/30/2016.
 */
var app  = angular.module('home', ['ngRoute','home.modules-all','home.templates']);

app.config(function ($routeProvider) {
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
});

app.run(function (Session) {

    if (!Session.isAuthenticated()) {
        Session.redirectToLogin();
    }
});

app.controller('SessionController',function($scope){
    $scope.home = "home of the application";
});