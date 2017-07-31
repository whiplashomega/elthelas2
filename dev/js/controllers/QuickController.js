/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('QuickController', ['$scope', 'SpellProvider', '$uibModal', function($scope, SpellProvider, $uibModal) {
    $scope.loadSpell =  function(index) {
      $scope.currentSpell = $scope.spells[index];
      $scope.$apply();
      var parentElem = $("body");
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/spell.html',
        controller: 'SpellController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          spell: function() {
            return $scope.currentSpell;
          }
        }
      });
          
      modalInstance.result.then(function (selectedItem) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    $scope.currentSpell = false;
    $scope.spells;
    this.init = function() {
      SpellProvider.getSpells().then(function(response) {
        $scope.spells = response.data.documents;
        
        var spellTableData = [];
        for(var x = 0; x < $scope.spells.length; x++) {
          if($scope.spells[x].level !== undefined) {
            $scope.spells[x].level = $scope.spells[x].level.replace('level', "");
          } else {
            $scope.spells[x].level = " ";
          }
          var id = 'spell' + x;
          var thisSpell = [
            '<a href="#" data-spellid="' + x + '" class="' + id + '">' + $scope.spells[x].title + "</a>",
            $scope.spells[x].level,
            $scope.spells[x].school,
            $scope.spells[x].castingTime,
            $scope.spells[x].duration,
            $scope.spells[x].tags.join(", "),
            "<input type='button' value='View' class='btn btn-sm btn-primary " + id + "' data-spellid='" + x + "' />"
          ];
          spellTableData.push(thisSpell);
        }
        $('#spelltable').dataTable({
            data: spellTableData,
            responsive: true,
            columns: [
              { title: "Title" },
              { title: "Level" },
              { title: "School" },
              { title: "Casting Time" },
              { title: "Duration" },
              { title: "Tags" },
              { title: "View" }
            ],
            drawCallback: function() {
              var callback = function() {
                $scope.loadSpell(Number($(this).attr('data-spellid')));
              };
              for(var x = 0; x < $scope.spells.length; x++) {
                $(".spell" + x).click(callback);
              }
            }
          });
        $('.datatable').DataTable();
        
        function createDataTable(selector) {
          $(selector + ' tfoot th').each(function() {
            var title = $(this).text();
            $(this).html( '<input type="text" class="form-control" style="min-width: 80px" placeholder="Search '+title+'" />' );
          });
          
          var table = $(selector).DataTable({
            responsive: true,
          });
          
          table.columns().every(function () {
            $('input', this.footer()).on('keyup change', function(a, b) {
              var index = this.parentNode.cellIndex;
              table.column(index).search(this.value).draw();
            });
          }); 
        }
        
        createDataTable('#magictable');
        createDataTable('#armortable');
        createDataTable('#weapontable');
      });
    };
    
    this.init();
  }]);
})(jQuery, angular);