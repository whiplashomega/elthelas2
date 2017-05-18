/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('divineProvider', ['$q', '$http', function($q, $http) {
    var divines = {};
    
    divines.getDivines = function() {
      var deferred = $q.defer();
      
      $http.get("/json/divines.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return divines;
  }]);
})(jQuery, angular);