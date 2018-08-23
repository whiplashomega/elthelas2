import { mapGetters } from 'vuex';
import marked from 'marked';

const modalInfo = {
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

const crxptable = [
  { cr: 0, xp: 10 },
  { cr: 0.125, xp: 25 },
  { cr: 0.25, xp: 50 },
  { cr: 0.5, xp: 100 },
  { cr: 1, xp: 200 },
  { cr: 2, xp: 450 },
  { cr: 3, xp: 700 },
  { cr: 4, xp: 1100 },
  { cr: 5, xp: 1800 },
  { cr: 6, xp: 2300 },
  { cr: 7, xp: 2900 },
  { cr: 8, xp: 3900 },
  { cr: 9, xp: 5000 },
  { cr: 10, xp: 5900 },
  { cr: 11, xp: 7200 },
  { cr: 12, xp: 8400 },
  { cr: 13, xp: 10000 },
  { cr: 14, xp: 11500 },
  { cr: 15, xp: 13000 },
  { cr: 16, xp: 15000 },
  { cr: 17, xp: 18000 },
  { cr: 18, xp: 20000 },
  { cr: 19, xp: 22000 },
  { cr: 20, xp: 25000 },
  { cr: 21, xp: 33000 },
  { cr: 22, xp: 41000 },
  { cr: 23, xp: 50000 },
  { cr: 24, xp: 62000 },
  { cr: 26, xp: 90000 },
  { cr: 30, xp: 155000 }
];

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
        modalInfo: { ...modalInfo }
      },
      encountercreatures: [],
      nextIndex: 0,
      partylevel: 1,
      partysize: 4,
      difficulty: "",
      xpvalue: 0,
      terrain: 1,
      adjustedxpvalue: 0,
      aoe: false
    };
  },
  methods: {
    xpByCR (cr) {
      return crxptable.find((a) => {
        return a.cr === cr;
      }).xp;
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
    calculateDifficulty () {
      var easythresholds = [25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400, 1600, 2000, 2100, 2400, 2800];
      var mediumthresholds = [50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500, 2800, 3200, 3900, 4200, 4900, 5700];
      var hardthresholds = [75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800, 4300, 4800, 5900, 6300, 7300, 8500];
      var deadlythresholds = [100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100, 5700, 6400, 7200, 8800, 9500, 10900, 12700];
      var easy = easythresholds[this.partylevel - 1] * this.partysize;
      var medium = mediumthresholds[this.partylevel - 1] * this.partysize;
      var hard = hardthresholds[this.partylevel - 1] * this.partysize;
      var deadly = deadlythresholds[this.partylevel - 1] * this.partysize;
      var xp = 0;
      for (var x = 0; x < this.encountercreatures.length; x++) {
        xp += this.xpByCR(this.encountercreatures[x].cr);
      }
      this.xpvalue = xp;
      xp *= (4 / (this.partysize + 1));
      xp *= (1 + this.encountercreatures.length * 0.1);
      xp *= this.terrain * (1 + 0.05 * this.aoe * this.partysize);
      this.adjustedxpvalue = Math.floor(xp);
      if (xp < easy) {
        this.difficulty = "too easy";
      } else if (xp < medium) {
        this.difficulty = "easy";
      } else if (xp < hard) {
        this.difficulty = "medium";
      } else if (xp < deadly) {
        this.difficulty = "hard";
      } else if (xp < deadly * 1.5) {
        this.difficulty = "deadly";
      } else {
        this.difficulty = "nigh on impossible";
      }
    },
    addToEncounter (item) {
      var creature = Object.assign({}, item);
      creature.id = this.nextIndex;
      this.nextIndex++;
      creature.currenthp = creature.hp;
      creature.descr = marked(creature.description);
      creature.mini = "";
      this.encountercreatures.push(creature);
      this.calculateDifficulty();
    },
    removeCreature (item) {
      this.encountercreatures = this.encountercreatures.filter((a) => {
        if (a.id === item.id) {
          return false;
        }
        return true;
      });
      this.calculateDifficulty();
    }
  },
  mounted () {
    if (this.$route.params.encounter) {
      console.log('there is an encounter parameter');
      this.$store.dispatch('getAllCreatures').then(() => {
        var creatures = this.$route.params.encounter.split('&');
        for (var x = 0; x < creatures.length; x++) {
          var cre = this.creatures.filter(function(a) {
            return a.name.toLowerCase().replace(/ /g, '') === creatures[x].toLowerCase().replace(/ /g, '');
          });
          if (cre.length > 0) {
            this.addToEncounter(cre[0]);
          }
        }
        this.calculateDifficulty();
      });
    }
  }
};
