define(['angular', 'services', 'directives/mbPosts'], function(angular, services, mbPosts) {
    'use strict';

    /* Directives */
    angular.module('microBlog.directives', ['microBlog.services'])
        .directive('mbLoginButtons', [function() {
            return {
                restrict: 'E',
                templateUrl: 'client/partials/login-buttons-template.html',
                controller: ['$scope', '$window', function($scope, $window){
                    $scope.login = function(provider){
                        $window.location.href = '/rest/auth/' + provider;
                    };
                }]
            };
        }])
        .directive('mbMenu', [function(){
            return {
                restrict: 'E',
                templateUrl: 'client/partials/menu-template.html'
            };
        }])
        .directive('mbMenuItem', ['$location', function($location) {
            return function(scope, element, attrs){
                    if(attrs.href === $location.path()){
                        element.addClass('active');
                    }
                };
        }])
        .directive('mbPosts', mbPosts)
        .directive('mbPost', [function(){
            return {
                templateUrl: 'client/partials/post-template.html',
                scope: {
                    externalPost: '&mbPost',
                    externalRemovePost: '&removePost',
                    externalEditPost: '&editPost',
                    editable: '&editable'
                },
                link: function(scope, element, attrs){
                    if(attrs.editPost === undefined){
                        scope.editPost = false;
                    }
                    if(attrs.removePost === undefined){
                        scope.removePost = false;
                    }
                },
                controller: ['$scope', function($scope){
                    $scope.editToggle = false;
                    $scope.editPost = function(obj){
                        $scope.editToggle = false;
                        $scope.externalEditPost(obj);
                    };
                    $scope.post = angular.copy($scope.externalPost());
                    $scope.removePost = $scope.externalRemovePost;
                }]

            };

        }]);

});
