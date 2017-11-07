/* globals angular, jQuery */

(function(ng, $) {
  ng.module("elthelas").controller("BeastController", ['$scope', 'beastProvider', '$uibModal', function($scope, beastProvider, $uibModal) {
    
    function createDataTable(selector, data, columns, postInit) {
      $(selector + ' tfoot th').each(function() {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" style="min-width: 80px" placeholder="Search '+title+'" />' );
      });
          
      var table = $(selector).DataTable({
        responsive: true,
        paging: false,
        data: data,
        columns: columns,
        fixedHeader: {
          footer: true
        },
        initComplete: postInit
      });
      table.columns().every(function () {
        $('input', this.footer()).on('keyup change', function(a, b) {
          var index = this.parentNode.cellIndex;
          table.column(index).search(this.value).draw();
        });
      });
      
      return table;
    }
    $scope.creatures = [];
    
    $scope.loadCreature = function(index) {
      $scope.currentCreature = $scope.creatures[index];
      $scope.$apply();
      var parentElem = $('body');
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/beast.html',
        controller: 'CreatureController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          creature: function() {
            return $scope.currentCreature;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {}, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    
    beastProvider.getAll().then(function(response) {
      $scope.creatures = response;
      
      var creatureTableData = [];
      var acTot = 0;
      var numCre = 0;
      for(var x = 0; x < $scope.creatures.length; x++) {
        var id = 'creature' + x;
        var combinedType = $scope.creatures[x].type;
        if($scope.creatures[x].subtype) {
          combinedType += ' (' + $scope.creatures[x].subtype + ')';
        }
        
        var thisCreature = [
          '<a href="#" data-creatureid="' + x + '" class="' + id+ '">' + $scope.creatures[x].name + "</a>",
          $scope.creatures[x].cr,
          combinedType,
          $scope.creatures[x].alignment,
          $scope.creatures[x].size
        ];
        creatureTableData.push(thisCreature);
      }
      
      createDataTable('#creaturetable', creatureTableData, [
        { title: "Name" },
        { title: "CR" },
        { title: "Type" },
        { title: "Alignment" },
        { title: "Size" }
      ], function() {
        var callback = function() {
          $scope.loadCreature(Number($(this).attr('data-creatureid')));
        };
        for(var x = 0; x < $scope.creatures.length; x++) {
          $(".creature" + x).click(callback);
        }
      });
    });    
  }]).controller('CreatureController', ['$scope', '$uibModalInstance', 'creature', function($scope, $uibModalInstance, creature) {
    $scope.creature = creature;
    
    $scope.creature.strmod = Math.floor($scope.creature.str/2 - 5);
    $scope.creature.dexmod = Math.floor($scope.creature.dex/2 - 5);
    $scope.creature.conmod = Math.floor($scope.creature.con/2 - 5);
    $scope.creature.intmod = Math.floor($scope.creature.int/2 - 5);
    $scope.creature.wismod = Math.floor($scope.creature.wis/2 - 5);
    $scope.creature.chamod = Math.floor($scope.creature.cha/2 - 5);
    
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }]);
})(angular, jQuery);