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
  var resolveArmor = {
    data: [ {
     "Armor": "Padded Armor",
     "Type": "Light",
     "Material": "Cloth",
     "AC": 11,
     "Strength": "-",
     "Stealth": "disadvantage",
     "Weight": 8,
     "Resistance": "-",
     "Price": 6,
     "Time to Craft": 1
    }]
  };
  var resolveWeapon = {
    data: [{
     "Name": "Light Hammer",
     "Type": "Simple",
     "Damage": "1d4 bludgeoning",
     "Weight": "2 lb",
     "Properties": "light, thrown (range 20/60)",
     "Cost": "2"
    }]
  };
  var resolveMagicItems = {
    data: [{
     "Item": "Arrow-Catching Shield",
     "Type": "Shield",
     "Cost (gp)": "4000",
     "Rarity": "Rare",
     "Attunement": "Yes",
     "Effect": "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead."
   },
   {
   "Item": "Bag of Holding",
   "Type": "Wondrous Item",
   "Cost (gp)": "3000",
   "Rarity": "Uncommon",
   "Attunement": "No",
   "Effect": "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action. If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\nPlacing a bag of holding inside an extradimensional space created by a Heward's handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
 }]
  };
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
  

});