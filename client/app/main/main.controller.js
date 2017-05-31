'use strict';
(function() {

function MainController($scope, $http,Auth) {
	$scope.currentUser = Auth.getUser();
	$scope.auth = Auth;
}
angular.module('metelHealthWebApp')
  .controller('MainController', MainController);

})();
