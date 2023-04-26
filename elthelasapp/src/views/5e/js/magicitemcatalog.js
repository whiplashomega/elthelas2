import { useStaticsStore, useUserStore } from "@/stores/index";
import { marked } from "@/../node_modules/marked/lib/marked.esm.js";
import modal from "@/components/global/modal.vue";
import { useMeta } from "vue-meta";
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const statics = useStaticsStore();
    const userinfo = useUserStore();
    statics.getAllMagicItems();

    const {
      magicitems,
      magicscrolls,
      magicwands,
      magicweapons,
      magicarmor,
      magicother,
      magiccommons,
      magicrares,
      magicveryrares,
      magiclegendaries,
    } = storeToRefs(statics);

    useMeta({ title: "Magic Item Catalog" });
    return {
      userinfo,
      magicitems,
      magicscrolls,
      magicwands,
      magicweapons,
      magicarmor,
      magicother,
      magiccommons,
      magicrares,
      magicveryrares,
      magiclegendaries,

      marked,
    };
  },
  components: {
    modal,
  },
  computed: {
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
    },
  },
  data: function () {
    return {
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
      printMode: false,
    };
  },
  methods: {
    selectForPrint(item) {
      item.print = !item.print;
      if (item.print) {
        item._rowVariant = "success";
      } else {
        item._rowVariant = undefined;
      }
    },
    printSelected() {
      this.toPrint = this.magicitems.reduce((a, b) => {
        if (b.print) {
          a.push(b);
        }
        return a;
      }, []);
      this.printMode = true;
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
  },
};
