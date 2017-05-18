/*global jQuery angular getUrl getAllUrl deleteUrl updateUrl addUrl spells deleteAttackUrl droll */
(function($, ng) {
    $("#sidebar").remove();
    $("#main").addClass("col-md-12").removeClass("col-md-10");
    var CharDashboard = ng.module('chardashboard', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
    CharDashboard.directive('convertToNumber', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(val) {
            return val !== null ? parseInt(val, 10) : null;
          });
          ngModel.$formatters.push(function(val) {
            return val !== null ? '' + val : null;
          });
        }
      };
    });
    CharDashboard.directive('dynamic', function ($compile) {
      return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
          scope.$watch(attrs.dynamic, function(html) {
            ele.html(html);
            $compile(ele.contents())(scope);
          });
        }
      };
    });
    
    CharDashboard.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});
    CharDashboard.controller("charcontroller", function($scope, $http, $window, $compile, $sce) {
      $scope.charModel = function() {
        this.id = null;
        this.proficiency = 2;
        this.str = 10;
        this.dex = 10;
        this.con = 10;
        this.intel = 10;
        this.wis = 10;
        this.cha = 10;
        this.acrobatics = 0;
        this.animalhandling = 0;
        this.arcana = 0;
        this.athletics = 0;
        this.deception = 0;
        this.history = 0;
        this.insight = 0;
        this.intimidation = 0;
        this.investigation = 0;
        this.medicine = 0;
        this.nature = 0;
        this.perception = 0;
        this.performance = 0;
        this.persuasion = 0;
        this.religion = 0;
        this.slightofhand = 0;
        this.stealth = 0;
        this.survival = 0;
        this.type = "humanoid";
        this.attacks = [];
        this.spells = [];
        this.possessions = [];
      };
      
      $scope.floor = Math.floor;
      $scope.character = new $scope.charModel();
      
      $scope.charname = "";
      $scope.alertcontent = "";
      $scope.attackrolls = [];
      
      $scope.addCantrip = function() {
          $scope.character.spells.push({
             title: "",
             source: "",
             school: "abjuration",
             level: "cantrip",
             ritual: false,
             castingtime: "1 action",
             range: "self",
             components: "",
             duration: "instantaneous",
             concentration: false,
             description: "",
             higherlevels: "",
             fromclass: "",
             prepared: true,
             castingstat: "",
             view: false,
             edit: true,
          });
      };
      
      $scope.cantripFilter = function() {
          return true;
      };
      $scope.ac = function() {
          var ac = 10 + $scope.floor(($scope.character.dex/2) - 5);
          if($scope.character.unarmoredstat === "str") {
              ac += $scope.floor(($scope.character.str/2) - 5);
          }
          if($scope.character.unarmoredstat === "dex") {
              ac += $scope.floor(($scope.character.dex/2) - 5);
          }
          if($scope.character.unarmoredstat === "con") {
              ac += $scope.floor(($scope.character.con/2) - 5);
          }
          if($scope.character.unarmoredstat === "int") {
              ac += $scope.floor(($scope.character.intel/2) - 5);
          }
          if($scope.character.unarmoredstat === "wis") {
              ac += $scope.floor(($scope.character.wis/2) - 5);
          }
          if($scope.character.unarmoredstat === "cha") {
              ac += $scope.floor(($scope.character.cha/2) - 5);
          }
          var foundarmor = false;
          var shieldbonus = 0;
          for(var x = 0; x < $scope.character.possessions.length; x++) {
              if($scope.character.possessions[x].equipped) {
                  if($scope.character.possessions[x].armortype === "shield") {
                      shieldbonus = Math.max($scope.character.possessions[x].ac, shieldbonus);
                  } else if($scope.character.possessions[x].armortype === "unarmored" || $scope.character.possessions[x].armortype === "natural" || $scope.character.possessions[x].armortype === "light") {
                      ac = $scope.character.possessions[x].ac + $scope.floor(($scope.character.dex/2) - 5);
                  } else if($scope.character.possessions[x].armortype === "medium") {
                      ac = $scope.character.possessions[x].ac + Math.min($scope.floor(($scope.character.dex/2) - 5), $scope.character.mediummaxac);
                  } else if($scope.character.possessions[x].armortype === "heavy") {
                      ac = $scope.character.possessions[x].ac;
                  }
              }
          }
          ac += shieldbonus;
          return ac;
      };
      
      $scope.addattack = function() {
          $scope.character.attacks.push({
             name: "",
             bonus: 0,
             damage: "",
             crit: "",
          });
      };
      
      $scope.deleteattack = function(attack) {
        if(attack.id !== undefined) {
          $http.post(deleteAttackUrl.replace(/[0-9]/g, '') + attack.id).then(function() {
            $scope.character.attacks.splice($scope.character.attacks.indexOf(attack), 1);
          });
        } else {
          $scope.character.attacks.splice($scope.character.attacks.indexOf(attack), 1);
        }
      };
      $scope.rollattack = function(attack) {
        try {
          
        } catch(e) {
          
        }
        var roll1 = $scope.rolldice(20);
        var roll2 = $scope.rolldice(20);
        $scope.attackrolls.push({
          name: attack.name,
          roll1raw: roll1,
          roll2raw: roll2,
          bonus: attack.bonus,
          roll1: roll1 + attack.bonus,
          roll2: roll2 + attack.bonus,
          damage: droll.roll(attack.damage),
          crit: droll.roll(attack.crit),
        });
      };
      
      $scope.rolldice = function(size) {
        return Math.floor(Math.random() * (size - 1 + 1)) + 1;
      };
      
      $scope.loadChar = function(id) {
        if (id === undefined) {
          id = $("input[name='creature']:checked").val();
        }
        var loadCharUrl = getUrl.replace(/[0-9]/g, '') + id;
        $http.get(loadCharUrl).then(function(data) {
          $scope.character = data.data;
          var throwaway;
          throwaway = $scope.character.strsave ? $scope.character.strsave = true : $scope.character.strsave = false;
          throwaway = $scope.character.dexsave ? $scope.character.dexsave = true : $scope.character.dexsave = false;
          throwaway = $scope.character.consave ? $scope.character.consave = true : $scope.character.consave = false;
          throwaway = $scope.character.intsave ? $scope.character.intsave = true : $scope.character.intsave = false;
          throwaway = $scope.character.wissave ? $scope.character.wissave = true : $scope.character.wissave = false;
          throwaway = $scope.character.chasave ? $scope.character.chasave = true : $scope.character.chasave = false;
          throwaway = $scope.alertcontent = "Loaded Successfully!";
          setTimeout(function() {
            $scope.alertcontent = "";
          }, 4000);
        });
      };
      
      $scope.saveChar = function() {
        var updateCharUrl = updateUrl.replace(/[0-9]/g, '') + $scope.character.id;
        $http.post(updateCharUrl, $scope.character).then(function(data) {
          $scope.character = data.data;
          $scope.alertcontent = "Saved Successfully!";
          $scope.getAllCharacters();
          setTimeout(function() {
            $scope.alertcontent = "";
          }, 4000);
        });
      };
      
      $scope.newChar = function() {
        if($scope.charname !== "") {
          $scope.character = new $scope.charModel();
          $scope.character.name = $scope.charname;
          $http.post(addUrl, $scope.char).then(function(data) {
            $scope.char = data.data;
            $scope.getAllCharacters();
          });
        } else {
          alert("You must supply a name to create a new character");
        }
      };
      
      $scope.deleteChar = function(id) {
        if (id === undefined) {
          id = $("input[name='creature']:checked").val();
        }
        var del = deleteUrl.replace(/[0-9]/g, '') + id;
        $http.get(del).then(function() {
          $scope.alertcontent = "Deleted Successfully!";
          $scope.getAllCharacters();
          setTimeout(function() {
              $scope.alertcontent = "";
            }, 4000);
        });
      };
      
      $scope.getAllCharacters = function() {
        $http.get(getAllUrl).then(function(data) {
            $scope.creatures = data.data;
            var tabledata = [];
            var table;
            for(var x = 0; x < $scope.creatures.length; x++) {
                tabledata.push([
                        "<input type='radio' name='creature' value='" + $scope.creatures[x].id + "' />",
                        $scope.creatures[x].name
                ]);
            }
            if ($.fn.dataTable.isDataTable('#charlist')) {
              table = $('#charlist').dataTable();
              table.fnClearTable();
              table.fnAddData(tabledata);
            }
            else {
              table = $("#charlist").dataTable({
                'data': tabledata,
                'lengthChange': false,
                'pageLength': 5,
                'columns': [
                  { width: "25%", title: "select" },
                  { width: "75%", title: "name" },
                ]
              });              
            }
        });
      };
      $scope.currentSpell = {};
      $scope.viewKnownSpell = function(spell) {
        spell.view = !spell.view;
      };
      $scope.editKnownSpell = function(spell) {
        spell.edit = !spell.edit;
      };
      $scope.deleteKnownSpell = function(spell) {
        $scope.character.spells.splice($scope.character.spells.indexOf(spell), 1);
      };
      $scope.viewSpell = function(x) {
          $scope.currentSpell = spells[x];
      };
      $scope.addSpellFromList = function(x) {
          $scope.character.spells.push({
             title: spells[x].title,
             source: spells[x].source,
             school: spells[x].school,
             level: spells[x].level,
             ritual: spells[x].ritual,
             castingtime: spells[x].castingTime,
             range: spells[x].range,
             components: spells[x].components,
             duration: spells[x].duration,
             concentration: spells[x].concentration,
             description: $sce.trustAsHtml(spells[x].description),
             higherlevels: spells[x].higherlevels,
             fromclass: "",
             prepared: false,
             castingstat: "",
             view: false,
             edit: false,
          });
      };
      $scope.buildSpellTable = function() {
        var tabledata = [];
        for(var x in spells) {
            tabledata.push([
               "<div class='btn-group'><input type='button' value='View' data-ng-click='viewSpell(" + x + ")' class='btn btn-sm btn-primary' />" +
               "<input type='button' value='Add' data-ng-click='addSpellFromList(" + x + ")' class='btn btn-sm btn-success' /></div>",
               spells[x].title,
               spells[x].source,
               spells[x].tags.join(", "),
               
            ]);
        }
        var table = $("#spelltable").dataTable({
            'data': tabledata,
                "drawCallback": function( settings ) {
                    var rows = $("#spelltable tr").not("tr.compiled");
                    $("#spelltable tr").not("tr.compiled").each(function() {
                        $compile($(this).contents())($scope);
                        $(this).addClass("compiled");
                    });
                },
            'columns': [
                { width: '15%', title: "Controls" },
                { width: '35%', title: "Title" },
                { width: '15%', title: 'Source'},
                { width: '35%', title: "Tags" },
            ]
        });
      };
      $scope.init = function() {
        $scope.getAllCharacters();
        $scope.buildSpellTable();
      };
    });
})(jQuery, angular);