/* globals angular, jQuery */

(function(ng, $) {
  ng.module("elthelas").controller("BackgroundController", ['$scope', 'backgroundProvider', function($scope, backgroundProvider) {
    $scope.backgrounds = [];
    
    backgroundProvider.getBackgrounds().then(function(response) {
      $scope.backgrounds = response.data.documents;
      for(var x = 0; x < $scope.backgrounds.length; x++) {
        $scope.backgrounds[x].isCollapsed = true;
      }
    });    
  }]);
})(angular, jQuery);