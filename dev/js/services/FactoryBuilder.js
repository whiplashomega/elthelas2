/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  function createFactory(name, url) {
    ng.module('elthelas').factory(name, ['$q', '$http', function($q, $http) {
      var factory = {
        data: []
      };
      
      factory.retreiveData = function() {
        var deferred = $q.defer();
        
        $http.get(url).then(function(response) {
          factory.data = response.data.documents;
          deferred.resolve(response);
        }, function(response) {
          deferred.reject();
        });
        
        return deferred.promise;        
      };
      
      factory.getAll = function() {
        var deferred = $q.defer();
        
        if(factory.data.length > 0) {
          deferred.resolve(factory.data);
        } else {
          factory.retreiveData().then(function() {
            deferred.resolve(factory.data);
          }, function() { deferred.resolve(false); });
        }
        
        return deferred.promise;
      };
      
      factory.getByValue = function(key, value) {
        var deferred = $q.defer();
        
        if(factory.data.length > 0) {
          deferred.resolve(factory.data.filter(function(a) {
            return a[key] === value;
          }));
        } else {
          factory.retreiveData().then(function(response) {
            deferred.resolve(factory.data);
          }, function() { deferred.resolve(false); });
        }
        
        return deferred.promise;
      };
      
      return factory;
    }]);
  }
  
  createFactory('beastProvider', '/json/creatures.json');
  
  createFactory('classProvider', '/json/classes.json');
  
  createFactory('backgroundProvider', '/json/backgrounds.json');
  
  createFactory('divineProvider', '/json/divines.json');
  
  createFactory('godProvider', '/json/gods.json');
  
  createFactory('historyProvider', '/json/history.json');
})(jQuery, angular);