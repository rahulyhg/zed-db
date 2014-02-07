'use strict';

//var apiSrc = 'http://newdb.4zzzfm.org.au/api/v1';
var apiSrc = '/app/api/v1';

var app = app || angular.module('zeddbApp', ['ngResource', 'ngSanitize', 'ui', 'ui.bootstrap', '$strap.directives', 'ngGrid', 'ngGrid.services', 'ui.select2', 'ajoslin.promise-tracker', 'ui.router'])
	.config(function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

	$locationProvider.html5Mode(true);
	var access = routingConfig.accessLevels;
	var viewsDir = '/views';
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: viewsDir + '/login.html',
			controller: 'LoginCtrl',
			access: access.public
		})
		.state('logout', {
			url: '/logout',
	        templateUrl: viewsDir + '/logout.html',
	        controller: 'LogoutCtrl',
	        access: access.user
	    })
	    .state('default', {
	    	url: '/',
	        templateUrl: viewsDir + '/home.html',
	        controller: 'HomeCtrl',
	        access: access.user
	    })
		.state('subscribers', {
			url: '/subscribers',
			templateUrl: viewsDir + '/subscriber.html',
			controller: 'SubscriberCtrl',
			access: access.user
		})
		.state('subscribers.detail', {
			url: '/:id',
			templateUrl: viewsDir + '/subdetails.html',
			controller: 'SubdetailsCtrl',
			access: access.user
		})
		.state('subscribers.new', {
			url: '/new/subscriber',
			templateUrl: viewsDir + '/subdetails.html',
			controller: 'SubdetailsCtrl',
			resolve: { subscriber: function() { return {}; }},
			access: access.user
		})
		.state('releases', {
			url: '/releases',
			templateUrl: viewsDir + '/release.html',
			controller: 'ReleaseCtrl',
			access: access.user
		})
		.state('releases.detail', {
			url: '/:id',
			templateUrl: viewsDir + '/releasedetails.html',
			controller: 'ReleaseDetailCtrl',
			resolve: {
			  release : function(ReleaseService, $stateParams, $q) {
				var deferred = $q.defer();
				ReleaseService.get({id: $stateParams.id}, function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
			  }
			},
			access: access.user
		})
		.state('releases.new-artist', {
			url: '/new/release/:artist',
			templateUrl: viewsDir + '/releasedetails.html',
			controller: 'ReleaseDetailCtrl',
			resolve: { release: function(ReleaseService, $q) { return {}; }},
			access: access.user
		})
		.state('releases.new', {
			url: '/new/release',
			templateUrl: viewsDir + '/releasedetails.html',
			controller: 'ReleaseDetailCtrl',
			resolve: { release: function(ReleaseService, $q) { return {}; }},
			access: access.user
		})
		.state('contacts', {
			url: '/contacts',
			templateUrl: viewsDir + '/contact.html',
			controller: 'ContactCtrl',
			access: access.user
		})
		.state('contacts.details', {
			url: '/:id',
			templateUrl: viewsDir + '/contactdetails.html',
			controller: 'ContactdetailsCtrl',
			resolve: {
			    contact : function(ContactService, $stateParams, $q) {
			        var deferred = $q.defer();
			        ContactService.get({id: $stateParams.id}, function(data){
			            deferred.resolve(data);
			        });
			    return deferred.promise;
				}
			},
			access: access.user
		})
		.state('contacts.new', {
			url: '/new/contact',
			templateUrl: viewsDir + '/contactdetails.html',
			controller: 'ContactdetailsCtrl',
			resolve: { contact: function() { return {}; }},
			access: access.user
		})
		.state('volunteers', {
			url: '/volunteers',
			templateUrl: viewsDir + '/volunteer.html',
			controller: 'VolunteerCtrl',
			access: access.admin
		})
		.state('volunteers.details', {
			url: '/:id',
			templateUrl: viewsDir + '/volunteerdetails.html',
			controller: 'VolunteerDetailsCtrl',
			resolve: {
			    volunteer : function(VolunteerService, $stateParams, $q) {
			        var deferred = $q.defer();
			        VolunteerService.get({id: $stateParams.id}, function(data){
			            deferred.resolve(data);
			        });
			    return deferred.promise;
				}
			},
			access: access.admin
		})
		.state('volunteers.new', {
			url: '/new/volunteer',
			templateUrl: viewsDir + '/volunteerdetails.html',
			controller: 'VolunteerDetailsCtrl',
			resolve: { volunteer: function() { return {}; }},
			access: access.admin
		})
		// manage
		.state('contactmanage', {
			url: '/contact/manage',
			templateUrl: viewsDir + '/contactmgmt.html',
			controller: 'ContactmgmtCtrl',
			access: access.admin
		})
		.state('releasemanage', {
			url: '/release/manage',
			templateUrl: viewsDir + '/releasemgmt.html',
			controller: 'ReleasemgmtCtrl',
			access: access.admin
		})
		.state('subscribermanage', {
			url: '/subscriber/manage',
			templateUrl: viewsDir + '/subscribermgmt.html',
			controller: 'SubscribermgmtCtrl',
			access: access.admin
		})
		.state('usermanage', {
			url: '/user/manage',
	        templateUrl: viewsDir + '/user.html',
	        controller: 'UserCtrl',
	        access: access.admin
	    })
		// reports
		.state('subscriberreport', {
			url: '/subscriber/report',
			templateUrl: viewsDir + '/subreport.html',
			controller: 'SubscriberreportCtrl',
			access: access.user
		})
		.state('sub-outstanding', {
			url: '/subscriber/report/post/outstanding',
			templateUrl: viewsDir + '/subscriberposttemplate.html',
			controller: 'SubscriberpostCtrl',
			resolve: {
			  subscriber : function() {
				return ;
			  }
			},
			access: access.user
		})
		.state('contactreport', {
			url: '/contact/report',
		    templateUrl: viewsDir + '/contactreport.html',
		    controller: 'ContactreportCtrl',
		    access: access.user
		})
	    .state('musicreport', {
	    	url: '/music/report',
	        templateUrl: viewsDir + '/releasereport.html',
	        controller: 'ReleasereportCtrl',
	        access: access.user
	    })
	    // // print
		.state('unpostedsubs', {
			url: '/subscriber/report/post/outstanding',
		    templateUrl: viewsDir + '/subscriberposttemplate.html',
		    controller: 'SubscriberpostCtrl',
		    resolve: {
		        subscriber: function() {
		            return;
		        }
		    },
		    access: access.user
		})
		.state('print', {
			url: '/print',
		    templateUrl: viewsDir + '/genericprinttemplate.html',
		    controller: 'GenericprintCtrl',
		    access: access.user
		})
		.state('subreceipt', {
			url: '/subscriber/report/receipt/:id',
		    templateUrl: viewsDir + '/subpostind.html',
		    controller: 'SubscriberpostCtrl',
		    access: access.user
		})

		// TODO:
		//     .when('/releases/new/release/:artist', {
		//         templateUrl: viewsDir + '/releasedetails.html',
		//         controller: 'ReleaseDetailCtrl',
		//         resolve: {
		//             release: function(ReleaseService, , $q) {
		//                 return {};
		//             }
		//         },
		//         access: access.user
		//     })

	})


