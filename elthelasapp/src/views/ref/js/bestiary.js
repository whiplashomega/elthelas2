import { useUserStore, useCreatureStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useMeta } from 'vue-meta';
import modal from '@/components/global/modal.vue';

export default {
  setup () {
    const creatureStore = useCreatureStore();
    const userStore = useUserStore();
    const { isAdmin: admin } = userStore;
    const { getCreature, getAllCreatures } = creatureStore;
    const { creatures } = storeToRefs(creatureStore);
    useMeta({ title: "Bestiary" });
    return {
      admin, creatures, getCreature, getAllCreatures
    };
  },
  components: { 
    modal
  },
  computed: {
    filteredcreatures () {
      return this.creatures.filter((cre) => {
        for (let key in cre) {
          if (cre[key].toString().toLowerCase().includes(this.creaturestable.filterValue.toLowerCase())) {
            return true;
          }
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
    }
  },
  data () {
    return {
      modalProps: { title: "", isActive: false },
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
        modalInfo: {
          name: "",
          tags: "",
          size: "",
          cr: "",
          type: "",
          subtype: "",
          alignment: "",
          ac: "",
          acdesc: "",
          hp: "",
          hpdesc: "",
          speed: "",
          str: "",
          dex: "",
          con: "",
          int: "",
          wis: "",
          cha: "",
          skills: "",
          saves: "",
          senses: "",
          damageimmunities: "",
          conditionimmunities: "",
          damageresistances: "",
          languages: "",
          locations: "",
          latlong: "",
          description: ""
        }
      }
    };
  },
  methods: {
    async info (item, index, button) {
      var creature = await this.getCreature(item._id);
      this.creaturestable.modalInfo = creature;
      this.modalProps = { title: creature.name, isActive: true }
    },
    resetModal () {
      this.creaturestable.modalInfo = {
        name: "",
        tags: "",
        size: "",
        cr: "",
        type: "",
        subtype: "",
        alignment: "",
        ac: "",
        acdesc: "",
        hp: "",
        hpdesc: "",
        speed: "",
        str: "",
        dex: "",
        con: "",
        int: "",
        wis: "",
        cha: "",
        skills: "",
        saves: "",
        senses: "",
        damageimmunities: "",
        conditionimmunities: "",
        damageresistances: "",
        languages: "",
        locations: "",
        latlong: "",
        description: ""
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
