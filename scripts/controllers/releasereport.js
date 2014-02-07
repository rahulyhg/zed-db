'use strict';

app.controller('ReleasereportCtrl', function ($rootScope, $scope, $http, $filter, $location, ContactReportService, DepartmentsService, InterestsService, limitToFilter) {
        
        $scope.releaseSearchFormData={};
              
        $scope.departments = DepartmentsService.query(function(data, status) {
            $scope.contactSearchFormData.dept_sun = [];
        });

        $scope.interests = InterestsService.query(function(data, status) {
            $scope.contactSearchFormData.interest_sun = [];
        });

        $scope.gridContactOptions = { 
            data: 'contacts', 
            enableCellSelection: false,
            enableRowSelection: false,
            enableCellEdit: false,
            showFilter: true,
            columnDefs: [
                {field: 'org_nm', displayName: 'Organisation'},
                {field: 'contact_nm', displayName: 'Contact Name'},
                {field: 'email', displayName: 'Email'},
                {field: 'work_ph', displayName: 'Phone'}
            ]
        };
                
        $scope.search = function() {
            
                if ($scope.contactSearchForm.$dirty === true) {
                    
                   
                    //console.log(typeof deps);
                    // search with qstring - return LIST of results from resource
                    $scope.contacts = ContactReportService.query($scope.contactSearchFormData, function(data, response){

                                            
                        $scope.emailList = function() {
                            var text ='';
                            angular.forEach(data, function(d){
                                if(d.email == null) { 
                                    
                                } else {
                                    text = text +  d.email + ', ';
                                }
                                
                            });

                            text = text.substring(0, text.length - 2);
                            return text;
                            
                          }


                    });

                                } else {
                console.log('no search!');        
            }
        };
        
        
         $scope.clearForm = function() {
            $scope.contactSearchFormData = {};
            $scope.contactSearchForm.$setPristine();
            $scope.contacts = {};
        };
        
        $scope.convertDate = function () {
            
            $scope.ddd = $filter('date')($scope.contactSearchFormData.date_end, 'y-MM-dd');

            
        }   
      
    });

