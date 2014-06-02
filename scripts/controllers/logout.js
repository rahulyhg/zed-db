'use strict';

app.controller("LogoutCtrl", function($rootScope, $scope, $location, AuthenticationService) {

    AuthenticationService.logout();

});
