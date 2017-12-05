/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('EncounterController', ['$scope', 'beastProvider', 'creatures', function($scope, beastProvider, creatures) {

    $scope.creatures = [];

    $scope.encountercreatures = [];

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

    beastProvider.getAll().then(function(response) {
      $scope.creatures = response;
      var creatureTableData = [];
      //post processing
      for(var x = 0; x < $scope.creatures.length; x++) {
        var id = 'creature' + x;
        $scope.creatures[x].strmod = Math.floor($scope.creatures[x].str/2 - 5);
        $scope.creatures[x].dexmod = Math.floor($scope.creatures[x].dex/2 - 5);
        $scope.creatures[x].conmod = Math.floor($scope.creatures[x].con/2 - 5);
        $scope.creatures[x].intmod = Math.floor($scope.creatures[x].int/2 - 5);
        $scope.creatures[x].wismod = Math.floor($scope.creatures[x].wis/2 - 5);
        $scope.creatures[x].chamod = Math.floor($scope.creatures[x].cha/2 - 5);
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
      if(creatures) {
        for(var x = 0; x < creatures.length; x++) {
          var cre = $scope.creatures.filter(function(a) {
            return a.name.toLowerCase().replace(/ /g, '') === creatures[x].toLowerCase().replace(/ /g, '');
          });
          if(cre.length > 0) {
            $scope.encountercreatures.push(cre[0]);
          }
        }
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

    $scope.loadCreature = function(index) {
      $scope.encountercreatures.push($scope.creatures[index]);
      $scope.$apply();
    }
    
    $scope.removeCreature = function(creature) {
      $scope.encountercreatures.splice($scope.encountercreatures.indexOf(creature), 1);
      $scope.$apply();
    }

  }]);
})(angular, jQuery);