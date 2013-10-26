'use strict';

app.controller('ContactdetailsCtrl', function ($scope, $routeParams, $http, ContactService, DepartmentsService, InterestsService, $dialog, $location, limitToFilter, contact, $anchorScroll) {

    
    

    //set vars for constants 
    $scope.alerts = [];
    $scope.consuggest = [];
    $scope.submitType = ($location.path() == '/contacts/new/contact') ? 'Add Contact' : 'Update';

    if ($routeParams.id) {
      $scope.contact = contact;
    } else {
      $scope.contact= new ContactService();
    }

    $scope.suburbsuggest = function (suburbName) {
            return $http.get(apiSrc + '/suburbsuggest/' + suburbName).then(function (response) {
                return limitToFilter(response.data, 15);
                
            });
        };
    
    $scope.conCheck = function (org_nm) {
             $http.get(apiSrc + '/concheck/' + org_nm).then(function (response) {
                $scope.consuggest = response.data;
            });
        };  
        
    $scope.departments = DepartmentsService.query();
    $scope.interests = InterestsService.query();

    $scope.saveContact = function () {

        if ($routeParams.id) {
            //update

            $scope.contact.$update({id: $routeParams.id}, function success(response) {
                if ($scope.alerts.length > 0) {
                    $scope.alerts.splice(0, 1);
                }
                $scope.alerts.push({
                    msg: 'Contact ' + $routeParams.id + ' Updated!'
                });
                
                $scope.contact = ContactService.get({id: $routeParams.id});
               $anchorScroll(); 

            }, function err() {
                console.log('Couldnt update!');
            });
            
        } else {
            //insert
           
            /*$scope.contact.$save();
            alert('Contact added');
            $location.path('/contacts');*/

            $http.post(apiSrc + '/contacts/', $scope.contact).success(function(data){
                var matches = data.match(/int\((\d+)\)/);
                $scope.contact = ContactService.get({id: matches[1]}, function() { 
                    alert('Contact added.');
                    $location.path('/contacts/' + $scope.contact.contact_no);
		});

            });
        }
    };



    $scope.deleteContact = function () {
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
                $scope.contact.$delete({
                    id: $routeParams.id
                }, function () {

                    alert("Record deleted");
                    $location.path('/contacts');

                });
            }
        });
    };


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.onSuburbChange = function ($item, $model, $label) {
            
          //item = suburb object, model = val (id), label = name
          
          $scope.contact.postcode = $item.postcode;
          $scope.contact.state = $item.state;
        };

});
