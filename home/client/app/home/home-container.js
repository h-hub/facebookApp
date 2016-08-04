/**
 * Created by harsha.kj89@gmail.com on 7/30/2016.
 */

angular.module('home.container').controller('homeController',function($scope,$templateCache,stockService,$interval,socket){

    $scope.stocks = [];
    $scope.data = [];
    $scope.orderByString = "change";
    $scope.btnClass = "glyphicon glyphicon-sort-by-attributes-alt";

    $scope.getStocks = function(){
        stockService.getStocks(function(stocks){
            $scope.stocks = stocks;
        },function(error){
            $scope.message = "Unable to fetch data.";
        });
    };

    $scope.toggleOrder = function() {
        if($scope.orderByString==='change'){
            $scope.orderByString = "-change";
            $scope.btnClass = "glyphicon glyphicon-sort-by-attributes-alt";
        }else{
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
