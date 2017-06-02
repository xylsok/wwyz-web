/**
 * Created by cassandra on 16/8/5.
 */
'use strict';
angular.module('metelHealthWebApp')
	.factory('FileTypeList', function Mail($http, $cookies, $cookieStore, $q, $timeout, $state, $uibModal) {
		return {
			new: function (args) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'app/resources/filetypes/filetype.service.html',
					controller: 'FileTypeEditorController',
					backdrop: 'static',
					size: 'sm',
					resolve: {
						args: function () {
							return args;
						}
					}
				});
				return modalInstance.result;
			}
		};
	});
angular.module('metelHealthWebApp').controller('FileTypeEditorController', function ($scope, $http, $uibModalInstance, args) {
	$scope.fileTypes = args.fileTypes;
	console.log(args.rid);
	$scope.core = {
		selectedFileType: '',
		_save: function () {
			if(!$scope.core.selectedFileType){
				$scope.msg = "请选择一个类型后保存";
				return;
			}
			$http.put('/api/resource/updatefiletype/' + args.rid + '?type=' + $scope.core.selectedFileType)
				.success(function () {
					$scope.callback();
				})
				.error(function (e) {
					console.log(e);
					$scope.msg = "保存出错，请稍后重试！"
				})
		},
		_selectDocType: function (x) {
			$scope.core.selectedFileType = x;
		}
	}
	$scope.callback = function (o) {
		$uibModalInstance.close(o);
	};
	$scope.exitback = function (o) {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
