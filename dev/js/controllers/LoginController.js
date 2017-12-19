/* globals angular, jQuery */

//This controller handles the Login Modal dialog
(function (ng, $) {
  "use strict";
  
  angular.module('elthelas').controller('LoginController', ['$scope', '$location', 'AuthenticationProvider', '$uibModalInstance', 
  function($scope, $location, AuthenticationProvider, $uibModalInstance) {
    var vm = this;
    
    $scope.username;
    $scope.password;
    $scope.rememberMe = true;
    $scope.login = login;
    
    
    vm.postLogin = function(response) {
        if(response.status === 200) {
          if(!response.data.success) {
            $(".modal-body .alert").remove();
            $(".modal-body").prepend("<div class='alert alert-danger'>" + response.data.message + "</div>");
          } else {
            AuthenticationProvider.SetCredentials($scope.username, $scope.password, response.data.token, $scope.rememberMe);
            $uibModalInstance.close('login success');
          }
        } else if(response.status === 401) {
          alert("Incorrect username or password.");
        } else {
          vm.dataLoading = false;
        }      
    };
    function login() {
      vm.dataLoading = true;
      return AuthenticationProvider.Login($scope.username, $scope.password, vm.postLogin);
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
})(angular, jQuery);