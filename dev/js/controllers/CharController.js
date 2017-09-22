/* globals angular, jQuery, alert, document, FileReader */
(function(ng, $) {
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
  ng.module('elthelas').filter('classFilter', function() {
    return function(classes, index, charclasses) {
      var filtered = [];
      var prevclasses = charclasses.slice(0, index).concat(charclasses.slice(index+1));
      for(var x in classes) {
        if(prevclasses.indexOf(classes[x]) === -1) {
          filtered.push(classes[x]);
        }
      }
      return filtered;
    };
    
  }).filter('spellFilter', function() {
    return function(spells, name, level, school, prepared) {
        return spells.filter(function(a) {
          var temp = true;
          if(name !== "" && a.title.indexOf(name) === -1) {
            temp = false;
          }
          if(level !== "" && a.level !== level) {
            temp = false;
          }
          if(school !== "" && a.school !== school) {
            temp = false;
          }
          if(prepared !== "" && a.prepared !== prepared) {
            temp = false;
          }
          return temp;
        });        
    };
  }).controller('CharController', ['$scope', 'raceProvider', 'backgroundProvider', 'classProvider', 'ItemProvider', 'SpellProvider', '$uibModal', function($scope, raceProvider, backgroundProvider, classProvider, ItemProvider, SpellProvider, $uibModal) {
    $scope.races = [];
    $scope.backgrounds = [];
    $scope.classes = [];
    $scope.weapons = [];
    $scope.armor = [];
    $scope.equipment = [];
    $scope.allEquipment = [];
    $scope.spells = [];
    $scope.slots = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 0, 0, 0],
      [4, 2, 0, 0, 0, 0, 0, 0, 0],
      [4, 3, 0, 0, 0, 0, 0, 0, 0],
      [4, 3, 2, 0, 0, 0, 0, 0, 0],
      [4, 3, 3, 0, 0, 0, 0, 0, 0],
      [4, 3, 3, 1, 0, 0, 0, 0, 0],
      [4, 3, 3, 2, 0, 0, 0, 0, 0],
      [4, 3, 3, 3, 1, 0, 0, 0, 0],
      [4, 3, 3, 3, 2, 0, 0, 0, 0],
      [4, 3, 3, 3, 2, 1, 0, 0, 0],
      [4, 3, 3, 3, 2, 1, 0, 0, 0],
      [4, 3, 3, 3, 2, 1, 1, 0, 0],
      [4, 3, 3, 3, 2, 1, 1, 0, 0],
      [4, 3, 3, 3, 2, 1, 1, 1, 0],
      [4, 3, 3, 3, 2, 1, 1, 1, 0],
      [4, 3, 3, 3, 2, 1, 1, 1, 1],
      [4, 3, 3, 3, 3, 1, 1, 1, 1],
      [4, 3, 3, 3, 3, 2, 1, 1, 1],
      [4, 3, 3, 3, 3, 2, 2, 1, 1],
    ];
    $scope.character = {
      name: "",
      str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8,
      racialstr: 0, racialdex: 0, racialcon: 0, racialint: 0, racialwis: 0, racialcha: 0,
      strsave: false, dexsave: false, consave: false, intsave: false, wissave: false, chasave: false,
      classes: [ { name: "", level: 1, selsubclass: { castermult: 0 }} ],
      addClass: function() {
        this.classes.push( { name: "", level: 1, selsubclass: { castermult: 0 }} );
      },
      removeClass: function(charclass) {
        this.classes.splice(this.classes.indexOf(charclass), 1);
      },
      spellslots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      spellslotsbonus: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      race: { subraces: [{ id: "default" }] },
      subrace: {},
      background: { skills: [], feature: { name: "", description: "" } },
      strmod: function() { return Math.floor(this.str/2 - 5); },
      dexmod: function() { return Math.floor(this.dex/2 - 5); },
      conmod: function() { return Math.floor(this.con/2 - 5); },
      intmod: function() { return Math.floor(this.int/2 - 5); },
      wismod: function() { return Math.floor(this.wis/2 - 5); },
      chamod: function() { return Math.floor(this.cha/2 - 5); },
      prof: function() { return Math.floor((this.level() - 1)/4) + 2; },
      jack: false,
      skills: [
        { name: "Acrobatics", prof: false, expertise: false, stat: "dexmod" },
        { name: "Animal Handling", prof: false, expertise: false, stat: "wismod" },
        { name: "Arcana", prof: false, expertise: false, stat: "intmod" },
        { name: "Athletics", prof: false, expertise: false, stat: "strmod" },
        { name: "Deception", prof: false, expertise: false, stat: "chamod" },
        { name: "History", prof: false, expertise: false, stat: "intmod" },
        { name: "Insight", prof: false, expertise: false, stat: "wismod" },
        { name: "Intimidation", prof: false, expertise: false, stat: "chamod" },
        { name: "Investigation", prof: false, expertise: false, stat: "intmod" },
        { name: "Medicine", prof: false, expertise: false, stat: "wismod" },
        { name: "Nature", prof: false, expertise: false, stat: "intmod" },
        { name: "Perception", prof: false, expertise: false, stat: "wismod" },
        { name: "Performance", prof: false, expertise: false, stat: "chamod" },
        { name: "Persuasion", prof: false, expertise: false, stat: "chamod" },
        { name: "Religion", prof: false, expertise: false, stat: "intmod" },
        { name: "Sleight of Hand", prof: false, expertise: false, stat: "dexmod" },
        { name: "Stealth", prof: false, expertise: false, stat: "dexmod" },
        { name: "Survival", prof: false, expertise: false, stat: "wismod" },
      ],
      getSkillMod: function(skillname) {
        var skill = this.skills.filter(function(a) {
          return a.name === skillname;
        })[0];
        var mod = this[skill.stat]();
        if(skill.prof) {
          mod += this.prof();
          if(skill.expertise) {
            mod += this.prof();
          }
        } else if(this.jack) {
          mod += Math.floor(this.prof()/2);
        }
        return mod;
      },
      strsavemagic: 0, dexsavemagic: 0, consavemagic: 0, intsavemagic: 0, wissavemagic: 0, chasavemagic: 0, 
      strsavebonus: function() {
        return (this.strsave * this.prof() + this.strmod() + this.strsavemagic);
      },
      dexsavebonus: function() {
        return (this.dexsave * this.prof() + this.dexmod() + this.dexsavemagic);
      },
      consavebonus: function() {
        return (this.consave * this.prof() + this.conmod() + this.consavemagic);
      },
      intsavebonus: function() {
        return (this.intsave * this.prof() + this.intmod() + this.intsavemagic);
      },
      wissavebonus: function() {
        return (this.wissave * this.prof() + this.wismod() + this.wissavemagic);
      },
      chasavebonus: function() {
        return (this.chasave * this.prof() + this.chamod() + this.chasavemagic);
      },
      level: function() {
        var level = 0;
        for(var x in this.classes) {
          if(true) {
            level += this.classes[x].level;
          }
        }
        return Math.max(1, level);
      },
      pointbuytotal: function() {
        var strcost = (this.str - this.racialstr - 8) + Math.max(0, this.str - this.racialstr - 13) + Math.max(0, this.str - this.racialstr - 15) + Math.max(0, this.str - this.racialstr - 17);
        var dexcost = (this.dex - this.racialdex - 8) + Math.max(0, this.dex - this.racialdex - 13) + Math.max(0, this.dex - this.racialdex - 15) + Math.max(0, this.dex - this.racialdex - 17);
        var concost = (this.con - this.racialcon - 8) + Math.max(0, this.con - this.racialcon - 13) + Math.max(0, this.con - this.racialcon - 15) + Math.max(0, this.con - this.racialcon - 17);
        var intcost = (this.int - this.racialint - 8) + Math.max(0, this.int - this.racialint - 13) + Math.max(0, this.int - this.racialint - 15) + Math.max(0, this.int - this.racialint - 17);
        var wiscost = (this.wis - this.racialwis - 8) + Math.max(0, this.wis - this.racialwis - 13) + Math.max(0, this.wis - this.racialwis - 15) + Math.max(0, this.wis - this.racialwis - 17);
        var chacost = (this.cha - this.racialcha - 8) + Math.max(0, this.cha - this.racialcha - 13) + Math.max(0, this.cha - this.racialcha - 15) + Math.max(0, this.cha - this.racialcha - 17);
        
        return strcost + dexcost + concost + intcost + wiscost + chacost;
      },
      npchp: function() {
        var total = 0;
        for(var x in this.classes) {
          if(true) {
            total += (this.classes[x].hitdie/2 + 1 + this.conmod()) * this.classes[x].level;
          }
        }
        return total;
      },
      heroichp: function() {
        var total = 0;
        if(this.classes[0] !== undefined && this.classes[0].level > 0) {
          total += this.classes[0].hitdie/2 - 1;
        }
        for(var x in this.classes) {
          if(true) {
            total += (this.classes[x].hitdie/2 + 1 + this.conmod()) * this.classes[x].level;
          }
        }
        return total;
      },
      attacks: [],
      addAttack: function() {
        this.attacks.push({ att: 0, dmg: "", range: "", name: "" });
      },
      removeAttack: function(attack) {
        this.attacks.splice(this.attacks.indexOf(attack), 1);
      },
      armor: [],
      addArmor: function() {
        this.armor.push({
          name: "",
          ac: 10,
          type: "light",
          equipped: true
        });
      },
      removeArmor: function(armor) {
        this.armor.splice(this.armor.indexOf(armor), 1);
      },
      ac: function() {
        var shieldbonus = 0;
        var baseac = 0;
        var calcac = 0;
        for(var x in this.armor) {
          if(this.armor[x].equipped) {
            if(this.armor[x].type === "light" || this.armor[x].type === "unarmored") {
              calcac = this.armor[x].ac + this.dexmod();
            } else if(this.armor[x].type === "medium") {
              calcac = this.armor[x].ac + Math.min(2, this.dexmod());
            } else if(this.armor[x].type === "medium+") {
              calcac = this.armor[x].ac + Math.min(3, this.dexmod());
            } else if(this.armor[x].type === "heavy") {
              calcac = this.armor[x].ac;
            } else if(this.armor[x].type === "shield" && this.armor[x].ac > shieldbonus) {
              shieldbonus = this.armor[x].ac;
            }
            if(calcac > baseac) {
              baseac = calcac;
            }
          }
        }
        if(baseac === 0) {
          baseac = 10 + this.dexmod();
        }
        return baseac + shieldbonus;
      },
      equipment: [],
      addEquipment: function() {
        this.equipment.push({
          name: "", weight: 0, quantity: 1, carried: true
        });
      },
      removeEquipment: function(equipment) {
        this.equipment.splice(this.equipment.indexOf(equipment), 1);
      },
      cp: 0, sp: 0, ep: 0, gp: 0, pp: 0,
      carryWeight: function() {
        var total = (this.cp + this.sp + this.ep + this.gp + this.pp)/50;
        for (var e in this.equipment) {
          if(this.equipment[e].carried) {
            total += this.equipment[e].weight * this.equipment[e].quantity;
          }
        }
        return total;
      },
      carryCapacity: function() {
        return this.str * 15 * (this.powerfulbuild ? 1.5 : 1);
      },
      spellsKnown: [],
      save: function() {
        if(this.name === "") {
          alert("cannot save character without name");
          throw Error("cannot save character without name");
        }
        var text = JSON.stringify(this);
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
        a.setAttribute('download', this.name + '.json');
        a.click();
      },
      load: function() {
        var f = document.getElementById('fileload').files[0], r = new FileReader();
        r.onloadend = function(e) {
          var data = e.target.result;
          var parsed = JSON.parse(data);
          //console.log(parsed);
          for(var x in parsed) {
            if (parsed.hasOwnProperty(x)) {
              $scope.character[x] = parsed[x];
            }
          }
          $scope.$apply();
        };
        r.readAsText(f);
      },
      casterLevel: function() {
        var casterLevel = 0;
        var classcounter = 0;
        for(var z = 0; z < this.classes.length; z++) {
            var thisClassCasterLevel = this.classes[z].level * this.classes[z].selsubclass.castermult;
            if(thisClassCasterLevel >= 1) {
              classcounter++;
              casterLevel += thisClassCasterLevel;  
          }

          
        }
        if(classcounter > 1) {
          return Math.floor(casterLevel);
        } else {
          return Math.ceil(casterLevel);
        }
      },
      bond: "",
      flaw: "",
      ideal: "",
      personality: "",
      notes: "",
      journal: [],
      addJournal: function() {
        var month = this.journal.length > 0 ? this.journal[this.journal.length - 1].month : 1;
        var day = this.journal.length > 0 ? (this.journal[this.journal.length - 1].day + 1) : 1;
        var year = this.journal.length > 0 ? this.journal[this.journal.length - 1].year : 1845;
        if(day === 31) {
          day = 1;
          month += 1;
          if(month === 13) {
            month = 1;
            year += 1;
          }
        }
        this.journal.push({ month: month, day: day, year: year, text: "" });
      },
      deleteJournal: function(entry) {
        this.journal.splice(this.journal.indexOf(entry), 1);
      },
      numPrepared: function() {
        var count = 0;
        this.spellsKnown.forEach(function(spell) {
          if(spell.prepared && spell.level !== "cantrip") {
            count ++;
          }
        });
        return count;
      },
      attMagic: 0,
      saveMagic: 0
    };
    $scope.journalSort = function(a) {
      var month = a.month < 10 ? "0" + a.month.toString() : a.month.toString();
      var day = a.day < 10 ? "0" + a.day.toString() : a.day.toString();
      var sortable = Number(a.year.toString() + month + day);
      return sortable;
    };
    $scope.nameValue = "";
    $scope.levelValue = "";
    $scope.schoolValue = "";
    $scope.preparedValue = "";
    $scope.spellOrder = "level";

    $scope.loadSpell =  function(index) {
      var currentSpell = $scope.character.spellsKnown[index];
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
            return currentSpell;
          }
        }
      });
          
      modalInstance.result.then(function (selectedItem) {}, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.addSpell = function() {
      var parentElem = $("body");
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/spellslist.html',
        controller: 'SpellListController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          spells: function() {
            return $scope.spells;
          }
        }
      });
      modalInstance.result.then(function(spell) {
        if(spell) {
          spell.prepared = true;
          $scope.character.spellsKnown.push(spell);
        }
      });      
    };
    
    $scope.removeSpell = function(spell) {
      $scope.character.spellsKnown.splice($scope.character.spellsKnown.indexOf(spell), 1);
    };
    
    $scope.addEquipmentFromList = function() {
      var parentElem = $("body");
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/equipmentlist.html',
        controller: 'EquipmentListController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          allEquipment: function() {
            return $scope.allEquipment;
          }
        }
      });
      
      modalInstance.result.then(function(item) {
        if(item) {
          $scope.character.equipment.push({
            name: item.Item, weight: item.Weight, quantity: 1, carried: true
          });          
        }
      });
    };
    
    raceProvider.getRaces().then(function(response) {
      $scope.races = response.data.documents;
    });
    
    backgroundProvider.getAll().then(function(response) {
      $scope.backgrounds = response;
    });
    
    classProvider.getAll().then(function(response) {
      $scope.classes = response;
    });
    
    ItemProvider.getWeapons().then(function(response) {
      $scope.weapons = response.data;
      $scope.weapons.forEach(function(weapon) {
        $scope.allEquipment.push({
          Item: weapon.Name,
          Cost: Number(weapon.Cost),
          Weight: Number(weapon.Weight.replace(/[^\d.-]/g, ''))
        });
      });
    });
    
    ItemProvider.getArmor().then(function(response) {
      $scope.armor = response.data;
      $scope.armor.forEach(function(armor) {
        $scope.allEquipment.push({
          Item: armor.Armor + " (" + armor.Material + ")",
          Cost: Number(armor.Price),
          Weight: Number(armor.Weight)
        });
      });
    });
    
    ItemProvider.getEquipment().then(function(response) {
      $scope.equipment = response.data;
      $scope.allEquipment = $scope.allEquipment.concat($scope.equipment);
    });
    
    SpellProvider.getSpells().then(function(response) {
      $scope.spells = response.data.documents;
    });

  }]).controller('EquipmentListController', ['$scope', '$uibModalInstance', 'allEquipment', function($scope, $uibModalInstance, allEquipment) {
    $scope.allEquipment = allEquipment;
    
    $scope.selected = function(item) {
      $uibModalInstance.close(item);
    };
    $scope.cancel = function() {
      $uibModalInstance.close(false);
    };
  }]).controller('SpellListController', ['$scope', '$uibModalInstance', 'spells', function($scope, $uibModalInstance, spells) {
    
    $scope.spells = spells;
    
    $scope.loadSpell = function(index) {
      $uibModalInstance.close($scope.spells[index]);
    };
    
    $scope.cancel = function() {
      $uibModalInstance.close(false);
    };
    
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
        $scope.spells[x].tags.join(", ")
      ];
      spellTableData.push(thisSpell);
    }
    $scope.runOnce = false;
    $scope.postRender = function() {
      if(!$scope.runOnce) {
        $scope.runOnce = true;
        createDataTable('#spelllist', spellTableData, [
          { title: "Title" },
          { title: "Level" },
          { title: "School" },
          { title: "Casting Time" },
          { title: "Duration" },
          { title: "Tags" }
        ], function() {
          var callback = function() {
            $scope.loadSpell(Number($(this).attr('data-spellid')));
          };
        for(var x = 0; x < $scope.spells.length; x++) {
            $(".spell" + x).click(callback);
          }
        });        
      }
    };
  }]);
})(angular, jQuery);