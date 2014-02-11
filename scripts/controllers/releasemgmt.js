'use strict';

app.controller('ReleasemgmtCtrl', function ($rootScope, $scope, $http, $location, ThemesService, GenresNewService, limitToFilter, $dialog) {

        //$scope.subscriberSearchFormData={};

        $scope.themes = ThemesService.query();
        $scope.genres = GenresNewService.query();

        var eCell ="<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateSkills(col, row);\" />";
       var checkboxCellTemplate='<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="row.entity[col.field]" ng-checked="row.entity[col.field]" /></div>';

        $scope.gridThemesOptions = {
            data: 'themes',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            showFilter: true,
            columnDefs: [
              {field: 'theme_desc', displayName: 'Theme', enableCellEdit: true, editableCellTemplate: "<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateThemes(col, row);\" />"},
            {field:'', cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteTheme(col, row)">&times;</button> ', width: 30}
          ]
        };

        $scope.gridGenresOptions = {
            data: 'genres',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            showFilter: true,
            columnDefs: [

                {field:'genre', displayName: 'Genre', enableCellEdit: true, editableCellTemplate: "<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateGenres(col, row);\" />"},
                {field:'', cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteGenre(col, row)">&times;</button> ', width: 30}
          ]
        };


        $scope.updateThemes = function(col, row){
            $scope.theme = ThemesService.get({id: row.entity.theme_id});
            $scope.skill.theme_desc = row.entity.theme_desc;
            $scope.theme.$update({id: row.entity.theme_id});

        };

        $scope.addTheme = function(col, row){
            $scope.theme = new ThemesService;
            $scope.theme.theme_desc = $scope.theme_desc;
            $scope.theme.$save(function(u, res) {
                $scope.themes  = ThemesService.query();
            });
        };

        $scope.updateGenres = function(col, row){
            $scope.genre = GenresNewService.get({id: row.entity.id});
            $scope.genre.genre = row.entity.genre;
            $scope.genre.$update({id: row.entity.id});

        };

        $scope.addGenre = function(col, row){
            $scope.genre = new GenresNewService;
            $scope.genre.genre = $scope.genre_desc;
            $scope.genre.$save(function(u, res) {
                alert('Genre added');
                $scope.genres  = GenresNewService.query();
              $scope.genre_desc = '';
            });
        };


        $scope.deleteTheme = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? '+row.entity.theme_desc;
            var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary btn-danger'}];


            $dialog.messageBox(title, msg, btns)
              .open()
              .then(function(result){
                if (result === 'ok') {
                    $scope.theme = ThemesService.get({id: row.entity.theme_id});
                    $scope.theme.$delete({id: row.entity.theme_id}, function() {
                            $scope.themes  = ThemesService.query();
                    });
                }
            });

        };

       $scope.deleteGenre = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? '+row.entity.genre;
            var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary btn-danger'}];


            $dialog.messageBox(title, msg, btns)
              .open()
              .then(function(result){
                if (result === 'ok') {
                    $scope.genre = GenresNewService.get({id: row.entity.id});
                    $scope.genre.$delete({id: row.entity.id}, function() {
                            $scope.genres  = GenresNewService.query();
                    });
                }
            });

        };

    });
