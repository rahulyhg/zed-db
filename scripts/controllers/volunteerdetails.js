'use strict';

app.controller('VolunteerDetailsCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, VolunteerService, VolDepartmentsService, SkillsNewService, SkillsService, QualificationService, $dialog, $location, limitToFilter, $anchorScroll, $filter, volunteer) {

    $scope.volunteer = ($stateParams.id) ? volunteer : new VolunteerService();
    $scope.alerts = [],
    $scope.qArr = [],
    $scope.skillsArr = [];
    var now = new Date(),
        exdate = new Date($scope.volunteer.expirydate);
    $scope.subactive = (exdate > now) ? 1 : 0;


    $scope.qualifications = QualificationService.query(function() {
        if ($scope.volunteer.qualifications) {
            var fakeQ = function() {
                $scope.qArr = _.pluck($scope.volunteer.qualifications, 'id');
            };
            $timeout(fakeQ, 300);
        }
    });

    $scope.departments = VolDepartmentsService.query(function() {
        if ($scope.volunteer.voldepartments) {
            var fakeQ = function() {
                $scope.vdArr = _.pluck($scope.volunteer.voldepartments, 'id');
            };
            $timeout(fakeQ, 300);
        }
    });


    $scope.skillsold = SkillsService.query();
    $scope.availability = ['full time', 'part time', 'student', 'under 18'];

    $scope.skills = SkillsNewService.query(function() {
        // timeout to allow select2 to render initial values
        // see https://github.com/angular-ui/ui-select2/pull/136
        if ($scope.volunteer.skills) {
            var fakeInit = function() {
                $scope.skillsArr = _.pluck($scope.volunteer.skills, 'id');
            }
            $timeout(fakeInit, 300);
        }
    });

    $scope.saveVolunteer = function() {

        if ($scope.volunteerForm.$valid === true) {
            if ($stateParams.id) {

                $scope.volunteer.skills = $scope.skillsArr;
                $scope.volunteer.qualifications = $scope.qArr;
                $scope.volunteer.departments = $scope.vdArr;

                $scope.volunteer.$update({
                    id: $stateParams.id
                }, function success(response) {
                    $scope.volunteer = VolunteerService.get({
                        id: $stateParams.id
                    }, function() {

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
