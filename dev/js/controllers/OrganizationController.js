/*global jQuery */
/*global angular */
(function($, ng) {
  "use strict";
  ng.module('elthelas').controller('OrganizationController', ['$scope', '$location', 'organizationProvider', 'org', function($scope, $location, organizationProvider, org) {
    $scope.currentOrg = false;
    
    $scope.loadOrg = function(id) {
      var tempArray = $scope.organizations.filter(function(org) {
        return org.id === id;
      });
      if(tempArray.length > 0) {
        $scope.currentOrg = tempArray[0];
      }
      else {
        $scope.currentOrg = {
          id: 'error',
          name: ''
        };
      }
    };
    
    organizationProvider.getOrganizations().then(function(response) {
      $scope.organizations = response.data.documents;
      if(org) {
        $scope.loadOrg($scope.organizations.filter(function(a) {return (a.id === org || a.title === org);})[0].id);
      }
    });
  }]);
})(jQuery, angular);