/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('EncounterController', ['$scope', 'beastProvider', 'creatures', function($scope, beastProvider, creatures) {
    
    $scope.partylevel = 1;
    $scope.partysize = 4;
    $scope.difficulty = "";
    
    function xpByCR(cr) {
      if(cr === 0) return 10;
      else if(cr === 0.125) return 25;
      else if(cr === 0.25) return 50;
      else if(cr === 0.5) return 100;
      else if(cr === 1) return 200;
      else if(cr === 2) return 450;
      else if(cr === 3) return 700;
      else if(cr === 4) return 1100;
      else if(cr === 5) return 1800;
      else if(cr === 6) return 2300;
      else if(cr === 7) return 2900;
      else if(cr === 8) return 3900;
      else if(cr === 9) return 5000;
      else if(cr === 10) return 5900;
      else if(cr === 11) return 7200;
      else if(cr === 12) return 8400;
      else if(cr === 13) return 10000;
      else if(cr === 14) return 11500;
      else if(cr === 15) return 13000;
      else if(cr === 16) return 15000;
      else if(cr === 17) return 18000;
      else if(cr === 18) return 20000;
      else if(cr === 19) return 22000;
      else if(cr === 20) return 25000;
      else if(cr === 21) return 33000;
      else if(cr === 22) return 41000;
      else if(cr === 23) return 50000;
      else if(cr === 24) return 62000;
      else if(cr === 26) return 90000;
      else if(cr === 30) return 155000;
    }
    
    $scope.calculateDifficulty = function() {
      var easythresholds = [25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400, 1600, 2000, 2100, 2400, 2800];
      var mediumthresholds = [50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500, 2800, 3200, 3900, 4200, 4900, 5700];
      var hardthresholds = [75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800, 4300, 4800, 5900, 6300, 7300, 8500];
      var deadlythresholds = [100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100, 5700, 6400, 7200, 8800, 9500, 10900, 12700];
      var easy = easythresholds[$scope.partylevel - 1] * $scope.partysize;
      var medium = mediumthresholds[$scope.partylevel - 1] * $scope.partysize;
      var hard = hardthresholds[$scope.partylevel - 1] * $scope.partysize;
      var deadly = deadlythresholds[$scope.partylevel - 1] * $scope.partysize;
      var xp = 0;
      for(var x = 0; x < $scope.encountercreatures.length; x++) {
        xp += xpByCR($scope.encountercreatures[x].cr);
      }
      $scope.xpvalue = xp;
      if($scope.partysize > 5) {
        if($scope.encountercreatures.length === 1) {
          xp *= 0.5;
        } else if($scope.encountercreatures.length === 2) {
          xp *= 1;
        } else if($scope.encountercreatures.length >= 3 && $scope.encountercreatures.length <= 6) {
          xp *= 1.5;
        } else if($scope.encountercreatures.length >= 7 && $scope.encountercreatures.length <= 10) {
          xp *= 2;
        } else if($scope.encountercreatures.length >= 11 && $scope.encountercreatures.length <= 14) {
          xp *= 2.5;
        } else {
          xp *= 3;
        }
      } else if($scope.partysize < 3) {
        if($scope.encountercreatures.length === 1) {
          xp *= 1.5;
        } else if($scope.encountercreatures.length === 2) {
          xp *= 2;
        } else if($scope.encountercreatures.length >= 3 && $scope.encountercreatures.length <= 6) {
          xp *= 2.5;
        } else if($scope.encountercreatures.length >= 7 && $scope.encountercreatures.length <= 10) {
          xp *= 3;
        } else if($scope.encountercreatures.length >= 11 && $scope.encountercreatures.length <= 14) {
          xp *= 4;
        } else {
          xp *= 5;
        }        
      } else {
        if($scope.encountercreatures.length === 1) {
          xp *= 1;
        } else if($scope.encountercreatures.length === 2) {
          xp *= 1.5;
        } else if($scope.encountercreatures.length >= 3 && $scope.encountercreatures.length <= 6) {
          xp *= 2;
        } else if($scope.encountercreatures.length >= 7 && $scope.encountercreatures.length <= 10) {
          xp *= 2.5;
        } else if($scope.encountercreatures.length >= 11 && $scope.encountercreatures.length <= 14) {
          xp *= 3;
        } else {
          xp *= 4;
        }        
      }
      $scope.adjustedxpvalue = xp;
      if(xp < easy) {
        $scope.difficulty = "too easy";
      } else if(xp < medium) {
        $scope.difficulty = "easy";
      } else if(xp < hard) {
        $scope.difficulty = "medium";
      } else if(xp < deadly) {
        $scope.difficulty = "hard";
      } else if(xp < deadly * 1.5) {
        $scope.difficulty = "deadly";
      } else {
        $scope.difficulty = "nigh on impossible";
      }
    }
    
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
        $scope.calculateDifficulty();
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
      $scope.calculateDifficulty();
      $scope.$apply();
    }
    
    $scope.removeCreature = function(creature) {
      $scope.encountercreatures.splice($scope.encountercreatures.indexOf(creature), 1);
      $scope.calculateDifficulty();
      $scope.$apply();
    }

  }]);
})(angular, jQuery);