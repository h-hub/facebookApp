/**
 * Created by UJAYAH1 on 7/31/2016.
 */

'use strict';
var app = angular.module('login',['login.templates','login-modules']);

app.directive('login',function($templateCache){
    return {
        restrict: 'E',
        template: $templateCache.get('login/login.html'),
        controller: function ($rootScope, $scope,$window,loginService) {
            $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.submit = function(){
                var credentials = { username: $scope.user.email ,password:$scope.user.password};
                loginService.validate(credentials,function(isvalid){
                    if(isvalid){
                        $window.location.href = '/home';
                    }else{
                        $window.location.href = '/login';
                    }
                },function(error){
                    console.log(error);
                    $scope.message = "unable to fetch";
                });
            };

            $scope.redirectHome = function(){
                var credentials = { username: $scope.user.email ,password:$scope.user.password};
                loginService.sendHome(credentials,function(isvalid){
                    if(isvalid){
                        $window.location.href = '/home';
                    }else{
                        $window.location.href = '/login';
                    }
                },function(error){
                    console.log(error);
                    $scope.message = "unable to fetch";
                });
            };
        }
    };
});
