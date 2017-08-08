/* globals angular, jQuery */

(function(ng ,$) {
  'use strict';
  
  ng.module('elthelas').controller('RegisterController', ['$location', '$http', '$rootScope', '$uibModalInstance', '$scope', 'AuthenticationProvider',
    function($location, $http, $rootScope, $uibModalInstance, $scope, AuthenticationProvider) {
        var vm = this;
 
        $scope.register = register;
        $scope.user = {};
 
        function register() {
          vm.dataLoading = true;
          AuthenticationProvider.Register(
            $scope.user,
            function(response) {
              $uibModalInstance.close(function() {
                $rootScope.message = "Registration Successful!";
                if(response.data.success === true) {
                  AuthenticationProvider.SetCredentials($scope.user.username, $scope.user.password, response.data.token);
                }
              });
          });
        }
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };    
  }]);
})(angular, jQuery);