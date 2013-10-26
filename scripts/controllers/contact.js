'use strict';

app.controller('ContactCtrl', function ($rootScope, $scope, $http, $location, $routeParams, ContactService, DepartmentsService, InterestsService, limitToFilter) {
        
    $scope.contactSearchFormData={};
    $scope.departments = DepartmentsService.query(function(data, status) {
        $scope.contactSearchFormData.dept_sun = [];
    });

    $scope.interests = InterestsService.query(function(data, status) {
        $scope.contactSearchFormData.interest_sun = [];
    });
        
        if ($rootScope.contactParams) {
            $scope.contacts = ContactService.query($rootScope.contactParams, function(u, getResponseHeaders){
                
                    //set order of display
                    $scope.predicate = 'createddate';
                    $scope.contactSearchFormData = $rootScope.contactParams;
                    delete $rootScope.contactParams;
                });
        }
        
        $scope.contactsuggest = function (orgName) {
            return $http.get(apiSrc + '/contactsuggest/' + orgName).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
        $scope.search = function() {
            
                if ($scope.contactSearchForm.$dirty === true) {
                    
                    var params = $scope.contactSearchFormData;
                    // search with qstring - return LIST of results from resource
                    $scope.contacts = ContactService.query(params, function(){
                    
                    //set order of display
                    $scope.predicate = 'createddate';
                    $rootScope.contactParams = params;
                    });
                
            } else {
                console.log('no search shit!');        
            }
        };
        
        
         $scope.clearForm = function() {
            $scope.contactSearchFormData = {};
            $scope.contactSearchFormData.interest_sun = [];
            $scope.contactSearchForm.$setPristine();
            delete $rootScope.contactParams;
            $scope.contacts = {};
        };
        
        //add new
        $scope.add = function () {
            $location.path('/contacts/new/contact');
        };
  
    });
