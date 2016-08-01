/**
 * Created by UJAYAH1 on 7/31/2016.
 */
/**
 * Created by UJAYAH1 on 7/30/2016.
 */
'use strict';

angular.module('home.top-nav').directive('topNav',function($templateCache){
    return {
        restrict: 'E',
        template: $templateCache.get('top-nav/top-nav.html'),
        controller: function ($rootScope, $scope) {
        }
    };
});
