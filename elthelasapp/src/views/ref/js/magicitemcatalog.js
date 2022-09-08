import { useStaticsStore, useUserStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import modal from '@/components/global/modal.vue';

export default {
  setup() {
    const statics = useStaticsStore();
    const userinfo = useUserStore();
    
    const { magicitems, magicscrolls, magicwands, magicweapons, magicarmor, magicother, magiccommons, magicrares, magicveryrares, magiclegendaries } = statics;
    
    return {
      userinfo,
      
      magicitems, magicscrolls, magicwands, magicweapons, magicarmor, magicother, magiccommons, magicrares, magicveryrares, magiclegendaries,
      
      marked
    };
  },
  components: {
    modal
  },
  computed: {
    filteredWands () {
      return this.magicwands.filter(this.magicitemfilter);
    },
    filteredScrolls () {
      return this.magicscrolls.filter(this.magicitemfilter);
    },
    filteredWeapons () {
      return this.magicweapons.filter(this.magicitemfilter);
    },
    filteredArmor () {
      return this.magicarmor.filter(this.magicitemfilter);
    },
    filteredOther () {
      return this.magicother.filter(this.magicitemfilter);
    }
  },
  data: function() {
    return {
      magicitemtables: {
        fields: [
          { key: "print", label: "Print", sortable: false },
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
      modalProps: { isActive: false, title: "" },
      magicItemModal: { Item: '', Rarity: '', instock: '', Effect: '', 'Cost (gp)': '', Attunement: '' },
      instockonly: true,
      toPrint: [],
      printMode: false
    };
  },
  methods: {
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
        if (b.print) {
          a.push(b);
        }
        return a;
      }, []);
      this.printMode = true;
    },
    magicItemInfo (item, index, button) {
      this.magicItemModal = item;
      this.modalProps.isActive = true;
      this.modalProps.title = item.Item;
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
    }
  }
};
