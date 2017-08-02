/* globals describe, inject, spyOn, it, expect*/

describe('Quick Controller Tests', function() {
  var service, $q, deferred, deferredMagic, deferredArmor, deferredWeapon, $scope, controller;
  var resolveObject = { data: { documents: [{
    "title": "Test Spell",
    "level": "level1",
    "school": "conjuration",
    "castingTime": "1 action",
    "duration": "1 round",
    "tags": ["ritual", "wizard"]
  }]}};
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$q_, _$rootScope_, SpellProvider, ItemProvider) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    deferredMagic = _$q_.defer();
    deferredArmor = _$q_.defer();
    deferredWeapon = _$q_.defer();
    service = SpellProvider;
    
    spyOn(SpellProvider, 'getSpells').and.returnValue(deferred.promise);
    spyOn(ItemProvider, 'getMagicItems').and.returnValue(deferredMagic.promise);
    spyOn(ItemProvider, 'getArmor').and.returnValue(deferredArmor.promise);
    spyOn(ItemProvider, 'getWeapons').and.returnValue(deferredWeapon.promise);
    controller = $controller('QuickController', {
      $scope: $scope,
      SpellProvider: SpellProvider,
      ItemProvider: ItemProvider
    });
  }));
  
  it('factory function should be defined', function() {
    expect(service.getSpells()).toBeDefined();
  });
  
  it('factory function should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    deferredMagic.resolve({ data: []});
    deferredArmor.resolve({ data: []});
    deferredWeapon.resolve({ data: []});
    
    $scope.$apply();
    
    expect($scope.spells).toBeDefined();
    
  });
  
  it('should have a loadSpell function that populates $scope.currentSpell', function() {
    deferred.resolve(resolveObject);
    deferredMagic.resolve({ data: []});
    deferredArmor.resolve({ data: []});
    deferredWeapon.resolve({ data: []});
    
    $scope.$apply();
    $scope.loadSpell(0);
    expect($scope.currentSpell).toBeDefined();
    expect($scope.currentSpell.title).toBe("Test Spell");
  });
});