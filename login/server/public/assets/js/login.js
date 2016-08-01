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
		controller: function ($rootScope, $scope, $window, loginService) {
			$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

			$scope.submit = function () {
				var credentials = {
					username: $scope.user.email,
					password: $scope.user.password
				};
				loginService.validate(credentials, function (isvalid) {
					if (isvalid) {
						$window.location.href = '/home';
					} else {
						$window.location.href = '/login';
					}
				}, function (error) {
					$scope.message = "unable to fetch";
				});
			};

			$scope.redirectHome = function () {
				var credentials = {
					username: $scope.user.email,
					password: $scope.user.password
				};
				loginService.sendHome(credentials, function (isvalid) {
					if (isvalid) {
						$window.location.href = '/home';
					} else {
						$window.location.href = '/login';
					}
				}, function (error) {
					$scope.message = "unable to fetch";
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
