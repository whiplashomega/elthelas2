var mongoose = require('mongoose');
var User = require('./user');

var Schema = mongoose.Schema;
var Skill = new Schema({
  name: { type: String, default: "" },
  prof: { type: Number, default: 0 },
  stat: { type: Number, default: 0 },
  magic: { type: Number, default: 0 },
  custom: { type: Boolean, default: false }
});

var CharClass = new Schema({ thisclass: Schema.Types.Mixed, level: Number, selsubclass: Schema.Types.Mixed, hitdice: Number, savedcstat: Number, bonusknown: Number });
var Character = new Schema({
  age: { type: String, default: "" },
  alignment: { type: String, default: "" },
  allies: { type: String, default: "" },
  backstory: { type: String, default: "" },
  bond: { type: String, default: "" },
  castlog: { type: Array, default: [] },
  bonuscantrips: 0,
  pets: [],
  activemodifiers: [],
  eyes: { type: String, default: "" },
  family: { type: String, default: "" },
  gender: { type: String, default: "" },
  god: { type: String, default: "" },
  hair: { type: String, default: "" },
  height: { type: String, default: "" },
  homecountry: { type: String, default: "" },
  hometown: { type: String, default: "" },
  name: { type: String, default: "" },
  notes: { type: String, default: "" },
  personality: { type: String, default: "" },
  proficiencies: { type: String, default: "" },
  player: { type: String, default: "" },
  size: { type: String, default: "medium" },
  skin: { type: String, default: "" },
  warlockslotsavailable: { type: Number, default: 0 },
  warlockslotsmagic: { type: Number, default: 0 },
  weight: { type: String, default: "" },
  cp: { type: Number, default: 0 },
  sp: { type: Number, default: 0 },
  gp: { type: Number, default: 0 },
  pp: { type: Number, default: 0 },
  art: { type: Number, default: 0 },
  gems: { type: Number, default: 0 },
  capacitybonus: { type: Number, default: 0 },
  hpcurrent: { type: Number, default: 1 },
  initmagic: { type: Number, default: 0 },
  hpmagic: { type: Number, default: 0 },
  acmagic: { type: Number, default: 0 },
  bonusfeats: { type: Number, default: 0 },
  saves: [Boolean],
  deathsuccess: { type: Number, default: 0 },
  deathfail:  { type: Number, default: 0 },
  savebonus: [Number],
  stats: [Number],
  statbonus: [Number],
  speedmagic: [Number],
  attacks: [],
  armors: [],
  feats: [],
  injuries: [],
  image: String,
  equipment: [],
  containers: [],
  bonusslots: [Number],
  resources: [],
  features: [],
  saveDCBonus: [Number],
  attBonus: [Number],
  charclasses: [CharClass],
  race: Schema.Types.Mixed,
  background: Schema.Types.Mixed,
  faction: Schema.Types.Mixed,
  skills: [Skill],
  spells: { cantrip: [], level1: [], level2: [], level3: [], level4: [], level5: [], level6: [], level7: [], level8: [], level9: [] },
  availableslots: { cantrip: Number, level1: Number, level2: Number, level3: Number, level4: Number, level5: Number, level6: Number, level7: Number, level8: Number, level9: Number },
  actions: [],
  autosave: { type: Boolean, default: false },
  owner: String,
  campaigns: [],
  dr: { type: Object, default: {
      piercing: 0,
      slashing: 0,
      bludgeoning: 0,
      mpiercing: 0,
      mslashing: 0,
      mbludgeoning: 0,
      acid: 0,
      cold: 0,
      fire: 0,
      force: 0,
      lightning: 0,
      necrotic: 0,
      poison: 0,
      psychic: 0,
      radiant: 0,
      thunder: 0
    }},
  temphp: 0
});

module.exports = mongoose.model('Character', Character);