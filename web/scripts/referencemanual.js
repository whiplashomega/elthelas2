/* global jQuery angular spells marked */

(function($, ng) {
    var dmTools = ng.module('dmTools', []);
    
    //We'll go ahead and use jQuery and jQuery UI to initialize our layout space before we get into the meat of the various angular controllers.
    dmTools.controller('referenceManual', function($scope, $http) {
      $scope.spelllist = spells;
      $scope.content = "";
      $scope.loadspell = function() {
        var index = $("input[name='spellselect']:checked").val();
        $("#selectedspell").html(marked($scope.spelllist[index][3]));
      };
      $scope.loadspells = function() {
        var tabledata = [];
        for(var x in $scope.spelllist) {
            $scope.spelllist[x][2] = $scope.spelllist[x][2].replace("[","").replace("]","");
            $scope.spelllist[x][2] = $scope.spelllist[x][2].split(',');
            tabledata.push([
               "<input type='radio' name='spellselect' value='" + x + "' />",
               $scope.spelllist[x][0],
               $scope.spelllist[x][1],
               $scope.spelllist[x][2].join(),
            ]);
        }
        var table = $("#spelltable").dataTable({
            'data': tabledata,
            'columns': [
                { width: '10%', title: "select" },
                { width: '40%', title: "title" },
                { width: '15%', title: 'source'},
                { width: '35%', title: "tags" },
            ]
        });
      };
      $scope.init = function() {
        $("#refdiv").tabs();
        $scope.loadspells();
        $(".datatable").dataTable();
      };
    });
})(jQuery, angular);