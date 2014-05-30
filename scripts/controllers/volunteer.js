'use strict';

app.controller('VolunteerCtrl', function ($rootScope, $scope, $http, $location, SubService, TrainingService, VolDepartmentsService, SkillsNewService, limitToFilter) {

		$scope.volunteerSearchFormData={};
		$scope.training = TrainingService.query();
		$scope.departments = VolDepartmentsService.query();
	$scope.departments = VolDepartmentsService.query(function(data, status) {
        $scope.volunteerSearchFormData.department_id = [];
    });
		$scope.skills = SkillsNewService.query();

		$scope.volsuggest = function (subName) {
			return $http.get(apiSrc + '/volsuggest/' + subName).then(function (response) {
				return limitToFilter(response.data, 15);
			});
		};

		$scope.search = function() {

			if ($scope.volunteerSearchForm.$dirty === true) {
				if ($scope.volunteerSearchFormData.subName) {
					// add operator to sub search
					Object.defineProperty($scope.volunteerSearchFormData, 'operator', {value : 'AND',
								   writable : true,
								   enumerable : true,
								   configurable : true});


					//split and flip full name from typeahead
					var re = /,\s*/;
					if ($scope.volunteerSearchFormData.subName.search(re) !== -1){
						var nameList = $scope.volunteerSearchFormData.subName.split(re);
						nameList.reverse()
						$scope.volunteerSearchFormData.subfirstname = nameList[0];
						$scope.volunteerSearchFormData.sublastname = nameList[1];

					} else {

						// no typeahed, check for space? 2 names : 1 name
						var subre = /\s/;
						if ($scope.volunteerSearchFormData.subName.search(subre) !== -1){

							var nameList = $scope.volunteerSearchFormData.subName.split(subre);
							$scope.volunteerSearchFormData.subfirstname = nameList[0];
							$scope.volunteerSearchFormData.sublastname = nameList[1];
							$scope.volunteerSearchFormData.operator = 'AND';

						} else {
							$scope.volunteerSearchFormData.subfirstname = $scope.volunteerSearchFormData.subName;
							$scope.volunteerSearchFormData.sublastname = $scope.volunteerSearchFormData.subName;
							$scope.volunteerSearchFormData.operator = 'OR';
						}

					}
				}

				var params = $scope.volunteerSearchFormData;
				$rootScope.subName = params.subName;
				//delete params.subName;

				$http.post(apiSrc + '/volunteerssearch', params ).success(function (response) {
						var foo = _.filter(response, function(vol){ return vol.fl_volunteer == true });
						$scope.volunteers = foo;
				});

			} else {
				console.log('no search shit!');

			}
		};


		$scope.clearForm = function() {
			$location.path('/volunteers');
			delete $rootScope.volunteerParams;
			delete $rootScope.subName;
			$scope.volunteers = {};
			$scope.volunteerSearchFormData = {};
			// $scope.volunteerSearchFormData.subName = '';
			$scope.volunteerSearchForm.$setPristine();
		};

		$scope.add = function () {
			$location.path('/volunteers/new/volunteer');
		};


	});

