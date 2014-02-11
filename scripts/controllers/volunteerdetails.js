'use strict';

app.controller('VolunteerDetailsCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, VolunteerService, SkillsNewService, SkillsService, QualificationService, $dialog, $location, limitToFilter, $anchorScroll, $filter, volunteer) {

		$scope.volunteer = ($stateParams.id) ? volunteer : new VolunteerService();
		$scope.alerts = [];
		$scope.qualifications = QualificationService.query()
		$scope.skillsold = SkillsService.query();

		$scope.skills = SkillsNewService.query(function(){
		// timeout to allow select2 to render initial values
		// see https://github.com/angular-ui/ui-select2/pull/136
			if ($scope.volunteer.skills) {
				var fakeInit = function() { $scope.skillsArr = _.pluck($scope.volunteer.skills, 'id'); }
				$timeout(fakeInit, 300);
			}
		});

		$scope.saveVolunteer = function() {

				if ($scope.volunteerForm.$valid === true) {
						if ($stateParams.id) {

								//update
								// delete $scope.sub.suburb; // delete suburb object
								// delete $scope.sub.pledges;
								// delete $scope.sub.bandmembers;
								// delete $scope.sub.subscription;
								$scope.volunteer.skills = $scope.skillsArr;

								$scope.volunteer.$update({ id: $stateParams.id }, function success(response) {
										$scope.volunteer = VolunteerService.get({ id: $stateParams.id }, function() {

												if ($scope.alerts.length > 0) {
														$scope.alerts.splice(0, 1);
												}
												$scope.alerts.push({
														msg: 'Volunteer ' + $scope.volunteer.subnumber + ' Updated!'
												});
												$anchorScroll();
										});

								}, function err() {
										console.log('Couldnt update!');
								});
						} else {
								//insert
								delete $scope.sub.suburb;
								delete $scope.sub.bandmembers;
								delete $scope.sub.subscription;

								if ($scope.sub.suburbid == null) {
										$scope.sub.suburbid = 1;
								} //BLANK SUBURB HACK! 

								$http.get(apiSrc + '/subscribers/lastrec/').success(function(data) {
										var log = [];
										angular.forEach(data, function(value, key) {
												var receipts = value.receiptnumber.split('-');
												this.push(parseInt(receipts[1]));
										}, log);

										var nlog = _.sortBy(log, function(num) {
												return num;
										});
										var latest = _.last(nlog)

										$scope.sub.receiptnumber = 'FD-' + (latest + 1);

										$scope.sub.$save(function(u, response) {
												alert('Subscriber added.');
												$location.path('/subscribers/' + $scope.sub.subnumber);

										});
								})



						}
				} else {
						$scope.notvalid = true;
				}


		};

		$scope.toggleOrientationDate = function() {
			var now = new Date();
			console.log('fired');
			$scope.volunteer.volunteer.completed_orientation_date = ($scope.volunteer.volunteer.completed_orientation) ? now : null;
		}

		$scope.deleteVolunteer = function() {
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
						.then(function(result) {
								if (result === 'ok') {
										$scope.sub.$delete({
												id: $stateParams.id
										}, function() {
												$rootScope.subscriberParams = {};
												alert('Record deleted.');
												$scope.clearForm();
										});
								}
						});
		};


		$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
		};






});
