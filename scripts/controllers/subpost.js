'use strict';

app.controller('SubscriberpostCtrl', function ($rootScope, $scope, $http, $location, $filter, $routeParams, SubService, SkillsService, OnlineSubsService, ProgramsService, PrizesService, SubsBandService, SubtypesService, GenresService, limitToFilter, $dialog) {
        
        //$scope.subscriberSearchFormData={};
        

        $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            

        $scope.subtypes = SubtypesService.query();
        $scope.prizes = PrizesService.query();
        $scope.genres = GenresService.query();
        $scope.onlinesubs = OnlineSubsService.query();

        var td = new Date();
        $scope.today = $filter('date')(td, 'dd/MM/yyyy');

        $scope.check = 0;
        

        if ($routeParams.id > 0) {
            $http.get(apiSrc + '/subscribers/notposted/' + $routeParams.id).then(function (response) {
              $scope.sub = response.data;
                $scope.sub.donation = ($scope.sub.donation) ? parseInt($scope.sub.donation) : 0;
                $scope.sub.postage = (($scope.sub.subtypeid === 8) && ($scope.sub.merch_posted == true)) ? 10 : 0;
                if ($scope.sub.pledge) {
                  $scope.prizes = PrizesService.query(function(){
                      $scope.gold = $scope.findPrize($scope.prizes, $scope.sub.pledge.radiothonprizeid);
                      $scope.silver = $scope.findPrize($scope.prizes, $scope.sub.pledge.radiothonprize2);
                  });
                  
                }
               
            });       
        } else {
          $http.get(apiSrc + '/subscribers/notposted/').then(function (response) {
               $scope.subs = response.data; 

               angular.forEach($scope.subs, function(s){
                  s.donation = (s.donation) ?  parseInt(s.donation) : 0;
                  s.postage = (s.subtypeid === 8) ? 10 : 0;
                  s.postage = ((s.subtypeid === 8) && (s.merch_posted == true)) ? 10 : 0;
                  if (s.pledge) {
                    $scope.prizes = PrizesService.query(function(){
                      $scope.gold = $scope.findPrize($scope.prizes, s.pledge.radiothonprizeid);
                      $scope.silver = $scope.findPrize($scope.prizes, s.pledge.radiothonprize2);
                    });
                  }
               });
         });


        }
          
        $scope.findPrize = function(prizes, subprize) {
          return  _.find(prizes, function(p){
                  if (p.radiothonprizeid === subprize){
                    return p;
                  }
                })
        }

        $scope.onPrint = function() {
            window.print();
        }
        
});
