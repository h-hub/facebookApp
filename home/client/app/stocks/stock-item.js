/**
 * Created by UJAYAH1 on 7/30/2016.
 */
/**
 * Created by harsha.kj89@gmail.com on 7/30/2016.
 */

angular.module('home.stock-item').directive('stockItem',function($templateCache){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            stock: '='
        },
        template: $templateCache.get('stocks/stock-item.html'),
        controller: function ($rootScope, $scope, $interval) {
            $scope.backgroundImg = ''

            switch ($scope.stock.code) {
                case "amz":
                    $scope.backgroundImg = "amazon-logo.png";
                    break;
                case "fb":
                    $scope.backgroundImg = "facebook-logo.png";
                    break;
                case "yh":
                    $scope.backgroundImg = "Yahoo_Logo.png";
                    break;
                case "hp":
                    $scope.backgroundImg = "hp.png";
                    break;
                case "ik":
                    $scope.backgroundImg = "2000px-Ikea_logo.svg.png";
            };
        }
    }
});
