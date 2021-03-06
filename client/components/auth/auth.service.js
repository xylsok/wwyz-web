'use strict';
angular.module('wwyzWebApp')
	.factory('Auth', function Auth($http, $cookies, $rootScope) {
		var currentUser = {};
		// App clientId must required. but Secret not.
		var Secret = '';
		var clientId = 'f5980dc9-ebbe-4e90-b94d-5c2c9f1e8adb';
		var session = {};
		return {
			getClientId: function () {
				return clientId;
			},
			logout: function () {
				$cookies.remove('token');
				$cookies.remove('user');
				//$rootScope.createLogout();
			},
			getUser: function () {
				var u = $cookies.get('user');
				var t = $cookies.get('token');
				if (u) {
					var user = JSON.parse(u);
					if (user && user.userName && t) {
						return user;
					}
				}
				return null;
			},
			setUser: function (user) {
				//console.log('set user', user);
				var self = this;
				$cookies.put('user', JSON.stringify(user));
				self.setToken(user.token);
			},
			setToken: function (t) {
				$cookies.put('token', t);
			},
			$logout: function () {
				window.location.href = '/';
				//$state.go('main');
			}
		};
	});
