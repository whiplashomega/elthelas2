export default {
  addAbility (character, name, max, recharge, minlevel, cl) {
    if (Number(cl.level) >= minlevel) {
      let obj = { name: name, current: max, max: max, recharge: recharge };
      let i = character.resources.findIndex((a) => {
        return a.name === name;
      });
      if (i !== -1) {
        character.resources.splice(i, 1, obj);
      } else {
        character.resources.push(obj);
      }
    }
  },
  artificerResources (vue, character, a) {
    this.addAbility(character, "Flash of Genius", vue.getStatMod(3), "longrest", 7, a);
    this.addAbility(character, "Spell-Storing Item", 2 * vue.getStatMod(3), "longrest", 11, a);
    if (a.selsubclass.name === "Alchemist") {
      this.addAbility(character, "Experimental Elixer", 1, "longrest", 3, a);
    }
    if (a.selsubclass.name === "Artillerist") {
      this.addAbility(character, "Eldritch Cannon", 1, "longrest", 3, a);
      this.addAbility(character, "Arcane Firearm", 1, "longrest", 5, a);
    }
    if (a.selsubclass.name === "Battle Smith") {
      this.addAbility(character, "Arcane Jolt", vue.getStatMod(3), "longrest", 9, a);
    }
  },
  barbResources (character, a) {
    var rage = this.calcRage(a);
    this.addAbility(character, rage.name, rage.max, rage.recharge, 1, a);
    if (a.selsubclass.name === "Path of the Ancestral Guardian") {
      this.addAbility(character, "Consult the Spirits", 1, "shortrest", 10, a);
    }
    if (a.selsubclass.name === "Path of the Zealot") {
      this.addAbility(character, "Fanatical Focus", 1, "never", 6, a);
      this.addAbility(character, "Zealous Presence", 1, "longrest", 10, a);
    }
  },
  bardResources (vue, character, a) {
    this.addAbility(character, "Bardic Inspiration", vue.getStatMod(5), "longrest", 1, a);
    this.addAbility(character, "Bardic Inspiration", vue.getStatMod(5), "shortrest", 5, a);
    if (a.selsubclass.name === "College of Glamour") {
      this.addAbility(character, "Enthralling Performance", 1, "shortrest", 3, a);
      this.addAbility(character, "Mantle of Majesty", 1, "longrest", 6, a);
      this.addAbility(character, "Unbreakable Majesty", 1, "shortrest", 14, a);
    }
    if (a.selsubclass.name === "College of Whispers") {
      this.addAbility(character, "Mantle of Whispers", 1, "shortrest", 6, a);
      this.addAbility(character, "Shadow Lore", 1, "longrest", 14, a);
    }
  },
  clericResources (character, a) {
    this.addAbility(character, "Channel Divinity", 1, "shortrest", 1, a);
    this.addAbility(character, "Channel Divinity", 2, "shortrest", 6, a);
    this.addAbility(character, "Channel Divinity", 3, "shortrest", 18, a);
  },
  druidResources (vue, character, a) {
    this.addAbility(character, "Wildshape", 2, "shortrest", 1, a);
    if (a.selsubclass.name === "Circle of the Land") {
      this.addAbility(character, "Natural Recovery", 1, "longrest", 2, a);
    }
    if (a.selsubclass.name === "Circle of Dreams") {
      this.addAbility(character, "Balm of the Summer Court", Number(a.level), "longrest", 2, a);
      this.addAbility(character, "Hidden Paths", vue.getStatMod(4), "longrest", 10, a);
      this.addAbility(character, "Walker in Dreams", 1, "longrest", 14, a);
    }
    if (a.selsubclass.name === "Circle of the Shepherd") {
      this.addAbility(character, "Spirit Totem", 1, "shortrest", 2, a);
      this.addAbility(character, "Faithful Summons", 1, "longrest", 14, a);
    }
  },
  factotumResources (vue, character, a) {
    this.addAbility(character, "Epiphany Points", vue.getStatMod(3) + Math.floor(Number(a.level) / 2), "shortrest", 1, a);
  },
  fighterResources (character, a) {
    this.addAbility(character, "Second Wind", 1, "shortrest", 1, a);
    this.addAbility(character, "Action Surge", 1, "shortrest", 2, a);
    this.addAbility(character, "Action Surge", 2, "shortrest", 17, a);
    this.addAbility(character, "Indomitable", Math.floor((Number(a.level) - 5) / 4), "shortrest", 9, a);
    if (a.selsubclass.name === "Battle Master") {
      this.addAbility(character, "Combat Superiority", 4, "shortrest", 3, a);
      this.addAbility(character, "Combat Superiority", 5, "shortrest", 7, a);
      this.addAbility(character, "Combat Superiority", 6, "shortrest", 15, a);
    }
  },
  monkResources (character, a) {
    this.addAbility(character, "Ki", Number(a.level), "shortrest", 2, a);
  },
  paladinResources (vue, character, a) {
    this.addAbility(character, "Lay on Hands", Number(a.level) * 5, "longrest", 1, a);
    this.addAbility(character, "Divine Sense", vue.getStatMod(5) + 1, "longrest", 1, a);
    this.addAbility(character, "Channel Divinity", 1, "shortrest", 3, a);
    this.addAbility(character, "Cleansing Touch", vue.getStatMod(5), "longrest", 14, a);
  },
  sorcererResources (character, a) {
    this.addAbility(character, "Sorcery Points", Number(a.level), "longrest", 2, a);
  },
  warlockResources (character, a) {
    if (a.selsubclass.name === "The Hexblade") {
      this.addAbility(character, "Hexblade's Curse", 1, "shortrest", 1, a);
      this.addAbility(character, "Accursed Specter", 1, "longrest", 6, a);
    }
    if (a.selsubclass.name === "Archfey") {
      this.addAbility(character, "Fey Presence", 1, "shortrest", 1, a);
      this.addAbility(character, "Misty Escape", 1, "shortrest", 6, a);
      this.addAbility(character, "Dark Delirium", 1, "shortrest", 14, a);
    }
    if (a.selsubclass.name === "The Great Old One") {
      this.addAbility(character, "Entropic Ward", 1, "shortrest", 6, a);
    }
    if (a.selsubclass.name === "The Fiend") {
      this.addAbility(character, "Dark One's Own Luck", 1, "shortrest", 6, a);
      this.addAbility(character, "Hurl Through Hell", 1, "longrest", 14, a);
    }
    if (a.selsubclass.name === "The Undying") {
      this.addAbility(character, "Defy Death", 1, "shortrest", 6, a);
      this.addAbility(character, "Indestructible Life", 1, "shortrest", 14, a);
    }
    if (a.selsubclass.name === "The Celestial") {
      this.addAbility(character, "Healing Light", 1 + Number(a.level), "longrest", 1, a);
      this.addAbility(character, "Searing Vengeance", 1, "longrest", 14, a);
    }
    this.addAbility(character, "Mystic Arcanum level 6", 1, "longrest", 11, a);
    this.addAbility(character, "Mystic Arcanum level 7", 1, "longrest", 13, a);
    this.addAbility(character, "Mystic Arcanum level 8", 1, "longrest", 15, a);
    this.addAbility(character, "Mystic Arcanum level 9", 1, "longrest", 17, a);
    this.addAbility(character, "Eldritch Master", 1, "longrest", 20, a);
  },
  wizardResources (character, a) {
    this.addAbility(character, "Arcane Recovery", 1, "longrest", 1, a);
    if (a.selsubclass.name === "Bladesinging") {
      this.addAbility(character, "Bladesong", 2, "shortrest", 2, a);
    }
    if (a.selsubclass.name === "School of Abjuration") {
      this.addAbility(character, "Arcane Ward", 1, "longrest", 2, a);
    }
    if (a.selsubclass.name === "School of Enchantment") {
      this.addAbility(character, "Hypnotic Gaze", 1, "longrest", 2, a);
    }
    if (a.selsubclass.name === "School of Enchantment") {
      this.addAbility(character, "Instinctive Charm", 1, "longrest", 6, a);
    }
    if (a.selsubclass.name === "School of Illusion") {
      this.addAbility(character, "Illusory Self", 1, "shortrest", 10, a);
    }
    if (a.selsubclass.name === "School of Transmutation") {
      this.addAbility(character, "Shapechanger", 1, "shortrest", 10, a);
    }
  },
  calcRage (a) {
    var rage = { name: "Rage", current: 2, max: 2, recharge: "longrest" };
    if (Number(a.level) >= 3) {
      rage.max++;
      rage.current++;
    } if (Number(a.level) >= 6) {
      rage.max++;
      rage.current++;
    } if (Number(a.level) >= 12) {
      rage.max++;
      rage.current++;
    } if (Number(a.level) >= 17) {
      rage.max++;
      rage.current++;
    }
    return rage;
  }
};
