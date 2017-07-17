/* globals angular, jQuery */
(function(ng, $) {
  ng.module("elthelas").controller("HistoryController", ['marked', '$scope', 'HistoryProvider', '$uibModal', 'event',
  function(marked, $scope, HistoryProvider, $uibModal, event) {
    $scope.options = {
      language: 'el',
      layout: 'portrait',
      timenav_position: 'top',
      scale_factor: 20,
    };
    
    $scope.history = [];
    HistoryProvider.getHistory().then(function(response) {
      $scope.history = response.data.documents;
      var data = {
        'title': {
          'text': {
            'headline': 'Known History of Elthelas',
            'text': ''
          }
        },
        'events': $scope.history
      };
      for(var e in data.events) {
        data.events[e].text.text = marked(data.events[e].text.text);
      }
      $scope.timeline.setData(data);
      $scope.timeline.goTo(data.events.length);
      if(event) {
        var selected = $scope.history.filter(function(a) {
          return a.text.headline.toLowerCase().replace(/ /g, "") === event.toLowerCase().replace(/ /g, ""); 
        })[0];
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/event.html',
        controller: 'HistoryEventController',
        size: 'lg',
        appendTo: $('body'),
        resolve: {
          event: function() {
            return selected;
          }
        }
      });
          
      modalInstance.result.then(function (selectedItem) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
      }
    }, function() {
      
    });
  }]).controller('HistoryEventController', ['$scope', '$uibModalInstance', 'event', function($scope, $uibModalInstance, event) {
    $scope.event = event;
    
    function elthelasDateFormat(date) {
      switch (Number(date.data.month)) {
        case 1:
          date.month = "Neradan"; break;
        case 2:
          date.month = "Dorunor"; break;
        case 3:
          date.month = "Trimalan"; break;
        case 4:
          date.month = "Sylvanus"; break;
        case 5:
          date.month = "Gaiana"; break;
        case 6:
          date.month = "Alohiman"; break;
        case 7:
          date.month = "Coranus"; break;
        case 8:
          date.month = "Moltyr"; break;
        case 9:
          date.month = "Saris"; break;
        case 10:
          date.month = "Maridia"; break;
        case 11:
          date.month = 'Tockra'; break;
        case 12:
          date.month = "Amatherin"; break;
        default:
          break;
      }
      date.day = date.data.day;
      date.year = date.data.year;
      
      return date;
    }
    $scope.event.start_date = elthelasDateFormat($scope.event.start_date);
    if($scope.event.end_date) {
      $scope.event.end_date = elthelasDateFormat($scope.event.end_date);
    }
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }]);
})(angular, jQuery);