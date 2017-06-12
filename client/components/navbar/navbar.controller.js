'use strict';
angular.module('wwyzWebApp')
	.controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $http) {
		$scope.menu = [{
			'title': '首页',
			'state': 'main',
			'isShow': true
		}, {
			'title': '注册',
			'state': 'register',
			'isShow': $state.current.name == 'register'
		}];
		$scope.isCollapsed = true;
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
		$scope.currentUser = Auth.getUser();
		console.log($scope.currentUser);
	});
