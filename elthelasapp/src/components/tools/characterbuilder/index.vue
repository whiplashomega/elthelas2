<template>
  <div class="container">
    <div class="row" v-if="!mobile">
      <div class="print-full" v-bind:class="buildHide ? 'col-12' : 'col-8'">
        <characterheader />
        <div class="row">
          <div class="col-7">
            <div class="row">
              <!-- Ability Scores -->
              <div class="col-7">
                <abilityscores />
              </div>
              <div class="col-5">
                <!-- Initiative -->
                <initiative />
                <!-- HP -->
                <hitpoints />
              </div>
            </div>
            <div class="row">
              <!-- skills -->
              <div class="col-7">
                <skills />
              </div>
              <div class="col-5">
                <combat />
                <!-- Equipment -->
                <equipment />
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col">
                <!-- Attacks -->
                <div class="charsheet-static" id="attackdiv">
                  <h4>Attacks</h4>
                  <div v-for="(attack, index) in character.attacks" v-bind:key="index" class="smalltext">
                    <strong>{{attack.name}}:</strong> {{attack.type}},
                    range {{attack.range}},
                    <span v-if="attack.bonus > -1">+</span>{{getAttackBonus(attack)}} to hit
                    ({{attack.damage}}
                    <span v-if="getAttackDamageBonus(attack) > 0">+ {{getAttackDamageBonus(attack)}}</span>
                    <span v-if="getAttackDamageBonus(attack) < 0"> - {{getAttackDamageBonus(attack)}}</span> {{attack.dtype}} damage
                    <span v-if="attack.damage2 !== ''"> + {{attack.damage2}} {{attack.dtype2}} damage</span>).
                    <button type="button" class="print-hide btn-symbol" @click="attack.edit = true">&#9998;</button>
                    <button type="button" @click="removeAttack(index)" class="print-hide btn btn-sm btn-danger">X</button>
                    <b-modal v-model="attack.edit">
                      Name:
                      <input type="text" class="form-control" v-model="attack.name" />
                      <input type="checkbox" v-model="attack.prof">Proficient? <input type="checkbox" v-model="attack.addstat" />Add Ability Mod to Damage?
                      <select class="form-control" v-model="attack.stat">
                        <option :value="0">Strength</option>
                        <option :value="1">Dexterity</option>
                        <option :value="2">Constitution</option>
                        <option :value="3">Intelligence</option>
                        <option :value="4">Wisdom</option>
                        <option :value="5">Charisma</option>
                      </select>
                      Additional Attack Bonus:
                      <input type="number" class="form-control" v-model="attack.bonus" />
                      Range:
                      <input type="text" class="form-control" v-model="attack.range" />
                      Type:
                      <select v-model="attack.type" class="form-control">
                        <option>Melee Weapon Attack</option>
                        <option>Ranged Weapon Attack</option>
                        <option>Melee Spell Attack</option>
                        <option>Ranged Spell Attack</option>
                        <option>Unarmed Strike</option>
                      </select>
                      Damage Dice:
                      <input type="text" class="form-control" v-model="attack.damage" />
                      Damage Type:
                      <select v-model="attack.dtype" class="form-control">
                        <option>Bludgeoning</option>
                        <option>Piercing</option>
                        <option>Slashing</option>
                        <option>Acid</option>
                        <option>Cold</option>
                        <option>Fire</option>
                        <option>Force</option>
                        <option>Lightning</option>
                        <option>Necrotic</option>
                        <option>Poison</option>
                        <option>Radiant</option>
                        <option>Thunder</option>
                      </select>
                      Damage Dice 2:
                      <input type="text" class="form-control" v-model="attack.damage2" />
                      Damage Type 2:
                      <select v-model="attack.dtype2" class="form-control">
                        <option>Bludgeoning</option>
                        <option>Piercing</option>
                        <option>Slashing</option>
                        <option>Acid</option>
                        <option>Cold</option>
                        <option>Fire</option>
                        <option>Force</option>
                        <option>Lightning</option>
                        <option>Necrotic</option>
                        <option>Poison</option>
                        <option>Radiant</option>
                        <option>Thunder</option>
                      </select>
                      Additional Damage Bonus:
                      <input type="text" class="form-control" v-model="attack.damagebonus" />
                    </b-modal>
                  </div>
                  <button type="button" @click="attackmodal = true" class="print-hide btn btn-primary btn-sm">+</button>
                  <b-modal v-model="attackmodal" title="Add Attack" @ok="addAttack()">
                      Name:
                      <input type="text" class="form-control" v-model="newattack.name" />
                      <input type="checkbox" v-model="newattack.prof">Proficient? <input type="checkbox" v-model="newattack.addstat" />Add Ability Mod to Damage?
                      <select class="form-control" v-model="newattack.stat">
                        <option :value="0">Strength</option>
                        <option :value="1">Dexterity</option>
                        <option :value="2">Constitution</option>
                        <option :value="3">Intelligence</option>
                        <option :value="4">Wisdom</option>
                        <option :value="5">Charisma</option>
                      </select>
                      Additional Attack Bonus:
                      <input type="number" class="form-control" v-model="newattack.bonus" />
                      Range:
                      <input type="text" class="form-control" v-model="newattack.range" />
                      Type:
                      <select v-model="newattack.type" class="form-control">
                        <option>Melee Weapon Attack</option>
                        <option>Ranged Weapon Attack</option>
                        <option>Melee Spell Attack</option>
                        <option>Ranged Spell Attack</option>
                        <option>Unarmed Strike</option>
                      </select>
                      Damage Dice:
                      <input type="text" class="form-control" v-model="newattack.damage" />
                      Damage Type:
                      <select v-model="newattack.dtype" class="form-control">
                        <option>Bludgeoning</option>
                        <option>Piercing</option>
                        <option>Slashing</option>
                        <option>Acid</option>
                        <option>Cold</option>
                        <option>Fire</option>
                        <option>Force</option>
                        <option>Lightning</option>
                        <option>Necrotic</option>
                        <option>Poison</option>
                        <option>Radiant</option>
                        <option>Thunder</option>
                      </select>
                      Damage Dice 2:
                      <input type="text" class="form-control" v-model="newattack.damage2" />
                      Damage Type 2:
                      <select v-model="newattack.dtype2" class="form-control">
                        <option>Bludgeoning</option>
                        <option>Piercing</option>
                        <option>Slashing</option>
                        <option>Acid</option>
                        <option>Cold</option>
                        <option>Fire</option>
                        <option>Force</option>
                        <option>Lightning</option>
                        <option>Necrotic</option>
                        <option>Poison</option>
                        <option>Radiant</option>
                        <option>Thunder</option>
                      </select>
                      Additional Damage Bonus:
                      <input type="text" class="form-control" v-model="newattack.damagebonus" />
                  </b-modal>
                </div>
                <!-- Injuries -->
                <div class="charsheet-static">
                  Injuries/Madnesses
                  <div v-for="(injury, index) in character.injuries" v-bind:key="index">
                    <input type="text" v-model="injury.name" class="charsheet-text col-9" />
                    <button class="btn btn-sm btn-danger print-hide" type="button" @click="removeInjury(index)">X</button>
                  </div>
                  <button class="btn btn-sm btn-primary print-hide" type="button" @click="addInjury">+</button>
                </div>
                <!-- Feats -->
                <div class="charsheet-static">
                  Feats/ASIs {{numASI}}
                  <div v-for="(feat, index) in character.feats" v-bind:key="index" style="clear:both;">
                    <select class="charsheet-text col-9" v-model="character.feats[index]">
                      <option :value="character.feats[index]">{{character.feats[index].name}}</option>
                      <option v-for="feat in featsort" v-bind:key="feat.name" :value="feat" :title="feat.description">{{feat.name}}</option>
                    </select>
                    <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feat, 'show', true)"
                      v-if="!feat.show">
                      &#x25BC;
                    </button>
                    <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feat, 'show', false)"
                      v-if="feat.show">
                      &#x25B2;
                    </button>
                    <p v-if="feat.show" v-html="$options.filters.marked(feat.description)"></p>
                  </div>
                </div>
                <!-- Features -->
                <div class="charsheet-static" id="featurebox">
                  Features
                  <p class="smalltext" v-if="character.background.feature.name.length > 0">
                    <span  :title="character.background.feature.description">{{character.background.feature.name}}</span>
                    <button class="btn btn-sm print-hide float-right" type="button" @click="setval(character.background.feature, 'show', true)"
                      v-if="!character.background.feature.show">
                      &#x25BC;
                    </button>
                    <button class="btn btn-sm print-hide float-right" type="button" @click="setval(character.background.feature, 'show', false)"
                      v-if="character.background.feature.show">
                      &#x25B2;
                    </button>
                    <span v-if="character.background.feature.show" v-html="$options.filters.marked(character.background.feature.description)"></span>
                  </p>
                  <div  v-for="trait in character.race.traits" class="smalltext" v-bind:key="trait.name">
                    <p>
                      <span :title="trait.description">{{trait.name}}</span>
                    <button class="btn btn-sm print-hide float-right" type="button" @click="setval(trait, 'show', true)"
                      v-if="!trait.show">
                      &#x25BC;
                    </button>
                    <button class="btn btn-sm print-hide float-right" type="button" @click="setval(trait, 'show', false)"
                      v-if="trait.show">
                      &#x25B2;
                    </button>
                    <span v-if="trait.show" v-html="$options.filters.marked(trait.description)"></span>
                    </p>
                  </div>
                  <div class="smalltext" v-for="charclass in character.charclasses" v-bind:key="charclass.thisclass.name">
                    <p v-for="feature in charclass.thisclass.features" v-bind:key="feature.name" v-if="feature.level <= charclass.level">
                      <span :title="feature.description">{{feature.name}}</span>
                      <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', true)"
                        v-if="!feature.show">
                        &#x25BC;
                      </button>
                      <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', false)"
                        v-if="feature.show">
                        &#x25B2;
                      </button>
                      <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
                    </p>
                    <div v-for="feature in charclass.selsubclass.features" v-bind:key="feature.name">
                      <p v-if="feature.level <= charclass.level">
                        <span :title="feature.description">{{feature.name}}</span>
                        <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', true)"
                          v-if="!feature.show">
                          &#x25BC;
                        </button>
                        <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', false)"
                          v-if="feature.show">
                          &#x25B2;
                        </button>
                        <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
                      </p>
                    </div>
                  </div>
                  <div v-if="level >= 1" v-html="$options.filters.marked(character.faction.level1)" class="smalltext"></div>
                  <div v-if="level >= 10" v-html="$options.filters.marked(character.faction.level10)" class="smalltext"></div>
                  <div class="smalltext" v-for="(feature, index) in character.features" v-bind:key="index">
                    <p>
                      <span :title="feature.description">{{feature.name}}</span>
                      <button class="btn btn-sm print-hide float-right btn-danger" type="button" @click="removeFeature(index)">X</button>
                      <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', true)"
                        v-if="!feature.show">
                        &#x25BC;
                      </button>
                      <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', false)"
                        v-if="feature.show">
                        &#x25B2;
                      </button>
                      <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
                    </p>
                  </div>
                  <button class="btn btn-sm print-hide btn-primary" type="button" @click="newFeatureModal = true">+</button>
                  <b-modal title="Add Feature" v-model="newFeatureModal" @ok="addFeature()">
                    Name
                    <input type="text" class="form-control" v-model="newfeature.name" />
                    Description
                    <textarea class="form-control" v-model="newfeature.description"></textarea>
                  </b-modal>
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
            <div class="row print-hide">
              <div class="col">
                <input type="button" @click="buildHide = !buildHide" value="Hide Build Section" v-if="!buildHide" class="btn btn-primary" />
                <input type="button" @click="buildHide = !buildHide" value="Show Build Section" v-if="buildHide" class="btn btn-primary" />
              </div>
            </div>
          </div>
        </div>
        <br style="page-break-after: always" />
        <!-- Spells -->
        <div class="row">
          <div class="col-12">
            <div class="charsheet-static">
              <h5>Spells</h5>
              <div class="btn-group print-hide smalltext">
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'cantrip'">cantrip</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level1'">1</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level2'">2</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level3'">3</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level4'">4</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level5'">5</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level6'">6</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level7'">7</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level8'">8</button>
                <button class="btn btn-sm btn-primary" @click="displayLevel = 'level9'">9</button>
              </div>
              <span class="smalltext print-hide"><input type="checkbox" v-model="preparedonly" />Prepared Only</span><br />
              <span class="smalltext">Save DCs and Attack Mods</span>
              <table class="table table-sm smalltext">
                <tr>
                  <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
                </tr>
                <tr>
                  <td>{{getSaveDC(0)}}</td>
                  <td>{{getSaveDC(1)}}</td>
                  <td>{{getSaveDC(2)}}</td>
                  <td>{{getSaveDC(3)}}</td>
                  <td>{{getSaveDC(4)}}</td>
                  <td>{{getSaveDC(5)}}</td>
                </tr>
                <tr>
                  <td>+{{getAttBonus(0)}}</td>
                  <td>+{{getAttBonus(1)}}</td>
                  <td>+{{getAttBonus(2)}}</td>
                  <td>+{{getAttBonus(3)}}</td>
                  <td>+{{getAttBonus(4)}}</td>
                  <td>+{{getAttBonus(5)}}</td>
                </tr>
              </table>
              <span class="print-hide">{{displayLevel}}
              slots: <input type="number" v-model="character.availableslots[displayLevel]" class="charsheet-num" /> / {{ totalslots(displayLevel) }}</span><br />
              <span v-if="warlockSlots > 0">Warlock Slots: <input type="number" v-model="character.warlockslotsavailable" class="charsheet-num" /> /
                {{ warlockSlots }} level {{ warlockSlotLevel }} slots</span>
              <div class="smalltext print-hide">
                <table class="table table-sm">
                  <thead><tr><th>Spell</th><th>Casting Time</th><th>Duration</th><th>Class</th><th colspan="2">-</th></tr></thead>
                  <tbody>
                    <tr v-for="spell in sortSpells(character.spells[displayLevel])" v-bind:key="spell.title" v-if="(spell.prepared && preparedonly) || !preparedonly">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><span class="clickable" @click="spellDetail(spell)">{{spell.title}}<span v-if="spell.ritual"> (ritual)</span></span>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td>{{spell.class}}</td>
                      <td><button type="button" class="btn btn-sm btn-primary print-hide" @click="castSpell(spell)">Cast</button>
                        <select v-if="spell.level !== 'cantrip'" v-model="spell.castLevel">
                          <option>{{Number(spell.level)}}</option>
                          <option v-for="i in 9 - spell.level" v-bind:key="i">{{Number(i) + Number(spell.level)}}</option>
                        </select></td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(spell)">X</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="smalltext screen-hide">
                <table class="table table-sm">
                  <thead><tr><th>Spell</th><th>Casting Time</th><th>Duration</th></tr></thead>
                  <tbody>
                    <tr><td colspan="2">Cantrips</td><td></td></tr>
                    <tr v-for="spell in character.spells['cantrip']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 1</td><td>{{totalslots('level1')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level1']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 2</td><td>{{totalslots('level2')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level2']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 3</td><td>{{totalslots('level3')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level3']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 4</td><td colspan="2">{{totalslots('level4')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level4']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 5</td><td>{{totalslots('level5')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level5']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 6</td><td>{{totalslots('level6')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level6']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 7</td><td>{{totalslots('level7')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level7']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 8</td><td>{{totalslots('level8')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level8']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                    <tr><td colspan="2">Level 9</td><td>{{totalslots('level9')}} Slots</td></tr>
                    <tr v-for="spell in character.spells['level9']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button type="button" @click="spellModal = true" class="btn btn-sm btn-primary print-hide">+</button>
              <h4>Cast Log</h4>
              <div class="smalltext" v-for="(spell, index) in character.castlog" v-bind:key="index">
                {{spell.title}} {{spell.level}}
              </div>
            </div>

          </div>
        </div>
        <!-- Resources -->
        <div class="row">
          <div class="col-12">
            <div class="charsheet-static smalltext">
              <h4>Various Resources</h4>
              <div class="row" v-for="(resource, index) in character.resources"
                :key="index">
                <div class="col-5">
                  <input type="text" v-model="resource.name" class="charsheet-text" />
                </div>
                <input type="number" class="charsheet-num" v-model="resource.current" /> /
                <input type="number" class="charsheet-num" v-model="resource.max" />
                <select v-model="resource.recharge" class="charsheet-text col-3">
                  <option value="never">Never</option>
                  <option value="shortrest">Short Rest</option>
                  <option value="longrest">Long Rest</option>
                </select>
                <button class="btn btn-sm btn-danger print-hide" @click="removeResource(index)">X</button>
              </div>
              <button type="button" class="btn btn-sm print-hide btn-primary"
                @click="addResource()">+</button>
              <button type="button" class="btn btn-sm btn-success print-hide" @click="populateResources()">Populate from Classes</button>
            </div>
          </div>
        </div>
        <!-- Fluff Details -->
        <appearance />
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Allies and Organizations</h5>
              <textarea v-model="character.allies" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Family</h5>
              <textarea v-model="character.family" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Backstory</h5>
              <textarea v-model="character.backstory" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Bond</h5>
              <textarea v-model="character.bond" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Personality</h5>
              <textarea v-model="character.personality" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Notes</h5>
              <textarea v-model="character.notes" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 print-hide" v-if="!buildHide">
        <loadsave />
        <h2>Build</h2>
        <buildclass />
        <div class="row">
          <div class="col">
            <table class="abilitytable">
              <thead>
                <tr><th>Stat</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Base</th>
                  <td><input type="number" v-model="character.stats[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[5]" class="charsheet-num"></td>
                </tr>
                <tr>
                  <th>Racial</th>
                  <td><input type="number" v-model="character.race.stats[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[5]" class="charsheet-num"></td>
                </tr>
                <tr>
                  <th>Bonus</th>
                  <td><input type="number" v-model="character.statbonus[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[5]" class="charsheet-num"></td>
                </tr>
                <tr>
                  <th>Save</th>
                  <td><input type="checkbox" v-model="character.saves[0]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[1]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[2]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[3]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[4]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[5]"  /></td>
                </tr>
                <tr>
                  <th>Save Bonus</th>
                  <td><input type="number" v-model="character.savebonus[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[5]" class="charsheet-num"></td>
                </tr>
              </tbody>
            </table>
            Point Buy Total: {{ pointbuy }}<br />
            Stat Rolls: <span v-for="(roll, index) in statRolls" v-bind:key="index">{{roll}} </span>
            <input type="button" @click="rollStats()" value="Roll!" />
          </div>
        </div>
        <div class="row">
          <h4 class="col-12">Various Bonuses</h4>
          <div class="col-3">
            <input class="charsheet-text" type="number" v-model="character.initmagic" />
            Initiative
          </div>
          <div class="col-3">
            <input class="charsheet-text" type="number" v-model="character.hpmagic" />
            Hit Points
          </div>
          <div class="col-3">
            <input class="charsheet-text" type="number" v-model="character.acmagic" />
            AC
          </div>
          <div class="col-3">
            <input class="charsheet-text" type="number" v-model="character.bonusfeats" />
            Bonus Feats
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <input class="charsheet-text" type="number" v-model="character.speedmagic[0]" />
            Speed
          </div>
          <div class="col-2">
            <input class="charsheet-text" type="number" v-model="character.speedmagic[1]" />
            Fly
          </div>
          <div class="col-2">
            <input class="charsheet-text" type="number" v-model="character.speedmagic[2]" />
            Climb
          </div>
          <div class="col-2">
            <input class="charsheet-text" type="number" v-model="character.speedmagic[3]" />
            Swim
          </div>
          <div class="col-2">
            <input class="charsheet-text" type="number" v-model="character.speedmagic[4]" />
            Burrow
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <select v-model="character.size" class="charsheet-text">
              <option value="tiny">Tiny</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="huge">Huge</option>
            </select>Effective Size for Carry Capacity
          </div>
          <div class="col-6">
            <input type="number" class="charsheet-text" v-model="character.capacitybonus" />
            Carry Capacity Bonus
          </div>
        </div>
        <h5>Bonus Spell Slots</h5>
        <div class="row">
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[0]" />
            level 1
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[1]" />
            level 2
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[2]" />
            level 3
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[3]" />
            level 4
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[4]" />
            level 5
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[5]" />
            level 6
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[6]" />
            level 7
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[7]" />
            level 8
          </div>
          <div class="col-3">
            <input type="number" class="charsheet-text" v-model="character.bonusslots[8]" />
            level 9
          </div>
        </div>
        <h5>Save DC Bonus</h5>
        <table class="table table-sm">
          <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
          <tr>
            <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[0]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[1]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[2]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[3]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[4]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[5]" /></td>
          </tr>
        </table>
        <h5>Spell Attack Bonus</h5>
        <table class="table table-sm">
          <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
          <tr>
            <td><input type="number" class="charsheet-num" v-model="character.attBonus[0]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.attBonus[1]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.attBonus[2]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.attBonus[3]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.attBonus[4]" /></td>
            <td><input type="number" class="charsheet-num" v-model="character.attBonus[5]" /></td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="mobile">
      <b-tabs>
        <b-tab title="Basics">
          <characterheader />
          <buildclass />
          <appearance />
        </b-tab>
        <b-tab title="Stats">
          <div class="row">
            <div class="col">
              <abilityscores />
            </div>
          </div>
        </b-tab>
        <b-tab title="Skills">
          <skills />
        </b-tab>
        <b-tab title="Combat">
          <initiative />
          <hitpoints />
          <combat />
          <!-- Attacks -->
          <div class="charsheet-static">
            <h4>Attacks</h4>
            <div v-for="(attack, index) in character.attacks" v-bind:key="index" class="smalltext">
              <strong>{{attack.name}}:</strong> {{attack.type}},
              range {{attack.range}},
              <span v-if="attack.bonus > -1">+</span>{{getAttackBonus(attack)}} to hit
              ({{attack.damage}}
              <span v-if="getAttackDamageBonus(attack) > 0">+ {{getAttackDamageBonus(attack)}}</span>
              <span v-if="getAttackDamageBonus(attack) < 0"> - {{getAttackDamageBonus(attack)}}</span> {{attack.dtype}} damage
              <span v-if="attack.damage2"> + {{attack.damage2}} {{attack.dtype2}} damage</span>).
              <button type="button" class="print-hide btn-symbol" @click="attack.edit = true">&#9998;</button>
              <button type="button" @click="removeAttack(index)" class="print-hide btn btn-sm btn-danger">X</button>
              <b-modal v-model="attack.edit">
                Name:
                <input type="text" class="form-control" v-model="attack.name" />
                <input type="checkbox" v-model="attack.prof">Proficient? <input type="checkbox" v-model="attack.addstat" />Add Ability Mod to Damage?
                <select class="form-control" v-model="attack.stat">
                  <option :value="0">Strength</option>
                  <option :value="1">Dexterity</option>
                  <option :value="2">Constitution</option>
                  <option :value="3">Intelligence</option>
                  <option :value="4">Wisdom</option>
                  <option :value="5">Charisma</option>
                </select>
                Additional Attack Bonus:
                <input type="number" class="form-control" v-model="attack.bonus" />
                Range:
                <input type="text" class="form-control" v-model="attack.range" />
                Type:
                <select v-model="attack.type" class="form-control">
                  <option>Melee Weapon Attack</option>
                  <option>Ranged Weapon Attack</option>
                  <option>Melee Spell Attack</option>
                  <option>Ranged Spell Attack</option>
                  <option>Unarmed Strike</option>
                </select>
                Damage Dice:
                <input type="text" class="form-control" v-model="attack.damage" />
                Damage Type:
                <select v-model="attack.dtype" class="form-control">
                  <option>Bludgeoning</option>
                  <option>Piercing</option>
                  <option>Slashing</option>
                  <option>Acid</option>
                  <option>Cold</option>
                  <option>Fire</option>
                  <option>Force</option>
                  <option>Lightning</option>
                  <option>Necrotic</option>
                  <option>Poison</option>
                  <option>Radiant</option>
                  <option>Thunder</option>
                </select>
                Damage Dice 2:
                <input type="text" class="form-control" v-model="attack.damage2" />
                Damage Type 2:
                <select v-model="attack.dtype2" class="form-control">
                  <option>Bludgeoning</option>
                  <option>Piercing</option>
                  <option>Slashing</option>
                  <option>Acid</option>
                  <option>Cold</option>
                  <option>Fire</option>
                  <option>Force</option>
                  <option>Lightning</option>
                  <option>Necrotic</option>
                  <option>Poison</option>
                  <option>Radiant</option>
                  <option>Thunder</option>
                </select>
                Additional Damage Bonus:
                <input type="text" class="form-control" v-model="attack.damagebonus" />
              </b-modal>
            </div>
            <button type="button" @click="attackmodal = true" class="print-hide btn btn-primary btn-sm">+</button>
            <b-modal v-model="attackmodal" title="Add Attack" @ok="addAttack()">
              Name:
              <input type="text" class="form-control" v-model="newattack.name" />
              <input type="checkbox" v-model="newattack.prof">Proficient? <input type="checkbox" v-model="newattack.addstat" />Add Ability Mod to Damage?
              <select class="form-control" v-model="newattack.stat">
                <option :value="0">Strength</option>
                <option :value="1">Dexterity</option>
                <option :value="2">Constitution</option>
                <option :value="3">Intelligence</option>
                <option :value="4">Wisdom</option>
                <option :value="5">Charisma</option>
              </select>
              Additional Attack Bonus:
              <input type="number" class="form-control" v-model="newattack.bonus" />
              Range:
              <input type="text" class="form-control" v-model="newattack.range" />
              Type:
              <select v-model="newattack.type" class="form-control">
                <option>Melee Weapon Attack</option>
                <option>Ranged Weapon Attack</option>
                <option>Melee Spell Attack</option>
                <option>Ranged Spell Attack</option>
                <option>Unarmed Strike</option>
              </select>
              Damage Dice:
              <input type="text" class="form-control" v-model="newattack.damage" />
              Damage Type:
              <select v-model="newattack.dtype" class="form-control">
                <option>Bludgeoning</option>
                <option>Piercing</option>
                <option>Slashing</option>
                <option>Acid</option>
                <option>Cold</option>
                <option>Fire</option>
                <option>Force</option>
                <option>Lightning</option>
                <option>Necrotic</option>
                <option>Poison</option>
                <option>Radiant</option>
                <option>Thunder</option>
              </select>
              Damage Dice 2:
              <input type="text" class="form-control" v-model="newattack.damage2" />
              Damage Type 2:
              <select v-model="newattack.dtype2" class="form-control">
                <option>Bludgeoning</option>
                <option>Piercing</option>
                <option>Slashing</option>
                <option>Acid</option>
                <option>Cold</option>
                <option>Fire</option>
                <option>Force</option>
                <option>Lightning</option>
                <option>Necrotic</option>
                <option>Poison</option>
                <option>Radiant</option>
                <option>Thunder</option>
              </select>
              Additional Damage Bonus:
              <input type="text" class="form-control" v-model="newattack.damagebonus" />
            </b-modal>
          </div>
        </b-tab>
        <b-tab title="Spells">
          <div class="row">
            <div class="col-12">
              <div class="charsheet-static">
                <h5>Spells</h5>
                <div class="btn-group">
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'cantrip'">cantrip</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level1'">1</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level2'">2</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level3'">3</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level4'">4</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level5'">5</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level6'">6</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level7'">7</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level8'">8</button>
                  <button class="btn btn-sm btn-primary" @click="displayLevel = 'level9'">9</button>
                </div><br />
                Save DCs and Attack Mods
                <table class="table table-sm">
                  <tr>
                    <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
                  </tr>
                  <tr>
                    <td>{{getSaveDC(0)}}</td>
                    <td>{{getSaveDC(1)}}</td>
                    <td>{{getSaveDC(2)}}</td>
                    <td>{{getSaveDC(3)}}</td>
                    <td>{{getSaveDC(4)}}</td>
                    <td>{{getSaveDC(5)}}</td>
                  </tr>
                  <tr>
                    <td>{{getAttBonus(0)}}</td>
                    <td>{{getAttBonus(1)}}</td>
                    <td>{{getAttBonus(2)}}</td>
                    <td>{{getAttBonus(3)}}</td>
                    <td>{{getAttBonus(4)}}</td>
                    <td>{{getAttBonus(5)}}</td>
                  </tr>
                </table>
                <span class="smalltext print-hide"><input type="checkbox" v-model="preparedonly" />Prepared Only</span><br />
                <span class="print-hide">{{displayLevel}}
                slots: <input type="number" v-model="character.availableslots[displayLevel]" class="charsheet-num" /> / {{ totalslots(displayLevel) }}</span><br />
                <span v-if="warlockSlots > 0">Warlock Slots: <input type="number" v-model="character.warlockslotsavailable" class="charsheet-num" /> / {{ warlockSlots }} level {{ warlockSlotLevel }} slots</span>
                <div class="smalltext print-hide">
                <table class="table table-sm">
                  <thead><tr><th>Spell</th><th>Casting Time</th><th>Duration</th><th>Class</th><th colspan="2">-</th></tr></thead>
                  <tbody>
                    <tr v-for="spell in sortSpells(character.spells[displayLevel])" v-bind:key="spell.title" v-if="(spell.prepared && preparedonly) || !preparedonly">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><span class="clickable" @click="spellDetail(spell)">{{spell.title}}<span v-if="spell.ritual"> (ritual)</span></span>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td>{{spell.class}}</td>
                      <td><button type="button" class="btn btn-sm btn-primary print-hide" @click="castSpell(spell)">Cast</button>
                        <select v-if="spell.level !== 'cantrip'" v-model="spell.castLevel">
                          <option>{{Number(spell.level)}}</option>
                          <option v-for="i in 9 - spell.level" v-bind:key="i">{{Number(i) + Number(spell.level)}}</option>
                        </select>
                      </td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(spell)">X</button></td>
                    </tr>
                  </tbody>
                </table>

                </div>
                <button type="button" @click="spellModal = true" class="btn btn-sm btn-primary print-hide">+</button>
                <h4>Cast Log</h4>
                <div class="smalltext" v-for="(spell, index) in character.castlog" v-bind:key="index">
                  {{spell.title}} {{spell.castLevel}}
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Resources">
          <div class="row">
            <div class="col-12">
              <div class="charsheet-static smalltext">
                <h4>Various Resources</h4>
                <div class="row" v-for="(resource, index) in character.resources"
                  v-bind:key="index">
                  <div class="col-5">
                    <input type="text" v-model="resource.name" class="charsheet-text" />
                  </div>
                  <input type="number" class="charsheet-num" v-model="resource.current" /> /
                  <input type="number" class="charsheet-num" v-model="resource.max" />
                  <select v-model="resource.recharge" class="charsheet-text col-3">
                    <option value="never">Never</option>
                    <option value="shortrest">Short Rest</option>
                    <option value="longrest">Long Rest</option>
                  </select>
                  <button class="btn btn-sm btn-danger print-hide" @click="removeResource(index)">X</button>
                </div>
                <button type="button" class="btn btn-sm print-hide btn-primary"
                  @click="addResource()">+</button>
                <button type="button" class="btn btn-sm btn-success print-hide" @click="populateResources()">Populate from Classes</button>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Equipment">
          <equipment />
        </b-tab>
        <b-tab title="Features">
          <div class="charsheet-static">
            Injuries/Madnesses
            <div v-for="(injury, index) in character.injuries" v-bind:key="index">
              <input type="text" v-model="injury.name" class="charsheet-text col-9" />
              <button class="btn btn-sm btn-danger print-hide" type="button" @click="removeInjury(index)">X</button>
            </div>
            <button class="btn btn-sm btn-primary print-hide" type="button" @click="addInjury">+</button>
          </div>
          <!-- Feats -->
          <div class="charsheet-static">
            Feats/ASIs {{numASI}}
            <div v-for="(feat, index) in character.feats" v-bind:key="index" style="clear:both;">
              <select class="charsheet-text col-9" v-model="character.feats[index]">
                <option v-for="feat in featsort" v-bind:key="feat.name" :value="feat" :title="feat.description">{{feat.name}}</option>
              </select>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feat, 'show', true)"
                v-if="!feat.show">
                &#x25BC;
              </button>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feat, 'show', false)"
                v-if="feat.show">
                &#x25B2;
              </button>
              <p v-if="feat.show && feat.prereq !== ''"><strong>Prerequisite: </strong> feat.prereq</p>
              <p v-if="feat.show" v-html="$options.filters.marked(feat.description)"></p>
            </div>
          </div>
          <!-- Features -->
          <div class="charsheet-static" id="featurebox">
            Features
            <p class="smalltext" v-if="character.background.feature.name.length > 0">
              <span  :title="character.background.feature.description">{{character.background.feature.name}}</span>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(character.background.feature, 'show', true)"
                v-if="!character.background.feature.show">
                &#x25BC;
              </button>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(character.background.feature, 'show', false)"
                v-if="character.background.feature.show">
                &#x25B2;
              </button>
              <span v-if="character.background.feature.show" v-html="$options.filters.marked(character.background.feature.description)"></span>
            </p>
            <div v-for="(trait, index) in character.race.traits" class="smalltext" v-bind:key="index">
              <p v-if="typeof trait === 'string'" v-html="$options.filters.marked(trait)">
              </p>
              <p v-else>
                <span :title="trait.description">{{trait.name}}</span>
                <button class="btn btn-sm print-hide float-right" type="button" @click="setval(trait, 'show', true)"
                  v-if="!trait.show">
                  &#x25BC;
                </button>
                <button class="btn btn-sm print-hide float-right" type="button" @click="setval(trait, 'show', false)"
                  v-if="trait.show">
                  &#x25B2;
                </button>
                <span v-if="trait.show" v-html="$options.filters.marked(trait.description)"></span>
              </p>
            </div>
            <div class="smalltext" v-for="charclass in character.charclasses" v-bind:key="charclass.thisclass.name">
              <p v-for="feature in charclass.thisclass.features" v-bind:key="feature.name" v-if="feature.level <= charclass.level">
              <span :title="feature.description">{{feature.name}}</span>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', true)"
                v-if="!feature.show">
                &#x25BC;
              </button>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', false)"
                v-if="feature.show">
                &#x25B2;
              </button>
              <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
            </p>
            <div v-for="feature in charclass.selsubclass.features" v-bind:key="feature.name">
              <p v-if="feature.level <= charclass.level">
              <span :title="feature.description">{{feature.name}}</span>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', true)"
                v-if="!feature.show">
                &#x25BC;
              </button>
              <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', false)"
                v-if="feature.show">
                &#x25B2;
              </button>
              <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
            </p>
          </div>
        </div>
            <div v-if="level >= 1" v-html="$options.filters.marked(character.faction.level1)"></div>
            <div v-if="level >= 10" v-html="$options.filters.marked(character.faction.level10)"></div>
            <div class="smalltext" v-for="(feature, index) in character.features" v-bind:key="index">
          <p>
            <span :title="feature.description">{{feature.name}}</span>
            <button class="btn btn-sm print-hide float-right btn-danger" type="button" @click="removeFeature(index)">X</button>
            <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', true)"
              v-if="!feature.show">
              &#x25BC;
            </button>
            <button class="btn btn-sm print-hide float-right" type="button" @click="setval(feature, 'show', false)"
              v-if="feature.show">
              &#x25B2;
            </button>
            <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
          </p>
        </div>
            <button class="btn btn-sm print-hide btn-primary" type="button" @click="newFeatureModal = true">+</button>
            <b-modal title="Add Feature" v-model="newFeatureModal" @ok="addFeature()">
              Name
              <input type="text" class="form-control" v-model="newfeature.name" />
              Description
              <textarea class="form-control" v-model="newfeature.description"></textarea>
            </b-modal>
            <p>&nbsp;</p>
          </div>
        </b-tab>
        <b-tab title="Fluff">
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Allies and Organizations</h5>
                <textarea v-model="character.allies" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Family</h5>
                <textarea v-model="character.family" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Backstory</h5>
                <textarea v-model="character.backstory" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Bond</h5>
                <textarea v-model="character.bond" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Personality</h5>
                <textarea v-model="character.personality" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Notes</h5>
                <textarea v-model="character.notes" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Build">
          <loadsave />
          <div class="row">
            <h4 class="col-12">Various Bonuses</h4>
            <div class="col-3">
              <input class="charsheet-text" type="number" v-model="character.initmagic" />
              Initiative
            </div>
            <div class="col-3">
              <input class="charsheet-text" type="number" v-model="character.hpmagic" />
              Hit Points
            </div>
            <div class="col-3">
              <input class="charsheet-text" type="number" v-model="character.acmagic" />
              AC
            </div>
            <div class="col-3">
              <input class="charsheet-text" type="number" v-model="character.bonusfeats" />
              Bonus Feats
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <input class="charsheet-text" type="number" v-model="character.speedmagic[0]" />
              Speed
            </div>
            <div class="col-2">
              <input class="charsheet-text" type="number" v-model="character.speedmagic[1]" />
              Fly
            </div>
            <div class="col-2">
              <input class="charsheet-text" type="number" v-model="character.speedmagic[2]" />
              Climb
            </div>
            <div class="col-2">
              <input class="charsheet-text" type="number" v-model="character.speedmagic[3]" />
              Swim
            </div>
            <div class="col-2">
              <input class="charsheet-text" type="number" v-model="character.speedmagic[4]" />
              Burrow
            </div>
          </div>
          <div class="row">
              <div class="col-6">
                <select v-model="character.size" class="charsheet-text">
                  <option value="tiny">Tiny</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="huge">Huge</option>
                </select>Effective Size for Carry Capacity
              </div>
              <div class="col-6">
                <input type="number" class="charsheet-text" v-model="character.capacitybonus" />
                Carry Capacity Bonus
              </div>
          </div>
          <h5>Bonus Spell Slots</h5>
          <div class="row">
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[0]" />
              level 1
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[1]" />
              level 2
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[2]" />
              level 3
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[3]" />
              level 4
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[4]" />
              level 5
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[5]" />
              level 6
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[6]" />
              level 7
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[7]" />
              level 8
            </div>
            <div class="col-3">
              <input type="number" class="charsheet-text" v-model="character.bonusslots[8]" />
              level 9
            </div>
          </div>
          <h5>Save DC Bonus</h5>
          <table class="table table-sm">
            <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
            <tr>
              <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[0]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[1]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[2]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[3]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[4]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[5]" /></td>
            </tr>
          </table>
          <h5>Spell Attack Bonus</h5>
          <table class="table table-sm">
            <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
            <tr>
              <td><input type="number" class="charsheet-num" v-model="character.attBonus[0]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.attBonus[1]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.attBonus[2]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.attBonus[3]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.attBonus[4]" /></td>
              <td><input type="number" class="charsheet-num" v-model="character.attBonus[5]" /></td>
            </tr>
          </table>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal v-model="spellModal" title="Add Spell" class="modal-lg" @ok="addSpell(selspell)">
      Filter by Text
      <input type="text" class="form-control" v-model="spellfilter" />
      Filter by Level
      <select v-model="levelfilter" class="form-control">
        <option value="all" selected>All</option>
        <option value="cantrip">Cantrips</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      Filter by Class
      <select v-model="classfilter" class="form-control">
        <option value="all">All</option>
        <option value="bard">Bard</option>
        <option value="cleric">Cleric</option>
        <option value="druid">Druid</option>
        <option value="paladin">Paladin</option>
        <option value="ranger">Ranger</option>
        <option value="sorcerer">Sorcerer</option>
        <option value="warlock">Warlock</option>
        <option value="wizard">Wizard</option>
      </select>
      Spell Added By Class:
      <select v-model="selspellclass" class="form-control" required>
        <option v-for="charclass in character.charclasses" :value="charclass.thisclass.name" v-bind:key="charclass.thisclass.name">{{charclass.thisclass.name}}</option>
      </select>
      <table class="table table-sm" id="spellList">
        <thead style="float:left; width:100%; display: table;"><tr><th>-</th><th>Spell</th><th>Level</th></tr></thead>
        <tbody style="overflow-y:scroll; max-height: 300px; float: left; width: 100%">
          <tr v-for="spell in filteredspells" v-bind:key="spell.title" style="float:left; width:100%; display: table">
            <td><input type="radio" name="selspell" :value="spell" v-model="selspell" required /></td>
            <td><span class="clickable" @click="spellDetail(spell)">{{spell.title}}</span></td>
            <td>{{spell.level}}</td>
          </tr>
        </tbody>
      </table>
    </b-modal>
    <b-modal v-model="spellDetailModal" @ok="spellDetailModal = false" id="spellmodal" size="lg" :title="detailspell.title" ok-only>
      <h4>
        <strong>{{detailspell.school}}
          <span v-if="detailspell.level !== 'cantrip'">level </span>{{detailspell.level.toString()}}
        </strong>
        <span v-if="detailspell.ritual"> Ritual</span> ({{detailspell.source}})
      </h4>
      <p><strong>Casting Time: </strong>{{detailspell.castingTime}}</p>
      <p><strong>Range: </strong>{{detailspell.range}}</p>
      <p><strong>Components: </strong>{{detailspell.components}}</p>
      <p><strong>Duration: </strong>{{detailspell.duration}}</p>
      <p><strong>Tags: </strong> {{detailspell.tags.join(", ")}}</p>
      <div v-html="$options.filters.marked(detailspell.description)"></div>
    </b-modal>
  </div>
</template>
<style src="./characterbuilder.scss" scoped lang="scss"></style>
<script src="./characterbuilder.js"></script>
