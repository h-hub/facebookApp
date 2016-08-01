/**
 * Created by UJAYAH1 on 7/31/2016.
 */
'use strict';

angular.module('home.stock-service').service('stockService', function(http){




    //see my list in course Id search
    this.getStocks = function (success, error) {
        var requestConfig = {
            url: "/api/getStocks"
        }
        http.get(requestConfig).then(function (response) {
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