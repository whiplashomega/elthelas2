import Vue from 'vue';
import ctest from './cordovatest.js';
import magicweapons from '@/model/magicitems/magicweapons.js';
import getters from './magicitems/getters';
import helpers from './magicitems/helpers';

function getWeaponVariants (weapon) {
  return magicweapons.reduce((newArr, mag) => {
    let newobj = { ...weapon };
    let flag = false;
    for (var i in mag) {
      if (typeof mag[i] === "string") {
        newobj[i] = mag[i].replace(/\$Name/g, weapon.Name);
      } else {
        newobj[i] = mag[i];
      }
      if (mag.test) {
        if (mag.test.test(mag[i])) {
          flag = true;
        }
      } else {
        flag = true;
      }
    }
    newobj.Name = newobj.Item;
    if (flag) {
      newArr.push(newobj);
    }
    return newArr;
  }, []);
}

const state = {
  all: [],
  magicscrolls: [],
  magicwands: [],
  magicweapons: [],
  magicarmor: [],
  magicother: [],
  allcommons: [],
  alluncommons: [],
  allrares: [],
  allveryrares: [],
  alllegendaries: []
};

const actions = {
  getAllMagicItems ({ commit }) {
    return new Promise((resolve) => {
      Promise.all([
        this.dispatch('getAllSpells'),
        this.dispatch('getAllArmor'),
        this.dispatch('getAllWeapons')])
        .then(() => {
          Vue.http.get(ctest.baseUrl + 'json/magicitems.json').then((response) => {
            var magicitems = response.body;
            commit('GET_MAGICITEMS', { magicitems: magicitems, weapons: this.getters.allWeapons, armor: this.getters.allArmor, spells: this.getters.allSpells });
            resolve();
          });
        });
    });
  }
};

const mutations = {
  'GET_MAGICITEMS' (state, { magicitems, weapons, armor, spells }) {
    var items = magicitems.filter(function(item) {
      if (["1st Level Scroll", "Cantrip Scroll", "2nd Level Scroll", "3rd Level Scroll", "4th Level Scroll", "5th Level Scroll", "6th Level Scroll", "7th Level Scroll", "8th Level Scroll", "+1 Armor", "+2 Armor", "+3 Armor", "Armor of Resistance", "Mariner's Armor", "Weapon +1", "Weapon +2", "Weapon +3", "Weapon of Returning", "Weapon of Returning +1", "Weapon of Elemental Damage", "Weapon of Elemental Damage +1", "Frost Brand", "Weapon of Sharpness", "Vicious Weapon", "Giant Slayer", "Dagger of Venom", "Dancing Sword", "Dragon Slayer", "Weapon of Speed", "Flame Tongue", "Weapon of Life Stealing", "Weapon of Warning", "Weapon of Wounding", "Wand of 1st Level Spell", "Wand of 2nd Level Spell", "Wand of 3rd Level Spell", "Wand of 4th Level Spell"]
        .indexOf(item.Item) !== -1) {
        return false;
      }
      return true;
    });
    for (var l = 0; l < weapons.length; l++) {
      items.push(...getWeaponVariants(weapons[l]));
    }
    for (var z = 0; z < armor.length; z++) {
      helpers.armorBuilder(items, armor[z]);
    }
    for (var y = 0; y < spells.length; y++) {
      helpers.scrollBuilder(spells[y], items);
      helpers.wandBuilder(spells[y], items);
    }
    var today = new Date();
    Math.seedrandom(today.getYear() + today.getMonth() + today.getDate());
    for (var x = 0; x < items.length; x++) {
      items[x].print = false;
      items[x].instock = helpers.inStock(Math.random(), items[x], state);
      if (items[x].Type.includes("Weapon")) {
        state.magicweapons.push(items[x]);
      } else if (items[x].Type.includes("Armor") || items[x].Type.includes("Shield")) {
        state.magicarmor.push(items[x]);
      } else if (items[x].Type.includes("scroll")) {
        state.magicscrolls.push(items[x]);
      } else if (items[x].Type.includes("Wand")) {
        state.magicwands.push(items[x]);
      } else {
        state.magicother.push(items[x]);
      }
    }
    state.all = items;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
