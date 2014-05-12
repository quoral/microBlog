define([], function(){
   'use strict';
    return [function(){
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
                $scope.$watch(function () {
                        return $scope.externalPost();
                    },
                    function(newVal, oldVal) {
                        $scope.post = angular.copy($scope.externalPost());
                    },
                    true);
                $scope.editCancel = function(){
                    $scope.editToggle = false;
                    $scope.post = angular.copy($scope.externalPost());
                }
                $scope.post = angular.copy($scope.externalPost());
                $scope.removePost = $scope.externalRemovePost;
            }]

        };
    }];
});