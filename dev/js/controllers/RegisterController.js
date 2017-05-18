/* globals angular, jQuery */

(function(ng ,$) {
  'use strict';
  
  ng.module('elthelas').controller('RegisterController', ['$location', '$http', '$rootScope', '$uibModalInstance', '$scope', 'AuthenticationProvider',
    function($location, $http, $rootScope, $uibModalInstance, $scope, AuthenticationProvider) {
        var vm = this;
 
        $scope.register = register;
 
        function register() {
          vm.dataLoading = true;
          AuthenticationProvider.Register(
            $("#fos_user_registration_form_username").val(),
            $("#fos_user_registration_form_plainPassword_first").val(),
            $("#fos_user_registration_form_plainPassword_second").val(),
            $("#fos_user_registration_form_email").val(), 
            $("#fos_user_registration_form__token").val(),
            function(response) {
              $uibModalInstance.close(function() {
                $rootScope.message = response.data;
              });
          });
        }
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };    
  }]);
})(angular, jQuery);