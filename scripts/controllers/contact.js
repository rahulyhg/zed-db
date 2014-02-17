'use strict';

app.controller('ContactCtrl', function($rootScope, $scope, $http, $location, $stateParams, ContactService, DepartmentsService, InterestsService, limitToFilter, promiseTracker) {

	$scope.contactSearchFormData = {};
	$scope.rTracker = promiseTracker('rTracker');

	$scope.gridContacts = {
        data: 'contacts',
        enableCellSelection: false,
        enableRowSelection: false,
        enableCellEdit: false,
        showFilter: true,
        columnDefs: [{
            field: 'org_nm',
            displayName: 'Organisation'
        }, {
            field: 'contact_nm',
            displayName: 'Contact Name',
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="/contacts/{{row.entity.contact_no}}">{{row.getProperty(col.field)}}</a></span></div>'
        }, {
            field: 'email',
            displayName: 'Email'
        }, {
            field: 'work_ph',
            displayName: 'Phone'
        }]
    };

	if ($rootScope.contactParams) {
		$scope.contacts = ContactService.query($rootScope.contactParams, function(u, getResponseHeaders) {

			//set order of display
			$scope.predicate = 'createddate';
			$scope.contactSearchFormData = $rootScope.contactParams;
			delete $rootScope.contactParams;
		});
	}

	$scope.departments = DepartmentsService.query(function(data, status) {
        $scope.contactSearchFormData.dept_sun = [];
    });

    $scope.interests = InterestsService.query(function(data, status) {
        $scope.contactSearchFormData.interest_sun = [];
    });

	$scope.contactsuggest = function(orgName) {
		return $http.get(apiSrc + '/contactsuggest/' + orgName).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};

	$scope.search = function() {

		if ($scope.contactSearchForm.$dirty === true) {

			var params = $scope.contactSearchFormData;
			$scope.contacts = ContactService.query(params);
			$scope.rTracker.addPromise($scope.contacts);
			$scope.contacts.$then(function(u, getResponseHeaders) {

				//set order of display
				$scope.predicate = 'createddate';
				$rootScope.contactParams = params;

			});

		} else {
			console.log('no search shit!');
		}
	};


	$scope.clearForm = function() {
		$location.path('/contacts');
		$scope.contactSearchFormData = {};
		$scope.contactSearchFormData.interest_sun = [];
		$scope.contactSearchForm.$setPristine();
		delete $rootScope.contactParams;
		$scope.contacts = {};
	};

	//add new
	$scope.add = function() {
		$location.path('/contacts/new/contact');
	};

});
