'use strict';
(function () {
	function MainController($scope, $http, Auth, $state, $filter, $resource, $timeout,$window) {
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
				var url = $state.href('resource',{rno: rno});
				$window.open(url, '_blank');
				//$state.go('resource', {rno: rno});
			},
			_getCourse: function () {
				$scope.core.courses = $resource('/api/course/getcourselist?userId=' + $scope.currentUser.shortName).query();
			},
			_copyRno:function(s){
				$('#rnoid' + s.rno).zclip({
					path: 'assets/images/ZeroClipboard.swf',
					copy: function () {//复制内容
						return $('#textrno'+ s.rno).val();
					},
					afterCopy: function () {//复制成功
						s.copy = "复制成功!";
						var a = $timeout(function () {
							s.copy = '';
						}, 2000);
					}
				});
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
