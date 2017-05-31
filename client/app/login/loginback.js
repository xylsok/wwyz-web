/**
 * Created by cassandra on 16/9/7.
 */
'use strict';
angular.module('metelHealthWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('loginback', {
				url: '/loginback',
				controller: 'LoginBackController'
			});
	});
