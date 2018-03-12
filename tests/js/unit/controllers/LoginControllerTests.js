/* global describe */
/* global it */
/* global inject */
/* global expect */
/* global spyOn*/

var mockAuthenticator = function(username, password) {
    var userList = [
    {
      username: 'test',
      password: 'test'
    }
  ];
  
  var responseObj = {
    status: 200,
    data: {
      success: false,
      message: 'invalid credentials'
    }
  };
  if(userList.filter(function(a) {
    return a.username === username && a.password === password;
  }).length === 1) {
    responseObj.data = {
      success: true
    };
  }
  
  return responseObj;
};

describe('Login Controller Tests', function() {
  var service, $q, deferred, $scope, controller, $uibModalInstance = { close: function() {}, dismiss: function() {} };

  beforeEach(module('elthelas'));


  beforeEach(inject(function($controller, _$q_, _$rootScope_, AuthenticationProvider) {  
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = AuthenticationProvider;
    $scope.username = "";
    $scope.password = "";
    
    spyOn(AuthenticationProvider, 'Login').and.callFake(function(username, password) {
      return mockAuthenticator(username, password);
    });
    
    controller = $controller('LoginController', {
      $scope: $scope,
      AuthenticationProvider: AuthenticationProvider,
      $uibModalInstance: $uibModalInstance
    });
  }));
  
  it('AuthenticationProvider Login Function should be defined', function() {
    expect(service.Login).toBeDefined();
  });
  
  it('Login function should call SetCredentials when given correct username and password, then close the modal', function() {
    $scope.username = 'test';
    $scope.password = 'test';
    $scope.rememberMe = false;
    
    spyOn(service, 'SetCredentials');
    spyOn($uibModalInstance, 'close');
    var loginResponse = $scope.login();
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.data.success).toBe(true);
    expect(loginResponse.data.message).not.toBeDefined();
    controller.postLogin(loginResponse);
    
    expect(service.SetCredentials).toHaveBeenCalledWith('test', 'test', undefined, false);
    expect($uibModalInstance.close).toHaveBeenCalledWith('login success');
  });
  
  it('Login function should not call SetCredentials and return error message when not given correct username and password', function() {
    $scope.username = 'test';
    $scope.password = 'jfslkfjsdlkfj';
    $scope.rememberMe = false;
    
    spyOn(service, 'SetCredentials');
    
    var loginResponse = $scope.login();
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.data.success).toBe(false);
    expect(loginResponse.data.message).toBeDefined();
    controller.postLogin(loginResponse);
    
    expect(service.SetCredentials).not.toHaveBeenCalled();
  }); 
});