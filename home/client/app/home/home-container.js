/**
 * Created by UJAYAH1 on 7/30/2016.
 */

angular.module('home.container').controller('homeController',function($scope,$templateCache,stockService,$interval){

    $scope.getStocks = function(){
        stockService.getStocks(function(stocks){
            console.log(stocks);
            $scope.stocks = stocks;
        },function(error){
            console.log(error);
            $scope.message = "unable to fetch";
        });
    };

    $interval(function() {
        $scope.fetchStocks();
    }, 60000);

    $scope.fetchStocks = function(){
        console.log('start');
        $interval(function() {
            $scope.getStocks();
        }, 10000,3);
    };

});