//end config


//services

app.factory("FlashService", function($rootScope) {
	return {
		show: function(message) {
			$rootScope.flash = message;
		},
		clear: function() {
			$rootScope.flash = "";
		}
	}
});

app.factory('SessionService', function() {
	return {
		get: function(key) {
			return sessionStorage.getItem(key);
		},
		set: function(key, val) {
			return sessionStorage.setItem(key, val);
		},
		unset: function(key) {
			return sessionStorage.removeItem(key);
		}
	}
});

app.factory('AuthenticationService', function($http, $sanitize, $location, $rootScope, SessionService, FlashService) {
	// set user and accesslevels roles
	var accessLevels = routingConfig.accessLevels,
		userRoles = routingConfig.userRoles;
	var cTemp = SessionService.get('user');
	var currentUser = {
		username: '',
		role: userRoles.public,
	};

	if (cTemp) {
		currentUser = JSON.parse(cTemp);
		$rootScope.user = JSON.parse(cTemp);
	}
	//var currentUser = (SessionService.get('user')) ? JSON.parse(SessionService.get('user')) : { username: '', role: userRoles.public };

	var cacheSession = function(response) {
		SessionService.set('user', JSON.stringify({
			username: response.username,
			role: response.role
		}))
		SessionService.set('authenticated', true);
	};

	var uncacheSession = function() {
		SessionService.unset('authenticated');
		SessionService.unset('user');
	};

	var loginError = function(response) {
		FlashService.show('Login Failed.');
		console.log('no login.')
	};

	var setUser = function(response) {
		_.extend(currentUser, response);
		$rootScope.user = response;
	}

	var sanitizeCredentials = function(credentials) {
		return {
			username: $sanitize(credentials.username),
			password: $sanitize(credentials.password)
		};
	};

	return {
		authorize: function(accessLevel, role) {
			if (role === undefined) role = currentUser.role;
			return accessLevel.bitMask & role.bitmask;
		},
		login: function(credentials) {
			var login = $http.post(apiSrc + '/auth/login', sanitizeCredentials(credentials));
			login.success(setUser);
			login.success(cacheSession);
			login.success(FlashService.clear);

			login.error(loginError);
			return login;
		},
		logout: function() {
			//var logout = $http.get("/auth/logout");
			uncacheSession();
			setUser({
				username: '',
				role: userRoles.public
			});
			delete $rootScope.user;
			return true;
		},
		isLoggedIn: function() {
			return SessionService.get('authenticated');
		},
		accessLevels: accessLevels,
		userRoles: userRoles,
		user: currentUser
		//return roles etc so they can be monitored with directive to manip dom - angular style
	};
})

