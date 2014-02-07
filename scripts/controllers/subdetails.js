'use strict';

app.controller('SubdetailsCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, SubService, promiseTracker, SkillsService, ProgramsService, PledgeService, PrizesService, SubtypesService, $dialog, $location, limitToFilter, $anchorScroll, $filter) {



    $scope.subTracker = promiseTracker('subTracker');

    //var for access levels
    //$scope.user =  SessionService.get('user'); 

    //$scope.userRoles = AuthenticationService.userRoles;
    //$scope.accessLevels = AuthenticationService.accessLevels;

    //set vars for constants 
    $scope.submitType = ($location.path() === '/subscribers/new/subscriber') ? 'Add Subscriber' : 'Update';
    $scope.alerts = [];
    $scope.subsuggest = [];
    $scope.gender = [{
        id: 1,
        desc: 'MALE'
    }, {
        id: 2,
        desc: 'FEMALE'
    }, {
        id: 3,
        desc: 'TRANS'
    }];

    $scope.skills = SkillsService.query();
    $scope.programs = ProgramsService.query();
    $scope.subtypes = SubtypesService.query();
    $scope.prizes = PrizesService.query();

    if ($stateParams.id) {

        //$scope.sub = subscriber;

        var subPromise = SubService.get({
            id: $stateParams.id
        }, function() {

            if ($scope.sub.paymentdate) $scope.sub.paymentdate = new Date($scope.sub.paymentdate);
            if ($scope.sub.expirydate) $scope.sub.expirydate = new Date($scope.sub.expirydate);
            if ($scope.sub.pledge) {
                if ($scope.sub.pledge.paymentdate != null) {
                    $scope.sub.pledge.paymentdate = new Date($scope.sub.pledge.paymentdate);
                }

            }

            var now = new Date();
            var exdate = new Date($scope.sub.expirydate);
            if (exdate < now) {
                $scope.alerts.push({
                    type: 'error',
                    msg: 'Inactive subscriber'
                });
            }



        });

        $scope.subTracker.addPromise(subPromise);
        $scope.sub = subPromise;


    } else {
        $scope.sub = new SubService();
        $scope.pledge = new PledgeService();
    }

    $scope.gridBandMembers = {
        data: 'sub.bandmembers',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        columnDefs: [{
            field: 'subbandmemberfirstname',
            displayName: 'First Name',
            enableCellEdit: true,
            editableCellTemplate: "<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateBand(col, row);\" />"
        }, {
            field: 'subbandmemberlastname',
            displayName: 'Last Name',
            enableCellEdit: true,
            editableCellTemplate: "<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateSkills(col, row);\" />"
        }, {
            field: '',
            cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteBm(col, row)">&times;</button> ',
            width: 30
        }]
    };



    $scope.suburbsuggest = function(suburbName) {
        return $http.get(apiSrc + '/suburbsuggest/' + suburbName).then(function(response) {
            return limitToFilter(response.data, 15);

        });
    };

    $scope.postcodesuggest = function(postCode) {
        return $http.get(apiSrc + '/postcodesuggest/' + postCode).then(function(response) {
            return limitToFilter(response.data, 15);

        });
    };

    $scope.subCheck = function(last, first) {
        $http.get(apiSrc + '/subsuggesta/' + last + '/' + first).then(function(response) {
            $scope.subsuggest = limitToFilter(response.data, 15);
        });
    };

    $scope.saveSubscriber = function() {


        if ($scope.subForm.$valid === true) {
            if ($stateParams.id) {
                //update
                delete $scope.sub.suburb; // delete suburb object
                //delete $scope.sub.pledges;
                //delete $scope.sub.bandmembers;
                delete $scope.sub.subscription;
                // dumb hacks for handling postgres bool weirdness
                if ($scope.sub.posted === false) {
                    $scope.sub.posted = 0;
                }
                console.log($scope.sub.posted);
                if ($scope.sub.merch_posted === false) {
                    $scope.sub.merch_posted = 0;
                }

                if ($scope.sub.suburbid == null) {
                    $scope.sub.suburbid = 1;
                } //BLANK SUBURB HACK! 

                $scope.sub.$update({
                    id: $stateParams.id
                }, function success(response) {
                    $scope.sub = SubService.get({
                        id: $stateParams.id
                    }, function() {
                        if ($scope.sub.paymentdate) $scope.sub.paymentdate = new Date($scope.sub.paymentdate);
                        if ($scope.sub.expirydate) $scope.sub.expirydate = new Date($scope.sub.expirydate);

                        if ($scope.sub.pledge && $scope.sub.pledge.paymentdate) {
                            $scope.sub.pledge.paymentdate = new Date($scope.sub.pledge.paymentdate);
                        }

                        if ($scope.alerts.length > 0) {
                            $scope.alerts.splice(0, 1);
                        }
                        $scope.alerts.push({
                            msg: 'Subscriber ' + $scope.sub.subnumber + ' Updated!'
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




                /*$http.get(apiSrc + '/subscribers/lastrec/').then(function (response) {
                    
                    $scope.lastRec = response.data;
                    if ($scope.lastRec.receiptnumber) {
                        var receipts = $scope.lastRec.receiptnumber.split('-')
                        var receiptnumber = parseInt(receipts[1]);
                        $scope.sub.receiptnumber = 'FD-' + (receiptnumber + 1);


                        if ($scope.sub.suburbid == null) {
                        $scope.sub.suburbid = 1;
                    } //BLANK SUBURB HACK! 
                    
                    


                    } else {
                        console.log('no number!');
                    }
                   

                });*/



                /*
            $http.post(apiSrc + '/subscribers/', $scope.sub).success(function(data){
                var matches = data.match(/int\((\d+)\)/);
                $scope.sub = SubService.get({id: matches[1]}, function() {
                    
                    //nasty hack due to php 5.2 on server!!!
                   /* if ($scope.pledge.paymentdate != null) {
                        $scope.pledge.subno = $scope.sub.subnumber;
                        $scope.pledge.pledgefirstname = $scope.sub.subfirstname;
                        $scope.pledge.pledgelastname = $scope.sub.sublastname;
                        $scope.pledge.$save(function success(){
                            $scope.pledge = PledgeService.get({subno: $scope.sub.subnumber});
                        });
                        
                    }
                    
                    alert('Subscriber added.');
                    $location.path('/subscribers/' + $scope.sub.subnumber);
                });
            
            });
            */
                //alert('Subscriber added.');
                //$location.path('/subscribers/');
            }
        } else {
            $scope.notvalid = true;
        }


    };


    $scope.deleteSubscriber = function() {
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

    $scope.onSuburbChange = function($item, $model, $label) {

        //item = suburb object, model = val (id), label = name

        $scope.sub.suburbid = $item.suburbid;
        $scope.sub.suburb.postcode = $item.postcode;
        $scope.sub.suburb.state = $item.state;
    };

    $scope.upDate = function() {

        var edate = new Date($scope.sub.expirydate);
        var pdate = new Date($scope.sub.paymentdate);
        if (edate > pdate) {
            edate.setDate(edate.getDate() + 365);
            $scope.sub.expirydate = edate;
        } else {
            pdate.setDate(pdate.getDate() + 365);
            $scope.sub.expirydate = pdate;
        }

    };

    $scope.updateBand = function(col, row) {

        console.log($scope.sub.bandmembers);

    };

    $scope.deleteBm = function(col, row) {
        var ebm = [row.entity.subbandmemberfirstname, row.entity.subbandmemberlastname].join(' ')
        var bag = _.filter($scope.sub.bandmembers, function(arr) {
            var abm = [arr.subbandmemberfirstname, arr.subbandmemberlastname].join(' ')
            return abm !== ebm;
        });
        $scope.sub.bandmembers = bag;
    };

    $scope.addBm = function() {
        var newbm = {
            subbandmemberfirstname: $scope.t.fname,
            subbandmemberlastname: $scope.t.lname,
            subid: $scope.sub.subnumber
        };
        $scope.sub.bandmembers.push(newbm);
        $scope.t.fname = '';
        $scope.t.lname = '';
    };

    $scope.open = function() {
        $timeout(function() {
            $scope.opened = true;
        });
    };

    $scope.generateReceipt = function() {
        $http.get(apiSrc + '/subscribers/lastrec/').then(function(response) {

            if (response.data) {
                var log = [];
                angular.forEach(response.data, function(value, key) {
                    var receipts = value.receiptnumber.split('-');
                    this.push(parseInt(receipts[1]));
                }, log);

                var nlog = _.sortBy(log, function(num) {
                    return num;
                });
                console.log(nlog);
                var latest = _.last(nlog)

                $scope.sub.receiptnumber = 'FD-' + (latest + 1);
                console.log($scope.sub.receiptnumber);

            } else {
                console.log('no number!');
            }

        });
    };

    $scope.generateReceiptS = function() {
        $http.get(apiSrc + '/subscribers/lastrec/').success(function(data) {
            var log = [];
            angular.forEach(data, function(value, key) {
                var receipts = value.receiptnumber.split('-');
                this.push(parseInt(receipts[1]));
            }, log);

            var nlog = _.sortBy(log, function(num) {
                return num;
            });
            console.log(nlog);
            var latest = _.last(nlog)

            $scope.sub.receiptnumber = 'FD-' + (latest + 1);
            console.log($scope.sub.receiptnumber);

        }).error(function() {
            console.log('no luck bud.')
        });
    };



});
