/* global angular */
/* global jQuery */
/* global document, ga */
(function(ng, $, doc) {
    ng.module('elthelas').controller('HeaderController', ['$scope', '$state', '$rootScope', '$uibModal', '$document', 'AuthenticationProvider',
    function($scope, $state, $rootScope, $uibModal, $document, AuthenticationProvider) {
        $rootScope.$on('$viewContentLoading', function(event) {
          if($state.current.data.auth && $rootScope.globals === undefined) {
            event.preventDefault();
            $state.go('app');
            $scope.message = 'Access Denied';
            setTimeout(function() {
              $scope.message = false;
              $scope.$apply();
            }, 5000);
          }
        });
        //Google Custom Search
        var cx = '002019895859863268942:tbtmwpd5jy8';
        var gcse = doc.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (doc.location.protocol === 'https:' ? 'https:' : 'https:') +
          '//www.google.com/cse/cse.js?cx=' + cx;
        var s = doc.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
        $scope.title = $state.current.data.title;
        $scope.metadescription = $state.current.data.metadescription;
        $scope.metakeywords = $state.current.data.metakeywords;
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){ 
          $scope.title = $state.current.data.title;
          $scope.metadescription = $state.current.data.metadescription;
          $scope.metakeywords = $state.current.data.metakeywords;
          ga('send', 'pageview', '/' + $state.current.url);
        });
        AuthenticationProvider.LoadFromCookies();
        $scope.globals = $rootScope.globals;
        $scope.message = false;
        
        $scope.login = function(size) {
          var parentElem = $("body");
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/html/modals/login.html',
            controller: 'LoginController',
            size: size,
            appendTo: parentElem
          });
          
          modalInstance.result.then(function (selectedItem) {
              $scope.globals = $rootScope.globals;
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
              $scope.globals = $rootScope.globals;
            });
        };
        
        $scope.logout = function() {
            $scope.globals = undefined;
            if($state.current.data.auth) {
              $state.go('app');
            }
            AuthenticationProvider.ClearCredentials();
        };
        
        $scope.register = function(size) {
          var parentElem = $("body");
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/html/modals/register.html',
            controller: 'RegisterController',
            size: size,
            appendTo: parentElem
          });
          modalInstance.result.then(function (selectedItem) {
            selectedItem();
            $scope.globals = $rootScope.globals;
            $scope.message = $rootScope.message;
            setTimeout(function() {
              $scope.message = false;
              $scope.$apply();
            }, 5000);
            
          }, function () {
              console.log('Modal dismissed at: ' + new Date());
              $scope.globals = $rootScope.globals;
          });
        };
        
        $scope.account = function(size) {
          var parentElem = $("body");
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/html/modals/account.html',
            controller: 'UserController',
            size: size,
            appendTo: parentElem
          });
          
          modalInstance.result.then(function (selectedItem) {
              $scope.globals = $rootScope.globals;
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
              $scope.globals = $rootScope.globals;
            });
        };
    }]);
    
})(angular, jQuery, document);