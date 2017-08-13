/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('backgroundProvider', ['$q', '$http', function($q, $http) {
    var backgrounds = {};
    
    backgrounds.getBackgrounds = function() {
      var deferred = $q.defer();
      
      $http.get("/json/backgrounds.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return backgrounds;
  }]);
})(jQuery, angular);