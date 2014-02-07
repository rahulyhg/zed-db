'use strict';

app.controller('UserCtrl', function ($rootScope, $scope, $http, $location, UserService, RolesService, $dialog, limitToFilter) {

    $scope.contactSearchFormData={};


    $scope.users = UserService.query(function(u, getResponseHeaders){
        //set order of display
        $scope.predicate = 'id';
    });

    $scope.roles = RolesService.query();

    $scope.gridUsers = {
        data: 'users',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        showFilter: true,
        columnDefs: [
            {
                field: 'username',
                displayName: 'User',
                enableCellEdit: true,
                editableCellTemplate: "<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateUser(col, row);\" />"},
            {
                field: 'role_id',
                displayName: 'Role',
                cellTemplate: '<div><select class="input-medium" ng-model="row.entity.role_id" ng-options="r.id as r.rolename for r in roles" ng-change="updateUser(col, row)"></select></div>',
                sortable: false,
                width: 180
            },
            {
                field: 'password',
                displayName: 'Password',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>&#42;&#42;&#42;&#42;&#42;&#42;</span></div>',
                enableCellEdit: true,
                editableCellTemplate: "<input ng-class=\"'colt' + col.index\" type=\"password\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateUser(col, row);\" />"},
            {
                field:'',
                cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteUser(col, row)">&times;</button> ',
                width: 30}
      ]
    };

    $scope.updateUser = function(col, row){
        $scope.user = UserService.get({id: row.entity.id});
        $scope.user.username = row.entity.username;
        if (row.entity.password)
            $scope.user.password = row.entity.password;
        $scope.user.role_id = row.entity.role_id;
        $scope.user.$update({id: row.entity.id});

    };

    $scope.addUser = function(col, row){
        $scope.user = new UserService;
        $scope.user.username = $scope.userform.username;
        $scope.user.password = $scope.userform.password;
        $scope.user.role_id = $scope.userform.role_id;
        $scope.user.$save(function(u, res) {
            $scope.users  = UserService.query();
        });
    };

    $scope.deleteUser = function(col, row) {

        var title = 'Warning';
        var msg = 'Are you sure you wish to delete this user? '+row.username;
        var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary btn-danger'}];


        $dialog.messageBox(title, msg, btns)
          .open()
          .then(function(result){
            if (result === 'ok') {
                $scope.user = UserService.get({id: row.entity.id});
                $scope.user.$delete({id: row.entity.id}, function() {
                        $scope.users  = UserService.query();
                });
            }
        });

    };


        $scope.search = function() {

                if ($scope.contactSearchForm.$dirty === true) {

                    var params = $scope.contactSearchFormData;
                    // search with qstring - return LIST of results from resource
                    $scope.contacts = ContactService.query(params, function(){

                    //set order of display
                    $scope.predicate = 'createddate';
                    $rootScope.contactParams = params;
                    });

            } else {
                console.log('no search shit!');
            }
        };


         $scope.clearForm = function() {
            $scope.contactSearchFormData = {};
            $scope.contactSearchFormData.interest_sun = [];
            $scope.contactSearchForm.$setPristine();
            delete $rootScope.contactParams;
            $scope.contacts = {};
        };

        //add new
        $scope.add = function () {
            $location.path('/contacts/new/contact');
        };

    });
