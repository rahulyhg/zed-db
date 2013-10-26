'use strict';

app.controller('SubscriberreportCtrl', function ($rootScope, $scope, $http, $timeout, $filter, $location, promiseTracker, $routeParams, SubReportService, SkillsService, SubService, SubtypesService, ProgramsService, PrizesService, limitToFilter) {
        

        $scope.rTracker = promiseTracker('rTracker');
        if ($rootScope.printBuffer) { 
            $scope.subs = $rootScope.printBuffer; 
            $scope.subscriberSearchFormData = $rootScope.formBuffer;
            delete $rootScope.printBuffer;
            delete $rootScope.formBuffer;
        }
        $scope.subscriberSearchFormData = {};
        $scope.subscriberSearchFormData.programid = {};


        $scope.skills = SkillsService.query();
        $scope.subtypes = SubtypesService.query();
        $scope.programs = ProgramsService.query();
	$scope.prizes = PrizesService.query();
        $scope.subscriberSearchFormData.programid = [];
        $scope.subscriberSearchFormData.skillid = [];

        $scope.suburbsuggest = function (suburbName) {
            return $http.get(apiSrc + '/suburbsuggest/' + suburbName).then(function (response) {
                return limitToFilter(response.data, 15);
                
            });
        };

        $scope.gridSubOptions = { 
            data: 'subs', 
            enableCellSelection: false,
            enableRowSelection: false,
            enableCellEdit: false,
            showFilter: true,
            showFooter: true,
            columnDefs: [
                {field: 'subnumber', displayName: 'Sub No', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="#/subscribers/{{COL_FIELD}}">{{COL_FIELD}}</a></span></div>'},
                {field: 'sublastname', displayName: 'Last Name'},
                {field: 'subfirstname', displayName: 'First Name'},
                {field: 'subemail', displayName: 'Email'},
                {field: 'submobile', displayName: 'Phone'},
                {field: 'posted', displayName:'Posted?',  cellTemplate:'<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="row.entity[col.field]" ng-change="updatePosted(col, row)" ng-checked="row.entity[col.field]" /></div>', sortable:false, width:50},
                {field: 'subscription.subtypecode', displayName: 'Sub Type'},

	//hidden columns for csv
                
                {field: 'subaddress1', visible: false},
                {field: 'subaddress2', visible: false},
                {field: 'suburb.suburb', visible: false},
                {field: 'suburb.postcode', visible: false},
                {field: 'suburb.state', visible: false},
                {field: 'expirydate', visible: false},
                {field: 'paymentdate', visible: false},
                {field: 'receiptnumber', visible: false},
                {field: 'suburl', visible: false},
                {field: 'subhomephone', visible: false},
                {field: 'gender', visible: false},
                {field: 'subcomment', visible: false},
                {field: 'submusicanname', visible: false},
                {field: 'subbandname', visible: false},
                {field: 'subbusinessname', visible: false},
                {field: 'subcommunitygroup', visible: false},
                {field: 'subartistname', visible: false},
                {field: 'fl_announcer', visible: false},
                {field: 'fl_volunteer', visible: false},
                {field: 'petname', visible: false},
                {field: 'donation', visible: false},
                {field: 'subskill', visible: false},
                {field: 'subskilldesc', visible: false},
                {field: 'createddate', visible: false},
                {field: 'created_at', visible: false}

            ],
            plugins: [new ngGridCsvExportPlugin()]
        };


         $scope.gridPledgeOptions = { 
            data: 'pledges', 
            enableCellSelection: false,
            enableRowSelection: false,
            enableCellEdit: false,
            showFilter: true,
            showFooter: true,
            showGroupPanel: true,
            groups: ['subscriber.subscription.subtypecode'],
            groupsCollapsedByDefault: false,
            aggregateTemplate: '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText">   Total Pledges for <strong>{{row.label}}</strong>: <strong>{{sumSubRows(row) | currency}} </strong>({{row.totalChildren()}})</span> <div class="{{row.aggClass()}}"></div> </div>',
            columnDefs: [

                {field: 'subscriber.subnumber', displayName: 'Sub No', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="#/subscribers/{{COL_FIELD}}">{{COL_FIELD}}</a></span></div>'},
                {field: 'pledgeid', displayName: 'ID'},
		{field: 'subscriber.sublastname', displayName: 'Last Name'},
                {field: 'subscriber.subfirstname', displayName: 'First Name'},
                {field: 'subscriber.subemail', displayName: 'Email'},
                {field: 'subscriber.submobile', displayName: 'Phone'},
                {field: 'subscriber.subscription.subtypecode', displayName: 'Sub Type'},
                {field: 'subscriber.subscription.subtypevalue', displayName: 'Sub Value', cellFilter: 'currency'},
                {field: 'paymentdate', displayName: 'Pledge Payment Date', cellFilter: 'date'},
                {field: 'subscriber.paymentdate', displayName: 'Paid Date', cellFilter: 'date'}
            ],
            plugins: [new ngGridCsvExportPlugin()]
        };

        $scope.gridSubCount = { 
            data: 'counts', 
            enableCellSelection: false,
            enableRowSelection: false,
            enableCellEdit: false,
            showFilter: true,
            showFooter: false,
            columnDefs: [
                {field: 'subtype', displayName: 'Sub Type'},
                {field: 'subtypecount', displayName: '# Subs'}
            ],
            plugins: [new ngGridCsvExportPlugin()]
        };

        $scope.sumSubRows = function(cur) {
            var tot = 0;
      
              angular.forEach(cur.children, function(a) {
                tot = tot + parseInt(a.entity.subscriber.subscription.subtypevalue);
            });
              return tot;
              
        };

        $scope.expiresToday = function () {
            $scope.clearForm();
            var td = new Date();
            var today = $filter('date')(td, 'yyyy-MM-dd');
            $http.get(apiSrc + '/subscribers/expired/' + today, {tracker:'rTracker'}).then(function (response) {
                $scope.subs = response.data;
                $scope.emails = $scope.emailList(response.data);

            });
        };


        $scope.activeSubs = function () {
            $scope.clearForm();
            $http.get(apiSrc + '/subscriber/types/', {tracker:'rTracker'}).then(function (response) {
                $scope.counts = response.data;
                var subtt = 0
                var totals = _.pluck(response.data, 'subtypecount');
                $scope.subsSum = _.reduce(totals, function(memo, num){ return memo + parseInt(num); }, 0);
                
            });
        };

        $scope.unpaidSubs = function () {
            $scope.clearForm();
            $http.get(apiSrc + '/subscribers/unpaid/', {tracker:'rTracker'}).then(function (response) {
                $scope.subs = response.data;
                $scope.emails = $scope.emailList(response.data);
            });
        };

        $scope.paidToday = function () {
            $scope.clearForm();
            $http.get(apiSrc + '/subscribers/paid/', {tracker:'rTracker'}).then(function (response) {
                $scope.subs = response.data;
                $scope.emails = $scope.emailList(response.data);
            });
        };

        $scope.pledgeOut = function () {
            $scope.clearForm();
            $http.get(apiSrc + '/subscribers/pledgenew/', {tracker:'rTracker'}).then(function (response) {
		var wsub = _.filter(response.data, function(d){ 
                        if (d.subscriber) {
                            return d;
                        }
                });
                $scope.pledges = wsub;
		var text ='';
            angular.forEach(wsub, function(d){
                if(d.subscriber.subemail != null && d.subscriber.subemail != '') {  text = text +  d.subscriber.subemail + ', '; }
            });
            $scope.emails = text.substring(0, text.length - 2);          

  
	  });
        };

        $scope.unPosted = function() {
            $scope.clearForm();
            $http.get(apiSrc + '/subscribers/notposted/', {tracker:'rTracker'}).then(function (response) {
                $scope.subs = response.data;      
                $scope.emails = $scope.emailList(response.data);

            });
            
        }

        $scope.getEmailList = function() {
            $scope.clearForm();
            $http.get(apiSrc + '/subscriber/emaillist/', {tracker:'rTracker'}).then(function (response) {   
                $scope.emails = $scope.emailListn(response.data);
            });   
        }

	$scope.emailListn = function(data) {
            var text ='';
            angular.forEach(data, function(d){
                
                if(d.subemail != null && d.subemail != '') {  text = text +  d.subemail + '\n '; }
            });

            text = text.substring(0, text.length - 2);
            return text;
          }

        $scope.updatePosted = function(col, row){
            $scope.sub = SubService.get({id: row.entity.subnumber});
            if (row.entity.posted == false) {row.entity.posted = 0; }
            
            $scope.sub.posted = row.entity.posted;
            $scope.sub.$update({id: row.entity.subnumber},
                function success(response) {
                    $scope.unPosted();
            });

        };

        $scope.emailList = function(data) {
            var text ='';
            angular.forEach(data, function(d){
                
                if(d.subemail != null && d.subemail != '') {  text = text +  d.subemail + ', '; }
            });

            text = text.substring(0, text.length - 2);
            return text;
          }
                
        $scope.search = function() {
          
                if ($scope.subscriberSearchForm.$dirty === true) {
                    
                    $http.post(apiSrc + '/subscriber/report/', $scope.subscriberSearchFormData, {tracker:'rTracker', headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                        .then(function(response) {

                            $scope.subs  = response.data;
                            $scope.emails = $scope.emailList(response.data);       
                        });
                    

            } else {
                console.log('no search!');        
            }
        };
        
        
         $scope.clearForm = function() {
            $scope.subs = {};
            $scope.subscriberSearchFormData = {};
            $scope.subscriberSearchForm.$setPristine();
        
        };
        
        $scope.onSuburbChange = function ($item, $model, $label) {
            
          //item = suburb object, model = val (id), label = name
            
            $scope.subscriberSearchFormData.postcode = $item.postcode;

        };

        $scope.goToPost = function () {
         
            $location.path('#/subscriber/report/post/outstanding');
        };

         $scope.goToPrint = function () {
     
            $rootScope.printBuffer = $scope.subs;
            $rootScope.formBuffer = $scope.subscriberSearchFormData;
            $location.path('print');
        };

$scope.getSubsByPrize = function($radiothonprizeid) {
        $http.get(apiSrc + '/subscribers/reports/pledge/' + $radiothonprizeid, {tracker:'rTracker'}).then(function (response) {
            var subs = _.pluck(response.data, 'subscriber');

            var truesubs = _.filter(subs, function(s){ 
                if (s !== null) {
                    return s;
                }
            });
            $scope.subs = truesubs;
                //$scope.emails = $scope.emailList(response.data);

        });
    }

    $scope.getRDraw = function($radiothonprizeid) {
         $http.get(apiSrc + '/subscribers/reports/pledge/' + $radiothonprizeid, {tracker:'rTracker'}).then(function (response) {
            var subs = _.pluck(response.data, 'subscriber');

            var truesubs = _.filter(subs, function(s){ 
                if (s !== null) {
                    return s;
                }
            });
            var r = Math.floor(Math.random()*(truesubs.length-0+1)+0);
            $scope.draw = truesubs[r];
        });
    }

//experimantal - kendo chart
        $scope.pie = ({

            title: {
                    text: "Active Subs"
                },
                dataSource: {
                    data: $scope.counts
                },
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        background: "transparent"
                    }
                },
                series: [{
                    field: "subtypecount",
                    
                }],
                categoryAxis: {
                    field: "subtype",
                    majorGridLines: {
                        visible: false
                    },
                    line: {
                        visible: false
                    }
                }
    
  });

      
    });

