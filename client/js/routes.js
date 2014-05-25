define(['angular', 'app'], function(angular, app){

    'use strict';
    return app.config(['$routeProvider', '$locationProvider', 'userRoles', function($routeProvider, $locationProvider, userRoles){
        $routeProvider.when('/', {
            templateUrl: 'client/partials/indexPartial.html',
            controller: 'IndexCtrl'
        });
        $routeProvider.when('/admin', {
            templateUrl: 'client/partials/adminPartial.html',
            controller: 'AdminCtrl',
            requiresUserRole: userRoles.admin,
        });
        $routeProvider.when('/profile', {
            templateUrl: 'client/partials/profilePartial.html',
            controller: 'ProfileCtrl',
            requiresUserRole: userRoles.user
        });
        $routeProvider.when('/create', {
            templateUrl: 'client/partials/createPostPartial.html',
            controller: 'CreatePostCtrl',
            requiresUserRole: userRoles.poster
        });
	$routeProvider.otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    }]);
});
