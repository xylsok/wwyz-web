'use strict';
(function () {
	function ResourcesController($scope, $stateParams, $resource, $state, $http, DocTypeList, FileTypeList,Auth) {
		$scope.currcenUser = Auth.getUser();
		$scope.rno = $stateParams.rno;
		$scope.resources = $resource('/api/resource/getresourcelist?rno=' + $stateParams.rno).query(function (data) {
			$scope.noFileSizeCum = 0;
			data.forEach(function (x) {
				if (!x.filesize) {
					$scope.noFileSizeCum++;
				}
			});
			var s = data.map(function (x) {
				x.docTypeCode = x.doctype && x.doctype.length >= 2 ? x.doctype.substring(0, 2) : '未定义';
				return x;
			});
			groupByDocTYpe(s);
			checkError(data);
		});
		function checkError(data) {
			$http.get('/api/health/geterrorcount/' + $stateParams.rno).success(function (health) {
				$scope.health = health;
				if (health.lostFile) {
					var ids = health.lostFile.split(",");
					ids.forEach(function (x) {
						data.forEach(function (y) {
							if (x.trim() == y.id) {
								y.error = true;
							}
						})
					})
				}
			})
		}

		function groupByDocTYpe(s) {
			$scope.docTypes = _.groupBy(s, function (y) {
				return y.docTypeCode;
			});
		}

		$scope.MainrestInfo = $resource('/api/health/getmainres/' + $stateParams.rno).get();
		$scope.btnBar = {
			refresh: function () {
				$state.go('resource', null, {reload: true});
			},
			save: function () {
				if (confirm("确定要修改吗？")) {
					$http.put('/api/health/updatemainrest/' + $stateParams.rno, $scope.MainrestInfo).success(function () {
						$scope.btnBar.refresh();
					})
				}
			},
			goCourseList: function () {
				$state.go('main');
			}
		};
		$scope.core = {
			docTypes: [
				{name: '课程介绍', code: 'CI'},
				{name: '教学大纲', code: 'SY'},
				{name: '参考教材', code: 'TB'},
				{name: '教师简历', code: 'CV'},
				{name: '课程表', code: 'SC'},
				{name: '教学课件', code: 'CW'},
				{name: '讲义', code: 'LN'},
				{name: '教学视频', code: 'VI'},
				{name: '教学音频', code: 'AU'},
				{name: '课件视频', code: 'KV'},
				{name: '教学图片', code: 'PI'},
				{name: '教学案例', code: 'PJ'},
				{name: '实验实践', code: 'EX'},
				{name: '问题例题', code: 'QS'},
				{name: '名称术语', code: 'TE'},
				{name: '试卷与答案', code: 'ES'},
				{name: '教学博客', code: 'BL'},
				{name: '下载包', code: 'DO'},
				{name: '课程其他', code: 'OT'},
				{name: '合成资源', code: 'CR'},
				{name: '问题与答案', code: 'QU'},
				{name: '例题', code: 'SP'},
				{name: '习题', code: 'EE'},
				{name: '作业', code: 'AG'},
				{name: '专题研讨会', code: 'SM'},
				{name: '阅读材料', code: 'PA'},
				{name: '课程须知', code: 'AM'},
				{name: '复习实验', code: 'RE'},
				{name: '写绘', code: 'MA'},
				{name: '电子书', code: 'EB'},
				{name: '动漫短片', code: 'A1'},
				{name: '漫画', code: 'A2'},
				{name: 'FLASH', code: 'A3'},
				{name: '动画片', code: 'A4'},
				{name: '真人PV', code: 'A5'},
				{name: '视频短片', code: 'A6'},
				{name: '音乐动漫', code: 'A7'},
				{name: '相声动漫', code: 'A8'},
				{name: '动漫相关', code: 'A9'},
				{name: '电影动画', code: 'AB'},
				{name: '延伸阅读', code: 'FR'}
			],
			_setDocType: function (id) {
				DocTypeList.new({'docTypes': $scope.core.docTypes, 'rid': id}).then(
					function (result) {
						console.log(result);
					});
			},
			fileTypes: ['doc', 'ppt', 'html', 'htm', 'tar', 'gz', 'tgz', 'rar', 'zip', 'mp3', 'flv', 'jpg', 'gif', 'bmp', 'png', 'tif', 'pdf', 'rtf', 'swf', 'txt', 'xls'],
			_setFileType: function (id) {
				FileTypeList.new({'fileTypes': $scope.core.fileTypes, 'rid': id}).then(
					function (result) {
						console.log(result);
					});
			}
		}
	}

	angular.module('metelHealthWebApp')
		.controller('ResourcesController', ResourcesController);
})();
