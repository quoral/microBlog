'use strict';

angular.module('awebApp')
  .controller('MainCtrl', function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var currentNavItem = $routeParams.navItem;

    $scope.menuItems = [
      {'text':'First item', 'link':'first'},
      {'text':'Second item', 'link':'second'},
      {'text':'Third item', 'link':'third'},
    ]
    $scope.getCurrentNavItem = function(){
      if(currentNavItem != null && currentNavItem != undefined){
        return currentNavItem;
      }
      else{
        return "Default"
      }
    }
  });
