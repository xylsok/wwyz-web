'use strict';
angular.module('wwyzWebApp')
	.controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $http) {
		$scope.menu = [{
			'title': '课程列表',
			'state': 'main',
			'isShow': true
		}, {
			'title': '课程资源列表',
			'state': 'resource',
			'isShow': $state.current.name == 'resource'
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
		$scope.currentUser = Auth.getUser();
		var sessionUser = sessionStorage.getItem("user");
		if (sessionUser) {
			$scope.sUser = JSON.parse(sessionUser);
		}
		$scope.login = {
			user: {},
			error: '',
			_submit: function () {
				$scope.doc = {
					username: $scope.login.username,
					password: $scope.login.password,
					clientId: Auth.getClientId()
				};
				$http.post('/uc3/login/pwd/', $scope.doc)
					.success(function (data) {
						$scope.login._login(data);
						if (data && data.role >= 1048576) {
							data.password = $scope.login.password;
							data.username = $scope.login.username;
							sessionStorage.setItem("user", JSON.stringify(data));
						}
					})
					.error(function (e) {
						$scope.login.error = '账号密码不正确或服务器内部错误!';
					});
			},
			_autoLogin: function () {
				$scope.doc = {
					username: $scope.login.user.username,
					password: 'ceshi1409',
					clientId: Auth.getClientId()
				};
				if ($scope.login.user.username) {
					$http.post('/uc3/login/pwd/', $scope.doc)
						.success(function (data) {
							if (data && data.role && data.role >= 262144) {
								$scope.login._login(data);
							} else {
								$scope.login.msg = '你输入的账号无权登录本系统！'
							}
						})
						.error(function (e) {
							$scope.login.msg = '账号不存在！'
						});
				} else {
					$scope.login.msg = '请输入要变为用户的账号！'
				}
			},
			_restore: function () {
				$scope.login.username = $scope.sUser.username;
				$scope.login.password = $scope.sUser.password;
				$scope.login._submit();
			},
			_login: function (data) {
				//登录成功.
				Auth.setToken(data.token);
				Auth.setUser(data);
				$state.go('main', null, {reload: true});
			}
		};
	});
