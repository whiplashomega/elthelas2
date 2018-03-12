/* globals describe, it, inject, expect*/


describe('Languages Controller Tests', function() {
  var controller;
  var $scope = {};
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$rootScope_) {
    $scope = _$rootScope_.$new();
    controller = $controller('LanguagesController', {$scope: $scope});
  }));
  it('should exist', function() {
    expect(controller).toBeDefined();
    expect($scope.init).toBeDefined();
  });
});