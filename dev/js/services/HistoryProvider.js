/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('HistoryProvider', ['$q', '$http', function($q, $http) {
    var history = {};
    
    history.getHistory = function() {
      var deferred = $q.defer();
      
      $http.get("/json/history.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return history;
  }]);
})(jQuery, angular);