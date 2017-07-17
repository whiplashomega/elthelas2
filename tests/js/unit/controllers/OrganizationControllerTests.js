/* global describe, inject, spyOn, expect */

describe('Organizations Controller Tests', function() {
  var service, $q, deferred, $scope, controller;
  var resolveObject = { data: { documents: [{
  "id": "trollkinmercenarycorps",
  "title": "Trollkin Mercenary Corps",
  "description": "The Trollkin Mercenary Corps is the official diplomatic arm of Degak'Ta, but membership is not restricted to citizens of Degak'Ta or Trollkin.  They are an elite group of mercenaries who will sign up for any conflict for the right price, even different sides of the same conflict. Once contracted they are known to be extremely loyal and impartial, governed by the contract they are given until it expires.  Further they are known to be among the best warriors in the world, so being able to afford Trollkin Mercenaries is considered extremely prestigious.",
  "nations": [
    "degakta"
  ],
  "cities": [
    "sunra"
  ],
  "tenets": [
    "My contract is law.  Failing to fulfill the contract I agree to is never acceptable for any reason.",
    "Never work without payment.  We are not a charity organization",
    "Avoid religious entanglements.  Many employers have particular religious beliefs, and one should avoid offending future employers.  I must never engage in public displays of religion or work directly for a religious organization."
  ],
  "level1": "####Advance Payment####People who give you contracted missions are willing to pay in advance whenever they are able.  The reputation of the Mercenary Corps preceeds you.",
  "level10": "####Battle Master####The advance training the Corps provides has paid off and you are able to do more damage with every swing of your sword or shot of your bow.  You get +1d4 damage on all weapon attack rolls."
  },
  {
  "id": "sylvansrangers",
  "title": "Sylvan's Rangers",
  "description": "Reknowned explorers and adventurers, Sylvan's Rangers are a loose organization dedicated to exploring unknown haunts.  They sponsor outfitters in cities close to remote locations that act as the gatekeepers to the organization.  These outfitters compile maps and information brought in by the rangers, creating guide books and outfitting kits.",
  "nations": [
    "eldoran",
    "demalthor",
    "gerasalim",
    "morrindim",
    "deradragorim",
    "staelia",
    "zelfir"
  ],
  "cities": [
    "lastwatch",
    "mandon",
    "seldan",
    "dima",
    "storval",
    "estapor",
    "aridhem",
    "eastguard",
    "portsmith",
    "pelgan",
    "morrind"
  ],
  "tenets": [
    "To stay in one place is to fail to grow, I must always be finding new places",
    "The frontiers are dangerous and I must always strive to make them safer for others",
    "I must attempt to preserve natural beauty where I find it"
  ],
  "level1": "####Favored Terrain####\n\nYou gain a favored terrain.  See the ranger feature in the PHB, if you already have a favored terrain you may pick an additional one.",
  "level10": "####Master Hunter####\n\nAdd the spell hunter's mark to your spells known or spellbook.  If you do not the ability to cast spells, you gain the ability to cast hunter's mark 1/day as a first level spell.  The duration changes from 'Concentration up to 1 hour' to '1 hour'."
  },
  { "id": "badFormat" }]}};
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$q_, _$rootScope_, organizationProvider) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = organizationProvider;
    
    spyOn(organizationProvider, 'getOrganizations').and.returnValue(deferred.promise);
    
    controller = $controller('OrganizationController', {
      $scope: $scope,
      organizationProvider: organizationProvider
    });
  }));
  it('factory function should be defined', function() {
    expect(service.getOrganizations()).toBeDefined();
  });
  
  it('factory function should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.organizations).toBeDefined();
    
  });
  
  it('factory function should give us an organizations array in $scope.organizations', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.organizations.filter).toBeDefined();    
  });
  
  it('factory function should give us an organization object with the correct id after calling loadOrg', function() {
    
    expect($scope.currentOrg).toBe(false);
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadOrg('trollkinmercenarycorps');
    
    expect($scope.currentOrg.id).toBe('trollkinmercenarycorps');
    
  });
  
  it('should give an error message when we try to load an organization that does not exist', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadOrg('fakeOrg');
    
    expect($scope.currentOrg.id).toBe('error');
  });
});