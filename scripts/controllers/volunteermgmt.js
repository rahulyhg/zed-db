'use strict';

app.controller('VolunteermgmtCtrl', function($rootScope, $scope, $http, $location, QualificationService, VolDepartmentsService, limitToFilter, $dialog) {

    //$scope.subscriberSearchFormData={};

    $scope.qualifications = QualificationService.query();
    $scope.voldepartments = VolDepartmentsService.query();


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


});
