'use strict';

angular.module('portal-shared.navigation.utils', []);

angular.module('portal-shared.navigation-footer', ['ngSanitize', 'portal-shared.navigation-templates', 'portal-shared.navigation.utils']);
angular.module('portal-shared.navigation-topnav', ['portal-shared.navigation.utils', 'portal-shared.navigation-templates']);

var app = angular.module('portal-shared.navigation', ['portal-shared.navigation-footer', 'portal-shared.navigation-topnav', 'ngSanitize']);

app.run(function ($rootScope, $routeParams, $route, Viewbag) {
    $rootScope.$on("$routeChangeSuccess", function (e, current) {
        Viewbag.put('routeParams', $routeParams);
        Viewbag.put('originalPath', current.$$route ? current.$$route.originalPath : null);
    });
});