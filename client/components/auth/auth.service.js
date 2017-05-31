'use strict';

angular.module('metelHealthWebApp')
  .factory('Auth', function Auth($http, $cookies, $rootScope) {
    var currentUser = {};
    // App clientId must required. but Secret not.
    var Secret = '',
      clientId = '';
    return {
      getClientId: function () {
        return clientId;
      },
      logout: function () {
        $cookies.remove('token');
        $cookies.remove('user');
        $rootScope.createLogout();
      },
      getUser: function () {
        var u = $cookies.get('user');
        var t = $cookies.get('token');

        if (u) {
          var user = JSON.parse(u);
          if (user && user.userId && t) {
            return user;
          }
        }
        return null;
      },
      setUser: function (user) {
        $cookies.put('user', JSON.stringify(user));
      },
      setToken: function (t) {
        $cookies.put('token', t);
      }
    };
  });
