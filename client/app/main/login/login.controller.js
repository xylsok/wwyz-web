'use strict';
(function () {
	function MainController($scope, $http, Auth, $state, $filter, $resource, $timeout, $window) {
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
				$http.post('/api/user/login', $scope.doc)
					.success(function (data) {
						if (data && data.success) {
							console.log(data);
							//登录成功.
							Auth.setToken(data.token);
							Auth.setUser(data);
							$state.go('main', null, {reload: true});
						}else{
							$scope.login.error = data.message;
						}
					})
					.error(function (e) {
						$scope.login.error = '账号密码不正确或服务器内部错误!';
					});
			}
		};
	}

	angular.module('wwyzWebApp')
		.controller('LoginController', MainController);
})();
