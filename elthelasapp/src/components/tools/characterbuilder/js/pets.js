import { mapGetters, mapActions } from 'vuex';
import Pet from "@/model/classes/pet";

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      userinfo: "getUserInfo",
      creatures: "allCreatures"
    }),
    filteredcreatures () {
      let comp = this;
      return this.creatures.filter((a) => {
        var values = comp.creaturefilter.split(" ");
        let inelement = true;
        values.forEach((value) => {
          let exists = comp.creaturestable.filterBy.some(function(el) {
            for (var y in a) {
              if (el === y && a[y].toString().toLowerCase().includes(value.toLowerCase())) {
                return true;
              }
            }
          });
          if (comp.creaturefilter && !exists) {
            inelement = false;
          }
        });
        if (inelement) {
          return true;
        }
        return false;
      });
    }
  },
  data () {
    return {
      importPetModal: false,
      creaturestable: {
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'size', label: 'Size', sortable: true },
          { key: 'cr', label: 'CR', sortable: true },
          { key: 'type', label: 'Type', sortable: true },
          { key: 'subtype', label: 'Subtype', sortable: true }
        ],
        filterValue: "",
        sortBy: null,
        sortDesc: false,
        filterBy: [ "name", "size", "cr", "subtype" ]
      },
      creaturefilter: ""
    };
  },
  methods: {
    ...mapActions({
      getCreature: 'getCreature'
    }),
    addPet () {
      this.character.pets.push(Pet());
    },
    deletePet (pet) {
      if (confirm("Are you sure you want to delete " + pet.name + "? They are openly weeping at your cowardly betrayal.")) {
        this.character.pets.splice(this.character.pets.findIndex((a) => {
          return a.id === pet.id;
        }), 1);
      }
    },
    async importPet (item) {
      let pet = Pet();
      var cre = await this.getCreature(item._id);
      pet.name = cre.name;
      pet.species = cre.name;
      pet.size = cre.size;
      pet.ac = cre.ac;
      pet.speed = cre.speed;
      pet.hpmax = cre.hp;
      pet.hp = cre.hp;
      pet.abilityscores = [
        cre.str,
        cre.dex,
        cre.con,
        cre.int,
        cre.wis,
        cre.cha
      ];
      pet.features = cre.description;
      this.character.pets.push(pet);
      this.importPetModal = false;
    },
    calcScoreMod(score) {
      return Math.floor(score / 2) - 5;
    }
  },
  mounted () {
    this.$store.dispatch('getAllCreatures');
  }
};
