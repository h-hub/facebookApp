/**
 * Created by UJAYAH1 on 8/1/2016.
 */
/**
 * Created by UJAYAH1 on 7/30/2016.
 */
angular.module('login.login-service', []);
angular.module('login.utils', []);

angular.module('login-modules', [
    'login.login-service',
    'login.utils'
]);
/**
 * Created by UJAYAH1 on 7/31/2016.
 */
'use strict';

angular.module('login.login-service').service('loginService', function (http) {

	//see my list in course Id search
	this.validate = function (credentials, success, error) {
		var requestConfig = {
			url: "/login/validate",
			payLoad: credentials
		}
		http.post(requestConfig, credentials).then(function (response) {
			success(response);
		}).catch(function (exception) {
			if (exception.code === 404) {
				success([]);
				return;
			}
			error(exception);
		});
	};

	//see my list in course Id search
	this.sendHome = function (credentials, success, error) {
		var requestConfig = {
			url: "/home/validate",
			payLoad: credentials
		};

		http.post(requestConfig, credentials).then(function (response) {
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
/**
 * Created by UJAYAH1 on 7/31/2016.
 */

'use strict';
var app = angular.module('login', ['login.templates', 'login-modules']);

app.directive('login', function ($templateCache) {
	return {
		restrict: 'E',
		template: $templateCache.get('login/login.html'),
		controller: function ($rootScope, $scope, $window, loginService, MessageLogger) {

			$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;


			$scope.submit = function () {
				var email = $scope.user.email;
				var password = $scope.user.password;
				var credentials = {
					username: email,
					password: password
				};
				loginService.validate(credentials, function (isvalid) {
					if (isvalid) {
						$scope.redirectHome(credentials);
					} else {
						$scope.message = "Invalid Username or password.";
					}
				}, function (error) {

					MessageLogger.logError({
						class: 'loginController',
						method: 'submit',
						message: {
							payload: {
								credentials: credentials
							},
							stacktrace: error,
							status: 'fail'
						}
					});

					$scope.message = "Unable to fetch data. Try Again.";
				});
			};

			$scope.redirectHome = function (credentials) {
				loginService.sendHome(credentials, function (isvalid) {
					if (isvalid) {
						$window.location.href = '/home';
					} else {
						$scope.message = "AInvalid Username or password.";
					}
				}, function (error) {

					MessageLogger.logError({
						class: 'loginController',
						method: 'submit',
						message: {
							payload: {
								credentials: credentials
							},
							stacktrace: error,
							status: 'fail'
						}
					});

					$scope.message = "Unable to fetch data. Try Again.";
				});
			};
		}
	};
});

/**
 * Created by UJAYAH1 on 7/31/2016.
 */
angular.module('login.utils').service('http', function ($q, $http, $rootScope) {

	var httpRequest = function (url, method, payLoad, headers) {
		var deferred = $q.defer();

		var requestStart = new Date().getTime();

		headers = {
			'Content-Type': 'application/json'
		};

		$http({
			method: method,
			url: url,
			headers: headers,
			data: payLoad,
			timeout: 20000000
		}).success(function (data) {
			deferred.resolve(data);
		}).error(function (data, status, headers, config) {
			var responseEnd = new Date().getTime() - requestStart;
			if (responseEnd >= config.timeout) {
				$rootScope.$broadcast('httpRequestTimeout');
			}

			var dataDefault = {
				status: 0,
				data: 'Service Timeout'
			};
			data = data || dataDefault;

			if (data.code === 401) {
				//checkSessionIsValid(function () {
				//    deferred.reject(data);
				//});

				return;
			}

			deferred.reject(data);
		});

		return deferred.promise;
	};

	this.get = function (requestConfig) {
		return httpRequest(requestConfig.url, 'GET', null);
	};
	this.post = function (requestConfig, payLoad) {
		return httpRequest(requestConfig.url, 'POST', requestConfig.payLoad);
	};
	this.delete = function (requestConfig) {
		return httpRequest(requestConfig.url, 'DELETE', null);
	};
	this.put = function (requestConfig, payLoad) {
		return httpRequest(requestConfig.url, 'PUT', requestConfig.payLoad);
	};
})

/**
 * Created by harsha.kj89@gmail.com on 8/2/2016.
 */
angular.module('login.utils').service('MessageLogger', function ($http) {

	this.logError = function (exception) {
		console.log('log error');
		try {
			angular.extend(exception, {
				logtype: 'error',
				logtime: new Date(),
				workflow: 'login'
			});

			return $http.post('/log/error', exception);
		} catch (e) {
			return;
		}
	};

	this.logInstrumentation = function (info) {
		try {
			angular.extend(info, {
				logtype: 'info',
				logtime: new Date(),
				workflow: 'login'
			});

			return $http.post('/log/instrumentation', info);
		} catch (e) {
			return;
		}
	};

	this.services = {
		getNewCourseMaterials: 'getNewCourseMaterials',
		getCourseMaterials: 'getCourseMaterials',
		getMyCourses: 'getMyCourses',
		getCoursesByCourseId: 'getCoursesByCourseId',
		getCourseMaterialById: 'getCourseMaterialById',
		getAllDisciplines: 'getAllDisciplines',
		saveCourses: 'saveCourses',
		deleteCourse: 'deleteCourse',
		getServerDate: 'getServerDate'
	}

	this.actions = {
		searchCourses: 'search-courses',
		searchMaterials: 'search-materials',
		enterCourseIdSearch: 'course-id-search',
		enterMaterialsSearch: 'catelog-search',
		myCourseList: 'see-my-list',
		selectCourse: 'select-course',
		selectMaterial: 'select-material',
		selectEdition: 'select-edition',
		selectVersion: 'select-version',
		createCourse: 'create-course',
		selectCurrentEdition: 'Current Edition Selected',
		selectCurrentVersion: 'Current Version Selected',
		selectNewEdition: 'New Edition Selected',
		selectNewVersion: 'New Version Selected',
		updatePanelCount: 'Update panel count',
		cancelCourseCreation: 'select-cancel-course-creation',
		createCopyCourse: 'select-create-copy-course',
		goToCatalog: 'select-go-to-catalog',
		returnToMyCourse: 'return to my course',
		createAnotherCourse: 'Create another course',
		bookStoreInfo: 'Bookstore information selected',
		exitToCourseHome: 'Exit to course home',
		selectCourseStartDate: 'Course start date selected',
		selectCourseEndDate: 'Course end date selected',
		selectEnrollmentStartDate: 'Enrollment start date selected',
		selectEnrollmentEndDate: 'Enrollment end date selected',
		selectCourseStartDateManually: 'Course start date manually selected',
		setCourseListArray: 'Created course id list'
	};

	this.ui = {
		createCourse: 'create-a-course',
		selectCourseMaterials: 'select-course-materials',
		selectExistingCourse: 'select-existing-course',
		enterCourseDetails: 'enter-course-details',
		youAredone: 'you-are-done',
		intermediateProvider: 'intermediate-page'
	}

});
