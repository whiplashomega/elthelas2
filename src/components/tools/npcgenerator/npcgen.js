import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    charclasses: 'allClasses',
    races: 'allRaces'
  }),
  data () {
    return {
      character: {
        name: "",
        race: "",
        primarystat: "",
        skilllevel: { name: "Dunce", stats: [12, 10, 9, 8, 7, 6] }
      },
      primestats: [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma"
      ],
      statarrays: [
        { name: "Dunce", stats: [12, 10, 9, 8, 7, 6] },
        { name: "Peasant", stats: [14, 12, 11, 10, 9, 8] },
        { name: "Competent", stats: [15, 13, 12, 10, 10, 8] },
        { name: "Highly Skilled", stats: [16, 15, 14, 12, 10, 8] },
        { name: "Elite", stats: [18, 16, 14, 12, 10, 8] },
        { name: "Master", stats: [20, 16, 14, 12, 10, 8] },
        { name: "Broken", stats: [22, 18, 16, 14, 10, 10] }
      ]
    }
  },
  methods: {
    generateName () {
      if(this.character.race.id === "dwarves") {
      }
    }
  }
}