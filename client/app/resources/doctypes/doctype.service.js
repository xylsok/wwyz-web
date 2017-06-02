/**
 * Created by cassandra on 16/8/5.
 */
'use strict';
angular.module('metelHealthWebApp')
	.factory('DocTypeList', function Mail($http, $cookies, $cookieStore, $q, $timeout, $state, $uibModal) {
		return {
			new: function (args) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'app/resources/doctypes/doctype.service.html',
					controller: 'DocTypeEditorController',
					backdrop: 'static',
					size: 'md',
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
angular.module('metelHealthWebApp').controller('DocTypeEditorController', function ($scope, $http, $uibModalInstance, args) {
	$scope.docTypes = args.docTypes;
	console.log(args.rid);
	$scope.core = {
		selectedDocType: {},
		_save: function () {
			if (!$scope.core.selectedDocType.code) {
				$scope.msg = "请选择后再保存！";
				return;
			}
			$http.put('/api/resource/updatedoctype/' + args.rid + '?type=' + $scope.core.selectedDocType.code)
				.success(function () {
					$scope.callback();
				})
				.error(function (e) {
					console.log(e);
					$scope.msg = "保存出错，请稍后重试！"
				})
		},
		_selectDocType: function (x) {
			$scope.core.selectedDocType = x;
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
