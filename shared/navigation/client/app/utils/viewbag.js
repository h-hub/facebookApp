'use strict';

(function (module) {
    module.service('Viewbag', function () {
        var viewbag = {};

        function put(key, value) {
            viewbag[key] = value;
        }
        function get(key) {
            return viewbag[key] ? viewbag[key] : null;
        }
        function remove(key) {
            delete viewbag[key];
        }
        function isExist(key) {
            return viewbag[key] !== undefined;
        }
        return {
            get: get,
            put: put,
            remove: remove,
            isExist: isExist
        };
    });
})(angular.module('portal-shared.navigation.utils'));