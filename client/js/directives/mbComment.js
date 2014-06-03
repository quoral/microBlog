define(['angular'], function(angular){
    'use strict';
    return [function(){
        return {
            templateUrl: 'client/partials/comment-template.html',
            scope: {
                externalComment: '&mbComment',
                editable: '&editable'
            },
            controller: ['$scope', 'postService', function($scope, postService){
                $scope.editToggle = false;
                $scope.comment = angular.copy($scope.externalComment());
                $scope.$watch(function () {
                        return $scope.externalComment();
                    },
                    function(newVal, oldVal) {
                        $scope.comment = angular.copy($scope.externalComment());
                    },
                    true);

                $scope.removeComment = function(){
                    postService.comment.delete(
                        $scope.comment.PostId,
                        $scope.comment.id
                    );
                };
                $scope.editComment = function(comment){
                    postService.comment.put(
                        $scope.comment.PostId,
                        $scope.comment.id,
                        comment
                    ).then(function(data, status){
                            $scope.editCancel();
                        }, function(err){

                        }
                    );
                };

                $scope.editCancel = function(){
                    $scope.editToggle = false;
                    $scope.comment = angular.copy($scope.externalComment());
                };
                $scope.comment = angular.copy($scope.externalComment());
            }]

        };
    }];
});