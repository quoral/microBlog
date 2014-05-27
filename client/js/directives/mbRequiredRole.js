define([], function() {
    'use strict';
    return ['authService', function (authService) {
        return {
            restrict: 'A',
            scope: {
                'requiredRole': '@role',
                'requiredUserId': '&userId'
            },
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                        return authService.currentUser;
                    },
                    function (newVal, oldVal) {
                        reEvaluateShow();
                    },
                    true);
                scope.$watch(function () {
                        return scope.requiredUserId();
                    },
                    function (newVal, oldVal) {
                        reEvaluateShow();
                    },
                    true);
                function reEvaluateShow() {
                    var isValidUserId, isValidRole;
                    if (authService.currentUser) {
                        isValidRole = authService.roleIsAuthenticated(authService.currentUser.role, scope.requiredRole);
                    }
                    if (scope.requiredUserId() && authService.currentUser) {
                        isValidUserId = authService.currentUser.id === scope.requiredUserId();
                    }
                    var expr = isValidRole === true || isValidUserId === true;
                    if (expr) {
                        element.show();
                    }
                    else {
                        element.hide();
                    }
                }
            }
        };
    }]
})