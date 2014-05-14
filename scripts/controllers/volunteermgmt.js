'use strict';

app.controller('VolunteermgmtCtrl', function($rootScope, $scope, $http, $location, QualificationService, VolDepartmentsService, TrainingService, limitToFilter, $dialog) {

    //$scope.subscriberSearchFormData={};

    $scope.qualifications = QualificationService.query();
    $scope.voldepartments = VolDepartmentsService.query();
    $scope.training = TrainingService.query();


    var qualCell = '<input ng-class="\'colt\' + col.index" ng-model="row.entity[col.field]" ng-input="COL_FIELD" ng-on-blur="updateQualification(col, row);" />';


    $scope.gridQualOptions = {
        data: 'qualifications',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        showFilter: true,
        columnDefs: [{
            field: 'qualification',
            displayName: 'Qualification',
            enableCellEdit: true,
            editableCellTemplate: qualCell
        }, {
            field: '',
            cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteQualification(col, row);">&times;</button> ',
            width: 30
        }]
    };

    var depCell = '<input ng-class="\'colt\' + col.index" ng-model="row.entity[col.field]" ng-input="COL_FIELD" ng-on-blur="updateDepartment(col, row);" />';


    $scope.gridDepOptions = {
        data: 'voldepartments',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        showFilter: true,
        columnDefs: [{
            field: 'department',
            displayName: 'Department',
            enableCellEdit: true,
            editableCellTemplate: depCell
        }, {
            field: '',
            cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteDepartment(col, row);">&times;</button> ',
            width: 30
        }]
    };

    var trainCell = '<input ng-class="\'colt\' + col.index" ng-model="row.entity[col.field]" ng-input="COL_FIELD" ng-on-blur="updateTraining(col, row);" />';
    
    $scope.gridTrainingOptions = {
        data: 'training',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        showFilter: true,
        columnDefs: [{
            field: 'training',
            displayName: 'Training',
            enableCellEdit: true,
            editableCellTemplate: trainCell
        }, {
            field: '',
            cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteTraining(col, row);">&times;</button> ',
            width: 30
        }]
    };

    $scope.updateQualification = function(col, row) {
        $scope.qualification = QualificationService.get({
            id: row.entity.id
        });
        $scope.qualification.qualification = row.entity.qualification;
        $scope.qualification.$update({
            id: row.entity.id
        });
    };

    $scope.updateDepartment = function(col, row) {
        $scope.department = VolDepartmentsService.get({
            id: row.entity.id
        });
        $scope.department.department = row.entity.department;
        $scope.department.$update({
            id: row.entity.id
        });
    };

    $scope.updateTraining = function(col, row) {
        $scope.training_single = TrainingService.get({
            id: row.entity.id
        });
        $scope.training_single.training = row.entity.training;
        $scope.training_single.$update({
            id: row.entity.id
        });
    };

    $scope.addQualification = function(col, row) {
        $scope.qualification = new QualificationService;
        $scope.qualification.qualification = $scope.qualificationName;
        $scope.qualification.$save(function(u, res) {
            $scope.qualifications = QualificationService.query();
        });
    }

    $scope.addDepartment = function(col, row) {
        $scope.department = new VolDepartmentsService;
        $scope.department.department = $scope.departmentName;
        $scope.department.$save(function(u, res) {
            $scope.voldepartments = VolDepartmentsService.query();
        });
    }


    $scope.addTraining = function(col, row) {
        $scope.training_single = new TrainingService;
        $scope.training_single.training = $scope.trainingName;
        $scope.training_single.$save(function(u, res) {
            $scope.training = TrainingService.query();
        });
    }

    $scope.deleteQualification = function(col, row) {

        $scope.qualification = QualificationService.get({
            id: row.entity.id
        });

        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record? ' + row.entity.qualification;
        var btns = [{
            result: 'cancel',
            label: 'Cancel'
        }, {
            result: 'ok',
            label: 'OK',
            cssClass: 'btn-primary btn-danger'
        }];


        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function(result) {
                if (result === 'ok') {
                    $scope.qualification.$delete({
                        id: row.entity.id
                    }, function() {
                        $scope.qualifications = QualificationService.query();
                    });
                }
            });

    };

    $scope.deleteDepartment = function(col, row) {

        $scope.department = VolDepartmentsService.get({
            id: row.entity.id
        });

        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record? ' + row.entity.department;
        var btns = [{
            result: 'cancel',
            label: 'Cancel'
        }, {
            result: 'ok',
            label: 'OK',
            cssClass: 'btn-primary btn-danger'
        }];


        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function(result) {
                if (result === 'ok') {
                    $scope.department.$delete({
                        id: row.entity.id
                    }, function() {
                        $scope.voldepartments = VolDepartmentsService.query();
                    });
                }
            });

    };

    $scope.deleteTraining = function(col, row) {

        $scope.training_single = TrainingService.get({
            id: row.entity.id
        });

        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this record? ' + row.entity.training;
        var btns = [{
            result: 'cancel',
            label: 'Cancel'
        }, {
            result: 'ok',
            label: 'OK',
            cssClass: 'btn-primary btn-danger'
        }];


        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function(result) {
                if (result === 'ok') {
                    $scope.training_single.$delete({
                        id: row.entity.id
                    }, function() {
                        $scope.training = TrainingService.query();
                    });
                }
            });
    };

});
