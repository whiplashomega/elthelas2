/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('CampaignController', ['$scope', 'campaign', function($scope, campaign) {
    
  }]).controller('CampaignSidebarController', ['$scope', 'campaign', function($scope, campaign) {

    $scope.campaigns = [
      {
        id: "book1",
        name: "Epic of Elthelas Book 1 - The Crystal of Light",
        chapters: [
          {
            number: 1,
            name: "Chapter 1: Recruits"
          },
          {
            number: 2,
            name: "Chapter 2: Escape"
          },
          {
            number: 3,
            name: "Chapter 3: Pursuit"
          },
          {
            number: 4,
            name: "Chapter 4: Morrindim"
          },
          {
            number: 5,
            name: "Chapter 5: The Grove of Gaian"
          },
          {
            number: 6,
            name: "Chapter 6: Chosen"
          }
        ]
      },
      {
        id: "book2",
        name: "Epic of Elthelas Book 2 - The Rise of Gods",
        chapters: []
      }
    ]
    
    $scope.campaign = $scope.campaigns.filter(function(camp) {
      return camp.id === campaign;
    });
    
    $scope.loadCampaign = function(chapter) {
      
    }
    
  }]);
})(angular, jQuery);