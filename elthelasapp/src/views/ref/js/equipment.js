import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useStaticsStorev2, useUserStore } from '@/stores/index';
import modal from '@/components/global/modal.vue';
import { useMeta } from 'vue-meta';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const statics = useStaticsStorev2();
    statics.getAllNew();
    const userinfo = useUserStore();
    const { equipment, armorv2: armor, weaponsv2: weapons,
      magicitemsv2: magicitems,
      magicscrollsv2: magicscrolls,
      magicwandsv2: magicwands,
      magicweaponsv2: magicweapons,
      magicarmorv2: magicarmor,
      magicotherv2: magicother,
      magiccommonsv2: magiccommons,
      magicraresv2: magicrares,
      magicveryraresv2: magicveryrares,
      magiclegendariesv2: magiclegendaries
    } = storeToRefs(statics);
    useMeta({ title: "Equipment" });
    return {
      userinfo, equipment, armor, weapons, marked, magicitems,
      magicscrolls,
      magicwands,
      magicweapons,
      magicarmor,
      magicother,
      magiccommons,
      magicrares,
      magicveryrares,
      magiclegendaries
    };
  },
  components: {
    modal
  },
  computed: {
    fhweapons () {
      return this.weapons.filter((a) => {
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
          if (a.Rarity === "Rare" && !this.showRare) {
            return false;
          }
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
        if (a[sortBy] === b[sortBy]) {
          if (a.Type === "Light" && b.Type === "Light") {
            return a.Weight > b.Weight ? 1 : -1;
          } else if (a.Type === "Light") {
            return -1;
          } else if (b.Type === "Light") {
            return 1;
          } else if (a.Type === "Medium" && b.Type === "Medium") {
            return a.Weight > b.Weight ? 1 : -1;
          } else if (a.Type === "Medium") {
            return -1;
          } else if (b.Type === "Medium") {
            return 1;
          } else if (a.Type === "Heavy" && b.Type === "Heavy") {
            return a.Weight > b.Weight ? 1 : -1;
          }else if (a.Type === "Heavy") {
            return -1;
          } else if (b.Type === "Heavy") {
            return 1;
          } else {
            return 1;
          }
        }
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
    },
    filteredWands() {
      return this.magicwands.filter(this.magicitemfilter).sort(this.sorter);
    },
    filteredScrolls() {
      return this.magicscrolls.filter(this.magicitemfilter).sort(this.sorter);
    },
    filteredWeapons() {
      return this.magicweapons.filter(this.magicitemfilter).sort(this.sorter);
    },
    filteredArmor() {
      return this.magicarmor.filter(this.magicitemfilter).sort(this.sorter);
    },
    filteredOther() {
      return this.magicother.filter(this.magicitemfilter).sort(this.sorter);
    }
  },
  data: function() {
    return {
      gearModalProps: { isActive: false, title: "" },
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
      showRare: true,
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
        sortBy: "Rarity",
        sortDesc: false
      },
      homebrewweaponstable: {
        fields: [
          { key: "Weapon", label: "Weapon", sortable: true },
          { key: "Type", label: "Type", sortable: true },
          { key: "Damage", label: "Damage", sortable: true },
          { key: "Dtype", label: "Damage Type", sortable: true },
          { key: "Properties", label: "Properties", sortable: true },
          { key: "Mastery", label: "Mastery", sortable: true },
          { key: "Cost", label: "Cost (gp)", sortable: true },
          { key: "Weight", label: "Weight (lbs)", sortable: true },
          { key: "Reach", label: "Reach (ft)", sortable: true },
          { key: "Range", label: "Range (ft)", sortable: true }
        ],
        filter: "",
        sortBy: "Weapon",
        sortDesc: false
      },
      gearModal: { Item: '', Cost: '', Weight: '', Description: '' },
      magicitemtables: {
        fields: [
          { key: "Item", label: "Item", sortable: true },
          { key: "Attunement", label: "Attunement", sortable: true },
          { key: "Rarity", label: "Rarity", sortable: true },
          { key: "Cost (gp)", label: "Cost (gp)", sortable: true },
          { key: "instock", label: "In Stock", sortable: true },
        ],
        filter: "",
        filterBy: {
          Item: true,
          Type: true,
          Attunement: true,
          Rarity: true,
          "Cost (gp)": true,
          Effect: true,
        },
        filterRarity: {
          Common: true,
          Uncommon: true,
          Rare: true,
          "Very Rare": true,
          Legendary: true,
        },
        filterCost: "",
        sortBy: "Item",
        sortDesc: false,
      },
      modalProps: { isActive: false, title: "" },
      magicItemModal: {
        Item: "",
        Rarity: "",
        instock: "",
        Effect: "",
        "Cost (gp)": "",
        Attunement: "",
      },
      instockonly: true,
      toPrint: [],
      printMode: false
    }
  },
  methods: {
    changehwSort (field) {
      if (this.homebrewweaponstable.sortBy == field) {
        this.homebrewweaponstable.sortDesc = !this.homebrewweaponstable.sortDesc;
      }
      this.homebrewweaponstable.sortBy = field;
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
    adventuringGearInfo (item) {
      this.gearModal = item;
      this.gearModalProps.isActive = true;
      this.gearModalProps.title = item.Item;
    },
    resetGearModal () {
      this.gearModal = { Item: '', Cost: '', Weight: '', Description: '' };
    },
    magicItemInfo(item) {
      this.magicItemModal = item;
      this.modalProps.isActive = true;
      this.modalProps.title = item.Item;
    },
    resetMagicItemModal() {
      this.magicItemModal = {
        Item: "",
        Rarity: "",
        instock: "",
        Effect: "",
        "Cost (gp)": "",
        Attunement: "",
      };
    },
    instockfilter(a) {
      if (this.instockonly && a.instock !== "In Stock") {
        return false;
      }
      return true;
    },
    magicitemfilter(a) {
      var filter = [];
      for (let key in this.magicitemtables.filterBy) {
        if (this.magicitemtables.filterBy[key]) {
          filter.push(key);
        }
      }
      var rarefilter = [];
      for (let key in this.magicitemtables.filterRarity) {
        if (this.magicitemtables.filterRarity[key]) {
          rarefilter.push(key);
        }
      }
      var value = this.magicitemtables.filter;
      if (this.instockfilter(a)) {
        var inelement = filter.some((el) => {
          for (var y in a) {
            if (
              el === y &&
              a[y].toString().toLowerCase().includes(value.toLowerCase())
            ) {
              if (
                (!this.magicitemtables.filterCost ||
                  Number(this.magicitemtables.filterCost) >= a["Cost (gp)"]) &&
                rarefilter.includes(a.Rarity)
              ) {
                return true;
              }
            }
          }
        });
        if (
          (!value &&
            (!this.magicitemtables.filterCost ||
              Number(this.magicitemtables.filterCost)) >= a["Cost (gp)"] &&
            rarefilter.includes(a.Rarity)) ||
          inelement
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
    sorter (a, b) {
      let sortBy = this.magicitemtables.sortBy;
      let sortDesc = this.magicitemtables.sortDesc;

      if ((a[sortBy] > b[sortBy] & !sortDesc) || (a[sortBy] < b[sortBy] & sortDesc)) {
        return 1;
      } else {
        return -1;
      }
    }
  }
};
