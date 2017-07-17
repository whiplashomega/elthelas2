/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('DivineController', ['$scope', 'divineProvider', function($scope, divineProvider) {
    $scope.Divine = "";
    $scope.divines = [];
    $scope.types = [];
    $scope.divineFilter = null;
    
    $scope.filterDivines = function(a) {
      if($scope.divineFilter === null) {
        return true;
      } else {
        return a.type === $scope.divineFilter; 
      }
    };
    
    $scope.loadDivine = function(id) {
      $scope.Divine = $scope.divines.filter(function(a) {
        return a.id === id;
      })[0];
    };
    
    divineProvider.getDivines().then(function(response) {
      $scope.divines = response.data.documents;
      for(var x = 0; x < $scope.divines.length; x++) {
        if($scope.types.indexOf($scope.divines[x].type) === -1) {
          $scope.types.push($scope.divines[x].type);
        }
      }
    });
  }]);
})(jQuery, angular);