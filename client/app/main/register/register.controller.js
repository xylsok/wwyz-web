'use strict';
(function () {
	function registerController($scope, $http) {
		$scope.core={
			user:{},
			_submit:function(){
				console.log($scope.core.user);
				$http.post('/api/user/register',$scope.core.user).success(function(){
					console.log(12);
				}).error(function(e){
					console.log(e);
				})
			}
		}
	}

	angular.module('wwyzWebApp')
			.controller('RegisterController', registerController);
})();
