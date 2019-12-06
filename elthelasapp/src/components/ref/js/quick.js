import { mapGetters } from 'vuex';
import marked from 'marked';

export default {
  computed: {
    ...mapGetters({
      title: 'title',
      spells: 'allSpells',
      equipment: 'allEquipment',
      armor: 'allArmor',
      weapons: 'allWeapons'
    }),
    filteredSpells () {
      var filters = this.spelltable.filterValue.split(' ');
      if (this.spelltable.filterValue === "") {
        return this.spells.filter((a) => {
          var inclass = a.tags.some((el) => {
            if (this.spelltable.classfilter === "all") {
              return true;
            }
            return this.spelltable.classfilter === el;
          });
          if ((inclass && this.spelltable.levelfilter === "all") || (inclass && a.level === this.spelltable.levelfilter)) {
            return true;
          }
          return false;
        });
      }
      if (this.spelltable.levelfilter === "nonsense") {
        return this.spelltable.levelfilter;
      }
      return this.spells.filter((a) => {
        var success = false;
        var successarray = [];
        filters.forEach((b) => {
          for (var prop in a) {
            if (typeof a[prop] === 'string') {
              if (a[prop].toLowerCase().includes(b)) {
                successarray.push(true);
                break;
              }
            }
          }
          if (successarray.length >= filters.length) {
            var inclass = a.tags.some((el) => {
              if (this.spelltable.classfilter === "all") {
                return true;
              }
              return this.spelltable.classfilter === el;
            });
            if ((inclass && this.spelltable.levelfilter === "all") || (inclass && a.level === this.spelltable.levelfilter)) {
              success = true;
            }
          }
        });
        return success;
      });
    }
  },
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
        classfilter: "all",
        levelfilter: "all",
        filterValue: "",
        sortBy: null,
        sortDesc: false,
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
      gearModal: { Item: '', Cost: '', Weight: '', Description: '' }
    };
  },
  methods: {
    info (item, index, button) {
      this.spelltable.modalInfo.title = item.title;
      this.spelltable.modalInfo.content = item;
      this.spelltable.modalInfo.description = marked(this.spelltable.modalInfo.content.description);
      this.$root.$emit('bv::show::modal', 'spellmodal', button);
    },
    selectForPrint (item) {
      item.print = !item.print;
      if (item.print) {
        item._rowVariant = 'success';
      } else {
        item._rowVariant = undefined;
      }
    },
    printSelected () {
      this.toPrint = this.magicitems.reduce((a, b) => {
        console.log(b.print);
        if (b.print) {
          console.log(b);
          a.push(b);
        }
        return a;
      }, []);
      this.printMode = true;
    },
    adventuringGearInfo (item, index, button) {
      this.gearModal = item;
      this.$root.$emit('bv::show::modal', 'gearmodal', button);
    },
    resetSpellModal () {
      this.spelltable.modalInfo.title = "";
      this.spelltable.modalInfo.content = { title: '', level: '', school: '', duration: '', description: '', castingTime: '', tags: [], tagsText: '' };
    },
    resetGearModal () {
      this.gearModal = { Item: '', Cost: '', Weight: '', Description: '' };
    }
  }
};
