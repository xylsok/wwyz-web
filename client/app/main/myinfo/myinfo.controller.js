'use strict';
(function () {
	function registerController($scope, $http, Auth, $state) {
		$scope.myImage = '';
		$scope.myCroppedImage = '';
		var handleFileSelect = function (evt) {
			var file = evt.currentTarget.files[0];
			var reader = new FileReader();
			reader.onload = function (evt) {
				$scope.$apply(function ($scope) {
					$scope.myImage = evt.target.result;
				});
			};
			reader.readAsDataURL(file);
		};
		angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
		$scope.user = Auth.getUser();
		$scope.upload = function () {
			var user = {
				id: $scope.user.id,
				icon: $scope.myCroppedImage
			};
			$http.put('/api/user/updateico', user).success(function () {
				$state.go('myinfo', null, {reload: true});
			})
		}
	}

	angular.module('wwyzWebApp')
		.controller('MyinfoController', registerController);
})();
