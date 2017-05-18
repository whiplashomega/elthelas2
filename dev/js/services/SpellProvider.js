/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('SpellProvider', ['$q', '$http', function($q, $http) {
    var spells = {};
    
    spells.getSpells = function() {
      var deferred = $q.defer();
      
      $http.get("/json/spells.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return spells;
  }]);
})(jQuery, angular);