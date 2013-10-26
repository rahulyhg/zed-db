'use strict';

app.controller('GenericprintCtrl', function ($rootScope, $scope, $http, $location, $filter, $routeParams, SubService, SkillsService, OnlineSubsService, ProgramsService, PrizesService, SubsBandService, SubtypesService, GenresService, limitToFilter, $dialog) {
        
        //$scope.subscriberSearchFormData={};
        

        console.log($rootScope.printBuffer);

        $scope.printBuffer = $rootScope.printBuffer;

        var td = new Date();
        $scope.today = $filter('date')(td, 'dd/MM/yyyy');

        $scope.onPrint = function() {
            window.print();
        }
});
