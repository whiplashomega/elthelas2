/* globals describe, it, inject, expect, spyOn */

describe('CharController Tests: ', function() {
  var races, classes, backgrounds, spells, items, $q, deferred, $scope;
  /*var resolveRaces = { data: { documents: [{}] } };
  var resolveClasses = { data: { documents: [{}] } };
  var resolveBackgrounds = { data: { documents: [{}] } };
  var resolveEquipment = { data: { documents: [{}] }};
  var resolveWeapons = { data: { documents: [{}] }};
  var resolveArmor = { data: { documents: [{}] }};
  var resolveMagicItems = { data: { documents: [{}] }};
  var resolveSpells = { data: { documents: [{}] }};*/
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
    spyOn(backgroundProvider, 'getAll').and.returnValue(deferred.promise);
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
    });
  }));
  
  it('getRaces should be defined', function() {
    expect(races.getRaces()).toBeDefined();
  });
  
  it('backgrounds.getAll should be defined', function() {
    expect(backgrounds.getAll()).toBeDefined();
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
  
  it('should have a character object', function() {
    expect($scope.character).toBeDefined();
  });
  
  it('character object attributes exist', function() {
    expect($scope.character.str).toBeDefined();
    expect($scope.character.dex).toBeDefined();
    expect($scope.character.con).toBeDefined();
    expect($scope.character.int).toBeDefined();
    expect($scope.character.wis).toBeDefined();
    expect($scope.character.cha).toBeDefined();
  });
  
  it('character object should calculate ability modifiers correctly', function() {
    $scope.character.str = 12;
    expect($scope.character.strmod()).toBe(1);
    $scope.character.dex = 7;
    expect($scope.character.dexmod()).toBe(-2);
    $scope.character.con = 19;
    expect($scope.character.conmod()).toBe(4);
    $scope.character.int = 6;
    expect($scope.character.intmod()).toBe(-2);
  });
  
  it('character.addClass should increase the size of the array by 1', function() {
    var l = $scope.character.classes.length;
    $scope.character.addClass();
    expect(l + 1).toEqual($scope.character.classes.length);
  });
  it('character.removeClass should remove the class in question', function() {
    $scope.character.addClass();
    $scope.character.classes[1].name = "Wizard";
    $scope.character.addClass();
    $scope.character.classes[2].name = "Rogue";
    $scope.character.removeClass($scope.character.classes[1]);
    var filteredlist = $scope.character.classes.filter(function(a) {
      return a.name === "Wizard";
    });
    expect(filteredlist.length).toEqual(0);
  });
  
  it('should calculate skill mods correctly', function() {
    expect($scope.character.getSkillMod('Acrobatics')).toBe(-1);
    var acrobatics = $scope.character.skills.filter(function(a) { return a.name === "Acrobatics"; })[0];
    var acroindex = $scope.character.skills.indexOf(acrobatics);
    $scope.character.skills[acroindex].prof = true;
    expect($scope.character.getSkillMod('Acrobatics')).toBe(1);
    $scope.character.skills[acroindex].expertise = true;
    expect($scope.character.getSkillMod('Acrobatics')).toBe(3);
    $scope.character.dex = 12;
    expect($scope.character.getSkillMod('Acrobatics')).toBe(5);
    $scope.character.jack = true;
    expect($scope.character.getSkillMod('Acrobatics')).toBe(5);
    $scope.character.skills[acroindex].prof = false;
    $scope.character.skills[acroindex].expertise = false;
    $scope.character.jack = true;
    expect($scope.character.getSkillMod('Acrobatics')).toBe(2);
  });
  
  it('should calculate saving throw bonuses correctly', function() {
    $scope.character.str = 14;
    expect($scope.character.strsavebonus()).toBe(2);
    $scope.character.strsave = true;
    expect($scope.character.strsavebonus()).toBe(4);
    $scope.character.strsavemagic = -1;
    expect($scope.character.strsavebonus()).toBe(3);
  });
  
  it('should calculate total level correctly', function() {
    $scope.character.classes[0].level = 5;
    $scope.character.addClass();
    expect($scope.character.level()).toEqual(6);
  });
  
  it('should calculate proficiency correctly', function() {
    expect($scope.character.prof()).toEqual(2);
    $scope.character.classes[0].level = 9;
    expect($scope.character.prof()).toEqual(4);
  });
  
  it('should calculate point buy total', function() {
    $scope.character.racialstr = 2;
    expect($scope.character.pointbuytotal()).toEqual(-2);
    $scope.character.str = 10;
    expect($scope.character.pointbuytotal()).toEqual(0);
    $scope.character.dex = 15;
    expect($scope.character.pointbuytotal()).toEqual(9);
    $scope.character.con = 16;
    expect($scope.character.pointbuytotal()).toEqual(21);
    $scope.character.int = 17;
    expect($scope.character.pointbuytotal()).toEqual(36);
    $scope.character.wis = 14;
    expect($scope.character.pointbuytotal()).toEqual(43);
    $scope.character.cha = 18;
    expect($scope.character.pointbuytotal()).toEqual(62);
  });
  
  it('should calculate npc hp using standard hitdie size', function() {
    $scope.character.classes[0].hitdie = 8;
    expect($scope.character.npchp()).toEqual(4);
    $scope.character.classes[0].level = 10;
    expect($scope.character.npchp()).toEqual(40);
    $scope.character.con = 12;
    expect($scope.character.npchp()).toEqual(60);
  });
  
  it('should calculate heroic hp using PHB formula', function() {
    $scope.character.classes[0].hitdie = 10;
    expect($scope.character.heroichp()).toEqual(9);
    $scope.character.classes[0].level = 10;
    expect($scope.character.heroichp()).toEqual(54);
    $scope.character.con = 12;
    expect($scope.character.heroichp()).toEqual(74);
  });
  
  it('addAttack should increase size of attacks array', function() {
    var l = $scope.character.attacks.length;
    $scope.character.addAttack();
    expect(l + 1).toEqual($scope.character.attacks.length);
  });
  
  it('removeAttack should remove the specified attack from the array', function() {
    $scope.character.addAttack();
    $scope.character.attacks[0].name = "longsword";
    $scope.character.removeAttack($scope.character.attacks[0]);
    var att = $scope.character.attacks.filter(function(a) {
      return a.name === 'longsword';
    });
    expect(att.length).toEqual(0);
  });
  
  it('addArmor should increase size of armor array', function() {
    var l = $scope.character.armor.length;
    $scope.character.addArmor();
    expect(l + 1).toEqual($scope.character.armor.length);
  });
  
  it('removeArmor should remove the specified armor from the array', function() {
    $scope.character.addArmor();
    $scope.character.armor[0].name = "plate";
    $scope.character.removeArmor($scope.character.armor[0]);
    var att = $scope.character.armor.filter(function(a) {
      return a.name === 'plate';
    });
    expect(att.length).toEqual(0);
  });
  
  it('should calculate AC correctly', function() {
    $scope.character.addArmor();
    $scope.character.armor[0].ac = 12;
    expect($scope.character.ac()).toBe(11);
    $scope.character.dex = 16;
    expect($scope.character.ac()).toBe(15);
    $scope.character.armor[0].type = "heavy";
    expect($scope.character.ac()).toBe(12);
    $scope.character.armor[0].type = "medium";
    expect($scope.character.ac()).toBe(14);
    $scope.character.addArmor();
    expect($scope.character.ac()).toBe(14);
    $scope.character.armor[1].type = "shield";
    $scope.character.armor[1].ac = 4;
    expect($scope.character.ac()).toBe(18);
  });
  
  it('addEquipment should increase size of armor array', function() {
    var l = $scope.character.equipment.length;
    $scope.character.addEquipment();
    expect(l + 1).toEqual($scope.character.equipment.length);
  });
  
  it('removeEquipment should remove the specified armor from the array', function() {
    $scope.character.addEquipment();
    $scope.character.equipment[0].name = "plate";
    $scope.character.removeEquipment($scope.character.equipment[0]);
    var att = $scope.character.equipment.filter(function(a) {
      return a.name === 'plate';
    });
    expect(att.length).toEqual(0);
  });
  
  it('should calculate carry weight correctly', function() {
    $scope.character.cp = 50;
    expect($scope.character.carryWeight()).toEqual(1);
    $scope.character.addEquipment();
    $scope.character.equipment[0].weight = 10;
    expect($scope.character.carryWeight()).toEqual(11);
    $scope.character.equipment[0].carried = false;
    expect($scope.character.carryWeight()).toEqual(1);
  });
});