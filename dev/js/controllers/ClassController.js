/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('ClassController', ['$scope', function($scope) {
    $('.racediv').hide();
    $('.racebutton').click(function() {
      var classToShow = $(this).attr('data-race');
      $('.racediv').hide();
      $('#' + classToShow).show();
    });
    var options = {
      responsive: true,
        ordering: false,
        paging: false,
        info: false
      };
    $('#factotumtable').DataTable(options);
    $('#rangertable').DataTable(options);
  }]);
})(angular, jQuery);