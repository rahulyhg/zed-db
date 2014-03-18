'use strict';

app.controller('ReleaseCtrl', function($rootScope, $scope, $http, $location, $stateParams, ReleaseService, GenresNewService, ThemesService, limitToFilter, $filter, promiseTracker) {

	$scope.releaseSearchFormData = {};
	$scope.rTracker = promiseTracker('rTracker');

	if ($rootScope.releaseParams) {
		$scope.releases = ReleaseService.query($rootScope.releaseParams, function() {
			//set order of display
			$scope.predicate = 'release_year';
			$scope.releaseSearchFormData = $rootScope.releaseParams;
			//delete $rootScope.releaseParams;
		});
	}
	$scope.gridReleases = {
				data: 'releases',
				enableCellSelection: false,
				enableRowSelection: false,
				enableCellEdit: false,
				showFilter: true,
				showFooter: false,
				columnDefs: [{
						field: 'artist_nm',
						displayName: 'Artist',
				}, {
						field: 'title',
						displayName: 'Title',
						cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="/releases/{{row.entity.library_no}}">{{COL_FIELD}}</a></span></div>'
				}, {
						field: 'library_no',
						displayName: 'Record #',
				}, {
						field: 'release_year',
						displayName: 'Year'
				}, {
						field: 'entered_dt',
						displayName: 'Created'
				}]//,
        		//plugins: [new ngGridCsvExportPlugin(), new ngGridFlexibleHeightPlugin()]
		};

	$scope.ausnz = ["A", "NZ"];
	$scope.format = ["CD", "DIGITAL", "VINYL"];
	$scope.extendedFormats = [{
		format_srch: 'CD',
		format_desc: 'CD'
	}, {
		format_srch: 'DIGITAL',
		format_desc: 'DIGITAL'
	}, {
		format_srch: 'LP',
		format_desc: 'VINYL LP'
	}, {
		format_srch: '7"',
		format_desc: 'VINYL 7"'
	}];

	$scope.genres = GenresNewService.query();
	$scope.themes = ThemesService.query();

	$scope.artists = function(artistName) {
		return $http.get(apiSrc + '/artistsuggest/' + artistName).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};

	$scope.titles = function(title) {
		return $http.get(apiSrc + '/titlesuggest/' + title).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};

	$scope.labels = function(label) {
		return $http.get(apiSrc + '/labelsuggest/' + label).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};

	$scope.apra = function(apra) {
		return $http.get(apiSrc + '/aprasuggest/' + apra).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};

	$scope.hometown = function(hometown) {
		return $http.get(apiSrc + '/hometownsuggest/' + hometown).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};

	$scope.country = function(country) {
		return $http.get(apiSrc + '/countrysuggest/' + country).then(function(response) {
			return limitToFilter(response.data, 15);
		});
	};



	$scope.search = function($element) {

		if ($scope.releaseSearchForm.$dirty === true) {
			if ($scope.releaseSearchFormData.entered_dt) {
				$scope.releaseSearchFormData.entered_dt = convertDate($scope.releaseSearchFormData.entered_dt);
			}
			if ($scope.releaseSearchFormData.entered_dtend) {
				$scope.releaseSearchFormData.entered_dtend = convertDate($scope.releaseSearchFormData.entered_dtend);
			}
			// filter genres and apply on cb
			var genresArr = _.map($scope.releaseSearchFormData.genre, function(g) {
				return g = +g;
			});

			var params = _.clone($scope.releaseSearchFormData);
			delete params.genre;
			//$scope.releases = ReleaseService.query(params);
			//$scope.rTracker.addPromise($scope.releases);

			$http.get(apiSrc + '/releases', {params: params, tracker: 'rTracker' }).success(function(response) {
			//$scope.releases.$then(function(response) {

				if (genresArr.length > 0) {
					$scope.releases = _.filter(response, function(data){
						var filteredGenres = _.pluck(data.genres, 'id');
						var inter = _.intersection(filteredGenres, genresArr);
						return inter.length > 0;
					});
				} else {
					$scope.releases = response;
				}

				//set order of display
				$scope.predicate = 'release_year';
				$scope.artistname = $stateParams.name;
				$rootScope.releaseParams = params;

			});
		} else {
			console.log('no search shit!');

		}
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	var convertDate = function(oldate) {
		var d = new Date(oldate);
		//gross js date formatting
		var curr_date =  ('0' + d.getDate()).slice(-2);
			var curr_month = ('0' + (d.getMonth()+1)).slice(-2);
			var curr_year = d.getFullYear();
			var entd = curr_year + '-' + curr_month + '-' + curr_date;
		return entd;
	}

	$scope.clearForm = function() {
		$location.path('/releases');
		$scope.releaseSearchFormData = {};
		$scope.releaseSearchForm.$setPristine();
		delete $rootScope.releaseParams;
		$scope.releases = {};
	};


	//add new
	$scope.add = function() {
		if ($scope.releaseSearchFormData.artist_nm) {
			$location.path('/releases/new/release/' + $scope.releaseSearchFormData.artist_nm);
		} else {
			$location.path('/releases/new/release');
		}
	};

	$scope.convertDate = function(date) {
		console.log(date);
		$scope.cDate = $filter('date')(new Date(date), 'y-MM-dd');
	};
});
