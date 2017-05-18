/*global spells marked loadpath updatepath deletepath loadallpath deleteJournalRoute getJournalsRoute addJournalRoute jQuery angular*/
(function($, ng) {
    var dmTools = ng.module('dmTools', ['ngSanitize']);
    
    //We'll go ahead and use jQuery and jQuery UI to initialize our layout space before we get into the meat of the various angular controllers.
    $("#content").tabs();
    $("#main").addClass("col-md-12").removeClass("col-md-10");
    $("#sidebar").addClass("hidden");
    
    dmTools.controller('creatureCreator', function($scope, $http) {
      $scope.creatures = [];
      
      $scope.creatureModel = function() {
          this.id = 0;
          this.attacks = [];
        };
      $scope.creature = new $scope.creatureModel(); 
      $scope.creatureSelect = 0;
      $scope.alertcontent = "";
      
      $scope.loadCreature = function(id) {
        if (id === undefined) {
          id = $("input[name='creature']:checked").val();
        }
        var load = loadpath.slice(0,-1) + id;
        $http.get(load).success(function(data) {
          $scope.alertcontent = "Loaded Successfully!";
          $scope.creature = data;
          setTimeout(function() {
            $scope.alertcontent = "";
          }, 10000);
        });
      };
      
      $scope.newChar = function() {
          $scope.creature = new $scope.creatureModel();
      };
      
      $scope.saveCreature = function() {
        var update = updatepath.slice(0,-1) + $scope.creature.id;
        $http.get(update, $scope.creature).success(function() {
          $scope.alertcontent = "Saved Successfully!";
          $scope.getAllCreatures();
          setTimeout(function() {
            $scope.alertcontent = "";
          }, 10000);
        });
      };
      
      $scope.deleteCreature = function(id) {
        if (id === undefined) {
          id = $("input[name='creature']:checked").val();
        }
        var del = deletepath.slice(0,-1) + id;
        $http.get(del).success(function() {
          $scope.alertcontent = "Deleted Successfully!";
          $scope.getAllCreatures();
          setTimeout(function() {
              $scope.alertcontent = "";
            }, 10000);
        });
      };
      
      $scope.getAllCreatures = function() {
        $http.get(loadallpath).success(function(data) {
            $scope.creatures = data;
            var tabledata = [];
            var table;
            for(var x = 0; x < $scope.creatures.length; x++) {
                tabledata.push([
                        "<input type='radio' name='creature' value='" + $scope.creatures[x].id + "' />",
                        $scope.creatures[x].name,
                        $scope.creatures[x].race,
                        $scope.creatures[x].classlevel,
                        $scope.creatures[x].cr,
                        $scope.creatures[x].background,
                        $scope.creatures[x].alignment
                ]);
            }
            if ($.fn.dataTable.isDataTable('.creatureLoad')) {
              table = $('.creatureLoad').dataTable();
              table.fnClearTable();
              table.fnAddData(tabledata);
            }
            else {
              table = $(".creatureLoad").dataTable({
                'data': tabledata,
                'columns': [
                  { width: '10%', title: "select" },
                  { width: '20%', title: "name" },
                  { width: '15%', title: "race" },
                  { width: '15%', title: "class/level" },
                  { width: '10%', title: "cr" },
                  { width: '15%', title: "background" },
                  { width: '15%', title: "alignment" }
                ]
              });              
            }
        });
      };
      
      $scope.addAttack = function() {
        $scope.creature.attacks.push({attack: "", bonus: 0, damage: ""});
      };
      $scope.init = function() {
        $scope.getAllCreatures();
      };
    });
    
    dmTools.controller('encounterBuilder', function($scope, $http) {
      $scope.creatures = [];
      $scope.addCreature = function() {

        var id = $("input[name='creature']:checked").val();

        var load = loadpath.slice(0,-1) + id;
        $http.get(load).success(function(data) {
          $scope.creatures.push(data);
        });        
      };
      
      $scope.removeCreature = function(id) {
        $scope.creatures.splice(id,1);
      };
      
      $scope.tabify = function() {
        $(".statblock").tabs();
        setTimeout($scope.tabify,3000);
      };
      
      $scope.refreshList = function() {
        $http.get(loadallpath).success(function (creatures) {
            var tabledata = [];
            for(var x = 0; x < creatures.length; x++) {
                tabledata.push([
                        "<input type='radio' name='creature' value='" + creatures[x].id + "' />",
                        creatures[x].name,
                        creatures[x].race,
                        creatures[x].classlevel,
                        creatures[x].cr,
                        creatures[x].background,
                        creatures[x].alignment
                ]);
            }
          var table = $("#encounterTable").dataTable();
          table.fnClearTable();
          table.fnAddData(tabledata);          
        });

      };
      
      $scope.init = function() {
        $scope.tabify();          
      };

    });

    dmTools.controller('referenceManual', function($scope, $http) {
      $scope.spelllist = spells;
      $scope.content = "";
      $scope.loadedspell = "";
      $scope.loadspell = function() {
        var index = $("input[name='spellselect']:checked").val();
        $scope.loadedspell = $scope.spelllist[index];
      };
      $scope.loadspells = function() {
        var tabledata = [];
        for(var x in $scope.spelllist) {
            tabledata.push([
               "<input type='radio' name='spellselect' value='" + x + "' />",
               $scope.spelllist[x].title,
               $scope.spelllist[x].range,
               $scope.spelllist[x].castingTime,
               $scope.spelllist[x].source,
               $scope.spelllist[x].tags.join(", "),
            ]);
        }
        var table = $("#spelltable").dataTable({
            'data': tabledata,
            'columns': [
                { width: '10%', title: "Select" },
                { width: '30%', title: "Title" },
                { width: '12%', title: "Range" },
                { width: '12%', title: "Casting Time" },
                { width: '12%', title: 'Source'},
                { width: '24%', title: "Tags" },
            ]
        });
      };
      $scope.init = function() {
        $("#refdiv").tabs();
        $scope.loadspells();
        $(".datatable").dataTable();
      };
    });
    
    dmTools.controller('encounterDifficulty', function($scope, $http) {
      var xpbycr = [{
          cr: 0, xp: 10
        },{
          cr: 0.125, xp: 25
        },{
          cr: 0.25, xp: 50
        },{
          cr: 0.5, xp: 100
        },{
          cr: 1, xp: 200
        },{
          cr: 2, xp: 450
        },{
          cr: 3, xp: 700
        },{
          cr: 4, xp: 1100
        },{
          cr: 5, xp: 1800
        },{
          cr: 6, xp: 2300
        },{
          cr: 7, xp: 2900
        },{
          cr: 8, xp: 3900
        },{
          cr: 9, xp: 5000
        },{
          cr: 10, xp: 5900
        },{
          cr: 11, xp: 7200
        },{
          cr: 12, xp: 8400
        },{
          cr: 13, xp: 10000
        },{
          cr: 14, xp: 11500
        },{
          cr: 15, xp: 13000
        },{
          cr: 16, xp: 15000
        },{
          cr: 17, xp: 18000
        },{
          cr: 18, xp: 20000
        },{
          cr: 19, xp: 22000
        },{
          cr: 20, xp: 25000
        },{
          cr: 21, xp: 33000
        },{
          cr: 22, xp: 41000
        },{
          cr: 23, xp: 50000
        },{
          cr: 24, xp: 62000
        },{
          cr: 30, xp: 155000
        },
        ];
      $scope.character = function() {
        this.name = "";
        this.level = 1;
      };
      $scope.party = [
                        {
                          name: "",
                          level: 1
                        },
                  ];
      var basetable = [[25,50,75,100],[50,100,150,200],[75,150,225,400],[125,250,375,500],[250,500,750,1100],[300,600,900,1400],[350,750,1100,1700],
                       [450,900,1400,2100],[550,1100,1600,2400],[600,1200,1900,2800],[800,1600,2400,3600],[1000,2000,3000,4500],[1100,2200,3400,5100],
                       [1250,2500,3800,5700],[1400,2800,4300,6400],[1600,3200,4800,7200],[2000,3900,5900,8800],[2100,4200,6300,9500],
                       [2400,4900,7300,10900],[2800,5700,8500,12700],
                      ];
      $scope.resulttable = [[0,0,0,0,0],[0.125,0,0,0,0],[0.25,0,0,0,0],[0.5,0,0,0,0],[1,0,0,0,0],[2,0,0,0,0],[3,0,0,0,0],[4,0,0,0,0],[5,0,0,0,0],[6,0,0,0,0],
                            [7,0,0,0,0],[8,0,0,0,0],[9,0,0,0,0],[10,0,0,0,0],[11,0,0,0,0],[12,0,0,0,0],[13,0,0,0,0],[14,0,0,0,0],[15,0,0,0,0],[16,0,0,0,0],
                            [17,0,0,0,0],[18,0,0,0,0],[19,0,0,0,0],[20,0,0,0,0],[21,0,0,0,0],[22,0,0,0,0],[23,0,0,0,0],[24,0,0,0,0],[30,0,0,0,0],];
      $scope.Threshold = [0,0,0,0];
      
      $scope.addcharacter = function() {
        $scope.party.push(new $scope.character());
      };
      
      $scope.removecharacter = function(character) {
        $scope.party.splice($scope.party.indexOf(character), 1);
      };
      
      $scope.calculate = function() {
        var party = $scope.party;
        var numchars = 0;
        $scope.Threshold = [0,0,0,0];
        
        for (var character in party) {
          numchars++;
          var level = party[character].level;
          var y = basetable[level-1];
          for(var x = 0;x < $scope.Threshold.length; x++) {
            $scope.Threshold[x] += y[x];
          }
        }
        var findfunc = function(e) {return e.cr == $scope.resulttable[row][0];};
        for(var row in $scope.resulttable) {
          var xpPerCreature = $.grep(xpbycr, findfunc)[0].xp;
          for(var w = 1; w < $scope.resulttable[row].length; w++) {
            
          }
          var tempNumbers = [$scope.Threshold[0] / xpPerCreature,
                             $scope.Threshold[1] / xpPerCreature,
                             $scope.Threshold[2] / xpPerCreature,
                             $scope.Threshold[3] / xpPerCreature];
          for (var z = 0; z < tempNumbers.length; z++) {
            if (tempNumbers[z] <= 2) {
              $scope.resulttable[row][z+1] = 1;
            }
            else if (tempNumbers[z] <= 5) {
              $scope.resulttable[row][z+1] = 2;
            }
            else if (tempNumbers[z] <= 7) {
              $scope.resulttable[row][z+1] = 3;
            }
            else if (tempNumbers[z] <= 9) {
              $scope.resulttable[row][z+1] = 4;
            }
            else if (tempNumbers[z] <= 11) {
              $scope.resulttable[row][z+1] = 5;
            }
            else if (tempNumbers[z] <= 17) {
              $scope.resulttable[row][z+1] = 6;
            }
            else if (tempNumbers[z] <= 19) {
              $scope.resulttable[row][z+1] = 7;
            }
            else if (tempNumbers[z] <= 22) {
              $scope.resulttable[row][z+1] = 8;
            }
            else if (tempNumbers[z] <= 24) {
              $scope.resulttable[row][z+1] = 9;
            }
            else if (tempNumbers[z] <= 32) {
              $scope.resulttable[row][z+1] = 10;
            }
            else if (tempNumbers[z] <= 35) {
              $scope.resulttable[row][z+1] = 11;
            }
            else if (tempNumbers[z] <= 38) {
              $scope.resulttable[row][z+1] = 12;
            }
            else if (tempNumbers[z] <= 41) {
              $scope.resulttable[row][z+1] = 13;
            }
            else if (tempNumbers[z] <= 59) {
              $scope.resulttable[row][z+1] = 14;
            }
            else {
              $scope.resulttable[row][z+1] = tempNumbers[z] / 4;
            }
          }
        }
      };
      $scope.init = function() {
        $scope.calculate();
      };
    });
    dmTools.controller('initTracker', function($scope, $http) {
      
      var charInit = function() {
        this.name = "";
        this.mod =  0;
        this.init = 0;        
      };
      
      $scope.characters = [];
      
      $scope.character = new charInit();
      
      $scope.addChar = function() {
        $scope.characters.push($scope.character);
        $scope.character = new charInit();
      };
      
      $scope.deleteChar = function(character) {
        $scope.characters.splice($scope.characters.indexOf(character), 1);
      };
      $scope.charSort = function(a, b) {
            //first we go by initiative roll
            if (a.init < b.init) {
              return 1;
            }
            if (a.init > b.init) {
              return -1;
            }
            //if initiative rolls are the same, go by initiative mod
            if (a.mod < b.mod) {
              return 1;
            }
            if (a.mod > b.mod) {
              return -1;
            }
            //if both are the same, roll off until one gets a higher roll than the other.
            var aRoll = 0;
            var bRoll = 0;
            while(aRoll == bRoll) {
              aRoll = Math.floor(Math.random() * 20) + 1;
              bRoll = Math.floor(Math.random() * 20) + 1;
              if (aRoll < bRoll) {
                return 1;
              }
              if (aRoll > bRoll) {
                return -1;
              }
            }
            //while this should not be possible to reach, we'll put it in for safeties sake.
            return 0;
      };
      $scope.addAndRoll = function() {
        $scope.character.init = Math.floor(Math.random() * 20) + 1 + $scope.character.mod;
        $scope.characters.push($scope.character);
        $scope.characters.sort($scope.charSort);
        $scope.character = new charInit();
      };
      
      $scope.rollInit = function() {
        for(var x in $scope.characters) {
          $scope.characters[x].init = Math.floor(Math.random() * 20) + 1 + $scope.characters[x].mod;
        }
        $scope.characters.sort($scope.charSort);
      };
    });
    
    dmTools.controller('dmJournal', function($scope, $http) {
      
      $scope.journals = [];
      
      var Month = function(id, name) {
        this.id = id;
        this.name = name;
      };
      
      $scope.months =  [
        new Month(1, 'Dorunor'),
        new Month(2, 'Trimalan'),
        new Month(3, 'Sylvanus'),
        new Month(4, 'Gaiana'),
        new Month(5, 'Maridia'),
        new Month(6, 'Moltyr'),
        new Month(7, 'Saris'),
        new Month(8, 'Tockra'),
        new Month(9, 'Amatherin')
      ];
      
      $scope.elDate = function(day, month, year) {
        this.day = Number(day);
        this.month = month;
        this.year = Number(year);
        this.toString = function() {
          return this.month.name + " " + this.day + ", " + this.year;
        };
      };
      
      $scope.thisJournal = {
        date: new $scope.elDate(1, $scope.months[1], 1844),
        text: ""
      };
      
      function convertdatestring(date) {
        var months = ["Dorunor", "Trimalan", "Sylvanus", "Gaiana", "Maridia", "Moltyr", "Saris", "Tockra", "Amatherin"];
        var chars = /^[a-zA-Z]+/;
        var month = date.match(chars);
        month = months.indexOf(month[0]);
        var year = date.substr(date.length - 4);
        var day = date.slice(-8, -5).match(/[0-9]+/);
        return [Number(year), month, Number(day[0])];
      }
      
      function sortdate(date1, date2) {
        var numdate1 = convertdatestring(date1.date);
        var numdate2 = convertdatestring(date2.date);
        if (numdate1[0] > numdate2[0]) {
          return -1;
        } else if (numdate1[0] < numdate2[0]) {
          return 1;
        } else if(numdate1[1] > numdate2[1]){
          return -1;
        } else if (numdate1[1] < numdate2[1]) {
          return 1;
        } else if (numdate1[2] > numdate2[2]) {
          return -1;
        } else if (numdate1[2] < numdate2[2]) {
          return 1;
        } else {
          return 0;
        }
      }
      
      $scope.deleteJournal = function(id) {
        var path = deleteJournalRoute.slice(0, -1) + id;
        $http.get(path).success(function() {
          $scope.getJournals();
        });
        var journalId = $scope.journals.indexOf();
        $scope.journals.splice($scope.journals.map(function(e) { return e.id; }).indexOf(id), 1);
      };
      
      $scope.getJournals = function() {
        $http.get(getJournalsRoute).success(function(data) {
          $scope.journals = data.sort(sortdate);
        });
      };
    
      
      $scope.addJournal = function() {
        var date = $scope.thisJournal.date.toString();
        $http.post(addJournalRoute, {"date": date, "text": $scope.thisJournal.text }).success(function() {
          $scope.getJournals();
        });
      };
      
      $scope.init = function() {
        $scope.getJournals();
      };
    });
    
    dmTools.controller('crCalculator', function($scope, $http) {
      $scope.cr = 0;
      $scope.ac = 0;
      $scope.hp = 0;
      $scope.attack = 0;
      $scope.damage = 0;
      $scope.savedc = 0;

      $scope.calculate = function() {
        
        var accr = Math.max(($scope.ac - 11.5) * 2,0.5);
        
        var hp = $scope.hp;
        var hpcr = 0;
        if (hp <= 6) {
          hpcr = 0;
        } else if(hp <= 35) {
          hpcr = 0.125;
        } else if(hp <= 49) {
          hpcr = 0.25;
        } else if(hp <= 70) {
          hpcr = 0.5;
        } else if(hp <= 370) {
          hpcr = Math.floor((hp - 85)/15 + 2);
        } else {
          hpcr = Math.floor((hp - 401)/45 + 21);
        }
        
        var defcr = (accr + hpcr) / 2;
        
        var attackcr = Math.max(($scope.attack - 1.5) * 2, 0.5);
        
        var damage = $scope.damage;
        var damagecr = 0;
        if (damage <= 1) {
          damagecr = 0;
        } else if(damage <= 3) {
          damagecr = 0.125;
        } else if(damage <= 5) {
          damagecr = 0.25;
        } else if(damage <= 8) {
          damagecr = 0.5;
        } else if(damage < 123) {
          damagecr = Math.ceil((damage - 8)/6);
        } else {
          damagecr = Math.ceil((damage - 140)/18 + 20);
        }
        
        var savecr = 0;
        if($scope.savedc <= 11) {
          savecr = 0;
        } else if($scope.savedc <= 12) {
          savecr = 0.5;
        } else if($scope.savedc <= 13) {
          savecr = 1;
        } else {
          savecr = ($scope.savedc - 13) * 3;
        }
        
        var offcr = (Math.max(attackcr, savecr) + damagecr) / 2;
        
        $scope.cr = (offcr + defcr) / 2;
      };
    });
    
    dmTools.controller('diceRoller', function($scope, $http) {
      $scope.numD2 = 0;
      $scope.numD4 = 0;
      $scope.numD6 = 0;
      $scope.numD8 = 0;
      $scope.numD10 = 0;
      $scope.numD12 = 0;
      $scope.numD20 = 0;
      $scope.numD100 = 0;
      $scope.staticMod = 0;
      $scope.results = "";
      
      $scope.rollDice = function() {
        var total = 0;
        for(var x = 0; x < $scope.numD2; x++) {
          total += Math.floor(Math.random()*2)+1;
        }
        for(x = 0; x < $scope.numD4; x++) {
          total += Math.floor(Math.random()*4)+1;
        }
        for(x = 0; x < $scope.numD6; x++) {
          total += Math.floor(Math.random()*6)+1;
        }
        for(x = 0; x < $scope.numD8; x++) {
          total += Math.floor(Math.random()*8)+1;
        }
        for(x = 0; x < $scope.numD10; x++) {
          total += Math.floor(Math.random()*10)+1;
        }
        for(x = 0; x < $scope.numD12; x++) {
          total += Math.floor(Math.random()*12)+1;
        }
        for(x = 0; x < $scope.numD20; x++) {
          total += Math.floor(Math.random()*20)+1;
        }
        for(x = 0; x < $scope.numD100; x++) {
          total += Math.floor(Math.random()*100)+1;
        }
        $scope.results = total + $scope.staticMod;
      };
      $scope.rollChar = function() {
        var result = "";
        for(var x = 0; x < 6; x++) {
          var dice = [0, 0, 0, 0];
          for(var y = 0; y < dice.length; y++) {
            dice[y] = Math.floor(Math.random()*6)+1;
          }
          dice.sort();
          var num = dice[1] + dice[2] + dice[3];
          result += num.toString() + " ";
        }
        $scope.results = result;
      };
    });
    
})(jQuery, angular);