'use strict';
angular.module('metelHealthWebApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	"ngClipboard"
])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider, $compileProvider,ngClipProvider) {
		$urlRouterProvider
			.otherwise('/');
		$locationProvider.html5Mode(true);
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'http://218.246.35.11:81/**',
			'http://wwww.guodao.cn/**']);
		$locationProvider.html5Mode(true);
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|metel):/);
		ngClipProvider.setPath("../bower_components/zeroclipboard/dist/ZeroClipboard.swf");
	})
	.factory('authInterceptor', function ($rootScope, $q, $cookies) {
		var state;
		return {
			// Add authorization token to headers
			request: function (config) {
				config.headers = config.headers || {};
				var token = $cookies.get('token');
				if (token) {
					config.headers.Authorization = 'Bearer ' + $cookies.get('token');
				}
				//用于区别每一次用户登录
				var sid = sessionStorage.getItem('sid');
				if (!sid) {
					sid = '';
				}
				config.headers['sessionId'] = sid;
				return config;
			},
			// Intercept 401s and redirect you to login
			responseError: function (response) {
				if (response.status === 401) {
				}
				return $q.reject(response);
			}
		};
	})
	.run(function ($rootScope, $window, $http, Auth) {
		// Redirect to login if route requires auth and the user is not logged in
		$rootScope.$on('$stateChangeStart', function (event, next) {
			//if (next.authenticate) {
			//}
		});
	});
