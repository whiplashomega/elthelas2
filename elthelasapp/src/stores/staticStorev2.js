import axios from 'axios';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import droll from 'droll';
import helpers from './magicitems/helpers';
import helpersv2 from './magicitems/helpersv2';
import seedrandom from 'seedrandom';

export default {
  state: () => {
    return {
      ancestries: [],
      backgroundsv2: [],
      equipment: [],
      organizationsv2: [{ title: 'Placeholder', id: 'placeholder', ranks: [] }],
      valuables: [],
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
      rules: [],
      rulesByCategory: []
    };
  },
  getters: {
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
    randomMagicItem: (state) => (minvalue, maxvalue) => {
      let possibles = state.magicitemsv2.filter((a) => {
        return a["Cost (gp)"] <= maxvalue && a["Cost (gp)"] >= minvalue;
      });
      let i = droll.roll("1d" + possibles.length.toString()).total -1;
      return possibles[i];
    }
  },
  actions: {
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
    getAllBackgroundsv2 () {
      return new Promise((resolve) => {
        axios.get("/json/backgroundsv2.json").then((response) => {
          this.backgroundsv2 = response.data.documents;
          for (var x = 0; x < this.backgroundsv2.length; x++) {
            this.backgroundsv2[x].isCollapsed = true;
          }
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
    getAllFeatsV2 () {
      return new Promise((resolve) => {
        axios.get('/json/featsv2.json').then((response) => {
          this.featsv2 = response.data;
          resolve(true);
        });
      });
    },
    getAllOrganizationsv2 () {
      return new Promise((resolve) => {
        axios.get('/json/organizationsv2.json').then((response) => {
          this.organizationsv2 = response.data.documents;
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
    getAllRules () {
      return new Promise((resolve) => {
        axios.get('/json/rules.json').then((response) => {
          this.rules = response.data.documents;
          this.rulesByCategory = response.data.heirarchical;
          resolve(true);
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
    getAllHomebrewWeapons () {
      return new Promise ((resolve) => {
        axios.get('/json/weaponsv2.json').then((response) => {
          this.weaponsv2 = response.data;
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
    },
    getAllNew () {
        return new Promise ((resolve) => {
        Promise.all([
          this.getAllBackgroundsv2(),
          this.getAllOrganizationsv2(),
          this.getAllEquipment(),
          this.getAllFeatsV2(),
          this.getAllAncestries(),
          this.getAllValuables(),
          this.getAllHomebrewWeapons(),
          this.getAllArmorV2(),
          this.getAllSpellsV2(),
          this.getAllRules(),
          this.getAllClassesV2()]).then(() => {
            this.getAllMagicItemsV2();
            resolve(true);
          });
      });
    }
  }
};