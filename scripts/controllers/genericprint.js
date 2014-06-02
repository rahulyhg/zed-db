'use strict';

app.controller('GenericprintCtrl', function ($rootScope, $scope, $http, $location, $filter, SubService, SkillsService, OnlineSubsService, ProgramsService, PrizesService, SubsBandService, SubtypesService, GenresService, ContactService, limitToFilter, $dialog) {

        $scope.printBuffer = $rootScope.printBuffer;

        var td = new Date();
        $scope.today = $filter('date')(td, 'dd/MM/yyyy');

        $scope.onPrint = function() {
            window.print();
        }
});
