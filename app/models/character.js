var mongoose = require('mongoose');
var User = require('./user');

var Schema = mongoose.Schema;
var Skill = new Schema({
  name: { type: String, default: "" },
  prof: { type: Number, default: 0 },
  stat: { type: Number, default: 0 },
  magic: { type: Number, default: 0 }
});

var CharClass = new Schema({ thisclass: Schema.Types.Mixed, level: Number, selsubclass: Schema.Types.Mixed });
var Character = new Schema({
  name: { type: String, default: "" },
  player: { type: String, default: "" },
  alignment: { type: String, default: "" },
  homecountry: { type: String, default: "" },
  hometown: { type: String, default: "" },
  age: { type: String, default: "" },
  height: { type: String, default: "" },
  weight: { type: String, default: "" },
  gender: { type: String, default: "" },
  eyes: { type: String, default: "" },
  skin: { type: String, default: "" },
  size: { type: String, default: "medium" },
  proficiencies: { type: String, default: "" },
  warlockslotsavailable: { type: Number, default: 0 },
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
  savebonus: [Number],
  stats: [Number],
  statbonus: [Number],
  speedmagic: [Number],
  attacks: [],
  armors: [],
  feats: [],
  injuries: [],
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
  owner: String
});

module.exports = mongoose.model('Character', Character);