import axios from 'axios';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import droll from 'droll';
import helpers from './magicitems/helpers';
import helpersv2 from './magicitems/helpersv2';
import seedrandom from 'seedrandom';

export default {
  state: () => {
    return {
      armor: [],
      ancestries: [],
      backgrounds: [],
      divines: [{ name: 'Placeholder', id: 'placeholder' }],
      equipment: [],
      feats: [],
      gods: [{ name: 'Placeholder', id: 'placeholder', domains5: "" }],
      historyevents: [{ name: 'Placeholder', id: 'placeholder' }],
      organizations: [{ name: 'Placeholder', id: 'placeholder' }],
      races: [],
      spells: [],
      valuables: [],
      weapons: [],
      classes: [],
      territories: [],
      cities: [],
      nations: [],
      landmarks: [],
      features: [],
      continents: [],
      magicitems: [],
      magicscrolls: [],
      magicwands: [],
      magicweapons: [],
      magicarmor: [],
      magicother: [],
      magiccommons: [],
      magicuncommons: [],
      magicrares: [],
      magicveryrares: [],
      magiclegendaries: [],
      armorv2: [],
      classesv2: [],
      featsv2: [],
      spellsv2: [],
      weaponsv2: [],
      magicitemsv2: [],
      magicscrollsv2: [],
      magicwandsv2: [],
      magicweaponsv2: [],
      magicarmorv2: [],
      magicotherv2: [],
      magiccommonsv2: [],
      magicuncommonsv2: [],
      magicraresv2: [],
      magicveryraresv2: [],
      magiclegendariesv2: [],
    };
  },
  getters: {
    featsort: (state) => {
      var feats = [ ...state.feats, { name: "Ability Score Increase", prereq: "", description: "Increase one ability score by 2 or 2 ability scores by 1" }];
      function ftsrt (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return feats.sort(ftsrt);
    },
    featv2sort: (state) => {
      var feats = [ ...state.featsv2, { name: "Ability Score Increase", prereq: "", description: "Increase one ability score by 2 or 2 ability scores by 1" }];
      function ftsrt (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return feats.sort(ftsrt);
    },
    orgsWithNull: (state) => {
      return [ ...state.organizations, { name: "None", id: 'nofaction' }];
    },
    builderRaces: (state) => {
      var all = [];
      for (var x = 0; x < state.races.length; x++) {
        for (var y = 0; y < state.races[x].subraces.length; y++) {
          var b = {
            ...state.races[x],
            ...state.races[x].subraces[y],
            name: state.races[x].name + ", " + state.races[x].subraces[y].name,
            singular: state.races[x].singular + ", " + state.races[x].subraces[y].singular,
            traits: [ ...state.races[x].traits, ...state.races[x].subraces[y].traits ]
          };
          if (state.races[x].subraces[y].id === "default") {
            b.id = state.races[x].id;
            b.name = state.races[x].name;
            b.singular = state.races[x].singular;
          }
          all.push(b);
        }
      }
      return all;
    },
    builderAncestries: (state) => {
      var all = [];
      for (var x = 0; x < state.ancestries.length; x++) {
        for (var y = 0; y < state.ancestries[x].subraces.length; y++) {
          var b = {
            ...state.ancestries[x],
            ...state.ancestries[x].subraces[y],
            name: state.ancestries[x].name + ", " + state.ancestries[x].subraces[y].name,
            singular: state.ancestries[x].singular + ", " + state.ancestries[x].subraces[y].singular,
            traits: [ ...state.ancestries[x].traits, ...state.ancestries[x].subraces[y].traits ]
          };
          if (state.ancestries[x].subraces[y].id === "default") {
            b.id = state.ancestries[x].id;
            b.name = state.ancestries[x].name;
            b.singular = state.ancestries[x].singular;
          }
          all.push(b);
        }
      }
      return all;
    },
    randomValuable: (state) => (min, max) => {
      let possibles = state.valuables.filter((a) => {
        return a.Value <= max && a.Value >= min;
      });
      let i = droll.roll("1d" + possibles.length.toString()).total -1;
      return possibles[i];
    },
    allNationNames: (state) => {
      return state.nations.map((a) => {
        return a.name;
      });
    },
    allCityNames: (state) => {
      return state.cities.map((a) => {
        return a.name;
      });
    },
    randomMagicItem: (state) => (minvalue, maxvalue) => {
      let possibles = state.magicitems.filter((a) => {
        return a["Cost (gp)"] <= maxvalue && a["Cost (gp)"] >= minvalue;
      });
      let i = droll.roll("1d" + possibles.length.toString()).total -1;
      return possibles[i];
    }
  },
  actions: {
    getAllArmor () {
      return new Promise((resolve) => {
        axios.get("/json/armor.json").then((response) => {
          this.armor = response.data;
          resolve(true);
        }).catch((error) => {
          this.armor = [{"Armor":"Padded Armor","Type":"Light","Material":"Cloth","AC":11,"Strength":"-","Stealth":"disadvantage","Weight":8,"Resistance":"none","Price":5,"Time to Craft":1}]
          resolve(false);
          console.log(error);
        });
      });
    },
    getAllArmorV2 () {
      return new Promise((resolve) => {
        axios.get("/json/armorv2.json").then((response) => {
          this.armorv2 = response.data;
          resolve(true);
        }).catch((error) => {
          resolve(false);
          console.log(error);
        });
      });
    },
    getAllBackgrounds () {
      return new Promise((resolve) => {
        axios.get("/json/backgrounds.json").then((response) => {
          this.backgrounds = response.data.documents;
          for (var x = 0; x < this.backgrounds.length; x++) {
            this.backgrounds[x].isCollapsed = true;
          }
          resolve(true);
        });
      });
    },
    getAllDivines () {
      return new Promise((resolve) => {
        axios.get("/json/divines.json").then((response) => {
          var divines = response.data.documents;
          for (var x = 0; x < divines.length; x++) {
            divines[x].descr = marked.parse(divines[x].description);
          }
          this.divines = divines;
          resolve(true);
        });
      });
    },
    getAllEquipment () {
      return new Promise ((resolve) => {
        axios.get('/json/equipment.json').then((response) => {
          this.equipment = response.data;
          resolve(true);
        });
      });
    },
    getAllFeats () {
      return new Promise((resolve) => {
        axios.get('/json/feats.json').then((response) => {
          this.feats = response.data;
          resolve(true);
        });
      });
    },
    getAllFeatsV2 () {
      return new Promise((resolve) => {
        axios.get('/json/featsv2.json').then((response) => {
          this.featsv2 = response.data;
          resolve(true);
        });
      });
    },
    getAllGods () {
      return new Promise((resolve) => {
        axios.get('/json/gods.json').then((response) => {
          this.gods = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllEvents () {
      return new Promise((resolve) => {
        axios.get('/json/history.json').then((response) => {
          this.historyevents = response.data.documents;
          for (var x = 0; x < this.historyevents.length; x++) {
            this.historyevents[x].text.text = marked.parse(this.historyevents[x].text.text);
          }
          resolve(true);
        });
      });
    },
    getAllOrganizations () {
      return new Promise((resolve) => {
        axios.get('/json/organizations.json').then((response) => {
          this.organizations = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllRaces () {
      return new Promise((resolve) => {
        axios.get('/json/races.json').then((response) => {
          this.races = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllAncestries () {
      return new Promise((resolve) => {
        axios.get('/json/ancestries.json').then((response) => {
          this.ancestries = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllSpells () {
      return new Promise((resolve) => {
        axios.get('/json/spells.json').then((response) => {
          var spells = response.data.documents;
          for (var x in spells) {
            try {
              spells[x].tagsText = spells[x].tags.join(', ');
              if (spells[x].level != "cantrip") {
                spells[x].level = spells[x].level.substring(5);
              }
            } catch (e) {
              spells[x].tagsText = "";
              console.log(e);
              console.log(x);
              console.log(spells[x]);
            }
          }
          this.spells = spells;
          resolve();
        });
      });
    },
    getAllSpellsV2 () {
      return new Promise((resolve) => {
        axios.get('/json/spellsv2.json').then((response) => {
          var spells = response.data.documents;
          for (var x in spells) {
            try {
              spells[x].tagsText = spells[x].tags.join(', ');
              if (spells[x].level != "cantrip") {
                spells[x].level = spells[x].level.substring(5);
              }
            } catch (e) {
              spells[x].tagsText = "";
              console.log(e);
              console.log(x);
              console.log(spells[x]);
            }
          }
          this.spellsv2 = spells;
          resolve();
        });
      });
    },
    getAllValuables () {
      return new Promise((resolve) => {
        axios.get('/json/valuables.json').then((response) => {
          this.valuables = response.data;
          resolve(true);
        });
      });
    },
    getAllWeapons () {
      return new Promise ((resolve) => {
        axios.get('/json/weapons.json').then((response) => {
          this.weapons = response.data;
          resolve(true);
        });
      });
    },
    getAllHomebrewWeapons () {
      return new Promise ((resolve) => {
        axios.get('/json/joeweapons.json').then((response) => {
          this.weaponsv2 = response.data;
          resolve(true);
        });
      });
    },
    getAllClasses () {
      return new Promise((resolve) => {
        axios.get('/json/classes.json').then((response) => {
         var classes = response.data.documents;
         this.classes = classes.map((a) => {
           var r = { ...a };
           r.features = a.features.map((b) => {
             var s = { ...b, isCollapsed: true };
             return s;
           });
           r.subclass = r.subclass.map((c) => {
             var t = { ...c };
             t.features = c.features.map((d) => {
               var u = { ...d, isCollapsed: true };
               return u;
             });
             return t;
           });
           return r;
         });
         resolve(true);
        });
      });
    },
    getAllClassesV2 () {
      return new Promise((resolve) => {
        axios.get('/json/classesv2.json').then((response) => {
         var classes = response.data.documents;
         this.classesv2 = classes.map((a) => {
           var r = { ...a };
           r.features = a.features.map((b) => {
             var s = { ...b, isCollapsed: true };
             return s;
           });
           r.subclass = r.subclass.map((c) => {
             var t = { ...c };
             t.features = c.features.map((d) => {
               var u = { ...d, isCollapsed: true };
               return u;
             });
             return t;
           });
           return r;
         });
         resolve(true);
        });
      });
    },
    getAllTerritories () {
      return new Promise((resolve) => {
        axios.get('/json/territories.json').then((response) => {
          this.territories = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllCities () {
      return new Promise((resolve) => {
        axios.get('/json/cities.json').then((response) => {
          this.cities = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllNations () {
      return new Promise((resolve) => {
        axios.get('/json/nations.json').then((response) => {
          this.nations = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllLandmarks () {
      return new Promise((resolve) => {
        axios.get('/json/landmarks.json').then((response) => {
          this.landmarks = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllFeatures () {
      return new Promise((resolve) => {
        axios.get('/json/features.json').then((response) => {
          this.features = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllContinents () {
      return new Promise((resolve) => {
        axios.get('/json/continents.json').then((response) => {
          this.continents = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllMagicItems () {
      this.magicscrolls = [];
      this.magicwands = [];
      this.magicuncommons = [];
      this.magicrares = [];
      this.magicveryrares = [];
      this.magiclegendaries = [];
      this.magiccommons = [];
      this.magicweapons = [];
      this.magicarmor = [];
      this.magicother = [];
      return new Promise((resolve) => {
        Promise.all([this.getAllSpells(), this.getAllArmor(), this.getAllWeapons()]).then(() => {
          axios.get('/json/magicitems.json').then((response) => {
            var magicitems = response.data;
            //processing steps
            var items = magicitems.filter(function(item) {
              if (["1st Level Scroll", "Cantrip Scroll", "2nd Level Scroll", "3rd Level Scroll", "4th Level Scroll", "5th Level Scroll", "6th Level Scroll", "7th Level Scroll", "8th Level Scroll", "+1 Armor", "+2 Armor", "+3 Armor", "Armor of Resistance", "Mariner's Armor", "Weapon +1", "Weapon +2", "Weapon +3", "Weapon of Returning", "Weapon of Returning +1", "Weapon of Elemental Damage", "Weapon of Elemental Damage +1", "Frost Brand", "Weapon of Sharpness", "Vicious Weapon", "Giant Slayer", "Dagger of Venom", "Dancing Sword", "Dragon Slayer", "Weapon of Speed", "Flame Tongue", "Weapon of Life Stealing", "Weapon of Warning", "Weapon of Wounding", "Wand of 1st Level Spell", "Wand of 2nd Level Spell", "Wand of 3rd Level Spell", "Wand of 4th Level Spell"]
                .indexOf(item.Item) !== -1) {
                return false;
              }
              return true;
            });
            for (var l = 0; l < this.weapons.length; l++) {
              items.push(...helpers.getWeaponVariants(this.weapons[l]));
            }
            for (var z = 0; z < this.armor.length; z++) {
              helpers.armorBuilder(items, this.armor[z]);
            }
            for (var y = 0; y < this.spells.length; y++) {
              helpers.scrollBuilder(this.spells[y], items);
              helpers.wandBuilder(this.spells[y], items);
            }
            var today = new Date();
            var rng = seedrandom(today.getYear() + today.getMonth() + today.getDate());
            for (var x = 0; x < items.length; x++) {
              items[x].print = false;
              var threshold = 1;
              if (items[x].Item.includes("Mithril")) {
                threshold = 0.25;
              } else if (items[x].Item.includes("Parakas Steel") || items[x].Item.includes("Orichalcum")) {
                threshold = 0.45;
              } else if (items[x].Item.includes("Adamantine")) {
                threshold = 0.1;
              } else if (items[x].Item.includes("Dragon")) {
                threshold = 0.05;
              }
              if (items[x].Rarity === "Uncommon") {
                threshold *= (3 / 20);
                this.magicuncommons.push(items[x]);
              } else if (items[x].Rarity === "Rare") {
                threshold *= (1 / 20);
                this.magicrares.push(items[x]);
              } else if (items[x].Rarity === "Very Rare") {
                threshold *= (1 / 100);
                this.magicveryrares.push(items[x]);
              } else if (items[x].Rarity === "Legendary") {
                threshold *= 0;
                this.magiclegendaries.push(items[x]);
              } else {
                this.magiccommons.push(items[x]);
              }
              var num = rng();
              if (num < threshold) {
                items[x].instock = "In Stock";
              } else {
               items[x].instock = "Out of Stock"; 
              }
              if (items[x].Type.includes("Weapon")) {
                this.magicweapons.push(items[x]);
              } else if (items[x].Type.includes("Advanced Weap")) {
                this.magichomebrewweapons.push(items[x]);
              }else if (items[x].Type.includes("Armor") || items[x].Type.includes("Shield")) {
                this.magicarmor.push(items[x]);
              } else if (items[x].Type.includes("scroll")) {
                this.magicscrolls.push(items[x]);
              } else if (items[x].Type.includes("Wand")) {
                this.magicwands.push(items[x]);
              } else {
                this.magicother.push(items[x]);
              }
            }
            //processing steps
            this.magicitems = items;
            resolve(true);
          });
        });
      });
    },
    getAllMagicItemsV2 () {
      this.magicscrollsv2 = [];
      this.magicwandsv2 = [];
      this.magicuncommonsv2 = [];
      this.magicraresv2 = [];
      this.magicveryraresv2 = [];
      this.magiclegendariesv2 = [];
      this.magiccommonsv2 = [];
      this.magicweaponsv2 = [];
      this.magicarmorv2 = [];
      this.magicotherv2 = [];
      return new Promise((resolve) => {
        Promise.all([this.getAllSpellsV2(), this.getAllArmorV2(), this.getAllHomebrewWeapons()]).then(() => {
          axios.get('/json/magicitemsv2.json').then((response) => {
            var items = response.data;
            //processing steps
            for (var l = 0; l < this.weaponsv2.length; l++) {
              items.push(...helpersv2.getWeaponVariants(this.weaponsv2[l]));
            }
            for (var z = 0; z < this.armorv2.length; z++) {
              helpersv2.armorBuilder(items, this.armorv2[z]);
            }
            for (var y = 0; y < this.spellsv2.length; y++) {
              helpersv2.scrollBuilder(this.spellsv2[y], items);
              helpersv2.wandBuilder(this.spellsv2[y], items);
            }
            var today = new Date();
            var rng = seedrandom(today.getYear() + today.getMonth() + today.getDate());
            for (var x = 0; x < items.length; x++) {
              items[x].print = false;
              var threshold = 1;
              if (items[x].Item.includes("Mithril")) {
                threshold = 0.25;
              } else if (items[x].Item.includes("Adamantine") || items[x].Item.includes("Parakas Steel") || items[x].Item.includes("Orichalcum")) {
                threshold = 0.1;
              } else if (items[x].Item.includes("Dragon")) {
                threshold = 0.05;
              }
              if (items[x].Rarity === "Uncommon") {
                threshold *= (3 / 20);
                this.magicuncommonsv2.push(items[x]);
              } else if (items[x].Rarity === "Rare") {
                threshold *= (1 / 20);
                this.magicraresv2.push(items[x]);
              } else if (items[x].Rarity === "Very Rare") {
                threshold *= (1 / 100);
                this.magicveryraresv2.push(items[x]);
              } else if (items[x].Rarity === "Legendary") {
                threshold *= 0;
                this.magiclegendariesv2.push(items[x]);
              } else {
                this.magiccommonsv2.push(items[x]);
              }
              var num = rng();
              if (num < threshold) {
                items[x].instock = "In Stock";
              } else {
               items[x].instock = "Out of Stock"; 
              }
              if (items[x].Type.includes("Weapon")) {
                this.magicweaponsv2.push(items[x]);
              } else if (items[x].Type.includes("Armor") || items[x].Type.includes("Shield")) {
                this.magicarmorv2.push(items[x]);
              } else if (items[x].Type.includes("scroll")) {
                this.magicscrollsv2.push(items[x]);
              } else if (items[x].Type.includes("Wand")) {
                this.magicwandsv2.push(items[x]);
              } else {
                this.magicotherv2.push(items[x]);
              }
            }
            //processing steps
            this.magicitemsv2 = items;
            resolve(true);
          });
        });
      });
    },
    getAll () {
      return new Promise ((resolve) => {
        Promise.all([
          this.getAllArmor(),
          this.getAllWeapons(),
          this.getAllMagicItems(),
          this.getAllContinents(),
          this.getAllBackgrounds(),
          this.getAllDivines(),
          this.getAllEquipment(),
          this.getAllFeats(),
          this.getAllFeatsV2(),
          this.getAllGods(),
          this.getAllEvents(),
          this.getAllOrganizations(),
          this.getAllRaces(),
          this.getAllAncestries(),
          this.getAllValuables(),
          this.getAllClasses(),
          this.getAllTerritories(),
          this.getAllCities(),
          this.getAllNations(),
          this.getAllLandmarks(),
          this.getAllFeatures(),
          this.getAllHomebrewWeapons(),
          this.getAllArmorV2(),
          this.getAllSpellsV2(),
          this.getAllMagicItemsV2(),
          this.getAllClassesV2()]).then(() => {
            resolve(true);
          });
      });
    }
  }
};