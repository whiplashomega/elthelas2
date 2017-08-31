/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('DomainController', ['$scope', function($scope) {
    $('.racediv').hide();
    $('.racebutton').click(function() {
      var classToShow = $(this).attr('data-race');
      $('.racediv').hide();
      $('#' + classToShow).show();
    });
  }]);
})(angular, jQuery);