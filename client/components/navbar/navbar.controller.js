'use strict';
angular.module('metelHealthWebApp')
	.controller('NavbarCtrl', function ($scope, $rootScope, Auth) {
		$scope.menu = [{
			'title': '课程列表',
			'state': 'main'
		}];
		$scope.isCollapsed = true;
		$scope.user = Auth.getUser();
		$scope.clientId = Auth.getClientId();
		$scope.logout = function () {
			Auth.logout();
			window.location.href = '/';
		};
		//console.log($scope.user);
		if (!$scope.user) {
			// console.log('will login...');
			//$rootScope.createLogin();
		}
	});
