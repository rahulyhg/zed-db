'use strict';

app.controller("LoginCtrl", function($rootScope, $scope, $location, AuthenticationService) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      	$location.path('/');
    })	
  };



});
