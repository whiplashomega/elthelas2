/* globals describe, it, inject, expect, spyOn*/


describe('Divine Controller Tests', function() {
  var service, $q, deferred, $scope;
  var resolveObject = { data: { documents: [{ id: 'ara', type: "Fey" }, { id: 'sanguine', type: "Fey" }]}};
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$q_, _$rootScope_, divineProvider) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = divineProvider;
    
    spyOn(divineProvider, 'getAll').and.returnValue(deferred.promise);
    
    $controller('DivineController', {
      $scope: $scope,
      divineProvider: divineProvider
    });
  }));
  
  it('should be defined', function() {
    expect(service.getAll()).toBeDefined();
  });
  
  it('should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.divines).toBeDefined();
    
  });
  
  it('should give us a divine object with the correct id after calling loadDivine', function() {
    
    expect($scope.Divine).toBe("");
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadDivine('ara');
    
    expect($scope.Divine.id).toBe('ara');
    
    expect($scope.types.length).toEqual(1);
  });
  
});