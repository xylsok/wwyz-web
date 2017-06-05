'use strict';
(function () {
	function MainController($scope, $http, Auth, $state, $filter, $resource) {
		$scope.currentUser = Auth.getUser();
		var sessionUser = sessionStorage.getItem("user");
		if (sessionUser) {
			$scope.sUser = JSON.parse(sessionUser);
		}
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
						console.log(data);
						$scope.login._checkRole(data);
						if (data && data.role >= 8388608) {
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
								$scope.login._checkRole(data);
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
				console.log($scope.login);
				$scope.login._submit();
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
						$scope.login.error = '本网站仅用于公司内部人员且采编员及以上权限登录!';
					}
					else {
						$scope.login.error = '登录出错. ' + data.message;
						$scope.login.msg = $scope.login.error;
					}
				}
			}
		};
		$scope.core = {
			_getAbnormalCourse: function () {
				$scope.core.getCoursesPromise = $resource('/api/health/getcourselist?userid=' + $scope.currentUser.shortName).query(function (data) {
					if (data && data.length) {
						var coursedata = data.map(function (x) {
							x.cbDate = $filter('date')(x.cbTime, 'yyyy-MM-dd');
							x.mainrestype = x.mainrestype ? x.mainrestype.substring(0, 2) : '';
							return x;
						});
						$scope.core.abnormalCourseSum = coursedata.length;
						$scope.core.abnormalCourses = _.groupBy(coursedata, function (x) {
							return x.cbDate;
						});
					} else {
						$scope.core.abnormalCourses = '';
						$scope.core.abnormalCourseSum = 0;
					}
				});
			},
			_goResorcesPage: function (rno) {
				$state.go('resource', {rno: rno});
			},
			_getCourse: function () {
				$scope.core.courses = $resource('/api/course/getcourselist?userId=' + $scope.currentUser.shortName).query();
			}
		};
		if ($scope.currentUser) {
			$scope.core._getAbnormalCourse();
			$scope.core._getCourse();
		}
	}

	angular.module('metelHealthWebApp')
		.controller('MainController', MainController);
})();
