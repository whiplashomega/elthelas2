import { mapGetters } from 'vuex';
import marked from 'marked';

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
      },
      encountercreatures: [],
      nextIndex: 0,
      partylevel: 1,
      partysize: 4,
      difficulty: "",
      xpvalue: 0,
      adjustedxpvalue: 0
    };
  },
  methods: {
    xpByCR (cr) {
      if(cr === 0) return 10;
      else if(cr === 0.125) return 25;
      else if(cr === 0.25) return 50;
      else if(cr === 0.5) return 100;
      else if(cr === 1) return 200;
      else if(cr === 2) return 450;
      else if(cr === 3) return 700;
      else if(cr === 4) return 1100;
      else if(cr === 5) return 1800;
      else if(cr === 6) return 2300;
      else if(cr === 7) return 2900;
      else if(cr === 8) return 3900;
      else if(cr === 9) return 5000;
      else if(cr === 10) return 5900;
      else if(cr === 11) return 7200;
      else if(cr === 12) return 8400;
      else if(cr === 13) return 10000;
      else if(cr === 14) return 11500;
      else if(cr === 15) return 13000;
      else if(cr === 16) return 15000;
      else if(cr === 17) return 18000;
      else if(cr === 18) return 20000;
      else if(cr === 19) return 22000;
      else if(cr === 20) return 25000;
      else if(cr === 21) return 33000;
      else if(cr === 22) return 41000;
      else if(cr === 23) return 50000;
      else if(cr === 24) return 62000;
      else if(cr === 26) return 90000;
      else if(cr === 30) return 155000;
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
      if(!value || inelement) {
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
      for(var x = 0; x < this.encountercreatures.length; x++) {
        xp += this.xpByCR(this.encountercreatures[x].cr);
      }
      this.xpvalue = xp;
      if(this.partysize > 5) {
        if(this.encountercreatures.length === 1) {
          xp *= 0.5;
        } else if(this.encountercreatures.length === 2) {
          xp *= 1;
        } else if(this.encountercreatures.length >= 3 && this.encountercreatures.length <= 6) {
          xp *= 1.5;
        } else if(this.encountercreatures.length >= 7 && this.encountercreatures.length <= 10) {
          xp *= 2;
        } else if(this.encountercreatures.length >= 11 && this.encountercreatures.length <= 14) {
          xp *= 2.5;
        } else {
          xp *= 3;
        }
      } else if(this.partysize < 3) {
        if(this.encountercreatures.length === 1) {
          xp *= 1.5;
        } else if(this.encountercreatures.length === 2) {
          xp *= 2;
        } else if(this.encountercreatures.length >= 3 && this.encountercreatures.length <= 6) {
          xp *= 2.5;
        } else if(this.encountercreatures.length >= 7 && this.encountercreatures.length <= 10) {
          xp *= 3;
        } else if(this.encountercreatures.length >= 11 && this.encountercreatures.length <= 14) {
          xp *= 4;
        } else {
          xp *= 5;
        }        
      } else {
        if(this.encountercreatures.length === 1) {
          xp *= 1;
        } else if(this.encountercreatures.length === 2) {
          xp *= 1.5;
        } else if(this.encountercreatures.length >= 3 && this.encountercreatures.length <= 6) {
          xp *= 2;
        } else if(this.encountercreatures.length >= 7 && this.encountercreatures.length <= 10) {
          xp *= 2.5;
        } else if(this.encountercreatures.length >= 11 && this.encountercreatures.length <= 14) {
          xp *= 3;
        } else {
          xp *= 4;
        }        
      }
      this.adjustedxpvalue = xp;
      if(xp < easy) {
        this.difficulty = "too easy";
      } else if(xp < medium) {
        this.difficulty = "easy";
      } else if(xp < hard) {
        this.difficulty = "medium";
      } else if(xp < deadly) {
        this.difficulty = "hard";
      } else if(xp < deadly * 1.5) {
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
        if(a.id === item.id) {
          return false;
        }
        return true;
      });
      this.calculateDifficulty();
    }
  },
  mounted () {
    if(this.$route.params.encounter) {
      console.log('there is an encounter parameter');
      this.$store.dispatch('getAllCreatures').then(() => {
        var creatures = this.$route.params.encounter.split('&');
        for(var x = 0; x < creatures.length; x++) {
          var cre = this.creatures.filter(function(a) {
            return a.name.toLowerCase().replace(/ /g, '') === creatures[x].toLowerCase().replace(/ /g, '');
          });
          if(cre.length > 0) {
            this.addToEncounter(cre[0]);
          }
        }
        this.calculateDifficulty();
      });
    }
  }
};