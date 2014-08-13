'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute','ngGrid',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/slides', {
        templateUrl: 'partials/ecranveille.html',
        controller: 'SliderController'
      }).
      when('/activities/:keyboard', {
        templateUrl: 'partials/activitieslist.html',
        controller: 'ServicesListController'
      }).
      when('/detailsactivities/:idActivity', {
        templateUrl: 'partials/detailsactivity.html',
        controller: 'ActivityDtlsController'
      }).
      when('/products/:idActivity', {
        templateUrl: 'partials/listproduct.html',
        controller: 'ProductsListController'
      }).
      when('/rdv/:idActivity', {
        templateUrl: 'partials/rdv.html',
        controller: 'RDVController'
      }).
       when('/users', {
        templateUrl: 'partials/modalUser.html',
        controller: 'ModalInstanceCtrl'
      }).
      otherwise({
        redirectTo: '/slides'
      }); 
  }]);
  
