/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('godProvider', ['$q', '$http', function($q, $http) {
    var gods = {};
    
    gods.getGods = function() {
      var deferred = $q.defer();
      
      $http.get("/json/gods.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return gods;
  }]);
})(jQuery, angular);