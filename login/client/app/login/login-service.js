/**
 * Created by UJAYAH1 on 7/31/2016.
 */
'use strict';

angular.module('login.login-service').service('loginService', function(http){

    //see my list in course Id search
    this.validate = function (credentials,success, error) {
        console.log("credentials--->");
        console.log(credentials);
        var requestConfig = {
            url: "/login/validate",
            payLoad : credentials
        }
        http.post(requestConfig,credentials).then(function (response) {
            success(response);
        }).catch(function (exception) {
            if (exception.code === 404) {
                success([]);
                return;
            }
            error(exception);
        });
    };

    //see my list in course Id search
    this.sendHome = function (credentials,success, error) {
        console.log("credentials--->");
        console.log(credentials);
        var requestConfig = {
            url: "/home/validate",
            payLoad : credentials
        }
        http.post(requestConfig,credentials).then(function (response) {
            success(response);
        }).catch(function (exception) {
            if (exception.code === 404) {
                success([]);
                return;
            }
            error(exception);
        });
    };

});