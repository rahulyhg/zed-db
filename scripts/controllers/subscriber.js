'use strict';

app.controller('SubscriberCtrl', function($rootScope, $scope, $http, $location, SubService, SubtypesService, ProgramsService, limitToFilter) {

    $scope.subscriberSearchFormData = {};
    $scope.subtypes = SubtypesService.query();
    $scope.programs = ProgramsService.query();

    if ($rootScope.subscriberParams) {
        $scope.subscribers = SubService.query($rootScope.subscriberParams, function(u, getResponseHeaders) {

            //set order of display
            $scope.predicate = 'createddate';

            $scope.subscriberSearchFormData.subName = $rootScope.subName;
            delete $rootScope.subscriberParams;
            delete $rootScope.subName;
        });
    }

    $scope.gridSubs = {
        data: 'subscribers',
        enableCellSelection: false,
        enableRowSelection: false,
        enableCellEdit: false,
        showFilter: true,
        showFooter: true,
        columnDefs: [{
            field: 'subname',
            displayName: 'Name',
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="/subscribers/{{row.entity.subnumber}}">{{row.entity.subfirstname}} {{row.entity.sublastname}}</a></span></div>'
        }, {
            field: 'subemail',
            displayName: 'Email'
        }, {
            field: 'subnumber',
            displayName: 'Sub No',
        }, {
            field: 'submobile',
            displayName: 'Phone'
        }, {
            field: 'subbusinessname',
            displayName: 'Business Name'
        },{
            field: 'subbandname',
            displayName: 'Band Name'
        }, {
            field: 'subpetname',
            displayName: 'Pet Name'
        }, {
            field: 'subscription.subtypecode',
            displayName: 'Sub Type'
        }],
        plugins: [new ngGridCsvExportPlugin(), new ngGridFlexibleHeightPlugin()]
    };

    $scope.subsuggest = function(subName) {
        return $http.get(apiSrc + '/subsuggest/' + subName).then(function(response) {
            return limitToFilter(response.data, 15);
        });
    };

    $scope.suburbsuggest = function(suburbName) {
        return $http.get(apiSrc + '/suburbsuggest/' + suburbName).then(function(response) {
            return limitToFilter(response.data, 15);
        });
    };

    $scope.search = function() {

        if ($scope.subscriberSearchForm.$dirty === true) {
            // add operator to sub search
            Object.defineProperty($scope.subscriberSearchFormData, 'operator', {
                value: 'AND',
                writable: true,
                enumerable: true,
                configurable: true
            });


            //split and flip full name from typeahead
            if ($scope.subscriberSearchFormData.subName) {
                var re = /,\s*/;
                if ($scope.subscriberSearchFormData.subName.search(re) !== -1) {
                    var nameList = $scope.subscriberSearchFormData.subName.split(re);
                    nameList.reverse()
                    $scope.subscriberSearchFormData.subfirstname = nameList[0];
                    $scope.subscriberSearchFormData.sublastname = nameList[1];
                } else {
                    // no typeahed, check for space? 2 names : 1 name
                    var subre = /\s/;
                    if ($scope.subscriberSearchFormData.subName.search(subre) !== -1) {

                        var nameList = $scope.subscriberSearchFormData.subName.split(subre);
                        $scope.subscriberSearchFormData.subfirstname = nameList[0];
                        $scope.subscriberSearchFormData.sublastname = nameList[1];
                        $scope.subscriberSearchFormData.operator = 'AND';

                    } else {
                        $scope.subscriberSearchFormData.subfirstname = $scope.subscriberSearchFormData.subName;
                        $scope.subscriberSearchFormData.sublastname = $scope.subscriberSearchFormData.subName;
                        $scope.subscriberSearchFormData.operator = 'OR';
                    }
                }
            }


            var params = $scope.subscriberSearchFormData;

            $rootScope.subName = params.subName;
            delete params.subName;
            // search with qstring - return LIST of results from resource
            $scope.subscribers = SubService.query(params, function(u, getResponseHeaders) {

                //set order of display
                $scope.predicate = 'createddate';
                $rootScope.subscriberParams = $scope.subscriberSearchFormData;

            });

        } else {
            console.log('no search shit!');

        }
    };

    $scope.onSuburbChange = function($item, $model, $label) {
        //item = suburb object, model = val (id), label = name
        $scope.subscriberSearchFormData.postcode = $item.postcode;
    };

    $scope.clearForm = function() {
        $location.path('/subscribers');
        delete $rootScope.subscriberParams;
        delete $rootScope.subName;
        $scope.subscribers = {};
        $scope.subscriberSearchFormData = {};
        // $scope.subscriberSearchFormData.subName = '';
        $scope.subscriberSearchForm.$setPristine();
    };

    $scope.add = function() {
        $location.path('/subscribers/new/subscriber');
    };


});
