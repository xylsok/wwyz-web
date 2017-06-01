'use strict';
angular.module('metelHealthWebApp')
	.controller('NavbarCtrl', function ($scope, $rootScope, Auth,$state) {
		$scope.menu = [{
			'title': '课程列表',
			'state': 'main',
			'isShow':true
		},{
			'title': '课程资源列表',
			'state': 'resource',
			'isShow':$state.current.name=='resource'
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
