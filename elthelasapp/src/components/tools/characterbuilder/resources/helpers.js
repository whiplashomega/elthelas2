export default {
  barbResources (character, a) {
    if (Number(a.level) < 20) {
      var rage = this.calcRage(a);
      this.character.resources.push(rage);
    }
    if (a.selsubclass.name === "Path of the Ancestral Guardian" && Number(a.level) >= 10) {
      character.resources.push({ name: "Consult the Spirits", current: 1, max: 1, recharge: "shortrest" });
    }
    if (a.selsubclass.name === "Path of the Zealot") {
      if (a.level >= 6) {
        character.resources.push({ name: "Fanatical Focus", current: 1, max: 1, recharge: "never" });
      }
      if (a.level >= 10) {
        character.resources.push({ name: "Zealous Presence", current: 1, max: 1, recharge: "longrest" });
      }
    }
  },
  bardResources (vue, character, a) {
    var inspiration = { name: "Bardic Inspiration", current: vue.getStatMod(5), max: vue.getStatMod(5), recharge: "longrest" };
    if (Number(a.level) >= 5) {
      inspiration.recharge = "shortrest";
    }
    character.resources.push(inspiration);
    if (a.selsubclass.name === "College of Glamour") {
      if (Number(a.level) >= 3) {
        character.resources.push({ name: "Enthralling Performance", current: 1, max: 1, recharge: "shortrest" });
      }
      if (Number(a.level) >= 6) {
        character.resources.push({ name: "Mantle of Majesty", current: 1, max: 1, recharge: "longrest" });
      }
      if (Number(a.level) >= 14) {
        character.resources.push({ name: "Unbreakable Majesty", current: 1, max: 1, recharge: "shortrest" });
      }
    }
    if (a.selsubclass.name === "College of Whispers") {
      if (Number(a.level) >= 6) {
        character.resources.push({ name: "Mantle of Whispers", current: 1, max: 1, recharge: "shortrest" });
      }
      if (Number(a.level) >= 14) {
        character.resources.push({ name: "Shadow Lore", current: 1, max: 1, recharge: "longrest" });
      }
    }
  },
  clericResources (character, a) {
    var channel = { name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest" };
    if (Number(a.level) >= 6) {
      channel.current++;
      channel.max++;
    }
    if (Number(a.level) >= 18) {
      channel.current++;
      channel.max++;
    }
    character.resources.push(channel);
  },
  fighterResources (character, a) {
    character.resources.push({ name: "Second Wind", current: 1, max: 1, recharge: "shortrest" });
    if (Number(a.level) >= 2) {
      let surge = { name: "Action Surge", current: 1, max: 1, recharge: "shortrest" };
      if (Number(a.level) >= 17) {
        surge.current++;
        surge.max++;
      }
      character.resources.push(surge);
    }
    if (a.level >= 9) {
      let num = Math.floor((Number(a.level) - 5) / 4);
      character.resources.push({ name: "Indomitable", current: num, max: num, recharge: "shortrest" });
    }
    if (Number(a.level) >= 3 && a.selsubclass.name === "Battle Master") {
      let superiority = { name: "Combat Superiority", current: 4, max: 4, recharge: "shortrest" };
      if (Number(a.level) >= 7) {
        superiority.current++;
        superiority.max++;
      }
      if (Number(a.level) >= 15) {
        superiority.current++;
        superiority.max++;
      }
      character.resources.push(superiority);
    }
  },
  paladinResources (vue, character, a) {
    character.resources.push({ name: "Lay on Hands", current: Number(a.level) * 5, max: Number(a.level) * 5, recharge: "longrest" });
    character.resources.push({ name: "Divine Sense", current: vue.getStatMod(5) + 1, max: vue.getStatMod(5) + 1, recharge: "longrest" });
    if (a.level >= 3) {
      character.resources.push({ name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest" });
    }
    if (a.level >= 14) {
      character.resources.push({ name: "Cleansing Touch", current: vue.getStatMod(5), max: vue.getStatMod(5), recharge: "longrest" });
    }
  },
  wizardResources (character, a) {
    if (Number(a.level) >= 2 && a.selsubclass.name === "Bladesinging") {
      character.resources.push({ name: "Bladesong", current: 2, max: 2, recharge: "shortrest" });
    }
    if (Number(a.level) >= 2 && a.selsubclass.name === "School of Abjuration") {
      character.resources.push({ name: "Arcane Ward", current: 1, max: 1, recharge: "longrest" });
    }
    if (Number(a.level) >= 2 && a.selsubclass.name === "School of Enchantment") {
      character.resources.push({ name: "Hypnotic Gaze", current: 1, max: 1, recharge: "longrest" });
    }
    if (Number(a.level) >= 6 && a.selsubclass.name === "School of Enchantment") {
      character.resources.push({ name: "Instinctive Charm", current: 1, max: 1, recharge: "longrest" });
    }
    if (Number(a.level) >= 10 && a.selsubclass.name === "School of Illusion") {
      character.resources.push({ name: "Illusory Self", current: 1, max: 1, recharge: "shortrest" });
    }
    if (Number(a.level) >= 10 && a.selsubclass.name === "School of Transmutation") {
      character.resources.push({ name: "Shapechanger", current: 1, max: 1, recharge: "shortrest" });
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
