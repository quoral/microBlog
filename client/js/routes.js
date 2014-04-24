define(['angular', 'app'], function(angular, app){

    'use strict';
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/', {
            templateUrl: 'client/partials/indexPartial.html',
            controller: 'MainCtrl'
        });
        $routeProvider.when('/admin', {
            templateUrl: 'client/partials/adminPartial.html',
            controller: 'MainCtrl'
        });
	$routeProvider.otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    }]);
});
