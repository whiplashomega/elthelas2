/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('GodsController', ['$scope', 'godProvider', 'god', function($scope, godProvider, god) {
    $scope.gods = false;
    $scope.GodByName = "";
    $scope.alignment = "";
    $scope.domain = "";
    $scope.alignmentGods = [];
    $scope.domainGods = [];
    
    $scope.loadGod = function(id) {
      $scope.GodByName = $scope.gods.filter(function(god) {
        return god.id === id;
      })[0];
    };
    
    $scope.alignmentSelect = function() {
      $scope.alignmentGods = $scope.gods.filter(function(god) {
        return god.alignment === $scope.alignment;
      });
    };
    
    $scope.domainSelect = function() {
      $scope.domainGods = $scope.gods.filter(function(god) {
        var domains = god.domains5.split(", ");
        return domains.includes($scope.domain);
      });
    };
    
    godProvider.getAll().then(function(response) {
      $scope.gods = response;
      if(god) {
        $scope.loadGod($scope.gods.filter(function(a) {return (a.id === god || a.name === god);})[0].id);
      }
    });

  }]);
})(jQuery, angular);
