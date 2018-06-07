import Vue from 'vue';

const state = {
  all: [],
  magicscrolls: [],
  magicwands: [],
  magicweapons: [],
  magicarmor: [],
  magicother: []
};

const getters = {
  allMagicItems: state => state.all,
  allMagicScrolls: state => state.magicscrolls,
  allMagicWands: state => state.magicwands,
  allMagicWeapons: state => state.magicweapons,
  allMagicArmor: state => state.magicarmor,
  allMagicOther: state => state.magicother
};

const actions = {
  getAllMagicItems ({ commit }) {
    return new Promise((resolve) => {
      Promise.all([
        this.dispatch('getAllSpells'),
        this.dispatch('getAllArmor'),
        this.dispatch('getAllWeapons')])
        .then(() => {
          Vue.http.get('/static/json/magicitems.json').then((response) => {
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
      if (["1st Level Scroll", "Cantrip Scroll", "2nd Level Scroll", "3rd Level Scroll", "4th Level Scroll", "5th Level Scroll", "6th Level Scroll", "7th Level Scroll", "8th Level Scroll", "+1 Armor", "+2 Armor", "Armor of Resistance", "Mariner's Armor", "Weapon +1", "Weapon +2", "Weapon +3", "Weapon of Returning", "Weapon of Returning +1", "Weapon of Elemental Damage", "Weapon of Elemental Damage +1", "Weapon of Sharpness", "Vicious Weapon", "Weapon of Life Stealing", "Weapon of Warning", "Weapon of Wounding", "Wand of 1st Level Spell", "Wand of 2nd Level Spell", "Wand of 3rd Level Spell", "Wand of 4th Level Spell"]
        .indexOf(item.Item) !== -1) {
        return false;
      }
      return true;
    });
    var dmgFunction = function(dmg, j) {
      items.push({
        Item: weapons[j].Name + " of " + dmg,
        Type: "Weapon (" + weapons[j].Name + ")",
        Attunement: "No",
        Rarity: "Uncommon",
        Effect: "Whenever an attack with this " + weapons[j].Name + " hits it does an additional 1d6 " + dmg + " damage in addition to its normal effects.",
        "Cost (gp)": 4000
      });
      items.push({
        Item: "+1 " + weapons[j].Name + " of " + dmg,
        Type: "Weapon (" + weapons[j].Name + ")",
        Attunement: "Yes",
        Rarity: "Rare",
        Effect: "You gain +1 to attack and damage rolls with this " + weapons[j].Name + ". Whenever an attack with this " + weapons[j].Name + " hits it does an additional 1d6 " + dmg + " damage in addition to its normal effects.",
        "Cost (gp)": 9000
      });
    };
    for (var l = 0; l < weapons.length; l++) {
      items.push({
        Item: weapons[l].Name + " of Wounding",
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "Yes",
        Rarity: "Rare",
        Effect: "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means. Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
        "Cost (gp)": 8000
      });
      items.push({
        Item: weapons[l].Name + " of Speed",
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "Yes",
        Rarity: "Very Rare",
        Effect: "You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.",
        "Cost (gp)": 21000
      });
      items.push({
        Item: weapons[l].Name + " of Life Stealing",
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "Yes",
        Rarity: "Rare",
        Effect: "When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn't a construct or an undead. You also gain 10 temporary hit points.",
        "Cost (gp)": 5000
      });
      items.push({
        Item: "Vicious " + weapons[l].Name,
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "Yes",
        Rarity: "Rare",
        Effect: "When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon's type.",
        "Cost (gp)": 5000
      });
      items.push({
        Item: "+1 " + weapons[l].Name,
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "No",
        Rarity: "Uncommon",
        Effect: "You have a +1 bonus to attack and damage rolls made with this " + weapons[l].Name + ".",
        "Cost (gp)": 3000
      });
      items.push({
        Item: "+2 " + weapons[l].Name,
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "No",
        Rarity: "Rare",
        Effect: "You have a +2 bonus to attack and damage rolls made with this " + weapons[l].Name + ".",
        "Cost (gp)": 8000
      });
      items.push({
        Item: "+3 " + weapons[l].Name,
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "No",
        Rarity: "Very Rare",
        Effect: "You have a +3 bonus to attack and damage rolls made with this " + weapons[l].Name + ".",
        "Cost (gp)": 14000
      });
      items.push({
        Item: weapons[l].Name + " of Warning",
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "Yes",
        Rarity: "Uncommon",
        Effect: "This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can't be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
        "Cost (gp)": 3000
      });
      items.push({
        Item: "Moon Touched " + weapons[l].Name,
        Type: "Weapon (" + weapons[l].Name + ")",
        Attunement: "Yes",
        Rarity: "Uncommon",
        Effect: "In darkness, the unsheathed blade of this weapon sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.",
        "Cost (gp)": 200
      });
      var dmgArray = ["fire", "acid", "cold", "lightning"];
      for (var i = 0; i < dmgArray.length; i++) {
        dmgFunction(dmgArray[i], l);
      }
      if (/thrown/.test(weapons[l].Properties)) {
        items.push({
          Item: weapons[l].Name + " of Returning",
          Type: "Weapon (" + weapons[l].Name + ")",
          Attunement: "Yes",
          Rarity: "Uncommon",
          Effect: "This " + weapons[l].Name + " instantly returns to the wielders hand after an attack is made with it, regardless of whether the attack hits or misses. If the owner does not have a hand free it instead falls to the ground at his/her feat.",
          "Cost (gp)": 1500
        });
        items.push({
          Item: "+1 " + weapons[l].Name + " of Returning",
          Type: "Weapon (" + weapons[l].Name + ")",
          Attunement: "Yes",
          Rarity: "Rare",
          Effect: "You gain +1 to attack and damage rolls while wielding this " + weapons[l].Name + ". This " + weapons[l].Name + " instantly returns to the wielders hand after an attack is made with it, regardless of whether the attack hits or misses. If the owner does not have a hand free it instead falls to the ground at his/her feat.",
          "Cost (gp)": 7000
        });
      }
      if (/slashing/.test(weapons[l].Damage)) {
        items.push({
          Item: weapons[l].Name + " of Sharpness",
          Type: "Weapon (" + weapons[l].Name + ")",
          Attunement: "Yes",
          Rarity: "Very Rare",
          Effect: "When you attack an object with this magic weapon and hit, maximize your weapon damage dice against the target. When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20 you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead. In addition, you can speak the weapon's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
          "Cost (gp)": 9000
        });
      }
    }
    var resArmor = function(resist, z) {
      items.push({
        Item: armor[z].Armor + " of " + resist + " Resistance " + "(" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "Yes",
        Effect: "You have resistance to " + resist + " damage while you wear this armor. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Rare",
        "Cost (gp)": Number(armor[z].Price) + 8000
      });
    };
    for (var z = 0; z < armor.length; z++) {
      var resistArray = ["fire", "cold", "acid", "poison", "bludgeoning", "piercing", "slashing", "force", "lightning", "thunder", "radiant", "necrotic"];
      items.push({
        Item: armor[z].Armor + " of Gleaming (" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "No",
        Effect: "This armor never  gets dirty. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Common",
        "Cost (gp)": Number(armor[z].Price) + 200
      });
      items.push({
        Item: "Cast-Off " + armor[z].Armor + " (" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "No",
        Effect: "You can doff this armor as an action. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Common",
        "Cost (gp)": Number(armor[z].Price) + 400
      });
      items.push({
        Item: "Smoldering " + armor[z].Armor + " (" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "No",
        Effect: "Wisps of harmless, odorless smoke rise from this armor while it is worn. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Common",
        "Cost (gp)": Number(armor[z].Price) + 200
      });
      items.push({
        Item: "+1 " + armor[z].Armor + " (" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "No",
        Effect: "You have a +1 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Rare",
        "Cost (gp)": Number(armor[z].Price) + 4000
      });
      items.push({
        Item: "+2 " + armor[z].Armor + " (" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "No",
        Effect: "You have a +2 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Very Rare",
        "Cost (gp)": Number(armor[z].Price) + 16000
      });
      for (var k = 0; k < resistArray.length; k++) {
        resArmor(resistArray[k], z);
      }
      items.push({
        Item: "Mariner's " + armor[z].Armor + " (" + armor[z].Material + ")",
        Type: "Armor (" + armor[z].Armor + ")",
        Attunement: "No",
        Effect: "While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs. It also grants the following resistances based on its material: " + armor[z].Resistance,
        Rarity: "Uncommon",
        "Cost (gp)": Number(armor[z].Price) + 2000
      });
    }
    for (var y = 0; y < spells.length; y++) {
      var levelnum = 0;
      if (spells[y].level === "cantrip") {
        levelnum = 0;
      } else {
        if (typeof spells[y].level === "undefined") {
          console.log("bad level in spell: " + spells[y]);
        } else {
          levelnum = Number(spells[y].level);
          spells[y].level = spells[y].level.replace("level", "");
        }
      }
      var item = {
        Item: "Scroll of " + spells[y].title,
        Type: "Single Use (scroll)",
        Attunement: "No",
        Effect: "This scroll bears the spell " + spells[y].title + ", written in a mystical cipher. If it is on your class's spell list you can use an action to read the scroll and cast it without having to provide any of the spell's components. If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is " + (10 + levelnum) + ". On a failed check, the spell disappears from the scroll with no other effect. Once the spell is cast the scroll crumbles to dust. The attack bonus is " + (Math.floor(Math.abs(levelnum - 1) / 2) * 2 + 5) + " and the save DC is " + (Math.floor(Math.abs(levelnum - 1) / 2) * 2 + 13) + "."
      };
      if (["cantrip", "1"].indexOf(spells[y].level) !== -1) {
        item.Rarity = "Common";
      } else if (["2", "3"].indexOf(spells[y].level) !== -1) {
        item.Rarity = "Uncommon";
      } else if (["4", "5"].indexOf(spells[y].level) !== -1) {
        item.Rarity = "Rare";
      } else {
        item.Rarity = "Very Rare";
      }
      if (spells[y].level === "cantrip") {
        item["Cost (gp)"] = 25;
      } else {
        item["Cost (gp)"] = 50 * Math.pow(2, (Number(spells[y].level) - 1));
      }
      if (spells[y].level !== "9") {
        items.push(item);
      }
      var wand;
      if (spells[y].level === 'cantrip') {
        wand = {
          Item: "Wand of " + spells[y].title,
          Type: "Wand",
          Attunement: "No",
          "Cost (gp)": 1000,
          Rarity: "Uncommon",
          Effect: "While holding this wand you can cast the cantrip " + spells[y].title + " at will. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence."
        };
        items.push(wand);
      } else if (spells[y].level === '1') {
        wand = {
          Item: "Wand of " + spells[y].title,
          Type: "Wand",
          Attunement: "No",
          "Cost (gp)": 3000,
          Rarity: "Uncommon",
          Effect: "This wand has 7 charges and regains 1d6+1 charges daily at dawn. If you expend the wands last charge roll a d20. On a 1, the wand crumbles into ashes and is destroyed. Each wand of this type has one 1st level spell associated with it. The wielder can expend 1 charge of the wand to cast the spell as a 1st level spell. If the spell can be cast at higher levels, the wielder can expend additional charges to cast it at a higher level. For each charge expended the level of the spell increases by 1. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence."
        };
        items.push(wand);
      } else if (spells[y].level === '2') {
        wand = {
          Item: "Wand of " + spells[y].title,
          Type: "Wand",
          Attunement: "Yes (spellcaster)",
          "Cost (gp)": 6000,
          Rarity: "Rare",
          Effect: "This wand has 7 charges and regains 1d6+1 charges daily at dawn. If you expend the wands last charge roll a d20. On a 1, the wand crumbles into ashes and is destroyed. Each wand of this type has one 1st level spell associated with it. The wielder can expend 1 charge of the wand to cast the spell as a 1st level spell. If the spell can be cast at higher levels, the wielder can expend additional charges to cast it at a higher level. For each charge expended the level of the spell increases by 1. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence."
        };
        items.push(wand);
      } else if (spells[y].level === '3') {
        wand = {
          Item: "Wand of " + spells[y].title,
          Type: "Wand",
          Attunement: "Yes (spellcaster)",
          "Cost (gp)": 12000,
          Rarity: "Rare",
          Effect: "This wand has 7 charges and regains 1d6+1 charges daily at dawn. If you expend the wands last charge roll a d20. On a 1, the wand crumbles into ashes and is destroyed. Each wand of this type has one 1st level spell associated with it. The wielder can expend 1 charge of the wand to cast the spell as a 1st level spell. If the spell can be cast at higher levels, the wielder can expend additional charges to cast it at a higher level. For each charge expended the level of the spell increases by 1. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence."
        };
        items.push(wand);
      } else if (spells[y].level === '4') {
        wand = {
          Item: "Wand of " + spells[y].title,
          Type: "Wand",
          Attunement: "Yes (spellcaster)",
          "Cost (gp)": 24000,
          Rarity: "Very Rare",
          Effect: "This wand has 7 charges and regains 1d6+1 charges daily at dawn. If you expend the wands last charge roll a d20. On a 1, the wand crumbles into ashes and is destroyed. Each wand of this type has one 1st level spell associated with it. The wielder can expend 1 charge of the wand to cast the spell as a 1st level spell. If the spell can be cast at higher levels, the wielder can expend additional charges to cast it at a higher level. For each charge expended the level of the spell increases by 1. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence."
        };
        items.push(wand);
      }
    }
    var today = new Date();
    Math.seedrandom(today.getYear() + today.getMonth() + today.getDate());
    var inStock = function (rand, x) {
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
      } else if (items[x].Rarity === "Rare") {
        threshold *= (1 / 20);
      } else if (items[x].Rarity === "Very Rare") {
        threshold *= (1 / 100);
      }
      if (rand < threshold) {
        return "In Stock";
      }
      return "Out of Stock";
    };
    for (var x = 0; x < items.length; x++) {
      items[x].instock = inStock(Math.random(), x);
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
