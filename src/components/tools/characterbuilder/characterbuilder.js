import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    races: 'allRaces',
    backgrounds: 'allBackgrounds',
    equipment: 'allEquipment',
    spells: 'allSpells',
    classes: 'allClasses'
  }),
  data () {
    return {
      weapons: [],
      armor: [],
      slots: [
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
      ],
      character: {
        name: "",
        str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8,
        racialstr: 0, racialdex: 0, racialcon: 0, racialint: 0, racialwis: 0, racialcha: 0,
        strsave: false, dexsave: false, consave: false, intsave: false, wissave: false, chasave: false,
        classes: [ { thisclass: { name: "" }, level: 1, selsubclass: { castermult: 0 }} ],
        addClass: function() {
          this.classes.push( { thisclass: { name: "" }, level: 1, selsubclass: { castermult: 0 }} );
        },
        removeClass: function(charclass) {
          this.classes.splice(this.classes.indexOf(charclass), 1);
        },
        preparedSpells: function(charclass) {
          var castStat = 0;
          if(charclass.thisclass.name === "Wizard" || charclass.thisclass.name === "Factotum" || charclass.thisclass.name === "Artificer") {
            var castStat = this.intmod();
          } else if(charclass.thisclass.name === "Cleric" || charclass.thisclass.name === "Druid") {
            var castStat = this.wismod();
          } else if(charclass.thisclass.name === "Paladin") {
            var castStat = this.chamod();
          }
          return Math.max(Math.floor(charclass.selsubclass.castermult * charclass.level) + castStat, 1);
        },
        spellslots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        spellslotsbonus: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        race: { subraces: [{ id: "default" }] },
        subrace: {},
        background: { skills: [], feature: { name: "", description: "" }, tools: [], languages: 0 },
        strmod: function() { return Math.floor(this.str/2 - 5); },
        dexmod: function() { return Math.floor(this.dex/2 - 5); },
        conmod: function() { return Math.floor(this.con/2 - 5); },
        intmod: function() { return Math.floor(this.int/2 - 5); },
        wismod: function() { return Math.floor(this.wis/2 - 5); },
        chamod: function() { return Math.floor(this.cha/2 - 5); },
        prof: function() { return Math.floor((this.level() - 1)/4) + 2; },
        jack: false,
        initiative: 0,
        init: function() {
          var init = Number(this.dexmod()) + Number(this.initiative);
          var champion = this.classes.reduce((a, b) => {
            if(b.selsubclass.name === "Champion" && b.level >= 7) {
              return true;
            } else {
              return a;
            }
          }, false);
          if(champion || this.jack) {
            init = init + Math.floor(this.prof()/2);
          }
          return init;
        },
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
              total += (this.classes[x].thisclass.hitdie/2 + 1 + this.conmod()) * this.classes[x].level;
            }
          }
          return total;
        },
        heroichp: function() {
          var total = 0;
          if(this.classes[0] !== undefined && this.classes[0].level > 0) {
            total += this.classes[0].thisclass.hitdie/2 - 1;
          }
          for(var x in this.classes) {
            if(true) {
              total += (this.classes[x].thisclass.hitdie/2 + 1 + this.conmod()) * this.classes[x].level;
            }
          }
          return total;
        },
        attacks: [],
        addAttack: function() {
          this.attacks.push({ id: this.nextid(), att: 0, dmg: "", range: "", name: "" });
        },
        removeAttack: function(attack) {
          this.attacks.splice(this.attacks.indexOf(attack), 1);
        },
        armor: [],
        nid: 0,
        nextid: function() {
          this.nid += 1;
          return this.nid;
        },
        addArmor: function() {
          this.armor.push({
            id: this.nextid(),
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
            var armorac = Number(this.armor[x].ac);
            if(this.armor[x].equipped) {
              if(this.armor[x].type === "light" || this.armor[x].type === "unarmored") {
                calcac = armorac + this.dexmod();
              } else if(this.armor[x].type === "medium") {
                calcac = armorac + Math.min(2, this.dexmod());
              } else if(this.armor[x].type === "medium+") {
                calcac = armorac + Math.min(3, this.dexmod());
              } else if(this.armor[x].type === "heavy") {
                calcac = armorac;
              } else if(this.armor[x].type === "shield" && armorac > shieldbonus) {
                shieldbonus = armorac;
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
        validate: function() {
          if(this.name === "") {
            alert("cannot save character without name");
            return false;
          }
          return true;
        },
        save: function() {
          if(this.validate()) {
            var text = JSON.stringify(this);
            var a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
            a.setAttribute('download', this.name + '.json');
            a.click();
          }
        },
        savedrive: function() {
          if(this.validate()) {
            var text = JSON.stringify(this);
          }
        },
        load: function () {
          var f = document.getElementById('fileload').files[0], r = new FileReader();
          var character = this;
          r.onloadend = function(e) {
            var data = e.target.result;
            var parsed = JSON.parse(data);
            //console.log(parsed);
            for(var x in parsed) {
              if (parsed.hasOwnProperty(x)) {
                character[x] = parsed[x];
              }
            }
          };
          r.readAsText(f);
        },
        casterLevel: function() {
          var casterLevel = 0;
          var classcounter = 0;
          for(var z = 0; z < this.classes.length; z++) {
            if(typeof this.classes[z].selsubclass === "undefined") {
              this.classes[z].selsubclass = { castermult: 0 };
            }
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
      }
    }
  }
}