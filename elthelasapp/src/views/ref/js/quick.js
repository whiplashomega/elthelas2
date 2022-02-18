import { mapGetters } from 'vuex';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  computed: {
    ...mapGetters({
      title: 'title',
      spells: 'allSpells',
      equipment: 'allEquipment',
      armor: 'allArmor',
      weapons: 'allWeapons',
      userinfo: "getUserInfo"
    }),
    filteredSpells () {
      var textfilters = this.spelltable.filterValue.split(' ');
      let spells = this.spells.filter((a) => {
        let passes = true;
        textfilters.forEach((item) => {
          if (!(a.description.toLowerCase().includes(item.toLowerCase()) ||
                a.title.toLowerCase().includes(item.toLowerCase()) ||
                a.level.toLowerCase().includes(item.toLowerCase()) ||
                a.school.toLowerCase().includes(item.toLowerCase()) ||
                a.castingTime.toLowerCase().includes(item.toLowerCase()) ||
                a.tagsText.toLowerCase().includes(item.toLowerCase()) ||
                a.components.toLowerCase().includes(item.toLowerCase()))) {
            passes = false;
          }
        });
        return passes;
      });
      spells = spells.filter((a) => {
        return a.title.toLowerCase().includes(this.spelltable.titleFilter.toLowerCase()) || this.spelltable.titleFilter === "";
      });
      spells = spells.filter((a) => {
        return a.tags.indexOf(this.spelltable.classFilter) !== -1 || this.spelltable.classFilter === "all";
      });
      spells = spells.filter((a) => {
        return a.level === this.spelltable.levelFilter || this.spelltable.levelFilter === "all";
      });
      spells = spells.filter((a) => {
        return a.school.toLowerCase() === this.spelltable.schoolFilter || this.spelltable.schoolFilter === "all";
      });
      spells = spells.filter((a) => {
        return a.castingTime.toLowerCase().includes(this.spelltable.timeFilter) || this.spelltable.timeFilter === "all";
      });
      spells = spells.filter((a) => {
        let lengthtest = a.duration.toLowerCase().includes(this.spelltable.durationFilter) || this.spelltable.durationFilter === "all";
        let conctest = !a.duration.toLowerCase().includes("concentration") || !this.spelltable.concFilter;
        return lengthtest && conctest;
      });
      spells = spells.filter((a) => {
        let tags = this.spelltable.tagsFilter.split(" ");
        let passes = true;
        tags.forEach((b) => {
          if (!a.tagsText.includes(b)) {
            passes = false;
          }
        });
        return passes;
      });
      return spells;
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
        classFilter: "all",
        levelFilter: "all",
        titleFilter: "",
        schoolFilter: "all",
        timeFilter: "all",
        durationFilter: "all",
        concFilter: false,
        tagsFilter: "",
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
        sortDesc: false,
        printMode: false
      },
      gearModal: { Item: '', Cost: '', Weight: '', Description: '' }
    };
  },
  methods: {
    info (item, index, button) {
      this.spelltable.modalInfo.title = item.title;
      this.spelltable.modalInfo.content = item;
      this.spelltable.modalInfo.description = marked.parse(this.spelltable.modalInfo.content.description);
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
