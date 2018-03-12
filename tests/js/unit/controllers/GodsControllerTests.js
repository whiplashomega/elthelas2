/* globals describe, it, inject, expect, spyOn*/


describe('God Controller Tests', function() {
  var service, $q, deferred, $scope;
  var resolveObject = [{ id: 'alohim' }, { id: 'amathera' }];
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$q_, _$rootScope_, godProvider) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = godProvider;
    
    spyOn(godProvider, 'getAll').and.returnValue(deferred.promise);
    
    $controller('GodsController', {
      $scope: $scope,
      godProvider: godProvider,
      god: false
    });
  }));
  
  it('should be defined', function() {
    expect(service.getAll()).toBeDefined();
  });
  
  it('should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.gods).toBeDefined();
    
  });
  
  it('should give us a god object with the correct id after calling loadGod', function() {
    
    expect($scope.GodByName).toBe("");
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadGod('alohim');
    
    expect($scope.GodByName.id).toBe('alohim');
    
  });
});