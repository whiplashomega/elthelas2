/* globals describe, it, expect, inject, spyOn, beforeEach */

describe("History Controller Tests", function() {
  var service, $q, deferred, $scope, controller;
  beforeEach(module("elthelas"));
  var resolveObject = {
    data: [{
      "date": 0,
      "title": "Title",
      "shortDesc": "Short Description",
      "description": "This is a longer description"
    }]
  };
  beforeEach(inject(function($controller, _$q_, _$rootScope_, HistoryProvider){
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = HistoryProvider;
    
    spyOn(HistoryProvider, 'getHistory').and.returnValue(deferred.promise);
    
    controller = $controller('HistoryController', {
      $scope: $scope,
      HistoryProvider: HistoryProvider
    });
  }));
  
  it('factory function should be defined', function() {
    expect(service.getHistory()).toBeDefined();
  });
  
  it('factory function should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.history).toBeDefined();
    
  });
});