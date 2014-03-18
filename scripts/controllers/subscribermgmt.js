'use strict';

app.controller('SubscribermgmtCtrl', function($rootScope, $scope, $filter, $http, $location, $modal, $timeout, SubService, PrizetypesService, SkillsService, OnlineSubsService, ProgramsService, PrizesService, SubsBandService, BandService, SubtypesService, GenresService, limitToFilter, $dialog) {

        //$scope.subscriberSearchFormData={};


        $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var td = new Date();
        $scope.today = $filter('date')(td, 'yyyy-MM-dd');

        var pdate = new Date();
        pdate = pdate.setDate(pdate.getDate() + 365);
        $scope.year = $filter('date')(pdate, 'yyyy-MM-dd');

        $scope.skills = SkillsService.query();
        $scope.programs = ProgramsService.query();
        $scope.subtypes = SubtypesService.query();
        $scope.prizetypes = PrizetypesService.query();
        $scope.prizes = PrizesService.query();
        $scope.genres = GenresService.query();
        OnlineSubsService.query().$then(function(response) {

            $scope.onlinesubs = response.data;

        });

        $scope.gridOnlineSubsOptions = {
            data: 'onlinesubs',
            enableCellSelection: false,
            enableRowSelection: false,
            enableCellEdit: false,
	        showFilter: true,
            dataUpdated: function() {
                console.log(row);
            },
            columnDefs: [{
                field: 'createddate',
                displayName: 'Date'
            }, {
                field: 'subfirstname',
                displayName: 'First Name'
            }, {
                field: 'sublastname',
                displayName: 'Last Name'
            }, {
                field: 'prev_subnumber',
                displayName: 'Prev Sub No',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="/subscribers/{{COL_FIELD}}">{{COL_FIELD}}</a></span></div>'
            }, {
                field: 'receiptnumber',
                displayName: 'FS Receipt'
            }, {
                field: 'subscription.subtypecode',
                displayName: 'Sub Type'
            }, {
                field: '',
                cellTemplate: '<button style="float:left;padding-left:5px;" class="btn btn-success" ng-click="testMult(col, row)">Payment Received</button> '
            }, {
                field: '',
                cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteSubclear(col, row)">&times;</button> ',
                width: 30
            }, ]

        };

        var subCell = '<input ng-class=\"\'colt\' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateSubtypes(col, row);\" />';


        $scope.gridSubtypeOptions = {
            data: 'subtypes',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            columnDefs: [{
                field: 'subtypecode',
                displayName: 'Sub Type',
                enableCellEdit: true,
                editableCellTemplate: subCell,
                width: 150
            }, {
                field: 'subtypedescription',
                displayName: 'Description',
                enableCellEdit: true,
                editableCellTemplate: subCell
            }, {
                field: 'subtypevalue',
                displayName: 'Value',
                enableCellEdit: true,
                cellFilter: 'currency',
                editableCellTemplate: subCell,
                width: 70
            }, {
                field: 'active',
                displayName: 'Active?',
                cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="row.entity[col.field]" ng-change="updateSubtypes(col, row)" ng-checked="row.entity[col.field]" /></div>',
                sortable: false,
                width: 50
            }, {
                field: '',
                cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteSubtype(col, row)">&times;</button> ',
                width: 30
            }]
        };

        var programCell = '<input ng-class=\"\'colt\' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updatePrograms(col, row);\" />';

        $scope.gridProgramOptions = {
            data: 'programs',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            showFilter: true,
            columnDefs: [{
                    field: 'programname',
                    displayName: 'Program',
                    enableCellEdit: true,
                    editableCellTemplate: programCell
                }, {
                    field: 'programdate',
                    displayName: 'Day',
                    cellTemplate: '<div><select class="input-medium" ng-model="row.entity.programdate" ng-options="d for d in days" ng-change="updateDay(col, row)"></select></div>',
                    sortable: false,
                    width: 180
                }, {
                    field: 'programtime',
                    displayName: 'Hour',
                    enableCellEdit: true,
                    editableCellTemplate: programCell,
                    width: 70
                }, {
                    field: 'active',
                    displayName: 'Active?',
                    cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="row.entity[col.field]" ng-change="updatePrograms(col, row)" ng-checked="row.entity[col.field]" /></div>',
                    sortable: false,
                    width: 70
                }, {
                    field: '',
                    cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteProgram(col, row)">&times;</button> ',
                    width: 30
                }
            ]
        };

        $scope.gridSubskillOptions = {
            data: 'skills',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            columnDefs: [
                {
                    field: 'skilldescription',
                    displayName: 'Skill',
                    enableCellEdit: true,
                    editableCellTemplate: "<input ng-class=\"'colt' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updateSkills(col, row);\" />"
                }, {
                    field: '',
                    cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deleteSkill(col, row)">&times;</button> ',
                    width: 30
                }
            ]
        };

        var prizeCell = '<input ng-class=\"\'colt\' + col.index\" ng-model=\"row.entity[col.field]\" ng-input=\"COL_FIELD\" ng-on-blur=\"updatePrizes(col, row);\" />';

        $scope.gridPrizeOptions = {
            data: 'prizes',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            showFilter: true,
            showFooter: true,
            columnDefs: [{
                field: 'radiothonprize',
                displayName: 'Prize',
                enableCellEdit: true,
                editableCellTemplate: prizeCell
            }, {
                field: 'radiothonprizeyear',
                displayName: 'Year',
                enableCellEdit: true,
                editableCellTemplate: prizeCell,
                width: 70
            }, {
                field: 'radiothonprizedescription',
                displayName: 'Description',
                enableCellEdit: true,
                editableCellTemplate: prizeCell
            }, {
                field: 'prizetype',
                displayName: 'Type',
                cellTemplate: '<div><select class="input-medium" ng-model="row.entity.prizetypeid" ng-options="p.id as p.prizetypename for p in prizetypes" ng-change="updatePrizes(col, row)"></select></div>'
            }, {
                field: 'subtypeid',
                displayName: 'Sub',
                cellTemplate: '<div><select class="input-medium" ng-model="row.entity.subtypeid" ng-options="s.subtypeid as s.subtypecode for s in subtypes" ng-change="updatePrizes(col, row)"></select></div>'
            }, {
                field: 'currentyear',
                displayName: 'Current Year?',
                cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="row.entity[col.field]" ng-change="updatePrizes(col, row)" ng-checked="row.entity[col.field]" /></div>',
                sortable: false,
                width: 70
            }, {
                field: '',
                cellTemplate: '<button class="close" style="float:left;padding-left:5px;" ng-click="deletePrize(col, row)">&times;</button> ',
                width: 30
            }],
            plugins: [new ngGridCsvExportPlugin()]
        };


        $scope.updateSkills = function(col, row) {
            $scope.skill = SkillsService.get({
                id: row.entity.skillid
            });
            $scope.skill.skilldescription = row.entity.skilldescription;
            console.log($scope.skill);
            $scope.skill.$update({
                id: row.entity.skillid
            });

        };

        $scope.addSkill = function(col, row) {
            $scope.skill = new SkillsService;
            console.log($scope.skilldescription);
            $scope.skill.skilldescription = $scope.skilldescription;
            $scope.skill.$save(function(u, res) {
                $scope.skills = SkillsService.query();
            });
        };

        $scope.updateSubtypes = function(col, row) {
            $scope.subtype = SubtypesService.get({
                id: row.entity.subtypeid
            });

            if (row.entity.active == false) {
                row.entity.active = 0;
            }
            $scope.subtype.subtypecode = row.entity.subtypecode;
            $scope.subtype.subtypedescription = row.entity.subtypedescription;
            $scope.subtype.subtypevalue = row.entity.subtypevalue;
            $scope.subtype.active = row.entity.active;
            $scope.subtype.$update({
                id: row.entity.subtypeid
            });

        };

        $scope.addSubtype = function(col, row) {
            $scope.subtype = new SubtypesService;
            $scope.subtype.subtypecode = $scope.subtypecode;
            $scope.subtype.subtypedescription = $scope.subtypedescription;
            $scope.subtype.subtypevalue = $scope.subtypevalue;
            $scope.subtype.active = true;
            $scope.subtype.$save(function(u, res) {
                $scope.subtypes = SubtypesService.query();
            });
        };

        $scope.updatePrizes = function(col, row) {
            $scope.prize = PrizesService.get({
                id: row.entity.radiothonprizeid
            });

            if (row.entity.currentyear == false) {
                row.entity.currentyear = 0;
            }
            $scope.prize.radiothonprize = row.entity.radiothonprize;
            $scope.prize.radiothonprizedescription = row.entity.radiothonprizedescription;
            $scope.prize.radiothonprizeyear = row.entity.radiothonprizeyear;
            $scope.prize.subtypeid = row.entity.subtypeid;
            $scope.prize.currentyear = row.entity.currentyear;
            $scope.prize.prizetypeid = row.entity.prizetypeid;
            $scope.prize.$update({
                id: row.entity.radiothonprizeid
            });

        };

        $scope.addPrize = function(col, row) {
            $scope.prize = new PrizesService;
            $scope.prize.radiothonprize = $scope.radiothonprize;
            $scope.prize.radiothonprizedescription = $scope.radiothonprizedescription;
            $scope.prize.radiothonprizeyear = $scope.radiothonprizeyear;
            $scope.prize.subtypeid = $scope.prize_subtypeid;
            $scope.prize.currentyear = true;
            $scope.prize.$save(function(u, res) {
                $scope.prizes = PrizesService.query();
            });
        };

        $scope.updatePrograms = function(col, row) {
            $scope.program = ProgramsService.get({
                id: row.entity.programid
            });
            if (row.entity.active == false) {
                row.entity.active = 0;
            }
            $scope.program.programname = row.entity.programname;
            $scope.program.programdate = row.entity.programdate;
            $scope.program.programtime = row.entity.programtime;
            $scope.program.active = row.entity.active;
            $scope.program.$update({
                id: row.entity.programid
            });

        };

        $scope.addProgram = function(col, row) {
            $scope.program = new ProgramsService;
            $scope.program.programname = $scope.programname;
            $scope.program.programdate = $scope.programdate;
            $scope.program.programtime = $scope.programtime;
            $scope.program.active = true;
            $scope.program.$save(function(u, res) {
                $scope.programs = ProgramsService.query();
            });
        };

        $scope.deleteSkill = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? ' + row.entity.skilldescription;
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
                        $scope.skill = SkillsService.get({
                            id: row.entity.skillid
                        });
                        $scope.skill.$delete({
                            id: row.entity.skillid
                        }, function() {
                            $scope.skills = SkillsService.query();
                        });
                    }
                });

        };

        $scope.deleteGenre = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? ' + row.entity.genre_desc;
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
                        $scope.genre = GenresService.get({
                            id: row.entity.genre_id
                        });
                        $scope.genre.$delete({
                            id: row.entity.genre_id
                        }, function() {
                            $scope.genres = GenresService.query();
                        });
                    }
                });

        };

        $scope.deleteSubtype = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? ' + row.entity.subtypecode;
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
                        $scope.subtype = SubtypesService.get({
                            id: row.entity.subtypeid
                        });
                        $scope.subtype.$delete({
                            id: row.entity.subtypeid
                        }, function() {
                            $scope.subtypes = SubtypesService.query();
                        });
                    }
                });

        };

        $scope.deletePrize = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? ' + row.entity.radiothonprize;
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
                        $scope.prize = PrizesService.get({
                            id: row.entity.radiothonprizeid
                        });
                        $scope.prize.$delete({
                            id: row.entity.radiothonprizeid
                        }, function() {
                            $scope.prizes = PrizesService.query();
                        });
                    }
                });

        };

        $scope.deleteProgram = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? ' + row.entity.programname;
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
                        $scope.program = ProgramsService.get({
                            id: row.entity.programid
                        });
                        $scope.program.$delete({
                            id: row.entity.programid
                        }, function() {
                            $scope.programs = ProgramsService.query();
                        });
                    }
                });

        };

        $scope.deleteSubclear = function(col, row) {

            var title = 'Warning';
            var msg = 'Are you sure you wish to delete this record? ' + row.entity.subemail;
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
                        $http.delete(apiSrc + '/subform/' + row.entity.id).then(function(response) {
                            $scope.onlinesubs = OnlineSubsService.query();
                        });
                    }
                });

        };

        $scope.subCheck = function(col, row) {
            $http.get(apiSrc + '/subsuggesta/' + last + '/' + first).then(function(response) {
                $scope.subsuggest = limitToFilter(response.data, 15);
            });
        };

        $scope.testMult = function(col, row) {

            $scope.col = col;
            $scope.row = row;
            if (row.entity.prev_subnumber) {

                SubService.get({ id: row.entity.prev_subnumber}, function(data) {
                    if (!data.subnumber) {
                        console.log('no');
                        $http.get(apiSrc + '/subsuggesta/' + row.entity.sublastname + '/' + row.entity.subfirstname).then(function(response) {

                            $scope.logc = [];
                            angular.forEach(response.data, function(value, key) {
                                this.push(value.subnumber);
                            }, $scope.logc);

                            if ($scope.logc.length > 0) {

                                $scope.testmsg = '';
                                //_.each(logc, function(element) {
                                  //  $scope.testmsg += '<a href="element">' + element + '</a><br/>';
                                //});

                                var modal = $modal({
                                  template: '/mdl.html',
                                  show: true,
                                  backdrop: 'static',
                                  scope: $scope
                                });
                            } else {
                                $scope.confirmSub();
                            } 
                        });
                    } else {
                        $scope.confirmSub();
                    }//end data.subnumber check

                }); //end subservice

            } else {
                 $scope.confirmSub();
            } // end prev_subnumber check
        };

        $scope.gotoSub = function(l){
            $timeout(function(){
            $location.path('/subscribers/' + l);
            }, 500)
        }

        $scope.mergeSub = function(l){
            console.log('in merge');
            console.log(l);
            $scope.row.entity.prev_subnumber = l;
            $scope.confirmSub();
        }


        $scope.confirmSub = function() {

                var row = $scope.row;
                var col = $scope.col;
                /*
                    msg += '<input ng-model="result"><div class="modal-footer">'+ '<button ng-click="digclose(result)" class="btn btn-primary" >Close</button>'+'</div>';
                    $scope.opts = {
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    template:  msg, // OR: templateUrl: 'path/to/view.html',
                    controller: 'SubscribermgmtCtrl'
                  };

                    //var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary btn-danger'}];
                    //$dialog.messageBox('yolo', msg, btns)
                    var d = $dialog.dialog($scope.opts)
                      d.open()
                        .then(function(result){
                            alert(result);
                            if (result === 'ok') {
                     ////

                        }
                        });

                    }*/



                ///

                if (row.entity.prev_subnumber) {
                    $scope.exsub = SubService.get({
                        id: row.entity.prev_subnumber
                    }, function(data) {


                        /*$http.get(apiSrc + '/suburbsuggest/' + row.entity.suburbid).then(function (response) {
                    $scope.exsub.suburbid = response.data.suburbid;
                });
                */
                        var title = 'Warning';
                        var msg = 'A sub with this last name and subnumber already exists. Do you want to update this subscriber? \n' + data.subnumber + ' ' + data.subfirstname + ' ' + data.sublastname;
                        var btns = [{
                            result: 'cancel',
                            label: 'Cancel'
                        }, {
                            result: 'ok',
                            label: 'OK',
                            cssClass: 'btn-primary btn-danger'
                        }];
		if ((row.entity.prev_subnumber == data.subnumber && row.entity.sublastname == data.sublastname) || (row.entity.prev_subnumber == data.subnumber && row.entity.subbandname == data.subbandname)) {
                            $dialog.messageBox(title, msg, btns)
                                .open()
                                .then(function(result) {
                                    if (result === 'ok') {

                                        var tempid = row.entity.id;
                                        delete row.entity.id;
                                        var tempsubno = row.entity.subnumber;
                                        delete row.entity.subnumber;
                                        delete row.entity.prev_subnumber;
                                        delete row.entity.created_at;
                                        delete row.entity.updated_at;
                                        delete row.entity.deleted_at;
                                        delete row.entity.no_cards;
                                        delete row.entity.expirydate;
                                        delete row.entity.paymentdate;
                                        delete row.entity.payment_order;
                                        delete row.entity.subcomment;
                                        delete row.entity.subscription;


                                        angular.extend($scope.exsub, row.entity);

                                        if (row.entity.no_cards) {
                                            $scope.exsub.subcomment = $scope.exsub.subcomment + '\n number of cards: ' + row.entity.no_cards;
                                        }

                                        var edate = new Date($scope.exsub.expirydate);
                                        var pdate = new Date($scope.exsub.paymentdate);

                                        //check if subdate is great than now - if so add 365 to current expdate
                                        if (edate > $scope.today) {
                                            edate.setDate(edate.getDate() + 365);
                                            $scope.exsub.expirydate = edate;
                                        } else {
                                            pdate.setDate(pdate.getDate() + 365);
                                            $scope.exsub.expirydate = $scope.year;;
                                        }
                                        $scope.exsub.paymentdate = $scope.today;

                                        $scope.exsub.changeduser = 'formsite';
                                        $scope.exsub.posted = 0;

                                        delete $scope.exsub.pledges;
                                        delete $scope.exsub.suburb;
                                        delete $scope.exsub.subscription;
                                        delete $scope.exsub.bandmembers;

                                        $scope.exsub.$update(function(data) {

                                            if (row.entity.subbandname) {
                 $http.delete(apiSrc + '/bandmembers/' + $scope.exsub.subnumber).then(function(response){                       
        // update band member ids to real subnumber
        
                                       $http.get(apiSrc + '/band/' + tempsubno).then(function(response) {

                                                  angular.forEach(response.data, function(d) {
                                                        $http.put(apiSrc + '/band/' + tempsubno, {
                                                            subid: $scope.exsub.subnumber
                                                        })
                                                    });
                                                });
					});
                                            };

			$http.delete(apiSrc + '/pledge/' + $scope.exsub.subnumber).then(function(response){
                                            $http.get(apiSrc + '/pledge/' + tempsubno)
                                                .success(function(data, status, headers, config) {
                                                    if (data.pledgeid) {
                                                        $http.put(apiSrc + '/pledge/clearing/' + tempsubno, {
                                                            subno: $scope.exsub.subnumber
                                                        });
                                                    } else {
                                                        console.log('no pledge found.');
                                                    }
                                                }).
                                            error(function(data, status, headers, config) {
                                                console.log('couldnt find pledge.');
                                            });

					}); //end delete



                                            alert('sub updated.');
                                            $http.delete(apiSrc + '/subform/' + tempid).then(function (response){
                                            $scope.onlinesubs = OnlineSubsService.query();
                                            });
                                        });

                                    }
                                });
                        } else {
                            //new sub with prev subno - no match
                            var newsub = new SubService();
                            angular.extend(newsub, row.entity);
                            delete newsub.subnumber;
                            delete newsub.prev_subnumber;
                            delete newsub.created_at;
                            delete newsub.no_cards;
                            delete newsub.payment_order;
                            delete newsub.deleted_at;
                            delete newsub.subscription;

                            newsub.paymentdate = $scope.today;
                            newsub.expirydate = $scope.year;

                            if (row.entity.no_cards) {
                                newsub.subcomment = 'number of card: ' + row.entity.no_cards;
                            }

                            newsub.$save(function(data) {


                                if (row.entity.subbandname) {
                                    // update band member ids to real subnumber
                                    $http.get(apiSrc + '/band/' + row.entity.subnumber).then(function(response) {
                                        angular.forEach(response.data, function(d) {
                                            $http.put(apiSrc + '/band/' + row.entity.subnumber, {
                                                subid: newsub.subnumber
                                            })
                                        });
                                    });

                                };

                                $http.get(apiSrc + '/pledge/' + row.entity.subnumber)
                                    .success(function(data, status, headers, config) {
                                        if (data.pledgeid) {
                                            $http.put(apiSrc + '/pledge/clearing/' + row.entity.subnumber, {
                                                subno: newsub.subnumber
                                            });
                                        } else {
                                            console.log('no pledge found.');
                                        }
                                    })
                                    .error(function(data, status, headers, config) {
                                        console.log('couldnt find pledge.');
                                    });


                                alert('sub added');
                                $http.delete(apiSrc + '/subform/' + row.entity.id).then(function(response) {
                                    $scope.onlinesubs = OnlineSubsService.query();
                                });
                            });

                        }
                    });


                } else {
                    // newsub
                    var newsub = new SubService();

                    angular.extend(newsub, row.entity);

                    delete newsub.subnumber;
                    delete newsub.prev_subnumber;
                    delete newsub.created_at;
                    delete newsub.no_cards;
                    delete newsub.payment_order;
                    delete newsub.deleted_at;
                    delete newsub.subscription;

                    newsub.paymentdate = $scope.today;
                    newsub.expirydate = $scope.year;

                    console.log(newsub);

                    if (row.entity.no_cards) {
                        newsub.subcomment = 'number of card: ' + row.entity.no_cards;
                    }

                    newsub.$save(function(data) {


                        if (row.entity.subbandname) {
                            // update band member ids to real subnumber
                            $http.get(apiSrc + '/band/' + row.entity.subnumber).then(function(response) {
                                angular.forEach(response.data, function(d) {
                                    $http.put(apiSrc + '/band/' + row.entity.subnumber, {
                                        subid: newsub.subnumber
                                    })
                                });
                            });

                        };

                        $http.get(apiSrc + '/pledge/' + row.entity.subnumber)
                            .success(function(data, status, headers, config) {
                                if (data.pledgeid) {
                                    $http.put(apiSrc + '/pledge/clearing/' + row.entity.subnumber, {
                                        subno: newsub.subnumber
                                    });
                                } else {
                                    console.log('no pledge found.');
                                }
                            })
                            .error(function(data, status, headers, config) {
                                console.log('couldnt find pledge.');
                            });

                        alert('sub added');
                         $http.delete(apiSrc + '/subform/' + row.entity.id).then(function (response){
                        $scope.onlinesubs = OnlineSubsService.query();
                        });
                    });




                };





            };



        });
