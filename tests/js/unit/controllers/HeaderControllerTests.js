/* globals describe, it, inject, expect*/


describe('Header Controller Tests', function() {
  var controller;
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$rootScope_, _$state_) {
    controller = $controller('HeaderController', { $scope: _$rootScope_.$new(), $state: { current: { data: {title: 'test'}}} });
  }));
  it('should exist', function() {
    expect(controller).toBeDefined();
  });
});