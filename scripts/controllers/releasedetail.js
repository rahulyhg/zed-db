'use strict';


app.controller('ReleaseDetailCtrl', function ($rootScope, $scope, $route, $http, $routeParams, ReleaseService, GenresService, ThemesService, SubsBandService, $dialog, $location, release, $anchorScroll) {

  
    //set vars for constants 
    $scope.submitType = ($location.path() == '/releases/new/release') ? 'Add Release' : 'Update';
    $scope.alerts = [];
    $scope.relsuggest = [];
    $scope.ausnz = ['A', 'NZ'];
    $scope.promo = ['Promo Campaign', 'Staff Pick', 'Other'];
    $scope.format = ['CD', 'DIGITAL', 'VINYL'];
    $scope.status = ['In Library', 'Received', 'Culled', 'Rejected'];

    $scope.genres = GenresService.query();
    $scope.themes = ThemesService.query();
    
    
    if ($routeParams.id) {
      $scope.release = release;
    } else {
      $scope.release= new ReleaseService();
    }

    $scope.relCheck = function (artist, title) {
           $http.get(apiSrc + '/relcheck/' + artist + '/' + title).then(function (response) {
              $scope.relsuggest = response.data;
          });
    };


    $scope.saveRelease = function () {


        if ($routeParams.id) {
            //update

          $scope.release.$update({id: $routeParams.id}, function success(response) {
                if ($scope.alerts.length > 0) {
                  $scope.alerts.splice(0, 1);
                }
                $scope.alerts.push({ msg: 'Record ' + $routeParams.id + ' Updated!'});
                $scope.release = ReleaseService.get({id: $routeParams.id});
                $anchorScroll();

              }, function err() {
                alert('Couldnt update!');
              });
        } else {
            //insert
          var tempRelease = $scope.release;
          $scope.release.$save(function () {
                alert('Record added');
          	$location.path('/releases/' + $scope.release.library_no);    
	  });


        }
      };



    $scope.deleteRelease = function () {
        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record?';
        var btns = [{
          result: 'cancel',
          label: 'Cancel'
        }, {
          result: 'ok',
          label: 'OK',
          cssClass: 'btn-primary'
        }];


        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function (result) {
            if (result === 'ok') {
              $scope.release.$delete({
                id: $routeParams.id
              }, function () {

                alert('Record deleted');
                $location.path('/releases');

              });
            }
          });
      };


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };

    $scope.add = function () {
              $location.path('/releases/new/release');
          };
        
        
        
  });
