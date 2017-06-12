'use strict';
angular.module('wwyzWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('register', {
				url: '/register',
				templateUrl: 'app/main/register/register.html',
				controller: 'RegisterController'
			});
	});
