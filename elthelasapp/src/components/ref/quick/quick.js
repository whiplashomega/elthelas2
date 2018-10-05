import { mapGetters } from 'vuex';
import marked from 'marked';

export default {
  computed: mapGetters({
    title: 'title',
    spells: 'allSpells',
    equipment: 'allEquipment',
    armor: 'allArmor',
    weapons: 'allWeapons',
    magicitems: 'allMagicItems',
    magicwands: 'allMagicWands',
    magicscrolls: 'allMagicScrolls',
    magicweapons: 'allMagicWeapons',
    magicarmor: 'allMagicArmor',
    magicother: 'allMagicOther',
    commons: 'allCommons',
    uncommons: 'allUncommons',
    rares: 'allRares',
    veryrares: 'allVeryRares',
    legendaries: 'allLegendaries'
  }),
  data: function() {
    return {
      spelltable: {
        fields: [
          { key: 'title', label: 'Title', sortable: true },
          { key: 'level', label: 'Level', sortable: true },
          { key: 'school', label: 'School', sortable: true },
          { key: 'castingTime', label: 'Casting Time', sortable: true },
          { key: 'duration', label: 'Duration', sortable: true },
          { key: 'tagsText', label: 'Tags', sortable: true }
        ],
        classes: [ "bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard" ],
        filterValue: "",
        sortBy: null,
        sortDesc: false,
        filterBy: [ "title", "level", "school", "duration", "castingTime", "description", "tagsText" ],
        modalInfo: { title: '', description: '', content: { title: '', level: '', school: '', duration: '', description: '', castingTime: '', tags: [], tagsText: '' } }
      },
      equipmenttable: {
        fields: [
          { key: "Item", label: "Item", sortable: true },
          { key: "Cost", label: "Cost (gp)", sortable: true },
          { key: "Weight", label: "Weight", sortable: true }
        ],
        filter: null,
        sortBy: null,
        sortDesc: false
      },
      armortable: {
        fields: [
          { key: "Armor", label: "Armor", sortable: true },
          { key: "Type", label: "Type", sortable: true },
          { key: "Material", label: "Material", sortable: true },
          { key: "AC", label: "AC", sortable: true },
          { key: "Strength", label: "Strength", sortable: true },
          { key: "Stealth", label: "Stealth", sortable: true },
          { key: "Weight", label: "Weight", sortable: true },
          { key: "Resistance", label: "Resistance", sortable: true },
          { key: "Price", label: "Price (gp)", sortable: true },
          { key: "Time to Craft", label: "Time to Craft", sortable: true }
        ],
        filter: null,
        sortBy: null,
        sortDesc: false
      },
      weapontable: {
        fields: [
          { key: "Name", label: "Weapon", sortable: true },
          { key: "Type", label: "Type", sortable: true },
          { key: "Properties", label: "Properties", sortable: true },
          { key: "Damage", label: "Damage", sortable: true },
          { key: "Cost", label: "Cost (gp)", sortable: true },
          { key: "Weight", label: "Weight", sortable: true }
        ],
        filter: null,
        sortBy: null,
        sortDesc: false
      },
      magicitemtables: {
        fields: [
          { key: "Item", label: "Item", sortable: true },
          { key: "Attunement", label: "Attunement", sortable: true },
          { key: "Rarity", label: "Rarity", sortable: true },
          { key: "Cost (gp)", label: "Cost (gp)", sortable: true },
          { key: "instock", label: "In Stock", sortable: true }
        ],
        filter: "",
        filterBy: [ "Item", "Type", "Attunement", "Rarity", "Cost (gp)", "Effect" ],
        filterRarity: [ "Common", "Uncommon", "Rare", "Very Rare", "Legendary" ],
        filterCost: "",
        sortBy: null,
        sortDesc: false
      },
      magicItemModal: { Item: '', Rarity: '', instock: '', Effect: '', 'Cost (gp)': '', Attunement: '' },
      instockonly: true
    };
  },
  methods: {
    info (item, index, button) {
      this.spelltable.modalInfo.title = item.title;
      this.spelltable.modalInfo.content = item;
      this.spelltable.modalInfo.description = marked(this.spelltable.modalInfo.content.description);
      this.$root.$emit('bv::show::modal', 'spellmodal', button);
    },
    magicItemInfo (item, index, button) {
      this.magicItemModal = item;
      this.magicItemModal.description = marked(this.magicItemModal.Effect);
      this.$root.$emit('bv::show::modal', 'magicitemmodal', button);
    },
    resetSpellModal () {
      this.spelltable.modalInfo.title = "";
      this.spelltable.modalInfo.content = {title: '', level: '', school: '', duration: '', description: '', castingTime: '', tags: [], tagsText: ''};
    },
    resetMagicItemModal () {
      this.magicItemModal = { Item: '', Rarity: '', instock: '', Effect: '', 'Cost (gp)': '', Attunement: '' };
    },
    instockfilter(a) {
      if (this.instockonly && a.instock !== "In Stock") {
        return false;
      }
      return true;
    },
    magicitemfilter(a) {
      var filter = this.magicitemtables.filterBy;
      var value = this.magicitemtables.filter;
      if (this.instockfilter(a)) {
        var inelement = filter.some((el) => {
          for (var y in a) {
            if (el === y && a[y].toString().toLowerCase().includes(value.toLowerCase())) {
              if ((!this.magicitemtables.filterCost || Number(this.magicitemtables.filterCost) >= a["Cost (gp)"]) && this.magicitemtables.filterRarity.includes(a.Rarity)) {
                return true;
              }
            }
          }
        });
        if ((
          !value &&
          (!this.magicitemtables.filterCost || Number(this.magicitemtables.filterCost)) >= a["Cost (gp)"] &&
          this.magicitemtables.filterRarity.includes(a.Rarity)) ||
          inelement) {
          return true;
        }
        return false;
      }
      return false;
    },
    spellfilter (a) {
      var spelltable = this.spelltable;
      var filter = spelltable.filterBy;
      var value = spelltable.filterValue;
      var inclass = a.tags.some(function(el) {
        return spelltable.classes.includes(el);
      });
      var inelement = filter.some(function(el) {
        for (var y in a) {
          if (el === y && a[y].toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        }
      });
      if (inclass && (!value || inelement)) {
        return true;
      }
      return false;
    }
  },
  created () {
    console.log(this.magicscrolls);
  }
};
