'use strict';
(function () {
	function LoginBackController($http, $location, Auth) {
		var _t = $location.search()._t;
		console.log(_t);
		if (_t) {
			var url = '/auth/auth/info/' + Auth.getClientId() + '/' + _t;
			$http.get(url)
				.success(function (data) {
					console.log(data);
					var user = {
						userId: data.userId,
						//username: data.username,
						nickname: data.nickname,
						icon: data.icon,
						oid: data.oid,
						organName: data.organName,
						localRole: data.role,
						role: data.role,
						token: data.token
					};
					Auth.setToken(user.token);
					Auth.setUser(user);
					window.location.href = '/';
				})
				.error(function (e) {
					console.log(e);
				});
		};
	}

	angular.module('metelHealthWebApp')
		.controller('LoginBackController', LoginBackController);
})();
