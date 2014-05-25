define([], function() {
    return ['$scope', 'postService', function($scope, postService) {
        $scope.clearForm = function () {
            $scope.postHeader = '';
            $scope.postText = '';
            $scope.postForm.$setPristine();
        };
        $scope.addPost = function (postText, postHeader) {
            postService.post({text: postText, header: postHeader})
                .then(function (data, status) {
                    $scope.clearForm();
                }, function (data, status) {
                    console.log('Failed adding post', status);
                });
        };
        $scope.$apply();
    }];
});