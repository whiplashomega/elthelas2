/* globals angular */

(function(ng) {
  ng.module('elthelas').controller('SpellController', ['$scope', '$uibModalInstance', 'spell', function($scope, $uibModalInstance, spell) {
    $scope.spell = spell;
    
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }]);
})(angular);