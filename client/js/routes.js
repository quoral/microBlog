define(['angular', 'app'], function(angular, app){

  'use strict';
  return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl: 'client/partials/indexPartial.html',
      controller: 'IndexCtrl'
    });
    $routeProvider.when('/haha', {
      templateUrl: 'client/partials/indexPartial.html',
      controller: 'IndexCtrl'
    });
		$routeProvider.otherwise({redirectTo: '/'});


    $locationProvider.html5Mode(true);
  }]);
});