app.factory('RolesService', function($resource) {
	return $resource(apiSrc + '/roles/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('GenresService', function($resource) {
	return $resource(apiSrc + '/genres/:id', {
		id: '@genre_id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('GenresNewService', function($resource) {
	return $resource(apiSrc + '/genresnew/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('ThemesService', function($resource) {
	return $resource(apiSrc + '/themes/:id', {
		id: '@theme_id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('DepartmentsService', function($resource) {
	return $resource(apiSrc + '/departments/:id', {
		id: '@department_no'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('InterestsService', function($resource) {
	return $resource(apiSrc + '/interests/:id', {
		id: '@interest_no'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('SkillsService', function($resource) {
	return $resource(apiSrc + '/skills/:id', {
		id: '@subtypeid'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('SkillsNewService', function($resource) {
	return $resource(apiSrc + '/skillsnew/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('VolunteerService', function($resource) {
	return $resource(apiSrc + '/volunteers/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})


app.factory('ProgramsService', function($resource) {
	return $resource(apiSrc + '/programs/:id', {
		id: '@programid'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('SubtypesService', function($resource) {
	return $resource(apiSrc + '/subtypes/:id', {
		id: '@subtypeid'
	}, {
		update: {
			method: 'PUT'
		}
	})
})
app.factory('PrizesService', function($resource) {
	return $resource(apiSrc + '/prizes/:id', {
		id: '@radiothonprizeid'
	}, {
		update: {
			method: 'PUT'
		}
	})
})


app.factory('ReleaseService', ['$resource', '$http', '$rootScope',
	function($resource) {
		return $resource(apiSrc + '/releases/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])

app.factory('SubService', ['$resource', '$http', '$rootScope',
	function($resource) {
		return $resource(apiSrc + '/subscribers/:id', {
			id: '@subnumber'
		}, {
			update: {
				method: 'PUT'
			}
		})
	}
])

app.factory('UserService', ['$resource', '$http', '$rootScope',
	function($resource) {
		return $resource(apiSrc + '/users/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])

app.factory('ContactService', function($resource) {
	return $resource(apiSrc + '/contacts/:id', {
		id: '@contact_no'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('ContactReportService', function($resource) {
	return $resource(apiSrc + '/contact/report/')
})

app.factory('SubReportService', function($resource) {
	return $resource(apiSrc + '/subscriber/report/')
})

app.factory('PledgeService', function($resource) {
	return $resource(apiSrc + '/pledge/:subno', {
		subno: '@subnumber'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('OnlineSubsService', function($resource) {
	return $resource(apiSrc + '/subform/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('PrizetypesService', function($resource) {
	return $resource(apiSrc + '/prizetypes/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('SubsBandService', function($resource) {
	return $resource(apiSrc + '/subscribers/band/:subbandname', {
		name: '@subbandname'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

app.factory('BandService', function($resource) {
	return $resource(apiSrc + '/band/:subid', {
		name: '@subid'
	}, {
		update: {
			method: 'PUT'
		}
	})
})

// override the default input to update on blur
app.directive('ngBlur', function() {
	return function(scope, elem, attrs) {
		elem.bind('blur', function() {
			scope.$apply(attrs.ngBlur);
		});
	};
})

app.directive('ngUppercaseBlur', function() {
	return function(scope, elem, attrs) {
		elem.bind('blur', function() {
			scope.$apply(attrs.ngUppercaseBlur);
		});
	};
})

app.directive('ngUppercaseInput', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function($viewValue) {
				if ($viewValue) {
					var capitalized = $viewValue.toUpperCase();
					if (capitalized !== $viewValue) {
						modelCtrl.$setViewValue(capitalized);
						modelCtrl.$render();
					}
					return capitalized;
				}

			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]); // capitalize initial value
		}
	};
})

app.directive('ngUppercaseInput2', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function($viewValue) {
				var initCursor = element[0].selectionStart;
				if ($viewValue) {
					var capitalized = $viewValue.toUpperCase();
					if (capitalized !== $viewValue) {
						modelCtrl.$setViewValue(capitalized);
						modelCtrl.$render();
					}
					element[0].selectionStart = element[0].selectionEnd = initCursor;
					return capitalized;
				}

			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]); // capitalize initial value
		}
	};
})


app.directive('selectOnClick', function() {
	return function(scope, element, attrs) {
		element.bind('click', function() {
			this.select();
		});
	};
});


app.directive('ngOnBlur', function($parse) {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs) {
			var onBlurFunction = $parse(attrs['ngOnBlur']);
			elm.bind("blur", function(event) {
				scope.$apply(function() {
					onBlurFunction(scope, {
						$event: event
					});
				})
			});
		}
	}
})


app.directive('ngModelOnblur', function($parse) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elm, attrs, ngModelCtrl) {
			if (attrs.type === 'radio' || attrs.type === 'checkbox') return;

			elm.unbind('input').unbind('keydown').unbind('change');
			var onBlurFunction = $parse(attrs['ngModelOnblur']);
			elm.bind('blur', function() {
				scope.$apply(function() {
					onBlurFunction(scope, {
						$event: event
					});
				});
			});
		}
	};
})


app.filter('prizefilter', function() {
	return function(arr, type, subtype) {

		if (!('contains' in String.prototype))
			String.prototype.contains = function(str, startIndex) {
				return -1 !== String.prototype.indexOf.call(this, str, startIndex);
			};
		var newArr = [];

		angular.forEach(arr, function(value, key) {
			if (type === 'Silver') {
				if (value['prizetype'].prizetypename.contains('Silver')) {
					this.push(value);
				}
			} else {
				if (value['prizetype'].prizetypename.contains('Community') && ((subtype == 'Community Group') || (subtype == 'Business') || (subtype == 'Artworker'))) {
					this.push(value);
				}
				if (value['prizetype'].prizetypename.contains('Pet') && (subtype == 'Pet')) {
					this.push(value);
				}
				if (value['prizetype'].prizetypename.contains('Inter') && ((subtype == 'Interstate') || (subtype == 'International'))) {
					this.push(value);
				}
				if ((value['prizetype'].prizetypename.contains('individual') && (subtype == 'Concession' || subtype == 'Full' || subtype == 'Passionate' || subtype == 'Under 18')) || (value['prizetype'].prizetypename.contains('musician') && (subtype == 'Solo Musician' || subtype == 'Band'))) {
					this.push(value);
				}
			}
		}, newArr);
		return newArr;
	}

})

.filter('byprize', function() {
	return function(prizes, subtypeid) {
		var out = [];
		angular.forEach(prizes, function(value, key) {
			if (value.subtypes) {
				value.subtypes.forEach(function(v) {
					if (v.subtypeid === subtypeid) {
						out.push(value);
					}
				});
			}
		}, out);
		return out;
	};
})

.directive('accessLevel', ['AuthenticationService',
	function(AuthenticationService) {
		return {
			restrict: 'A',
			link: function($scope, element, attrs) {
				var prevDisp = element.css('display'),
					userRole, accessLevel;


				$scope.user = AuthenticationService.user;

				$scope.$watch('user', function(user) {

				if (user.role)
					userRole = user.role;
					updateCSS();
				}, true);

				attrs.$observe('accessLevel', function(al) {
					if (al) accessLevel = $scope.$eval(al);
					updateCSS();
				});

				function updateCSS() {
					if (userRole && accessLevel) {
						if (!AuthenticationService.authorize(accessLevel, userRole))
							element.css('display', 'none');
						else
							element.css('display', prevDisp);
					}
				}
			}
		};
	}
]);



app.run(function($rootScope, $state, $window, $location, AuthenticationService) {


	$rootScope.$on('$stateChangeStart', function(event, next, current) {
		if (!AuthenticationService.authorize(next.access)) {
			if (AuthenticationService.isLoggedIn()) {
				$location.path('/');
				$location.replace()
				//$state.go('default', {}, { location: true, inherit: true, relative: $state.$current, notify: false });
			} else {
				//$state.go('login', {}, { location: true, inherit: true, relative: $state.$current, notify: false });
				$location.path('/login');
				$location.replace();
			}
		}

	});
});
