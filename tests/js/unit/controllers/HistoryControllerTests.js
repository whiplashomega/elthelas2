/* globals describe, it, expect, inject, spyOn, beforeEach */

describe("History Controller Tests", function() {
  var service, $q, deferred, $scope, controller;
  beforeEach(module("elthelas"));
  var resolveObject = {
    data: {documents: [{
      "start_date": {
        "year": 0,
        "month": 0,
        "day": 0
      },
      "media": {
        "url": "",
        "caption": "",
        "credit": ""
      },
      "text": {
        "headline": "Title",
        "text": "Description"
      }
    }]
  }};
  beforeEach(inject(function($controller, _$q_, _$rootScope_, historyProvider){
    $q = _$q_;
    $scope = _$rootScope_.$new();
    $scope.timeline = { setData: function() {}, goTo: function() {}};
    deferred = _$q_.defer();
    service = historyProvider;
    
    spyOn(historyProvider, 'getAll').and.returnValue(deferred.promise);
    
    controller = $controller('HistoryController', {
      $scope: $scope,
      historyProvider: historyProvider,
      event: false
    });
  }));
  
  it('factory function should be defined', function() {
    expect(service.getAll()).toBeDefined();
  });
  
  it('factory function should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.history).toBeDefined();
    
  });
});