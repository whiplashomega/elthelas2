/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('geoProvider', ['$q', '$http', function($q, $http) {
    var geo = {};
    
    geo.getCities = function() {
      var deferred = $q.defer();
      
      $http.get("/json/cities.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    geo.getContinents = function() {
      var deferred = $q.defer();
      
      $http.get('/json/continents.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    geo.getFeatures = function() {
      var deferred = $q.defer();
      
      $http.get('/json/features.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    
    geo.getLandmarks = function() {
      var deferred = $q.defer();
      
      $http.get('/json/landmarks.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    
    geo.getNations = function() {
      var deferred = $q.defer();
      
      $http.get('/json/nations.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return geo;
  }]);
})(jQuery, angular);