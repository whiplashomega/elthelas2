import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useStaticsStore, useUserStore } from '@/stores/index';
import modal from '@/components/global/modal.vue';
import { useMeta } from 'vue-meta';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const statics = useStaticsStore();
    const userinfo = useUserStore();
    statics.getAll();
    const { spells, equipment, armor, weapons } = storeToRefs(statics);
    useMeta({ title: "Quick Reference Manual" });
    return {
      userinfo, spells, equipment, armor, weapons, marked
    };
  },
  components: {
    modal
  },
  computed: {
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
      }).sort((a, b) => {
        let sortBy = this.spelltable.sortBy;
        if ((a[sortBy] > b[sortBy] & !this.spelltable.sortDesc) || (a[sortBy] < b[sortBy] & this.spelltable.sortDesc)) {
          return 1;
        } else {
          return -1;
        }
      });
      return spells;
    },
    fhweapons () {
      return this.homebrewweapons.filter((a) => {
        for (var key in a) {
          if (a[key].toString().toLowerCase().includes(this.homebrewweaponstable.filter.toLowerCase())) {
            return true;
          } else if(this.homebrewweaponstable.filter == "") {
            return  true;
          }
          return false;
        }
      }).sort((a, b) => {
        if (this.homebrewweaponstable.sortBy == "Damage") {
          const convertTable = {
            "0": 0,
            "1d4": 2.5,
            "1d6": 3.5,
            "1d8": 4.5,
            "2d4": 5,
            "1d10": 5.5,
            "1d12": 6.5,
            "2d6": 7,
            "3d4": 7.5,
            "2d8": 9
          }
          if (convertTable[a["Damage"]] > convertTable[b["Damage"]]) {
            return this.homebrewweaponstable.sortDesc ? -1 : 1;
          } else {
            return this.homebrewweaponstable.sortDesc ? 1 : -1;
          }
        } else {
          if (a[this.homebrewweaponstable.sortBy] > b[this.homebrewweaponstable.sortBy]) {
            return this.homebrewweaponstable.sortDesc ? -1 : 1;
          } else {
            return this.homebrewweaponstable.sortDesc ? 1 : -1;
          }
        }
      });
    },
    filterequipment () {
      return this.equipment.filter((a) => {
        for (let key in a) {
          if (a[key].toString().toLowerCase().includes(this.equipmenttable.filter.toLowerCase())) {
            return true;
          }
          if (this.equipmenttable.filter === "") {
            return true;
          }
        }
      }).sort((a, b) => {
        let sortBy = this.equipmenttable.sortBy;
        let sortDesc = this.equipmenttable.sortDesc;
        if ((a[sortBy] > b[sortBy] && !sortDesc) || (a[sortBy] < b[sortBy] && sortDesc)) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    filterarmor () {
      return this.armor.filter((a) => {
        for (let key in a) {
          if (a[key].toString().toLowerCase().includes(this.armortable.filter.toLowerCase())) {
            return true;
          }
          if (this.armortable.filter === "") {
            return true;
          }
        }
      }).sort((a, b) => {
        let sortBy = this.armortable.sortBy;
        let sortDesc = this.armortable.sortDesc;
        if ((a[sortBy] > b[sortBy] && !sortDesc) || (a[sortBy] < b[sortBy] && sortDesc)) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    filterweapons () {
      return this.weapons.filter((a) => {
        for (let key in a) {
          if (a[key].toString().toLowerCase().includes(this.weapontable.filter.toLowerCase())) {
            return true;
          }
          if (this.weapontable.filter === "") {
            return true;
          }
        }
      }).sort((a, b) => {
        let sortBy = this.weapontable.sortBy;
        let sortDesc = this.weapontable.sortDesc;
        if ((a[sortBy] > b[sortBy] && !sortDesc) || (a[sortBy] < b[sortBy] && sortDesc)) {
          return 1;
        } else {
          return -1;
        }
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
        classFilter: "all",
        levelFilter: "all",
        titleFilter: "",
        schoolFilter: "all",
        timeFilter: "all",
        durationFilter: "all",
        concFilter: false,
        tagsFilter: "",
        filterValue: "",
        sortBy: "title",
        sortDesc: false,
        modalInfo: { title: '', description: '', content: { title: '', level: '', school: '', duration: '', description: '', castingTime: '', tags: [], tagsText: '' } }
      },
      gearModalProps: { isActive: false, title: "" },
      spellModalProps: { isActive: false, title: "" },
      equipmenttable: {
        fields: [
          { key: "Item", label: "Item", sortable: true },
          { key: "Cost", label: "Cost (gp)", sortable: true },
          { key: "Weight", label: "Weight", sortable: true }
        ],
        filter: "",
        sortBy: "Item",
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
        filter: "",
        sortBy: "Armor",
        sortDesc: false
      },
      homebrewweaponstable: {
        fields: [
          { key: "Weapon", label: "Weapon", sortable: true },
          { key: "Type", label: "Type", sortable: true },
          { key: "Damage", label: "Damage", sortable: true },
          { key: "Dtype", label: "Damage Type", sortable: true },
          { key: "Properties", label: "Properties", sortable: true },
          { key: "Cost", label: "Cost (gp)", sortable: true },
          { key: "Weight", label: "Weight (lbs)", sortable: true },
          { key: "Reach", label: "Reach (ft)", sortable: true },
          { key: "Range", label: "Range (ft)", sortable: true }
        ],
        filter: "",
        sortBy: "Weapon",
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
        filter: "",
        sortBy: "Name",
        sortDesc: false
      },
      gearModal: { Item: '', Cost: '', Weight: '', Description: '' }
    };
  },
  methods: {
    changehwSort (field) {
      if (this.homebrewweaponstable.sortBy == field) {
        this.homebrewweaponstable.sortDesc = !this.homebrewweaponstable.sortDesc;
      }
      this.homebrewweaponstable.sortBy = field;
    },
    info (item, index, button) {
      this.spelltable.modalInfo.title = item.title;
      this.spelltable.modalInfo.content = item;
      this.spelltable.modalInfo.description = marked.parse(this.spelltable.modalInfo.content.description);
      this.spellModalProps.isActive = true;
      this.spellModalProps.title = item.title;
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
      this.gearModalProps.isActive = true;
      this.gearModalProps.title = item.Item;
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
