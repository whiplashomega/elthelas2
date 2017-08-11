/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('CampaignController', ['$scope', 'campaign', function($scope, campaign) {
    
  }]).controller('CampaignSidebarController', ['$scope', 'campaign', function($scope, campaign) {

    $scope.campaigns = [
      {
        id: "book1",
        name: "Epic of Elthelas Book 1 - The Crystal of Light",
      },
      {
        id: "book2",
        name: "Epic of Elthelas Book 2 - The Rise of Gods",
      }
    ]
    
    $scope.campaign = $scope.campaigns.filter(function(camp) {
      return camp.id === campaign;
    });
    
    $scope.loadCampaign = function(chapter) {
      
    }
    
  }]);
})(angular, jQuery);