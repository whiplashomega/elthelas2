/* globals angular, jQuery */
(function(ng, $) {
  ng.module('elthelas').controller('CharController', ['$scope', 'raceProvider', 'backgroundProvider', 'classProvider', function($scope, raceProvider, backgroundProvider, classProvider) {
    $scope.races = [];
    $scope.backgrounds = [];
    $scope.classes = [];
    raceProvider.getRaces().then(function(response) {
      $scope.races = response.data.documents;
    });
    
    backgroundProvider.getBackgrounds().then(function(response) {
      $scope.backgrounds = response.data.documents;
    });
    
    classProvider.getAll().then(function(response) {
      $scope.classes = response;
    });
    
    $scope.character = {
      str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8,
      racialstr: 0, racialdex: 0, racialcon: 0, racialint: 0, racialwis: 0, racialcha: 0,
      strsave: false, dexsave: false, consave: false, intsave: false, wissave: false, chasave: false,
      classes: [ { name: "", level: 0 } ],
      race: { subraces: [{ id: "default" }] },
      subrace: {},
      background: { skills: [], feature: { name: "", description: "" } },
      strmod: function() { return Math.floor(this.str/2 - 5); },
      dexmod: function() { return Math.floor(this.dex/2 - 5); },
      conmod: function() { return Math.floor(this.con/2 - 5); },
      intmod: function() { return Math.floor(this.int/2 - 5); },
      wismod: function() { return Math.floor(this.wis/2 - 5); },
      chamod: function() { return Math.floor(this.cha/2 - 5); },
      prof: function() { return Math.floor((this.level() - 1)/4) + 2 },
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
      strsavebonus: function() {
        return (this.strsave * this.prof() + this.strmod());
      },
      dexsavebonus: function() {
        return (this.dexsave * this.prof() + this.dexmod());
      },
      consavebonus: function() {
        return (this.consave * this.prof() + this.conmod());
      },
      intsavebonus: function() {
        return (this.intsave * this.prof() + this.intmod());
      },
      wissavebonus: function() {
        return (this.wissave * this.prof() + this.wismod());
      },
      chasavebonus: function() {
        return (this.chasave * this.prof() + this.chamod());
      },
      level: function() {
        var level = 0;
        for(var x in this.classes) {
          level += this.classes[x].level;
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
          total += (this.classes[x].hitdie/2 + 1 + this.conmod()) * this.classes[x].level;
        }
        return total;
      },
      heroichp: function() {
        var total = 0;
          if(this.classes[0] !== undefined && this.classes[0].level > 0) {
            total += this.classes[0].hitdie + this.conmod();
          }
        for(var x in this.classes) {
          total += (this.classes[x].hitdie/2 + 1 + this.conmod()) * (this.classes[x].level - 1);
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
      }
    }
    $scope.logchar = function() {
      console.log($scope.character);
    }
  }]);
})(angular, jQuery);