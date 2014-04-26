define(['angular', 'app'], function(angular, app){

    'use strict';
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/', {
            templateUrl: 'client/partials/indexPartial.html',
            controller: 'IndexCtrl'
        });
        $routeProvider.when('/admin', {
            templateUrl: 'client/partials/adminPartial.html',
            controller: 'AdminCtrl'
        });
        $routeProvider.when('/profile', {
            templateUrl: 'client/partials/profilePartial.html',
            controller: 'ProfileCtrl'
        });
	$routeProvider.otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    }]);
});
