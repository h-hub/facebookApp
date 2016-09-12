/**
 * Created by harsha.kj89@gmail.com on 7/30/2016.
 */

angular.module('home.container').controller('homeController',function($scope,$templateCache,stockService,$interval,socket,MessageLogger,Session){

    $scope.stocks = [];
    $scope.data = [];
    $scope.orderByString = "change";
    $scope.btnClass = "glyphicon glyphicon-sort-by-attributes-alt";

    $scope.getStocks = function(){
        stockService.getStocks(function(stocks){
            $scope.stocks = stocks;
        },function(error){

            MessageLogger.logError({
                class: 'homeContainer',
                method: 'getStocks',
                message: {
                    payload: {
                        credentials: Session.getKey
                    },
                    stacktrace: error,
                    status: 'fail'
                }
            });

            $scope.message = "Unable to fetch data. Disconnected from the service.";
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
