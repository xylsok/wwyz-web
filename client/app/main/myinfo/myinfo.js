'use strict';
angular.module('wwyzWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('myinfo', {
				url: '/myinfo',
				templateUrl: 'app/main/myinfo/myinfo.html',
				controller: 'MyinfoController'
			});
	});
