/* globals angular, jQuery */
(function(ng, $) {
  ng.module("elthelas").controller("HistoryController", ['$scope', 'HistoryProvider', '$uibModal', 
  function($scope, HistoryProvider, $uibModal) {
    $scope.history = [];
    HistoryProvider.getHistory().then(function(response) {
      $scope.history = response.data.sort(function(a,b) {
        if(a.date < b.date) {
          return -1;
        } else if(a.date > b.date) {
          return 1;
        } else {
          return 0;
        }
      });
    }, function() {
      
    });
    
    $scope.openEvent = function(event) {
      var parentElem = $("body");
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/event.html',
        controller: 'EventController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          event: function() {
            return event;
          }
        }
    });
    modalInstance.result.then(function (selectedItem) {
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
  }]).controller('EventController', ['$scope', '$uibModalInstance', 'event', function($scope, $uibModalInstance, event) {
    $scope.history = event;
    
    $scope.cancel = function() {
      $uibModalInstance.close('');
    };
  }]);
})(angular, jQuery);