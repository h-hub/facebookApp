/**
 * Created by harsha.kj89@gmail.com on 7/31/2016.
 */
'use strict';

angular.module('home.stock-service').service('stockService', function(http){

    //get the stocks
    this.getStocks = function (success, error) {
        var requestConfig = {
            url: "/stickerApi/getStocks"
        };
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