/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('GodsController', ['$scope', 'godProvider', 'god', function($scope, godProvider, god) {
    $scope.gods = false;
    $scope.GodByName = "";
    $scope.alignment = "";
    
    $scope.loadGod = function(id) {
      $scope.GodByName = $scope.gods.filter(function(god) {
        return god.id === id;
      })[0];
    };
    
    godProvider.getGods().then(function(response) {
      $scope.gods = response.data.documents;
      $scope.loadGod($scope.gods.filter((a) => {return (a.id === god || a.name === god)})[0].id);
    });

  }]);
})(jQuery, angular);