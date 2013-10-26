'use strict';

angular.module('zeddbApp')
    .controller('ContactCtrl', function ($rootScope, $scope, $http, $location, $routeParams, Restangular, ContactService, DepartmentsService, limitToFilter) {
        
        $scope.contactSearchFormData={};
        
        if ($rootScope.contactParams) {
            $scope.contacts = ContactService.query($rootScope.contactParams, function(u, getResponseHeaders){
                
                    //set order of display
                    $scope.predicate = 'createddate';
                    $scope.contactSearchFormData = $rootScope.contactParams;
                    delete $rootScope.contactParams;
                });
        }
        
        $scope.contactsuggest = function (orgName) {
            return $http.get('http://db.4zzzfm.org.au/api/v1/contactsuggest/' + orgName).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
        $scope.departments = DepartmentsService.query();
        
        $scope.search = function() {
            
            if ($scope.contactSearchForm.$dirty === true) {
                
                
              var params = $scope.contactSearchFormData;
                // search with qstring - return LIST of results from resource
                $scope.contacts = ContactService.query(params, function(u, getResponseHeaders){
                
                    //set order of display
                    $scope.predicate = 'createddate';
                    $rootScope.contactParams = params;
                });
            } else {
                console.log('no search shit!');        
            }
        };
        
        
         $scope.clearForm = function() {
            $scope.contactSearchFormData.org_nm = "";
            $scope.contactSearchForm.$setPristine();
            delete $rootScope.contactParams;
            $scope.contacts = {};
        };
        
        //add new
        $scope.add = function () {
            $location.path('/contacts/new/contact');
        };
  
    });
