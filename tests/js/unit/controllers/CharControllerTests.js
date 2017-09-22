/* globals describe, it, inject, expect, spyOn */

describe('CharController Tests: ', function() {
  var races, classes, backgrounds, spells, items, $q, deferred, $scope;
  var resolveRaces = { data: { documents: [{}] } };
  var resolveClasses = { data: { documents: [{}] } };
  var resolveBackgrounds = { data: { documents: [{}] } };
  var resolveEquipment = { data: { documents: [{}] }};
  var resolveWeapons = { data: { documents: [{}] }};
  var resolveArmor = { data: { documents: [{}] }};
  var resolveMagicItems = { data: { documents: [{}] }};
  var resolveSpells = { data: { documents: [{}] }};
  beforeEach(module('elthelas'));
  beforeEach(inject(function($controller, _$q_, _$rootScope_, raceProvider, backgroundProvider, classProvider, ItemProvider, SpellProvider) {
    
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    races = raceProvider;
    backgrounds = backgroundProvider;
    classes = classProvider;
    items = ItemProvider;
    spells = SpellProvider;
    
    spyOn(raceProvider, 'getRaces').and.returnValue(deferred.promise);
    spyOn(backgroundProvider, 'getBackgrounds').and.returnValue(deferred.promise);
    spyOn(classProvider, 'getAll').and.returnValue(deferred.promise);
    spyOn(ItemProvider, 'getEquipment').and.returnValue(deferred.promise);
    spyOn(ItemProvider, 'getArmor').and.returnValue(deferred.promise);
    spyOn(ItemProvider, 'getWeapons').and.returnValue(deferred.promise);
    spyOn(ItemProvider, 'getMagicItems').and.returnValue(deferred.promise);
    spyOn(SpellProvider, 'getSpells').and.returnValue(deferred.promise);
    
    $controller('CharController', {
      $scope: $scope,
      raceProvider: raceProvider,
      backgroundProvider: backgroundProvider,
      classProvider: classProvider,
      ItemProvider: ItemProvider,
      SpellProvider: SpellProvider
    })
  }));
  
  it('getRaces should be defined', function() {
    expect(races.getRaces()).toBeDefined();
  });
  
  it('getBackgrounds should be defined', function() {
    expect(backgrounds.getBackgrounds()).toBeDefined();
  });
  
  it('classProvider.getAll should be defined', function() {
    expect(classes.getAll()).toBeDefined();
  });
  
  it('getEquipment should be defined', function() {
    expect(items.getEquipment()).toBeDefined();
  });
  
  it('getArmor should be defined', function() {
    expect(items.getArmor()).toBeDefined();
  });
  
  it('getWeapons should be defined', function() {
    expect(items.getWeapons()).toBeDefined();
  });
  
  it('getMagicItems should be defined', function() {
    expect(items.getMagicItems()).toBeDefined();
  });
  
  it('getSpells should be defined', function() {
    expect(spells.getSpells()).toBeDefined();
  });
})