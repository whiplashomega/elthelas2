/* globals angular */

(function(ng) {
  ng.module('elthelas').controller('UserController', ['AuthenticationProvider', '$scope',  '$uibModalInstance', function(AuthenticationProvider, $scope, $uibModalInstance) {
    $scope.user = {};
    AuthenticationProvider.GetUserDetails(function(response) {
      $scope.user = response;
      $scope.user.password = "";
    });
    
    $scope.updateUser = function() {
      AuthenticationProvider.UpdateUser(
        $scope.user.username, 
        $scope.user.firstname, 
        $scope.user.lastname, 
        $scope.user.password, 
        $scope.user.passwordConfirm, function(response) {
          if(response) {
            $scope.user.firstname = response.firstname;
            $scope.user.lastname = response.lastname;
            $scope.user.password = response.password;
            alert("User Details Updated Successfully");
            $uibModalInstance.close('User Details Updated Successfully');
          } else {
            alert("User Update Failed");
          }          
        });
      

    };
    
    $scope.deleteUser = function() {
      AuthenticationProvider.DeleteUser($scope.user.username, $scope.user.password, function(response) {
        if(response) {
          AuthenticationProvider.ClearCredentials();
          $uibModalInstance.close('User Deleted Successfully');
        } else {
          alert("User Delete Failed");
        }
      });
    };
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
})(angular);