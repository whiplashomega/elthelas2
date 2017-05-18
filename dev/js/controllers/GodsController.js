/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('GodsController', ['$scope', 'godProvider', '$location', function($scope, godProvider, $location) {
    $scope.gods = false;
    $scope.GodByName = "";
    $scope.alignment = "";
    
    $scope.loadGod = function(id) {
      $scope.GodByName = $scope.gods.filter(function(god) {
        return god.id === id;
      })[0];
    };
    
    godProvider.getGods().then(function(response) {
      $scope.gods = response.data;
      $scope.loadGod($location.search().god);
    });

  }]);
})(jQuery, angular);