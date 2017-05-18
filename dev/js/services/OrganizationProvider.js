/*global jQuery, angular*/

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('organizationProvider', ['$q', '$http', function($q, $http) {
    var organizations = {};
    
    organizations.getOrganizations = function() {
      var deferred = $q.defer();
      
      $http.get("/json/organizations.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return organizations;
  }]);
})(jQuery, angular);