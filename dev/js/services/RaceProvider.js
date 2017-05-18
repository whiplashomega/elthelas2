/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('raceProvider', ['$q', '$http', function($q, $http) {
    var races = {};
    
    races.getRaces = function() {
      var deferred = $q.defer();
      
      $http.get("/json/races.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return races;
  }]);
})(jQuery, angular);