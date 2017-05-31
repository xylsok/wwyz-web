'use strict';

angular.module('metelHealthWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
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
        return config;
      },
      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
        }
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
