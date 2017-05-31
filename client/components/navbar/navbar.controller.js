'use strict';

angular.module('metelHealthWebApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, Auth) {
    $scope.menu = [{
      'title': '概况',
      'state': 'main'
    }];
    $scope.isCollapsed = true;
    $scope.user = Auth.getUser();
    $scope.clientId = Auth.getClientId();
    $scope.logout = function () {
      Auth.logout();
    };
    //console.log($scope.user);
    if (!$scope.user) {
      // console.log('will login...');
      //$rootScope.createLogin();
    }
  });
