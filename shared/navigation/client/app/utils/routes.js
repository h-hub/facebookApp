'use strict';

(function (module) {
    module.service('Routes', function () {

        var routes = {
            courseHome: {
                nestedView: '/cards/:templateCourse/:courseId/tab/:tabName'
            },
            courseManage: {
                createCourse: '/search',
                externalSearch: '/externalSearch/:courseId?',
                catelogSearch: ['/search/materials/:q?','/search/materials/:desiplineId/:desipline/:q?'],
                seeMyList: '/search/courses',
                courseIdSearch: '/search/courses/:q',
                newEdition: '/search/courses/:courseId/:editionVersion',
                newVersion: '/search/courses/:courseId/:editionVersion',
                enterCourseDetails: ['/create/:type/:materialId', '/copy/:type/:courseId/:editionVersion/:newVersionId?', '/copy/:type/:courseId'],
                youAreDone: '/done',
                externalExit: '/exit'
            }
        };

        function getRoutes() {
            return routes;
        }

        return {
            get: getRoutes
        };
    });
})(angular.module('portal-shared.navigation.utils'));