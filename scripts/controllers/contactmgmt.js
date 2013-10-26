'use strict';

app.controller('ContactmgmtCtrl', function ($rootScope, $scope, $http, $location, $routeParams, DepartmentsService, InterestsService, limitToFilter, $dialog) {
        
        //$scope.subscriberSearchFormData={};
        
        $scope.categories = DepartmentsService.query();
        $scope.subcategories = InterestsService.query();

       
        var catCell ='<input ng-class="\'colt\' + col.index" ng-model="row.entity[col.field]" ng-input="COL_FIELD" ng-on-blur="updateCategories(col, row);" />';
        
    
        $scope.gridCategoryOptions = { 
            data: 'categories', 
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            showFilter: true,
            columnDefs: [
                {field: 'department_nm', displayName: 'Category', enableCellEdit: true, editableCellTemplate: catCell}, 
                {field:'', cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteCategory(col, row);">&times;</button> ', width: 30}
            ]
        };

        var subCatCell ='<input ng-class="\'colt\' + col.index" ng-model="row.entity[col.field]" ng-input="COL_FIELD" ng-on-blur="updateSubcategories(col, row);" />';
       
        $scope.gridSubcategoryOptions = { 
            data: 'subcategories', 
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            showFilter: true,
            columnDefs: [
                {field:'interest_nm', displayName: 'Subcategory', enableCellEdit: true, editableCellTemplate: subCatCell}, 
                {field:'', cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteSubcategory(col, row);">&times;</button> ', width: 30}
          ]
        };
    
        
    
        $scope.updateCategories = function(col, row){
            $scope.category = DepartmentsService.get({id: row.entity.department_no});
            $scope.category.department_nm = row.entity.department_nm;
            $scope.category.$update({id: row.entity.department_no});   
              
        };
    
        $scope.addCategory = function(col, row){
            $scope.category = new DepartmentsService;
            $scope.category.department_nm = $scope.department_nm;
            $scope.category.$save(function(u, res) {   
                $scope.categories  = DepartmentsService.query();
            }); 
        };
    
        $scope.updateSubcategories = function(col, row){
            $scope.subcategory = InterestsService.get({id: row.entity.interest_no});
            $scope.subcategory.interest_nm = row.entity.interest_nm;
            $scope.subcategory.$update({id: row.entity.interest_no});   
              
        };
    
        $scope.addSubcategory = function(col, row){
            $scope.subcategory = new InterestsService;
            $scope.subcategory.interest_nm = $scope.interest_nm;
            $scope.subcategory.$save(function(u, res) {   
                $scope.subcategories  = InterestsService.query();
            }); 
        };
    
    
        $scope.deleteCategory = function(col, row) {
            
            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? '+row.entity.department_nm;
            var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary btn-danger'}];
            
            
            $dialog.messageBox(title, msg, btns)
              .open()
              .then(function(result){
                if (result === 'ok') {
                    $scope.category.$delete({id: row.entity.department_no}, function() {
                            $scope.categories  = DepartmentsService.query();
                    });
                }
            });
                
        };
    
       $scope.deleteSubcategory = function(col, row) {
            
            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? '+row.entity.interest_nm;
            var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary btn-danger'}];
            
            
            $dialog.messageBox(title, msg, btns)
              .open()
              .then(function(result){
                if (result === 'ok') {
                    $scope.subcategory = InterestsService.get({id: row.entity.interest_no});
                    $scope.subcategory.$delete({id: row.entity.interest_no}, function() {
                            $scope.subcategories  = InterestsService.query();
                    });
                }
            });
                
        };
  
    });
