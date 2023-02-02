import Pet from "@/stores/classes/pet";
import { useCharacterv2Store, useUserStore, useCreatureStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const userinfo = useUserStore();
    const creatureStore = useCreatureStore();
    
    const { creatures } = storeToRefs(creatureStore);
    const { character } = storeToRefs(characters);
    
    const { getCreature, getAllCreatures } = creatureStore;
    
    return {
      creatures, character, userinfo, getCreature, getAllCreatures
    };
  },
  computed: {
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
    this.getAllCreatures();
  }
};
