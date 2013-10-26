'use strict';

angular.module('zeddbApp')
    .controller('SubscriberCtrl', function ($rootScope, $scope, $http, $location, $routeParams, Restangular, SubService, limitToFilter) {
        
        $scope.subscriberSearchFormData={};
        
        if ($rootScope.subscriberParams) {
            $scope.subscribers = SubService.query($rootScope.subscriberParams, function(u, getResponseHeaders){
                
                    //set order of display
                    $scope.predicate = 'createddate';
                    
                    $scope.subscriberSearchFormData.subName = $rootScope.subName;
                    delete $rootScope.subscriberParams;
                    delete $rootScope.subName;
                });
        }
        
        
        
        $scope.subsuggest = function (subName) {
            return $http.get('http://db.4zzzfm.org.au/api/v1/subsuggest/' + subName).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        
        
        
        
        $scope.search = function() {
            
            if ($scope.subscriberSearchForm.$dirty === true) {
                if ($scope.subscriberSearchFormData.subName) {
                    // add operator to sub search
                    Object.defineProperty($scope.subscriberSearchFormData, 'operator', {value : 'AND',
                                   writable : true,
                                   enumerable : true,
                                   configurable : true});
                        
                    
                    //split and flip full name from typeahead
                    var re = /,\s*/;
                    if ($scope.subscriberSearchFormData.subName.search(re) !== -1){
                        var nameList = $scope.subscriberSearchFormData.subName.split(re);
                        nameList.reverse()
                        $scope.subscriberSearchFormData.subfirstname = nameList[0];
                        $scope.subscriberSearchFormData.sublastname = nameList[1];
                        
                        
                        
                    } else {
                            
                        // no typeahed, check for space? 2 names : 1 name 
                        var subre = /\s/;
                        if ($scope.subscriberSearchFormData.subName.search(subre) !== -1){
                        
                            var nameList = $scope.subscriberSearchFormData.subName.split(subre);
                            $scope.subscriberSearchFormData.subfirstname = nameList[0];
                            $scope.subscriberSearchFormData.sublastname = nameList[1];
                            $scope.subscriberSearchFormData.operator = 'AND';
                 
                        } else {
                            $scope.subscriberSearchFormData.subfirstname = $scope.subscriberSearchFormData.subName;
                            $scope.subscriberSearchFormData.sublastname = $scope.subscriberSearchFormData.subName;
                            $scope.subscriberSearchFormData.operator = 'OR';
                        }
                        
                    }
                }
                                
                var params = $scope.subscriberSearchFormData;
                
                $rootScope.subName = params.subName;
                delete params.subName;
                // search with qstring - return LIST of results from resource
                $scope.subscribers = SubService.query(params, function(u, getResponseHeaders){
                    
                    //set order of display
                    $scope.predicate = 'createddate';
                    $rootScope.subscriberParams = $scope.subscriberSearchFormData;
                 
                });
            } else {
                console.log('no search shit!');
            
            }
        };
        
        
         $scope.clearForm = function() {
            
            
            delete $rootScope.subscriberParams;
            delete $rootScope.subName;
            $scope.subscribers = {};
            $scope.subscriberSearchFormData = {};
            $scope.subscriberSearchFormData.subName = '';
            $scope.subscriberSearchForm.$setPristine();
             
        };
        
        $scope.add = function () {
            $location.path('/subscribers/new/subscriber');
        };
  
  
    });
