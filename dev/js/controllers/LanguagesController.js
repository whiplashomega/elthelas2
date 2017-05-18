/*globals jQuery, angular */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('LanguagesController', ['$scope', function($scope) {
    $scope.init = function() {
      $(".datatable").dataTable();
    };
  }]);
})(jQuery, angular);