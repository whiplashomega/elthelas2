import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter"
    })
  },
  methods: {
    addResource() {
      this.character.resources.push({ name: "", current: 0, max: 0, recharge: "never" });
    },
    removeResource(i) {
      this.character.resources.splice(i, 1);
    },
    populateResources() {
      this.character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Barbarian" && Number(a.level) < 20) {
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
          this.character.resources.push(rage);
        }
        if (a.thisclass.name === "Barbarian" && a.selsubclass.name === "Path of the Ancestral Guardian" && Number(a.level) >= 10) {
          this.character.resources.push({ name: "Consult the Spirits", current: 1, max: 1, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Barbarian" && a.selsubclass.name === "Path of the Zealot") {
          if (a.level >= 6) {
            this.character.resources.push({ name: "Fanatical Focus", current: 1, max: 1, recharge: "never" });
          }
          if (a.level >= 10) {
            this.character.resources.push({ name: "Zealous Presence", current: 1, max: 1, recharge: "longrest" });
          }
        }
        if (a.thisclass.name === "Bard") {
          var inspiration = { name: "Bardic Inspiration", current: this.getStatMod(5), max: this.getStatMod(5), recharge: "longrest" };
          if (Number(a.level) >= 5) {
            inspiration.recharge = "shortrest";
          }
          this.character.resources.push(inspiration);
          if (a.selsubclass.name === "College of Glamour") {
            if (Number(a.level) >= 3) {
              this.character.resources.push({ name: "Enthralling Performance", current: 1, max: 1, recharge: "shortrest" });
            }
            if (Number(a.level) >= 6) {
              this.character.resources.push({ name: "Mantle of Majesty", current: 1, max: 1, recharge: "longrest" });
            }
            if (Number(a.level) >= 14) {
              this.character.resources.push({ name: "Unbreakable Majesty", current: 1, max: 1, recharge: "shortrest" });
            }
          }
          if (a.selsubclass.name === "College of Whispers") {
            if (Number(a.level) >= 6) {
              this.character.resources.push({ name: "Mantle of Whispers", current: 1, max: 1, recharge: "shortrest" });
            }
            if (Number(a.level) >= 14) {
              this.character.resources.push({ name: "Shadow Lore", current: 1, max: 1, recharge: "longrest" });
            }
          }
        }
        if (a.thisclass.name === "Cleric") {
          var channel = { name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest" };
          if (Number(a.level) >= 6) {
            channel.current++;
            channel.max++;
          }
          if (Number(a.level) >= 18) {
            channel.current++;
            channel.max++;
          }
          this.character.resources.push(channel);
        }
        if (a.thisclass.name === "Druid" && Number(a.level) < 20) {
          this.character.resources.push({ name: "Wildshape", current: 2, max: 2, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Factotum") {
          let num = this.getStatMod(3) + Number(a.level) / 2;
          this.character.resources.push({ name: "Epiphany Points", current: num, max: num, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Fighter") {
          this.character.resources.push({ name: "Second Wind", current: 1, max: 1, recharge: "shortrest" });
          if (Number(a.level) >= 2) {
            let surge = { name: "Action Surge", current: 1, max: 1, recharge: "shortrest" };
            if (Number(a.level) >= 17) {
              surge.current++;
              surge.max++;
            }
            this.character.resources.push(surge);
          }
          if (a.level >= 9) {
            let num = Math.floor((Number(a.level) - 5) / 4);
            this.character.resources.push({ name: "Indomitable", current: num, max: num, recharge: "shortrest" });
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
          }
        }
        if (a.thisclass.name === "Monk" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Ki", current: Number(a.level), max: Number(a.level), recharge: "shortrest" });
        }
        if (a.thisclass.name === "Paladin") {
          this.character.resources.push({ name: "Lay on Hands", current: Number(a.level) * 5, max: Number(a.level) * 5, recharge: "longrest" });
          this.character.resources.push({ name: "Divine Sense", current: this.getStatMod(5) + 1, max: this.getStatMod(5) + 1, recharge: "longrest" });
          if (a.level >= 3) {
            this.character.resources.push({ name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest" });
          }
          if (a.level >= 14) {
            this.character.resources.push({ name: "Cleansing Touch", current: this.getStatMod(5), max: this.getStatMod(5), recharge: "longrest" });
          }
        }
        if (a.thisclass.name === "Sorcerer" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Sorcery Points", current: Number(a.level), max: Number(a.level), recharge: "longrest" });
        }
        if (a.thisclass.name === "Warlock") {
          if (Number(a.level) >= 1 && a.selsubclass.name === "The Hexblade") {
            this.character.resources.push({ name: "Hexblade's Curse", current: 1, max: 1, recharge: "shortrest" });
          }
        }
        if (a.thisclass.name === "Wizard") {
          if (Number(a.level) >= 2 && a.selsubclass.name === "Bladesinging") {
            this.character.resources.push({ name: "Bladesong", current: 2, max: 2, recharge: "shortrest" });
          }
          if (Number(a.level) >= 2 && a.selsubclass.name === "School of Abjuration") {
            this.character.resources.push({ name: "Arcane Ward", current: 1, max: 1, recharge: "longrest" });
          }
          if (Number(a.level) >= 2 && a.selsubclass.name === "School of Enchantment") {
            this.character.resources.push({ name: "Hypnotic Gaze", current: 1, max: 1, recharge: "longrest" });
          }
          if (Number(a.level) >= 6 && a.selsubclass.name === "School of Enchantment") {
            this.character.resources.push({ name: "Instinctive Charm", current: 1, max: 1, recharge: "longrest" });
          }
          if (Number(a.level) >= 10 && a.selsubclass.name === "School of Illusion") {
            this.character.resources.push({ name: "Illusory Self", current: 1, max: 1, recharge: "shortrest" });
          }
          if (Number(a.level) >= 10 && a.selsubclass.name === "School of Transmutation") {
            this.character.resources.push({ name: "Shapechanger", current: 1, max: 1, recharge: "shortrest" });
          }
        }
      });
    }
  }
};
