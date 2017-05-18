/* globals describe, inject, spyOn, it, expect*/

describe('Quick Controller Tests', function() {
  var service, $q, deferred, $scope, controller;
  var resolveObject = { data: [{
    "title": "Test Spell",
    "level": "level1",
    "school": "conjuration",
    "castingTime": "1 action",
    "duration": "1 round",
    "tags": ["ritual", "wizard"]
  }]};
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$q_, _$rootScope_, SpellProvider) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = SpellProvider;
    
    spyOn(SpellProvider, 'getSpells').and.returnValue(deferred.promise);
    
    controller = $controller('QuickController', {
      $scope: $scope,
      SpellProvider: SpellProvider
    });
  }));
  
  it('factory function should be defined', function() {
    expect(service.getSpells()).toBeDefined();
  });
  
  it('factory function should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.spells).toBeDefined();
    
  });
  
  it('should have a loadSpell function that populates $scope.currentSpell', function() {
    deferred.resolve(resolveObject);
    $scope.$apply();
    $scope.loadSpell(0);
    expect($scope.currentSpell).toBeDefined();
    expect($scope.currentSpell.title).toBe("Test Spell");
  });
});