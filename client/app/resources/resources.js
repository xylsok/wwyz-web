'use strict';

angular.module('metelHealthWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('resource', {
        url: '/resources/{rno}',
        templateUrl: 'app/resources/resources.html',
        controller: 'ResourcesController'
      });
  });
