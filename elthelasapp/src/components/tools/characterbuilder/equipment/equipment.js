import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      equipment: 'allEquipment',
      carryWeight: "carryWeight",
      carryMax: "carryMax",
      totalGold: "totalGold",
      equipmentContainers: "equipmentContainers"
    })
  },
  data () {
    return {
      ctypes: [
        { name: "", capacity: 0, weightCounts: true, weight: 0 },
        { name: "Carried/Worn", capacity: 9999, weightCounts: true, weight: 0 },
        { name: "Backpack", capacity: 30, weightCounts: true, weight: 5 },
        { name: "Pouch", capacity: 6, weightCounts: true, weight: 1 },
        { name: "Sack", capacity: 30, weightCounts: true, weight: 0.5 },
        { name: "Chest", capacity: 300, weightCounts: true, weight: 25 },
        { name: "Bag of Holding", capacity: 500, weightCounts: false, weight: 15 },
        { name: "Heward's Handy Haversack", capacity: 120, weightCounts: false, weight: 5 }
      ],
      containModal: false,
      newcontain: { name: "Backpack", capacity: 0, weightCounts: true, weight: 0 },
      equipModal: false,
      newequip: { name: "", weight: 0, quantity: 1, attunement: false, edit: false, container: 0 },
      ctypeselected: {}
    };
  },
  methods: {
    ...mapActions({
      removeEquipment: "removeEquipment",
      removeContainer: "removeContainer"
    }),
    newContainerType (ctype) {
      this.newcontain = { ...ctype };
    },
    addEquipment() {
      var id = Date.now();
      this.character.equipment.push({ ...this.newequip, id: id });
      this.newequip = { name: "", weight: 0, quantity: 1, attunement: false, edit: false, container: this.character.containers[0].id };
      this.equipModal = false;
    },
    addContainer() {
      var id = Date.now();
      this.character.containers.push({ ...this.newcontain, id: id });
      this.newcontain = { name: "", capacity: 0, weightCounts: true, weight: 0 };
      this.containModal = false;
      this.ctypeselected = this.ctypes[0];
    }
  },
  mounted () {
    this.newequip.container = this.character.containers[0];
  }
};
