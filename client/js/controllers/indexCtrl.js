define([], function(){
  'use strict';
  return ['$scope', '$http', function($scope, $http){
    $scope.hi = 'wat';
    //This is needed since the controller is loaded asynchroneusly.
    //We thus 'miss' Angular's call to $apply when the controller is loaded.
    $scope.$apply();
  }];
});
