/**
 * Created by UJAYAH1 on 7/31/2016.
 */

'use strict';
var app = angular.module('login',['login.templates','login-modules']);

app.directive('login',function($templateCache){
    return {
        restrict: 'E',
        template: $templateCache.get('login/login.html'),
        controller: function ($rootScope, $scope,$window,loginService,MessageLogger) {

            $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;


            $scope.submit = function(){
                var email = $scope.user.email;
                var password = $scope.user.password;
                var credentials = { username: email ,password: password };
                loginService.validate(credentials,function(isvalid){
                    if(isvalid){
                        $scope.redirectHome(credentials);
                    }else{
                        $scope.message = "Invalid Username or password.";
                    }
                },function(error){

                    MessageLogger.logError({
                        class: 'loginController',
                        method: 'submit',
                        message: {
                            payload: {
                                credentials: credentials
                            },
                            stacktrace: error,
                            status: 'fail'
                        }
                    });

                    $scope.message = "Unable to fetch data. Try Again.";
                });
            };

            $scope.redirectHome = function(credentials){
                loginService.sendHome(credentials,function(isvalid){
                    if(isvalid){
                        $window.location.href = '/home';
                    }else{
                        $scope.message = "AInvalid Username or password.";
                    }
                },function(error){

                    MessageLogger.logError({
                        class: 'loginController',
                        method: 'submit',
                        message: {
                            payload: {
                                credentials: credentials
                            },
                            stacktrace: error,
                            status: 'fail'
                        }
                    });

                    $scope.message = "Unable to fetch data. Try Again.";
                });
            };
        }
    };
});
