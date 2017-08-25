/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('ItemProvider', ['$q', '$http', function($q, $http) {
    var items = {};
    
    items.getMagicItems = function() {
      var deferred = $q.defer();
      
      $http.get("/json/magicitems.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    items.getWeapons = function() {
      var deferred = $q.defer();
      
      $http.get("/json/weapons.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    items.getArmor = function() {
      var deferred = $q.defer();
      
      $http.get("/json/armor.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    items.getEquipment = function() {
      var deferred = $q.defer();
      
      $http.get('/json/equipment.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    }
    return items;
  }]);
})(jQuery, angular);