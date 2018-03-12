{"changed":true,"filter":false,"title":"characterbuilder.js","tooltip":"/src/components/tools/characterbuilder/characterbuilder.js","value":"import { mapGetters } from 'vuex';\n\nexport default {\n  computed: mapGetters({\n    races: 'allRaces',\n    backgrounds: 'allBackgrounds',\n    equipment: 'allEquipment',\n    spells: 'allSpells',\n    classes: 'allClasses'\n  }),\n  data () {\n    return {\n      spellOrder: \"\"\n      weapons: [],\n      armor: [],\n      slots: [\n        [0, 0, 0, 0, 0, 0, 0, 0, 0],\n        [2, 0, 0, 0, 0, 0, 0, 0, 0],\n        [3, 0, 0, 0, 0, 0, 0, 0, 0],\n        [4, 2, 0, 0, 0, 0, 0, 0, 0],\n        [4, 3, 0, 0, 0, 0, 0, 0, 0],\n        [4, 3, 2, 0, 0, 0, 0, 0, 0],\n        [4, 3, 3, 0, 0, 0, 0, 0, 0],\n        [4, 3, 3, 1, 0, 0, 0, 0, 0],\n        [4, 3, 3, 2, 0, 0, 0, 0, 0],\n        [4, 3, 3, 3, 1, 0, 0, 0, 0],\n        [4, 3, 3, 3, 2, 0, 0, 0, 0],\n        [4, 3, 3, 3, 2, 1, 0, 0, 0],\n        [4, 3, 3, 3, 2, 1, 0, 0, 0],\n        [4, 3, 3, 3, 2, 1, 1, 0, 0],\n        [4, 3, 3, 3, 2, 1, 1, 0, 0],\n        [4, 3, 3, 3, 2, 1, 1, 1, 0],\n        [4, 3, 3, 3, 2, 1, 1, 1, 0],\n        [4, 3, 3, 3, 2, 1, 1, 1, 1],\n        [4, 3, 3, 3, 3, 1, 1, 1, 1],\n        [4, 3, 3, 3, 3, 2, 1, 1, 1],\n        [4, 3, 3, 3, 3, 2, 2, 1, 1],\n      ],\n      character: {\n        name: \"\",\n        str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8,\n        racialstr: 0, racialdex: 0, racialcon: 0, racialint: 0, racialwis: 0, racialcha: 0,\n        strsave: false, dexsave: false, consave: false, intsave: false, wissave: false, chasave: false,\n        classes: [ { thisclass: { name: \"\" }, level: 1, selsubclass: { castermult: 0 }} ],\n        addClass: function() {\n          this.classes.push( { thisclass: { name: \"\" }, level: 1, selsubclass: { castermult: 0 }} );\n        },\n        removeClass: function(charclass) {\n          this.classes.splice(this.classes.indexOf(charclass), 1);\n        },\n        preparedSpells: function(charclass) {\n          var castStat = 0;\n          if(charclass.thisclass.name === \"Wizard\" || charclass.thisclass.name === \"Factotum\" || charclass.thisclass.name === \"Artificer\") {\n            var castStat = this.intmod();\n          } else if(charclass.thisclass.name === \"Cleric\" || charclass.thisclass.name === \"Druid\") {\n            var castStat = this.wismod();\n          } else if(charclass.thisclass.name === \"Paladin\") {\n            var castStat = this.chamod();\n          }\n          return Math.max(Math.floor(charclass.selsubclass.castermult * charclass.level) + castStat, 1);\n        },\n        spellslots: [0, 0, 0, 0, 0, 0, 0, 0, 0],\n        spellslotsbonus: [0, 0, 0, 0, 0, 0, 0, 0, 0],\n        race: { subraces: [{ id: \"default\" }] },\n        subrace: {},\n        background: { skills: [], feature: { name: \"\", description: \"\" }, tools: [], languages: 0 },\n        strmod: function() { return Math.floor(this.str/2 - 5); },\n        dexmod: function() { return Math.floor(this.dex/2 - 5); },\n        conmod: function() { return Math.floor(this.con/2 - 5); },\n        intmod: function() { return Math.floor(this.int/2 - 5); },\n        wismod: function() { return Math.floor(this.wis/2 - 5); },\n        chamod: function() { return Math.floor(this.cha/2 - 5); },\n        prof: function() { return Math.floor((this.level() - 1)/4) + 2; },\n        jack: false,\n        initiative: 0,\n        init: function() {\n          var init = Number(this.dexmod()) + Number(this.initiative);\n          var champion = this.classes.reduce((a, b) => {\n            if(b.selsubclass.name === \"Champion\" && b.level >= 7) {\n              return true;\n            } else {\n              return a;\n            }\n          }, false);\n          if(champion || this.jack) {\n            init = init + Math.floor(this.prof()/2);\n          }\n          return init;\n        },\n        skills: [\n          { name: \"Acrobatics\", prof: false, expertise: false, stat: \"dexmod\" },\n          { name: \"Animal Handling\", prof: false, expertise: false, stat: \"wismod\" },\n          { name: \"Arcana\", prof: false, expertise: false, stat: \"intmod\" },\n          { name: \"Athletics\", prof: false, expertise: false, stat: \"strmod\" },\n          { name: \"Deception\", prof: false, expertise: false, stat: \"chamod\" },\n          { name: \"History\", prof: false, expertise: false, stat: \"intmod\" },\n          { name: \"Insight\", prof: false, expertise: false, stat: \"wismod\" },\n          { name: \"Intimidation\", prof: false, expertise: false, stat: \"chamod\" },\n          { name: \"Investigation\", prof: false, expertise: false, stat: \"intmod\" },\n          { name: \"Medicine\", prof: false, expertise: false, stat: \"wismod\" },\n          { name: \"Nature\", prof: false, expertise: false, stat: \"intmod\" },\n          { name: \"Perception\", prof: false, expertise: false, stat: \"wismod\" },\n          { name: \"Performance\", prof: false, expertise: false, stat: \"chamod\" },\n          { name: \"Persuasion\", prof: false, expertise: false, stat: \"chamod\" },\n          { name: \"Religion\", prof: false, expertise: false, stat: \"intmod\" },\n          { name: \"Sleight of Hand\", prof: false, expertise: false, stat: \"dexmod\" },\n          { name: \"Stealth\", prof: false, expertise: false, stat: \"dexmod\" },\n          { name: \"Survival\", prof: false, expertise: false, stat: \"wismod\" },\n        ],\n        getSkillMod: function(skillname) {\n          var skill = this.skills.filter(function(a) {\n            return a.name === skillname;\n          })[0];\n          var mod = this[skill.stat]();\n          if(skill.prof) {\n            mod += this.prof();\n            if(skill.expertise) {\n              mod += this.prof();\n            }\n          } else if(this.jack) {\n            mod += Math.floor(this.prof()/2);\n          }\n          return mod;\n        },\n        strsavemagic: 0, dexsavemagic: 0, consavemagic: 0, intsavemagic: 0, wissavemagic: 0, chasavemagic: 0, \n        strsavebonus: function() {\n          return (this.strsave * this.prof() + this.strmod() + this.strsavemagic);\n        },\n        dexsavebonus: function() {\n          return (this.dexsave * this.prof() + this.dexmod() + this.dexsavemagic);\n        },\n        consavebonus: function() {\n          return (this.consave * this.prof() + this.conmod() + this.consavemagic);\n        },\n        intsavebonus: function() {\n          return (this.intsave * this.prof() + this.intmod() + this.intsavemagic);\n        },\n        wissavebonus: function() {\n          return (this.wissave * this.prof() + this.wismod() + this.wissavemagic);\n        },\n        chasavebonus: function() {\n          return (this.chasave * this.prof() + this.chamod() + this.chasavemagic);\n        },\n        level: function() {\n          var level = 0;\n          for(var x in this.classes) {\n            if(true) {\n              level += this.classes[x].level;\n            }\n          }\n          return Math.max(1, level);\n        },\n        pointbuytotal: function() {\n          var strcost = (this.str - this.racialstr - 8) + Math.max(0, this.str - this.racialstr - 13) + Math.max(0, this.str - this.racialstr - 15) + Math.max(0, this.str - this.racialstr - 17);\n          var dexcost = (this.dex - this.racialdex - 8) + Math.max(0, this.dex - this.racialdex - 13) + Math.max(0, this.dex - this.racialdex - 15) + Math.max(0, this.dex - this.racialdex - 17);\n          var concost = (this.con - this.racialcon - 8) + Math.max(0, this.con - this.racialcon - 13) + Math.max(0, this.con - this.racialcon - 15) + Math.max(0, this.con - this.racialcon - 17);\n          var intcost = (this.int - this.racialint - 8) + Math.max(0, this.int - this.racialint - 13) + Math.max(0, this.int - this.racialint - 15) + Math.max(0, this.int - this.racialint - 17);\n          var wiscost = (this.wis - this.racialwis - 8) + Math.max(0, this.wis - this.racialwis - 13) + Math.max(0, this.wis - this.racialwis - 15) + Math.max(0, this.wis - this.racialwis - 17);\n          var chacost = (this.cha - this.racialcha - 8) + Math.max(0, this.cha - this.racialcha - 13) + Math.max(0, this.cha - this.racialcha - 15) + Math.max(0, this.cha - this.racialcha - 17);\n          \n          return strcost + dexcost + concost + intcost + wiscost + chacost;\n        },\n        npchp: function() {\n          var total = 0;\n          for(var x in this.classes) {\n            if(true) {\n              total += (this.classes[x].thisclass.hitdie/2 + 1 + this.conmod()) * this.classes[x].level;\n            }\n          }\n          return total;\n        },\n        heroichp: function() {\n          var total = 0;\n          if(this.classes[0] !== undefined && this.classes[0].level > 0) {\n            total += this.classes[0].thisclass.hitdie/2 - 1;\n          }\n          for(var x in this.classes) {\n            if(true) {\n              total += (this.classes[x].thisclass.hitdie/2 + 1 + this.conmod()) * this.classes[x].level;\n            }\n          }\n          return total;\n        },\n        attacks: [],\n        addAttack: function() {\n          this.attacks.push({ id: this.nextid(), att: 0, dmg: \"\", range: \"\", name: \"\" });\n        },\n        removeAttack: function(attack) {\n          this.attacks.splice(this.attacks.indexOf(attack), 1);\n        },\n        armor: [],\n        nid: 0,\n        nextid: function() {\n          this.nid += 1;\n          return this.nid;\n        },\n        addArmor: function() {\n          this.armor.push({\n            id: this.nextid(),\n            name: \"\",\n            ac: 10,\n            type: \"light\",\n            equipped: true\n          });\n        },\n        removeArmor: function(armor) {\n          this.armor.splice(this.armor.indexOf(armor), 1);\n        },\n        ac: function() {\n          var shieldbonus = 0;\n          var baseac = 0;\n          var calcac = 0;\n          for(var x in this.armor) {\n            var armorac = Number(this.armor[x].ac);\n            if(this.armor[x].equipped) {\n              if(this.armor[x].type === \"light\" || this.armor[x].type === \"unarmored\") {\n                calcac = armorac + this.dexmod();\n              } else if(this.armor[x].type === \"medium\") {\n                calcac = armorac + Math.min(2, this.dexmod());\n              } else if(this.armor[x].type === \"medium+\") {\n                calcac = armorac + Math.min(3, this.dexmod());\n              } else if(this.armor[x].type === \"heavy\") {\n                calcac = armorac;\n              } else if(this.armor[x].type === \"shield\" && armorac > shieldbonus) {\n                shieldbonus = armorac;\n              }\n              if(calcac > baseac) {\n                baseac = calcac;\n              }\n            }\n          }\n          if(baseac === 0) {\n            baseac = 10 + this.dexmod();\n          }\n          return baseac + shieldbonus;\n        },\n        equipment: [],\n        addEquipment: function() {\n          this.equipment.push({\n            name: \"\", weight: 0, quantity: 1, carried: true\n          });\n        },\n        removeEquipment: function(equipment) {\n          this.equipment.splice(this.equipment.indexOf(equipment), 1);\n        },\n        cp: 0, sp: 0, ep: 0, gp: 0, pp: 0,\n        carryWeight: function() {\n          var total = (this.cp + this.sp + this.ep + this.gp + this.pp)/50;\n          for (var e in this.equipment) {\n            if(this.equipment[e].carried) {\n              total += this.equipment[e].weight * this.equipment[e].quantity;\n            }\n          }\n          return total;\n        },\n        carryCapacity: function() {\n          return this.str * 15 * (this.powerfulbuild ? 1.5 : 1);\n        },\n        spellsKnown: [],\n        validate: function() {\n          if(this.name === \"\") {\n            alert(\"cannot save character without name\");\n            return false;\n          }\n          return true;\n        },\n        save: function() {\n          if(this.validate()) {\n            var text = JSON.stringify(this);\n            var a = document.createElement('a');\n            a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));\n            a.setAttribute('download', this.name + '.json');\n            a.click();\n          }\n        },\n        savedrive: function() {\n          if(this.validate()) {\n            var text = JSON.stringify(this);\n          }\n        },\n        load: function () {\n          var f = document.getElementById('fileload').files[0], r = new FileReader();\n          var character = this;\n          r.onloadend = function(e) {\n            var data = e.target.result;\n            var parsed = JSON.parse(data);\n            //console.log(parsed);\n            for(var x in parsed) {\n              if (parsed.hasOwnProperty(x)) {\n                character[x] = parsed[x];\n              }\n            }\n          };\n          r.readAsText(f);\n        },\n        casterLevel: function() {\n          var casterLevel = 0;\n          var classcounter = 0;\n          for(var z = 0; z < this.classes.length; z++) {\n            if(typeof this.classes[z].selsubclass === \"undefined\") {\n              this.classes[z].selsubclass = { castermult: 0 };\n            }\n              var thisClassCasterLevel = this.classes[z].level * this.classes[z].selsubclass.castermult;\n              if(thisClassCasterLevel >= 1) {\n                classcounter++;\n                casterLevel += thisClassCasterLevel;  \n            }\n  \n            \n          }\n          if(classcounter > 1) {\n            return Math.floor(casterLevel);\n          } else {\n            return Math.ceil(casterLevel);\n          }\n        },\n        bond: \"\",\n        flaw: \"\",\n        ideal: \"\",\n        personality: \"\",\n        notes: \"\",\n        journal: [],\n        addJournal: function() {\n          var month = this.journal.length > 0 ? this.journal[this.journal.length - 1].month : 1;\n          var day = this.journal.length > 0 ? (this.journal[this.journal.length - 1].day + 1) : 1;\n          var year = this.journal.length > 0 ? this.journal[this.journal.length - 1].year : 1845;\n          if(day === 31) {\n            day = 1;\n            month += 1;\n            if(month === 13) {\n              month = 1;\n              year += 1;\n            }\n          }\n          this.journal.push({ month: month, day: day, year: year, text: \"\" });\n        },\n        deleteJournal: function(entry) {\n          this.journal.splice(this.journal.indexOf(entry), 1);\n        },\n        numPrepared: function() {\n          var count = 0;\n          this.spellsKnown.forEach(function(spell) {\n            if(spell.prepared && spell.level !== \"cantrip\") {\n              count ++;\n            }\n          });\n          return count;\n        },\n        attMagic: 0,\n        saveMagic: 0\n      }\n    }\n  }\n}","undoManager":{"mark":86,"position":100,"stack":[[{"start":{"row":214,"column":28},"end":{"row":214,"column":29},"action":"insert","lines":["b"],"id":1243}],[{"start":{"row":214,"column":29},"end":{"row":214,"column":30},"action":"insert","lines":["e"],"id":1244}],[{"start":{"row":214,"column":30},"end":{"row":214,"column":31},"action":"insert","lines":["r"],"id":1245}],[{"start":{"row":214,"column":31},"end":{"row":214,"column":32},"action":"insert","lines":["("],"id":1246}],[{"start":{"row":214,"column":48},"end":{"row":214,"column":49},"action":"insert","lines":[")"],"id":1247}],[{"start":{"row":211,"column":36},"end":{"row":212,"column":0},"action":"insert","lines":["",""],"id":1248},{"start":{"row":212,"column":0},"end":{"row":212,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":212,"column":12},"end":{"row":212,"column":13},"action":"insert","lines":["v"],"id":1249}],[{"start":{"row":212,"column":13},"end":{"row":212,"column":14},"action":"insert","lines":["a"],"id":1250}],[{"start":{"row":212,"column":14},"end":{"row":212,"column":15},"action":"insert","lines":["r"],"id":1251}],[{"start":{"row":212,"column":15},"end":{"row":212,"column":16},"action":"insert","lines":[" "],"id":1252}],[{"start":{"row":212,"column":16},"end":{"row":212,"column":17},"action":"insert","lines":["a"],"id":1253}],[{"start":{"row":212,"column":17},"end":{"row":212,"column":18},"action":"insert","lines":["r"],"id":1254}],[{"start":{"row":212,"column":18},"end":{"row":212,"column":19},"action":"insert","lines":["m"],"id":1255}],[{"start":{"row":212,"column":19},"end":{"row":212,"column":20},"action":"insert","lines":["o"],"id":1256}],[{"start":{"row":212,"column":20},"end":{"row":212,"column":21},"action":"insert","lines":["r"],"id":1257}],[{"start":{"row":212,"column":21},"end":{"row":212,"column":22},"action":"insert","lines":["a"],"id":1258}],[{"start":{"row":212,"column":22},"end":{"row":212,"column":23},"action":"insert","lines":["c"],"id":1259}],[{"start":{"row":212,"column":23},"end":{"row":212,"column":24},"action":"insert","lines":[" "],"id":1260}],[{"start":{"row":212,"column":24},"end":{"row":212,"column":25},"action":"insert","lines":["="],"id":1261}],[{"start":{"row":212,"column":25},"end":{"row":212,"column":26},"action":"insert","lines":[" "],"id":1262}],[{"start":{"row":212,"column":26},"end":{"row":212,"column":27},"action":"insert","lines":["N"],"id":1263}],[{"start":{"row":212,"column":27},"end":{"row":212,"column":28},"action":"insert","lines":["u"],"id":1264}],[{"start":{"row":212,"column":28},"end":{"row":212,"column":29},"action":"insert","lines":["m"],"id":1265}],[{"start":{"row":212,"column":29},"end":{"row":212,"column":30},"action":"insert","lines":["b"],"id":1266}],[{"start":{"row":212,"column":30},"end":{"row":212,"column":31},"action":"insert","lines":["e"],"id":1267}],[{"start":{"row":212,"column":31},"end":{"row":212,"column":32},"action":"insert","lines":["r"],"id":1268}],[{"start":{"row":212,"column":32},"end":{"row":212,"column":34},"action":"insert","lines":["()"],"id":1269}],[{"start":{"row":212,"column":33},"end":{"row":212,"column":34},"action":"insert","lines":["t"],"id":1270}],[{"start":{"row":212,"column":34},"end":{"row":212,"column":35},"action":"insert","lines":["h"],"id":1271}],[{"start":{"row":212,"column":35},"end":{"row":212,"column":36},"action":"insert","lines":["i"],"id":1272}],[{"start":{"row":212,"column":36},"end":{"row":212,"column":37},"action":"insert","lines":["s"],"id":1273}],[{"start":{"row":212,"column":37},"end":{"row":212,"column":38},"action":"insert","lines":["."],"id":1274}],[{"start":{"row":212,"column":38},"end":{"row":212,"column":39},"action":"insert","lines":["a"],"id":1275}],[{"start":{"row":212,"column":39},"end":{"row":212,"column":40},"action":"insert","lines":["r"],"id":1276}],[{"start":{"row":212,"column":40},"end":{"row":212,"column":41},"action":"insert","lines":["m"],"id":1277}],[{"start":{"row":212,"column":41},"end":{"row":212,"column":42},"action":"insert","lines":["o"],"id":1278}],[{"start":{"row":212,"column":42},"end":{"row":212,"column":43},"action":"insert","lines":["r"],"id":1279}],[{"start":{"row":212,"column":43},"end":{"row":212,"column":45},"action":"insert","lines":["[]"],"id":1280}],[{"start":{"row":212,"column":44},"end":{"row":212,"column":45},"action":"insert","lines":["x"],"id":1281}],[{"start":{"row":212,"column":46},"end":{"row":212,"column":47},"action":"insert","lines":["."],"id":1282}],[{"start":{"row":212,"column":47},"end":{"row":212,"column":48},"action":"insert","lines":["a"],"id":1283}],[{"start":{"row":212,"column":48},"end":{"row":212,"column":49},"action":"insert","lines":["c"],"id":1284}],[{"start":{"row":212,"column":50},"end":{"row":212,"column":51},"action":"insert","lines":[";"],"id":1285}],[{"start":{"row":215,"column":25},"end":{"row":215,"column":49},"action":"remove","lines":["Number(this.armor[x].ac)"],"id":1286},{"start":{"row":215,"column":25},"end":{"row":215,"column":32},"action":"insert","lines":["armorac"]}],[{"start":{"row":217,"column":25},"end":{"row":217,"column":41},"action":"remove","lines":["this.armor[x].ac"],"id":1287},{"start":{"row":217,"column":25},"end":{"row":217,"column":32},"action":"insert","lines":["armorac"]}],[{"start":{"row":219,"column":25},"end":{"row":219,"column":41},"action":"remove","lines":["this.armor[x].ac"],"id":1288},{"start":{"row":219,"column":25},"end":{"row":219,"column":32},"action":"insert","lines":["armorac"]}],[{"start":{"row":221,"column":25},"end":{"row":221,"column":41},"action":"remove","lines":["this.armor[x].ac"],"id":1289},{"start":{"row":221,"column":25},"end":{"row":221,"column":32},"action":"insert","lines":["armorac"]}],[{"start":{"row":222,"column":59},"end":{"row":222,"column":75},"action":"remove","lines":["this.armor[x].ac"],"id":1290},{"start":{"row":222,"column":59},"end":{"row":222,"column":66},"action":"insert","lines":["armorac"]}],[{"start":{"row":223,"column":30},"end":{"row":223,"column":46},"action":"remove","lines":["this.armor[x].ac"],"id":1291},{"start":{"row":223,"column":30},"end":{"row":223,"column":37},"action":"insert","lines":["armorac"]}],[{"start":{"row":64,"column":72},"end":{"row":64,"column":73},"action":"insert","lines":["."],"id":1292}],[{"start":{"row":64,"column":73},"end":{"row":64,"column":74},"action":"insert","lines":[" "],"id":1293}],[{"start":{"row":64,"column":74},"end":{"row":64,"column":75},"action":"insert","lines":["t"],"id":1294}],[{"start":{"row":64,"column":75},"end":{"row":64,"column":76},"action":"insert","lines":["p"],"id":1295}],[{"start":{"row":64,"column":76},"end":{"row":64,"column":77},"action":"insert","lines":["p"],"id":1296}],[{"start":{"row":64,"column":77},"end":{"row":64,"column":78},"action":"insert","lines":[";"],"id":1297}],[{"start":{"row":64,"column":78},"end":{"row":64,"column":79},"action":"insert","lines":["s"],"id":1298}],[{"start":{"row":64,"column":79},"end":{"row":64,"column":80},"action":"insert","lines":["\""],"id":1299}],[{"start":{"row":64,"column":80},"end":{"row":64,"column":81},"action":"insert","lines":[" "],"id":1300}],[{"start":{"row":64,"column":80},"end":{"row":64,"column":81},"action":"remove","lines":[" "],"id":1301}],[{"start":{"row":64,"column":79},"end":{"row":64,"column":80},"action":"remove","lines":["\""],"id":1302}],[{"start":{"row":64,"column":78},"end":{"row":64,"column":79},"action":"remove","lines":["s"],"id":1303}],[{"start":{"row":64,"column":77},"end":{"row":64,"column":78},"action":"remove","lines":[";"],"id":1304}],[{"start":{"row":64,"column":76},"end":{"row":64,"column":77},"action":"remove","lines":["p"],"id":1305}],[{"start":{"row":64,"column":75},"end":{"row":64,"column":76},"action":"remove","lines":["p"],"id":1306}],[{"start":{"row":64,"column":75},"end":{"row":64,"column":76},"action":"insert","lines":["o"],"id":1307}],[{"start":{"row":64,"column":76},"end":{"row":64,"column":77},"action":"insert","lines":["o"],"id":1308}],[{"start":{"row":64,"column":77},"end":{"row":64,"column":78},"action":"insert","lines":["l"],"id":1309}],[{"start":{"row":64,"column":78},"end":{"row":64,"column":79},"action":"insert","lines":["s"],"id":1310}],[{"start":{"row":64,"column":79},"end":{"row":64,"column":80},"action":"insert","lines":[":"],"id":1311}],[{"start":{"row":64,"column":80},"end":{"row":64,"column":81},"action":"insert","lines":[" "],"id":1312}],[{"start":{"row":64,"column":81},"end":{"row":64,"column":83},"action":"insert","lines":["[]"],"id":1313}],[{"start":{"row":64,"column":72},"end":{"row":64,"column":73},"action":"remove","lines":["."],"id":1314}],[{"start":{"row":64,"column":72},"end":{"row":64,"column":73},"action":"insert","lines":[","],"id":1315}],[{"start":{"row":64,"column":83},"end":{"row":64,"column":84},"action":"insert","lines":[","],"id":1316}],[{"start":{"row":64,"column":84},"end":{"row":64,"column":85},"action":"insert","lines":[" "],"id":1317}],[{"start":{"row":64,"column":85},"end":{"row":64,"column":86},"action":"insert","lines":["l"],"id":1318}],[{"start":{"row":64,"column":86},"end":{"row":64,"column":87},"action":"insert","lines":["a"],"id":1319}],[{"start":{"row":64,"column":87},"end":{"row":64,"column":88},"action":"insert","lines":["n"],"id":1320}],[{"start":{"row":64,"column":88},"end":{"row":64,"column":89},"action":"insert","lines":["g"],"id":1321}],[{"start":{"row":64,"column":89},"end":{"row":64,"column":90},"action":"insert","lines":["u"],"id":1322}],[{"start":{"row":64,"column":90},"end":{"row":64,"column":91},"action":"insert","lines":["a"],"id":1323}],[{"start":{"row":64,"column":91},"end":{"row":64,"column":92},"action":"insert","lines":["g"],"id":1324}],[{"start":{"row":64,"column":92},"end":{"row":64,"column":93},"action":"insert","lines":["e"],"id":1325}],[{"start":{"row":64,"column":93},"end":{"row":64,"column":94},"action":"insert","lines":["s"],"id":1326}],[{"start":{"row":64,"column":94},"end":{"row":64,"column":95},"action":"insert","lines":[":"],"id":1327}],[{"start":{"row":64,"column":95},"end":{"row":64,"column":96},"action":"insert","lines":[" "],"id":1328}],[{"start":{"row":64,"column":96},"end":{"row":64,"column":97},"action":"insert","lines":["0"],"id":1329}],[{"start":{"row":11,"column":12},"end":{"row":12,"column":0},"action":"insert","lines":["",""],"id":1330},{"start":{"row":12,"column":0},"end":{"row":12,"column":6},"action":"insert","lines":["      "]}],[{"start":{"row":12,"column":6},"end":{"row":12,"column":7},"action":"insert","lines":["s"],"id":1331}],[{"start":{"row":12,"column":7},"end":{"row":12,"column":8},"action":"insert","lines":["p"],"id":1332}],[{"start":{"row":12,"column":8},"end":{"row":12,"column":9},"action":"insert","lines":["e"],"id":1333}],[{"start":{"row":12,"column":9},"end":{"row":12,"column":10},"action":"insert","lines":["l"],"id":1334}],[{"start":{"row":12,"column":10},"end":{"row":12,"column":11},"action":"insert","lines":["l"],"id":1335}],[{"start":{"row":12,"column":11},"end":{"row":12,"column":12},"action":"insert","lines":["O"],"id":1336}],[{"start":{"row":12,"column":12},"end":{"row":12,"column":13},"action":"insert","lines":["r"],"id":1337}],[{"start":{"row":12,"column":13},"end":{"row":12,"column":14},"action":"insert","lines":["d"],"id":1338}],[{"start":{"row":12,"column":14},"end":{"row":12,"column":15},"action":"insert","lines":["e"],"id":1339}],[{"start":{"row":12,"column":15},"end":{"row":12,"column":16},"action":"insert","lines":["r"],"id":1340}],[{"start":{"row":12,"column":16},"end":{"row":12,"column":17},"action":"insert","lines":[":"],"id":1341}],[{"start":{"row":12,"column":17},"end":{"row":12,"column":18},"action":"insert","lines":[" "],"id":1342}],[{"start":{"row":12,"column":18},"end":{"row":12,"column":20},"action":"insert","lines":["\"\""],"id":1343}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":12,"column":20},"end":{"row":12,"column":20},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":357,"mode":"ace/mode/javascript"}},"timestamp":1520358292972}