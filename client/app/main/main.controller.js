'use strict';
(function () {
	function MainController($scope, $http, Auth, $state) {
		$scope.currentUser = Auth.getUser();
		$scope.auth = Auth;
		$scope.login = {
			user: {},
			error: '',
			_submit: function () {
				if (!$scope.login.username) {
					$scope.login.error = '用户名不能为空！';
					return;
				}
				if (!$scope.login.password) {
					$scope.login.error = '密码不能为空！';
					return;
				}
				$scope.doc = {
					username: $scope.login.username,
					password: $scope.login.password,
					clientId: Auth.getClientId()
				};
				$http.post('/uc3/login/pwd/', $scope.doc)
					.success(function (data) {
						$scope.login._checkRole(data);
					})
					.error(function (e) {
						console.log(e);
					});
			},
			_checkRole: function (data) {
				//登录成功.
				if (data && data.token && data.userId && data.role && data.role >= 262144) {
					Auth.setToken(data.token);
					Auth.setUser(data);
					$state.go('main', null, {reload: true});
				}
				else {
					if (data && data.role && data.role < 262144) {
						$scope.login.error = '本网站仅用于公司内部人员登录';
					}
					else {
						$scope.login.error = '登录出错. ' + data.message;
					}
				}
			}
		}
	}

	angular.module('metelHealthWebApp')
		.controller('MainController', MainController);
})();
