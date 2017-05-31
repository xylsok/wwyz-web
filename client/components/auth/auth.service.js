'use strict';

angular.module('metelHealthWebApp')
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
					if (user && user.userId && t) {

						//console.log('getUser',user);
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
			ipLoginUser: function () {
				return $http.get('/auth/user/login/ip?clientId=' + clientId);
			},
			isAnonymous: function () {
				var user = this.getUser();
				if (user === null || !user.role) {
					return true;
				}
				return user.role > 1 ? false : true;
			},
			login: function (user) {
				var self = this;
				var deferred = $q.defer();
				var parameter = {
					username: user.username,
					password: user.password,
					grantType: 'username',
					clientId: clientId
				};
				$http.post('/auth/user/login', parameter)
					.success(function (data) {
						//console.log('data', data);
						if (data.role) {
							var _storage = {
								userId: data.userId,
								username: data.username,
								nickname: data.nickname,
								oid: data.oid,
								role: data.role
							};
							self.setUser(_storage);
							self.setToken(data.token);
							self.__log__(data);
							deferred.resolve(data);
						}
						else {
							deferred.reject('');
						}
					})
					.error(function (err) {
						deferred.reject(err);
					}.bind(this));
				return deferred.promise;
			},
			getAuthorize: function () {
				var user = this.getUser();
				return user ? dbnameSplit(user.dbCode) : [];
			},
			hasAuthorize: function (dbParams) {
				var myAuth = this.getAuthorize(),
					inAuth = dbnameSplit(dbParams),
					result = _.intersection(this.getAuthorize(), inAuth);
				//console.log('用户权限判断 = ', myAuth, inAuth, result);
				return result.length > 0;
			},
			$logout: function () {
				window.location.href = '/';
				//$state.go('main');
			},
			$forward: function () {
				var base = window.location.protocol + '//' + window.location.hostname,
					port = window.location.port,
					back = base + (port === 80 ? '' : ':' + port);
				return 'http://auth.gddata.net/login?clientId=' + clientId +
					'&responseType=code&redirectUri=' + back + '/loginback&ipLogin=1';
			}
		};
  });
