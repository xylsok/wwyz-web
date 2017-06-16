'use strict';
(function () {
	function registerController($scope, $http) {
		$scope.core = {
			user: {},
			error: '',
			_submit: function () {
				if ($scope.core.user && $scope.core.user.email) {
					//对电子邮件的验证
					var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					if (!myreg.test($scope.core.user.email)) {
						$scope.core.error = '提示:请输入有效的E_mail！';
						return (false);
					}
					$http.post('/api/user/register', $scope.core.user).success(function () {
						console.log(12);
					}).error(function (e) {
						console.log(e);
					})
				} else {
					$scope.core.error = '邮箱不能为空！';
				}
			}
		}
	}

	angular.module('wwyzWebApp')
		.controller('RegisterController', registerController);
})();
