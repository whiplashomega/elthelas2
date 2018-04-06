<template>
  <div class="container">
    <div class="row">
      <div class="col-8 print-full">
        <div class="row">
          <div class="col-9">
            <!-- Character, Player, Class -->
            <div class="row">
              <div class="col">
                <input type="text" class="charsheet-text" v-model="character.name">
                Character Name
              </div>
              <div class="col">
                <input type="text" class="charsheet-text" v-model="character.player">
                Player
              </div>
              <div class="col">
                <div class="charsheet-text">{{classtext()}}</div>
                Class(es)
              </div>
            </div>
            <!-- Race, Background, Alignment -->
            <div class="row">
              <div class="col-4">
                <select @change="setRaceDefaults()" v-model="character.race" class="charsheet-text">
                  <option v-for="race in races" v-bind:key="race.id" :value="race">
                    {{race.singular}}
                  </option>
                </select>
                Race
              </div>
              <div class="col-4">
                <select v-model="character.background" class="charsheet-text">
                  <option v-for="background in backgrounds" :value="background"
                    v-bind:key="background.name">
                    {{background.name}}
                  </option>
                </select>
                Background
              </div>
              <div class="col-4">
                <select v-model="character.alignment" class="charsheet-text">
                  <option value="Lawful Good">Lawful Good</option>
                  <option value="Neutral Good">Neutral Good</option>
                  <option value="Chaotic Good">Chaotic Good</option>
                  <option value="Lawful Neutral">Lawful Neutral</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Chaotic Neutral">Chaotic Neutral</option>
                  <option value="Lawful Evil">Lawful Evil</option>
                  <option value="Neutral Evil">Neutral Evil</option>
                  <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
                Alignment
              </div>
            </div>
            <!-- Faction, Home Country, Home Town -->
            <div class="row">
              <div class="col-4">
                <select class="charsheet-text" v-model="character.faction">
                  <option v-for="faction in factions" :value="faction"
                    v-bind:key="faction.id">{{faction.title}}</option>
                </select>
                Faction
              </div>
              <div class="col-4">
                <input list="countrylist" type="text" class="charsheet-text" v-model="character.homecountry">
                Home Country
              </div>
              <datalist id="countrylist">
                <option :value="nation"
                  v-for="nation in nations" v-bind:key="nation">{{nation}}</option>
              </datalist>
              <div class="col-4">
                <input list="citylist" type="text" class="charsheet-text" v-model="character.hometown">
                Home Town
              </div>
              <datalist id="citylist">
                <option :value="city"
                  v-for="city in cities" v-bind:key="city">{{city}}</option>
              </datalist>
            </div>
          </div>
          <div class="col-3"><img src="/static/images/ddlogo.png" class="ddlogo" /></div>
        </div>
        <div class="row">
          <div class="col">
            <input type="text" class="charsheet-text" v-model="character.age">
            Age
          </div>
          <div class="col">
            <input type="text" class="charsheet-text" v-model="character.gender">
            Gender
          </div>
          <div class="col">
            <input type="text" class="charsheet-text" v-model="character.height">
            Height
          </div>
          <div class="col">
            <input type="text" class="charsheet-text" v-model="character.weight">
            Weight
          </div>
          <div class="col">
            <input type="text" class="charsheet-text" v-model="character.eyes">
            Eyes
          </div>
          <div class="col">
            <input type="text" class="charsheet-text" v-model="character.skin">
            Skin
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="row">
              <!-- Ability Scores -->
              <div class="col-7">
                <table class="abilitytable">
                  <thead>
                    <tr><th>Ability</th><th>Score</th><th>Mod</th><th>Save</th></tr>
                  </thead>
                  <tbody>
                    <tr><th>STR</th><td>{{getStatTotal(0)}}</td><td><span v-if="getStatMod(0) > -1">+</span>{{getStatMod(0)}}</td><td><span v-if="getSaveMod(0) > -1">+</span>{{getSaveMod(0)}}</td></tr>
                    <tr><th>DEX</th><td>{{getStatTotal(1)}}</td><td><span v-if="getStatMod(1) > -1">+</span>{{getStatMod(1)}}</td><td><span v-if="getSaveMod(1) > -1">+</span>{{getSaveMod(1)}}</td></tr>
                    <tr><th>CON</th><td>{{getStatTotal(2)}}</td><td><span v-if="getStatMod(2) > -1">+</span>{{getStatMod(2)}}</td><td><span v-if="getSaveMod(2) > -1">+</span>{{getSaveMod(2)}}</td></tr>
                    <tr><th>INT</th><td>{{getStatTotal(3)}}</td><td><span v-if="getStatMod(3) > -1">+</span>{{getStatMod(3)}}</td><td><span v-if="getSaveMod(3) > -1">+</span>{{getSaveMod(3)}}</td></tr>
                    <tr><th>WIS</th><td>{{getStatTotal(4)}}</td><td><span v-if="getStatMod(4) > -1">+</span>{{getStatMod(4)}}</td><td><span v-if="getSaveMod(4) > -1">+</span>{{getSaveMod(4)}}</td></tr>
                    <tr><th>CHA</th><td>{{getStatTotal(5)}}</td><td><span v-if="getStatMod(5) > -1">+</span>{{getStatMod(5)}}</td><td><span v-if="getSaveMod(5) > -1">+</span>{{getSaveMod(5)}}</td></tr>
                  </tbody>
                </table>
              </div>
              <div class="col-5">
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static center">
                      Initiative: <span v-if="getInitMod() > -1">+</span>{{getInitMod()}}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static">
                      HP: <input type="number" class="charsheet-num" v-model="character.hpcurrent" /> / {{getHPTotal()}} Max <br />
                      Temporary: <input type="number" class="charsheet-num" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static">
                      Hit Dice<br />
                      <div v-for="cc in character.charclasses" v-bind:key="cc.thisclass.name">
                        <input type="number" class="charsheet-num" v-model="cc.hitdice" /> / {{cc.level}}d{{cc.thisclass.hitdie}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- skills -->
              <div class="col-7">
                <table class="abilitytable">
                  <thead>
                    <tr><th>Skill</th><th>Prof?</th><th>Mod</th><th>Magic</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="skill in character.skills" v-bind:key="skill.name">
                      <th>{{skill.name}}</th>
                      <td>
                        <select v-model="skill.prof" class="charsheet-num">
                          <option :value="0">No</option>
                          <option :value="0.5">Half</option>
                          <option :value="1">Yes</option>
                          <option :value="2">Exp</option>
                        </select>
                      </td>
                      <td><span v-if="getSkillMod(skill) > -1">+</span>{{getSkillMod(skill)}}</td>
                      <td><input type="number" class="charsheet-num" v-model="skill.magic" /></td>
                    </tr>
                  </tbody>
                </table>
                <div class="charsheet-static">
                  <h5>Proficiencies and Languages</h5>
                  <textarea v-model="character.proficiencies" class="charsheet-textarea smalltext" id="profbox"></textarea>
                </div>
              </div>
              <div class="col-5">
                <div class="row">
                  <!-- AC -->
                  <div class="col-6">
                    <div class="charsheet-static center">
                      AC<br />{{accalc()}}
                    </div>
                  </div>
                  <!-- Proficiency -->
                  <div class="col-6">
                    <div class="charsheet-static center">
                      Prof<br /><span v-if="profbonus() > -1">+</span>{{profbonus()}}
                    </div>
                  </div>
                </div>
                <!-- Speed -->
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static">
                      Speed: {{getSpeedStat(0)}} ft<br />
                      Fly: {{getSpeedStat(1)}} ft<br />
                      Climb: {{getSpeedStat(2)}} ft<br />
                      Swim: {{getSpeedStat(3)}} ft<br />
                      Burrow: {{getSpeedStat(4)}} ft
                    </div>
                  </div>
                </div>
                <!-- Armor -->
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static" id="armorbox">
                      <h4>Armor</h4>
                      <div class="smalltext" v-for="(armor, index) in character.armors" v-bind:key="index">
                        {{ armor.name }}, {{armor.type}}, AC {{armor.ac}} <input type="checkbox" v-model="armor.equipped" />
                        <button type="button" class="print-hide btn-symbol" @click="armor.edit = true">&#9998;</button>
                        <b-modal v-model="armor.edit">
                          Name:
                          <input type="text" class="form-control" v-model="armor.name" />
                          Type:
                          <select v-model="armor.type" class="form-control">
                            <option>Unarmored Bonus</option>
                            <option>Light Armor</option>
                            <option>Medium Armor</option>
                            <option>Heavy Armor</option>
                            <option>Shield</option>
                          </select>
                          AC:
                          <input type="number" v-model="armor.ac" class="form-control" />
                        </b-modal>
                        <button type="button" @click="removeArmor(index)" class="print-hide btn btn-sm btn-danger">X</button>
                      </div>
                      <button type="button" @click="armormodal = true" class="btn btn-sm btn-primary">+</button>
                      <b-modal v-model="armormodal" @ok="addArmor()">
                        Name:
                        <input type="text" class="form-control" v-model="newarmor.name" />
                        Type:
                        <select v-model="newarmor.type" class="form-control">
                          <option>Unarmored Bonus</option>
                          <option>Light Armor</option>
                          <option>Medium Armor</option>
                          <option>Heavy Armor</option>
                          <option>Shield</option>
                        </select>
                        AC:
                        <input type="number" v-model="newarmor.ac" class="form-control" />
                      </b-modal>
                    </div>
                  </div>
                </div>
                <!-- Equipment -->
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static" id="equipmentbox">
                      <h4>Equipment</h4>
                      <div v-for="(item, index) in character.equipment" v-bind:key="index" class="smalltext">

                        <button type="button" class="print-hide btn-symbol float-left" @click="item.edit = true">&#9998;</button>
                        {{ item.name }} <input type="number" class="charsheet-num" v-model="item.quantity" /> <input type="checkbox" v-model="item.carried" /> <span class="float-right">{{item.weight}} lbs</span><br />
                        <b-modal v-model="item.edit" title="Edit Equipment">
                          Name
                          <input type="text" class="form-control" v-model="item.name" />
                          Weight
                          <input type="number" class="form-control" v-model="item.weight" />
                          Quantity
                          <input type="number" class="form-control" v-model="item.quantity" /><br />
                          <input type="checkbox" v-model="item.attunement" /> Attunement
                          <input type="checkbox" v-model="item.equipped" /> Equipped
                          <input type="checkbox" v-model="item.carried" /> Held
                          <button type="button" class="btn btn-danger print-hide" @click="removeEquipment(index)">Delete</button>
                        </b-modal>
                      </div>
                      <button type="button" class="btn btn-sm btn-primary print-hide" @click="equipModal = true">+</button>
                      <b-modal v-model="equipModal" title="Add Equipment" @ok="addEquipment()">
                        Name
                        <input type="text" class="form-control" v-model="newequip.name" />
                        Weight
                        <input type="number" class="form-control" v-model="newequip.weight" />
                        Quantity
                        <input type="number" class="form-control" v-model="newequip.quantity" />
                        <input type="checkbox" v-model="newequip.attunement" /> Attunement
                        <input type="checkbox" v-model="newequip.equipped" /> Equipped
                        <input type="checkbox" v-model="newequip.carried" /> Held
                      </b-modal>
                      <table class="table table-sm smalltext">
                        <tbody>
                          <tr>
                            <th>CP</th><td><input type="number" class="charsheet-num" v-model="character.cp" /></td>
                            <th>GP</th><td><input type="number" class="charsheet-num" v-model="character.gp" /></td>
                          </tr>
                          <tr>
                            <th>SP</th><td><input type="number" class="charsheet-num" v-model="character.sp" /></td>
                            <th>PP</th><td><input type="number" class="charsheet-num" v-model="character.pp" /></td>
                          </tr>
                          <tr><th colspan="2">Gems (value)</th><td colspan="2"><input type="number" class="charsheet-num" v-model="character.gems" /></td></tr>
                          <tr><th colspan="2">Art (value)</th><td colspan="2"><input type="number" class="charsheet-num" v-model="character.art" /></td></tr>
                        </tbody>
                      </table>
                      <span class="smalltext">Carry Weight: {{ carryWeight() }} / {{ carryMax() }}</span><br />
                      <span class="smalltext">Total Gold: {{ totalGold() }}</span>
                    </div>
                  </div>
                </div>
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
                    ({{attack.damage}}<span v-if="getAttackDamageBonus(attack) > 0"> + {{getAttackDamageBonus(attack)}}</span><span v-if="getAttackDamageBonus(attack) < 0"> - {{getAttackDamageBonus(attack)}}</span> {{attack.dtype}} damage).
                    <button type="button" class="print-hide btn-symbol" @click="attack.edit = true">&#9998;</button>
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
                      Damage Dice:
                      <input type="text" class="form-control" v-model="attack.damage" />
                      Additional Damage Bonus:
                      <input type="text" class="form-control" v-model="attack.damagebonus" />
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
                    </b-modal>
                    <button type="button" @click="removeAttack(index)" class="print-hide btn btn-sm btn-danger">X</button>
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
                    Damage Dice:
                    <input type="text" class="form-control" v-model="newattack.damage" />
                      Additional Damage Bonus:
                      <input type="number" class="form-control" v-model="newattack.damagebonus" />
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
                  </b-modal>
                </div>
                <!-- Injuries -->
                <div class="charsheet-static">
                  Injuries/Madnesses
                  <div v-for="(injury, index) in character.injuries" v-bind:key="index">
                    <input type="text" v-model="injury.name" class="charsheet-text col-9" />
                    <button class="btn btn-sm btn-danger" type="button" @click="removeInjury(index)">X</button>
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
                  <div  v-for="(trait, index) in character.race.traits" class="smalltext" v-bind:key="index">
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
                  <div v-if="level() >= 1" v-html="$options.filters.marked(character.faction.level1)"></div>
                  <div v-if="level() >= 10" v-html="$options.filters.marked(character.faction.level10)"></div>
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
          </div>
        </div>
        <hr style="page-break-after: always" />
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
              <span class="smalltext"><input type="checkbox" v-model="preparedonly" />Prepared Only</span><br />
              {{displayLevel}}
              slots: <input type="number" v-model="character.availableslots[displayLevel]" class="charsheet-num" /> / {{ totalslots(displayLevel) }}<br />
              <span v-if="warlockSlots() > 0">Warlock Slots: <input type="number" v-model="character.warlockslotsavailable" class="charsheet-num" /> / {{ warlockSlots() }} level {{ warlockSlotLevel() }} slots</span>
              <div class="smalltext print-hide">
                <table class="table table-sm">
                  <thead><tr><th>Spell</th><th>Casting Time</th><th>Duration</th><th>-</th></tr></thead>
                  <tbody>
                    <tr v-for="(spell, index) in character.spells[displayLevel]" v-bind:key="spell.title" v-if="(spell.prepared && preparedonly) || !preparedonly">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><span class="clickable" @click="spellDetail(spell)">{{spell.title}}</span>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="smalltext screen-hide">
                <table class="table table-sm">
                  <thead><tr><th>Spell</th><th>Casting Time</th><th>Duration</th><th>Level</th><th>-</th></tr></thead>
                  <tbody>
                    <tr><td colspan="2">Cantrips</td><td colspan="2"></td></tr>
                    <tr v-for="(spell, index) in character.spells['cantrip']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 1</td><td colspan="2">{{totalslots('level1')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level1']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 2</td><td colspan="2">{{totalslots('level2')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level2']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 3</td><td colspan="2">{{totalslots('level3')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level3']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 4</td><td colspan="2">{{totalslots('level4')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level4']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 5</td><td colspan="2">{{totalslots('level5')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level5']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 6</td><td colspan="2">{{totalslots('level6')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level6']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 7</td><td colspan="2">{{totalslots('level7')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level7']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 8</td><td colspan="2">{{totalslots('level8')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level8']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                    <tr><td colspan="2">Level 9</td><td colspan="2">{{totalslots('level9')}}</td></tr>
                    <tr v-for="(spell, index) in character.spells['level9']" v-bind:key="spell.title">
                      <td>
                        <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{spell.title}}</a>
                      </td>
                      <td>{{spell.castingTime}}</td>
                      <td>{{spell.duration}}</td>
                      <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button type="button" @click="spellModal = true" class="btn btn-sm btn-primary print-hide">+</button>
            </div>
            <b-modal v-model="spellModal" title="Add Spell" class="modal-lg">
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
              <table class="table">
                <thead><tr><th>Spell</th><th>Level</th></tr></thead>
                <tbody>
                  <tr v-for="spell in filteredspells" v-bind:key="spell.title">
                    <td><span class="clickable" @click="addSpell(spell)">{{spell.title}}</span></td><td>{{spell.level}}</td>
                  </tr>
                </tbody>
              </table>
            </b-modal>
            <b-modal v-model="spellDetailModal" @ok="spellDetailModal = false" id="spellmodal" size="lg" :title="detailspell.title" ok-only>
              <h4>
                <strong>{{detailspell.school}}
                  {{detailspell.level.replace('level', 'level ')}}
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
        </div>
        <!-- Resources -->
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
      </div>
      <div class="col-4 print-hide">
        <div class="row">
          <div class="btn-group col-4">
            <input type="button" value="Save" @click="save()" class="btn btn-primary" />
            <input type="button" value="Load" @click="load()" class="btn btn-success" />
          </div>
          <input type="file" id="fileload" class="col-8" />
        </div>
        <div class="row" style="margin-top: 10px;">
          <div class="btn-group col-12">
            <button class="btn btn-primary" @click="shortrest()">Short Rest</button>
            <button class="btn btn-success" @click="longrest()">Long Rest</button>
          </div>
        </div>
        <h2>Build</h2>
        <div class="row" v-for="(charclass, index) in character.charclasses"
          v-bind:key="index">
          <div class="col-3">
            <select class="charsheet-text"
              v-model="charclass.thisclass">
              <option v-for="classoption in classes" :value="classoption"
                v-bind:key="classoption.name">
                {{classoption.name}}
              </option>
            </select>
          </div>
          <div class="col-6">
            <select class="charsheet-text"
              v-model="charclass.selsubclass">
              <option v-for="subc in charclass.thisclass.subclass" :value="subc"
                v-bind:key="subc.name">
                {{subc.name}}
              </option>
            </select>
          </div>
          <div class="col-2">
            <input type="number" class="charsheet-text" v-model="charclass.level" />
          </div>
          <div class="col-1">
            <button type="button" class="btn btn-sm btn-danger" @click="removeclass(index)">X</button>
          </div>
        </div>
        <div class="row">
          <div class='col btn-group'>
            <button class="btn btn-primary btn-sm" type="button" @click="addclass()">+</button>
          </div>
        </div>
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
            Point Buy Total: {{ pointbuy() }}
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
      </div>
    </div>
  </div>
</template>
<style src="./characterbuilder.scss" scoped lang="scss"></style>
<script src="./characterbuilder.js"></script>
