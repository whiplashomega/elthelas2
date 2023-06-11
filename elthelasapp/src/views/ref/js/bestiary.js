import { useUserStore, useCreatureStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useMeta } from 'vue-meta';
import modal from '@/components/global/modal.vue';
import creaturecalc from '@/helpers/creaturecalc';

export default {
  setup () {
    const creatureStore = useCreatureStore();
    const userStore = useUserStore();
    const { isAdmin: admin } = userStore;
    const { getCreature, getAllCreatures } = creatureStore;
    const { creatures } = storeToRefs(creatureStore);
    useMeta({ title: "Bestiary" });
    return {
      admin, creatures, getCreature, getAllCreatures, creaturecalc
    };
  },
  components: {
    modal
  },
  computed: {
    filteredcreatures () {
      return this.creatures.filter((a) => {
        var values = this.creaturestable.filterValue.split(" ");
        let inelement = true;
        if (this.typeFilter !== "" && a.type !== this.typeFilter) {
          return false;
        }
        if (this.sizeFilter !== "" && a.size !== this.sizeFilter) {
          return false;
        }
        if (this.crFilterMin > a.cr) {
          return false;
        }
        if (this.crFilterMax < a.cr) {
          return false;
        }
        values.forEach((value) => {
          let exists = this.creaturestable.filterBy.some(function(el) {
            for (var y in a) {
              if (el === y && a[y].toString().toLowerCase().includes(value.toLowerCase())) {
                return true;
              }
            }
          });
          if (this.creaturestable.filterValue && !exists) {
            inelement = false;
          }
        });
        if (inelement) {
          return true;
        }
        return false;
      }).sort((a, b) => {
        if (a[this.creaturestable.sortBy] > b[this.creaturestable.sortBy] && this.creaturestable.sortDesc === false) {
          return 1;
        } else if (a[this.creaturestable.sortBy] < b[this.creaturestable.sortBy] && this.creaturestable.sortDesc === true) {
          return 1;
        } else {
          return -1;
        }
      });
    },
  },
  data () {
    return {
      modalProps: { title: "", isActive: false },
      typeFilter: "",
      sizeFilter: "",
      crFilterMin: 0,
      crFilterMax: 40,
      creaturestable: {
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'size', label: 'Size', sortable: true },
          { key: 'cr', label: 'CR', sortable: true },
          { key: 'type', label: 'Type', sortable: true },
          { key: 'subtype', label: 'Subtype', sortable: true },
          { key: 'alignment', label: 'Alignment', sortable: true }
        ],
        filterValue: "",
        sortBy: "name",
        sortDesc: false,
        filterBy: [ "name", "size", "cr", "type", "subtype", "alignment", "description" ],
      },
      creature: {
        stats: [8, 8, 8, 8, 8, 8],
        skills: []
      }
    };
  },
  methods: {
    async info (item) {
      this.creature = await this.getCreature(item._id);
      this.modalProps = { title: this.creature.name, isActive: true }
    },
    resetModal () {
      this.creature = {
        stats: [0, 0, 0, 0, 0, 0],
        skills: []
      };
    },
    filter (a) {
      var filter = this.creaturestable.filterBy;
      var value = this.creaturestable.filterValue;
      var inelement = filter.some(function(el) {
        for (var y in a) {
          if (el === y && a[y].toString().toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        }
      });
      if (!value || inelement) {
        return true;
      }
      return false;
    },
    edit (item) {
      let conf = confirm("are you sure you want to edit " + item.name + "?");
      if (conf + this.admin) {
        this.$router.push("/tools/creaturebuilder/" + item._id);
      }
    }
  },
  mounted () {
    this.getAllCreatures();
  }
};
