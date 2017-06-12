'use strict';

angular.module('wwyzWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/main/login/login.html',
        controller: 'LoginController'
      });
  });
