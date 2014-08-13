
'use strict';

angular.module('myAdminApp', [
  'ngRoute',//'ngGrid',
  //'myAdminApp.filters',
  'myAdminApp.services',
  //'myAdminApp.directives',
  'myAdminApp.controllers'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	when('/login/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController',
		access: {
			isFree: true
		}
      }).

      when('/menu/', {
        templateUrl: 'partials/menuadmin.html',
        controller: 'AdminSlideCtrl',
		access: {
			isFree: false
		}

      }).
      when('/addSlides/', {
        templateUrl: 'partials/addSlide.html',
        controller: 'AdminSlideCtrl',
		access: {
			isFree: false
		}
      }).

      when('/delSlides/', {
        templateUrl: 'partials/delSlide.html',
        controller: 'AdminSlideCtrl',
		access: {
			isFree: false
		}
      }).
      when('/replacetop/', {
        templateUrl: 'partials/replaceTop.html',
        controller: 'AdminCharteCtrl',
		access: {
			isFree: false
		}
      }).
	        when('/replacetop/', {
        templateUrl: 'partials/replaceTop.html',
        controller: 'AdminCharteCtrl',
		access: {
			isFree: false
		}
      }).
	  	        when('/replacetop1/', {
        templateUrl: 'partials/replaceTop1.html',
        controller: 'AdminCharteCtrlT1',
		access: {
			isFree: false
		}
      }).
	        when('/replacebottom/', {
        templateUrl: 'partials/replaceBottom.html',
        controller: 'AdminCharteCtrlB',
		access: {
			isFree: false
		}
      }).
	        when('/replacemiddle/', {
        templateUrl: 'partials/replaceMiddle.html',
        controller: 'AdminCharteCtrlM',
		access: {
			isFree: false
		}
      }).
	  	        when('/addActivites/', {
        templateUrl: 'partials/addActivities.html',
        controller: 'AddActivityController',
		access: {
			isFree: false
		}
      })
	  .  when('/addActFile/:id', {
        templateUrl: 'partials/addActivityFile.html',
        controller: 'AddActivityController',
		access: {
			isFree: false
		}
      }).
	    when('/delActivites/', {
        templateUrl: 'partials/delActivities.html',
        controller: 'DelActiviteCtrl',
		access: {
			isFree: false
		}
      }).
		when('/addUsers/', {
        templateUrl: 'partials/addUsers.html',
        controller: 'AddUsersCtrl',
		access: {
			isFree: false
		}
      }).when('/delUsers/', {
        templateUrl: 'partials/delUsers.html',
        controller: 'DelUsersCtrl',
		access: {
			isFree: false
		}
      }).
      otherwise({
        redirectTo: '/menu/'
      }); 
  }]);
//  