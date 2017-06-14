'use strict';
(function () {
	function MainController($scope, $http, Auth, $state, $filter, $resource, $timeout,$window,$sce) {
		$scope.url = 'http://v2017.specialsci.cn';
	}

	angular.module('wwyzWebApp')
		.controller('MainController', MainController);
})();
