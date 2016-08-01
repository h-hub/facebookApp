/**
 * Created by UJAYAH1 on 7/30/2016.
 */
var app = angular.module('home', ['ngRoute', 'home.modules-all', 'home.templates']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/hometab', {
			templateUrl: 'home/home-container.html'
		})
		.when('/stock/:id', {
			templateUrl: 'details/details.html'
		})
		.when('/buy', {
			templateUrl: 'pages/buy.html'
		})
		.when('/about', {
			templateUrl: 'pages/about.html'
		})
		.otherwise({
			redirectTo: '/hometab'
		});
});

app.run(function (Session) {

	if (!Session.isAuthenticated()) {
		Session.redirectToLogin();
	}
});

app.controller('SessionController', function ($scope) {
	$scope.home = "home of the application";
});
/**
 * Created by UJAYAH1 on 7/30/2016.
 */
angular.module('home.container', []);
angular.module('home.top-nav', []);
angular.module('home.templates', []);
angular.module('home.stock-item', []);
angular.module('home.details', []);
angular.module('home.stock-service', []);
angular.module('home.utils', []);

angular.module('home.modules-all', [
    'home.container',
    'home.top-nav',
    'home.stock-item',
    'home.details',
    'home.stock-service',
    'home.utils'
]);
/**
 * Created by UJAYAH1 on 7/31/2016.
 */
/**
 * Created by UJAYAH1 on 7/30/2016.
 */

angular.module('home.details').controller('detailsController', function ($templateCache) {

});

/**
 * Created by UJAYAH1 on 7/30/2016.
 */

angular.module('home.container').controller('homeController', function ($scope, $templateCache, stockService, $interval) {

	$scope.getStocks = function () {
		stockService.getStocks(function (stocks) {
			$scope.stocks = stocks;
		}, function (error) {
			$scope.message = "unable to fetch";
		});
	};

	$interval(function () {
		$scope.fetchStocks();
	}, 60000);

	$scope.fetchStocks = function () {
		$interval(function () {
			$scope.getStocks();
		}, 10000, 3);
	};

});

/**
 * Created by UJAYAH1 on 7/31/2016.
 */
'use strict';

angular.module('home.stock-service').service('stockService', function (http) {

	//see my list in course Id search
	this.getStocks = function (success, error) {
		var requestConfig = {
			url: "/api/getStocks"
		}
		http.get(requestConfig).then(function (response) {
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
 * Created by UJAYAH1 on 7/30/2016.
 */
/**
 * Created by UJAYAH1 on 7/30/2016.
 */

angular.module('home.stock-item').directive('stockItem', function ($templateCache) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			stock: '='
		},
		template: $templateCache.get('stocks/stock-item.html'),
		controller: function ($rootScope, $scope, $interval) {
			$scope.backgroundImg = ''
			$scope.amzStockPrice = "70.8USD";

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

/**
 * Created by UJAYAH1 on 7/31/2016.
 */
/**
 * Created by UJAYAH1 on 7/30/2016.
 */
'use strict';

angular.module('home.top-nav').directive('topNav', function ($templateCache) {
	return {
		restrict: 'E',
		template: $templateCache.get('top-nav/top-nav.html'),
		controller: function ($rootScope, $scope, $location, Session) {
			$scope.click = function (path) {
				$location.path(path);
			};
			$scope.signOut = function () {
				Session.logout();
				Session.redirectToLogin();
			}
		}
	};
});

/**
 * Created by UJAYAH1 on 8/1/2016.
 */
angular.module('home.utils').service('$cookies', function () {
	function createCookie(name, value, milliseconds) {
		var expires = "";
		if (milliseconds) {
			var date = new Date();
			date.setTime(date.getTime() + milliseconds);
			expires = "; expires=" + date.toGMTString();
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name, "", -1);
	}

	this.set = createCookie;
	this.get = readCookie;
	this.clear = eraseCookie;
});

/**
 * Created by UJAYAH1 on 7/31/2016.
 */
angular.module('home.utils').service('http', function ($q, $http, $rootScope) {

	var httpRequest = function (url, method, payLoad, headers) {
		var deferred = $q.defer();

		var requestStart = new Date().getTime();

		headers = headers || {};

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
 * Created by UJAYAH1 on 8/1/2016.
 */
angular.module('home.utils').factory('Session', function ($cookies, $window) {

	function getKey() {
		return $cookies.get('key') ? $cookies.get('key') : null;
	}

	function isAuthenticated() {
		return getKey() !== null && getKey() !== 'empty';
	}

	function redirectToLogin() {
		$window.location.href = '/login?error=Session expired.';
	}

	function logout() {
		$cookies.clear('key');
	}

	return {
		getKey: getKey,
		isAuthenticated: isAuthenticated,
		redirectToLogin: redirectToLogin,
		logout: logout
	};
});
