import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    creatures: "allCreatures"
  }),
  data () {
    return {
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
        sortBy: null,
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
    ...mapActions({
      getCreature: 'getCreature'
    }),
    async info (item, index, button) {
      var creature = await this.getCreature(item._id);
      this.creaturestable.modalInfo = creature;
      this.$root.$emit('bv::show::modal', 'creaturemodal', button);
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
    }
  }
};
