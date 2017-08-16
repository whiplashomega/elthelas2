/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('beastProvider', ['$q', '$http', function($q, $http) {
    var creatures = {};
    
    creatures.getCreatures = function() {
      var deferred = $q.defer();
      
      $http.get("/json/creatures.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return creatures;
  }]);
})(jQuery, angular);