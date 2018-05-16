<template>
  <div class="container">
    <div class="row" v-if="!mobile">
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
                  <option :value="character.race">{{character.race.singular}}</option>
                  <option v-for="race in races" v-bind:key="race.id" :value="race">
                    {{race.singular}}
                  </option>
                </select>
                Race
              </div>
              <div class="col-4">
                <select v-model="character.background" class="charsheet-text">
                  <option :value="character.background">{{character.background.name}}</option>
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
                  <option :value="character.faction">{{character.faction.title}}</option>
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
                        {{ armor.name }}, {{armor.type}}, AC {{armorac(armor)}} <input type="checkbox" v-model="armor.equipped" />
                        <button type="button" class="print-hide btn-symbol" @click="armor.edit = true">&#9998;</button>
                        <button type="button" @click="removeArmor(index)" class="print-hide btn btn-sm btn-danger">X</button>
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
                          <div v-if="armor.type==='Unarmored Bonus'">
                            Unarmored Bonus Stat
                            <select v-model="armor.unarmoredstat" class="form-control">
                              <option :value="0">Strength</option>
                              <option :value="1">Dexterity</option>
                              <option :value="2">Constitution</option>
                              <option :value="3">Intelligence</option>
                              <option :value="4">Wisdom</option>
                              <option :value="5">Charisma</option>
                            </select>
                          </div>
                          AC:
                          <input type="number" v-model="armor.ac" class="form-control" />
                        </b-modal>
                      </div>
                      <button type="button" @click="armormodal = true" class="btn btn-sm btn-primary print-hide">+</button>
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
                        <div v-if="newarmor.type==='Unarmored Bonus'">
                          Unarmored Bonus Stat
                          <select v-model="newarmor.unarmoredstat" class="form-control">
                            <option :value="0">Strength</option>
                            <option :value="1">Dexterity</option>
                            <option :value="2">Constitution</option>
                            <option :value="3">Intelligence</option>
                            <option :value="4">Wisdom</option>
                            <option :value="5">Charisma</option>
                          </select>
                        </div>
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
                      <div v-for="container in equipmentContainers" v-bind:key="container.name">
                        <h4>
                          {{container.name}} <span class="smalltext">{{container.contains}} / {{container.capacity}} lbs <input type="button" class="btn btn-danger btn-sm" value="X" @click="removeContainer(container.container)" /></span>
                        </h4>
                        <div v-for="(item, index) in container.equipment" v-bind:key="index" class="smalltext">
                          <button type="button" class="print-hide btn-symbol float-left" @click="item.edit = true">&#9998;</button>
                          {{ item.name }} <input type="number" class="charsheet-num" v-model="item.quantity" /> <span class="float-right">{{item.weight}} lbs</span><br />
                          <b-modal v-model="item.edit" title="Edit Equipment">
                            Name
                            <input type="text" class="form-control" v-model="item.name" />
                            Weight
                            <input type="number" class="form-control" v-model="item.weight" />
                            Quantity
                            <input type="number" class="form-control" v-model="item.quantity" /><br />
                            <input type="checkbox" v-model="item.attunement" /> Attunement<br />
                            Container
                            <select class="form-control" v-model="item.container">
                              <option v-for="container in character.containers" v-bind:key="container.name" :value="container">{{container.name}}</option>
                            </select><br />
                            <button type="button" class="btn btn-danger print-hide" @click="removeEquipment(index)">Delete</button>
                          </b-modal>
                        </div>
                      </div>
                      <button type="button" class="btn btn-sm btn-primary print-hide" @click="equipModal = true">+Equipment</button>
                      <button type="button" class="btn btn-sm btn-primary print-hide" @click="containModal = true">+Container</button>
                      <b-modal v-model="equipModal" title="Add Equipment" @ok="addEquipment()">
                        Name
                        <input type="text" class="form-control" v-model="newequip.name" />
                        Weight
                        <input type="number" class="form-control" v-model="newequip.weight" />
                        Quantity
                        <input type="number" class="form-control" v-model="newequip.quantity" />
                        <input type="checkbox" v-model="newequip.attunement" /> Attunement<br />
                        Container
                          <select class="form-control" v-model="newequip.container">
                            <option v-for="container in character.containers" v-bind:key="container.name" :value="container">{{container.name}}</option>
                          </select>
                      </b-modal>
                      <b-modal v-model="containModal" title="Add Container" @ok="addContainer()">
                        Name
                        <input type="text" class="form-control" v-model="newcontain.name" />
                        Capacity
                        <input type="number" class="form-control" v-model="newcontain.capacity" /><br />
                        Weight Counts
                        <input type="checkbox" v-model="newcontain.weightCounts" /><br />
                        Select Predefined Type
                        <select v-model="newcontain" class="form-control">
                          <option v-for="c in ctypes" :value="c" v-bind:key="c.name">{{c.name}}</option>
                        </select>
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
                  <div v-if="level() >= 1" v-html="$options.filters.marked(character.faction.level1)" class="smalltext"></div>
                  <div v-if="level() >= 10" v-html="$options.filters.marked(character.faction.level10)" class="smalltext"></div>
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
              <span v-if="warlockSlots() > 0">Warlock Slots: <input type="number" v-model="character.warlockslotsavailable" class="charsheet-num" /> /
                {{ warlockSlots() }} level {{ warlockSlotLevel() }} slots</span>
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
                        <select v-model="spell.castLevel">
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
      </div>
      <div class="col-4 print-hide">
        <div class="row">
          <h4 class="col-12">Load/Save From Disk</h4>
          <div class="btn-group col-4">
            <input type="button" value="Save" @click="save()" class="btn btn-primary" />
            <input type="button" value="Load" @click="load()" class="btn btn-success" />
          </div>
          <input type="file" id="fileload" class="col-8" />
        </div>
        <div class="row" v-if="loggedin">
          <h4 class="col-12">Load/Save From Server</h4>
          <div class="btn-group col-12">
            <input type="button" v-if="character._id" value="Save" @click="updateToServer()" class="btn btn-primary" />
            <input type="button" value="Save New" @click="newToServer()" class="btn btn-primary" />
            <input type="button" value="Load" @click="getFromServer()" class="btn btn-success" />
          </div>
        </div>
        <div class="row" v-if="googletoken">
          <h4 class="col-12">Load/Save From Google</h4>
          <div class="col" style="margin-top:15px;">
            <img src="https://developers.google.com/drive/images/drive_icon.png" alt="Google Drive" style="width:38px;height:38px;">
            <div class="btn-group">
              <button type="button" @click="getDriveFiles()" class="btn btn-primary">Load</button>
              <button type="button" @click="saveToDrive()" class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <p class="col">Login to Google from the Menu to enable load and save from drive.</p>
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
              <option :value="charclass.thisclass">{{charclass.thisclass.name}}</option>
              <option v-for="classoption in classes" :value="classoption"
                v-bind:key="classoption.name">
                {{classoption.name}}
              </option>
            </select>
          </div>
          <div class="col-6">
            <select class="charsheet-text"
              v-model="charclass.selsubclass">
              <option :value="charclass.thisclass">{{charclass.thisclass.name}}</option>
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
            Point Buy Total: {{ pointbuy() }}<br />
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
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.name">
              Character Name
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.player">
              Player
            </div>
          </div>
          <div class="row" v-for="(charclass, index) in character.charclasses"
            v-bind:key="index">
            <div class="col-12">
              <select class="charsheet-text"
                v-model="charclass.thisclass">
                <option :value="charclass.thisclass">{{charclass.thisclass.name}}</option>
                <option v-for="classoption in classes" :value="classoption"
                  v-bind:key="classoption.name">
                  {{classoption.name}}
                </option>
              </select>
            </div>
            <div class="col-12">
              <select class="charsheet-text"
                v-model="charclass.selsubclass">
                <option :value="charclass.selsubclass">{{charclass.selsubclass.name}}</option>
                <option v-for="subc in charclass.thisclass.subclass" :value="subc"
                  v-bind:key="subc.name">
                  {{subc.name}}
                </option>
              </select>
            </div>
            <div class="col-12">
              <input type="number" class="charsheet-text" v-model="charclass.level" />
              <button type="button" class="btn btn-sm btn-danger" @click="removeclass(index)">X</button>
            </div>
          </div>
          <div class="row">
            <div class='col-12 btn-group'>
              <button class="btn btn-primary btn-sm" type="button" @click="addclass()">+</button>
            </div>
            Class(es)
          </div>
          <div class="row">
            <div class="col">
              <select @change="setRaceDefaults()" v-model="character.race" class="charsheet-text">
                <option :value="character.race">{{character.race.singular}}</option>
                <option v-for="race in races" v-bind:key="race.id" :value="race">
                  {{race.singular}}
                </option>
              </select>
              Race
            </div>
          </div>
          <div class="row">
            <div class="col">
              <select v-model="character.background" class="charsheet-text">
                <option :value="character.background">{{character.background.name}}</option>
                <option v-for="background in backgrounds" :value="background"
                  v-bind:key="background.name">
                  {{background.name}}
                </option>
              </select>
              Background
            </div>
          </div>
          <div class="row">
            <div class="col">
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
            <div class="col">
              <select class="charsheet-text" v-model="character.faction">
                <option :value="character.faction">{{character.faction.title}}</option>
                <option v-for="faction in factions" :value="faction"
                  v-bind:key="faction.id">{{faction.title}}</option>
              </select>
              Faction
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input list="countrylist" type="text" class="charsheet-text" v-model="character.homecountry">
              Home Country
            </div>
            <datalist id="countrylist">
              <option :value="nation"
                v-for="nation in nations" v-bind:key="nation">{{nation}}</option>
            </datalist>
          </div>
          <div class="row">
            <div class="col">
              <input list="citylist" type="text" class="charsheet-text" v-model="character.hometown">
              Home Town
            </div>
            <datalist id="citylist">
              <option :value="city"
                v-for="city in cities" v-bind:key="city">{{city}}</option>
            </datalist>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.age">
              Age
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.gender">
              Gender
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.height">
              Height
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.weight">
              Weight
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.eyes">
              Eyes
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text" v-model="character.skin">
              Skin
            </div>
          </div>
        </b-tab>
        <b-tab title="Stats">
          <div class="row">
            <div class="col">
              <table class="abilitytable">
                <thead>
                  <tr><th>Stat</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Total</th><td>{{getStatTotal(0)}}</td><td>{{getStatTotal(1)}}</td><td>{{getStatTotal(2)}}</td>
                    <td>{{getStatTotal(3)}}</td><td>{{getStatTotal(4)}}</td><td>{{getStatTotal(5)}}</td>
                  </tr>
                  <tr>
                    <th>Mod</th><td>{{getStatMod(0)}}</td><td>{{getStatMod(1)}}</td><td>{{getStatMod(2)}}</td>
                    <td>{{getStatMod(3)}}</td><td>{{getStatMod(4)}}</td><td>{{getStatMod(5)}}</td>
                  </tr>
                  <tr>
                    <th>Save</th><td>{{getSaveMod(0)}}</td><td>{{getSaveMod(1)}}</td><td>{{getSaveMod(2)}}</td>
                    <td>{{getSaveMod(3)}}</td><td>{{getSaveMod(4)}}</td><td>{{getSaveMod(5)}}</td>
                  </tr>
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
                    <th>Save+</th>
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
              Point Buy Total: {{ pointbuy() }}<br />
              Stat Rolls: <span v-for="(roll, index) in statRolls" v-bind:key="index">{{roll}} </span>
              <input type="button" @click="rollStats()" value="Roll!" />
            </div>
          </div>
        </b-tab>
        <b-tab title="Skills">
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
        </b-tab>
        <b-tab title="Combat">
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
              <div class="charsheet-static">
                <h4>Armor</h4>
                <div class="smalltext" v-for="(armor, index) in character.armors" v-bind:key="index">
                  {{ armor.name }}, {{armor.type}}, AC {{armorac(armor)}} <input type="checkbox" v-model="armor.equipped" />
                  <button type="button" class="print-hide btn-symbol" @click="armor.edit = true">&#9998;</button>
                  <button type="button" @click="removeArmor(index)" class="print-hide btn btn-sm btn-danger">X</button>
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
                    <div v-if="armor.type==='Unarmored Bonus'">
                      Unarmored Bonus Stat
                      <select v-model="armor.unarmoredstat" class="form-control">
                        <option :value="0">Strength</option>
                        <option :value="1">Dexterity</option>
                        <option :value="2">Constitution</option>
                        <option :value="3">Intelligence</option>
                        <option :value="4">Wisdom</option>
                        <option :value="5">Charisma</option>
                      </select>
                    </div>
                    <span v-if="armor.type === 'Unarmored Bonus'">Additional Bonus </span>AC:
                    <input type="number" v-model="armor.ac" class="form-control" />
                  </b-modal>
                </div>
                <button type="button" @click="armormodal = true" class="btn btn-sm btn-primary print-hide">+</button>
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
                  <div v-if="newarmor.type==='Unarmored Bonus'">
                    Unarmored Bonus Stat
                    <select v-model="armor.unarmoredstat" class="form-control">
                      <option :value="0">Strength</option>
                      <option :value="1">Dexterity</option>
                      <option :value="2">Constitution</option>
                      <option :value="3">Intelligence</option>
                      <option :value="4">Wisdom</option>
                      <option :value="5">Charisma</option>
                    </select>
                  </div>
                  AC:
                  <input type="number" v-model="newarmor.ac" class="form-control" />
                </b-modal>
              </div>
            </div>
          </div>
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
                <span v-if="warlockSlots() > 0">Warlock Slots: <input type="number" v-model="character.warlockslotsavailable" class="charsheet-num" /> / {{ warlockSlots() }} level {{ warlockSlotLevel() }} slots</span>
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
                        <select v-model="spell.castLevel">
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
          <div class="charsheet-static" id="equipmentbox">
            <h4>Equipment</h4>
            <div v-for="container in equipmentContainers" v-bind:key="container.name">
              <h4>
                {{container.name}} <span class="smalltext">{{container.contains}} / {{container.capacity}} lbs <input type="button" class="btn btn-danger btn-sm" value="X" @click="removeContainer(container.container)" /></span>
              </h4>
              <div v-for="(item, index) in container.equipment" v-bind:key="index" class="smalltext">
                <button type="button" class="print-hide btn-symbol float-left" @click="item.edit = true">&#9998;</button>
                {{ item.name }} <input type="number" class="charsheet-num" v-model="item.quantity" /> <span class="float-right">{{item.weight}} lbs</span><br />
                <b-modal v-model="item.edit" title="Edit Equipment">
                  Name
                  <input type="text" class="form-control" v-model="item.name" />
                  Weight
                  <input type="number" class="form-control" v-model="item.weight" />
                  Quantity
                  <input type="number" class="form-control" v-model="item.quantity" /><br />
                  <input type="checkbox" v-model="item.attunement" /> Attunement<br />
                  Container
                  <select class="form-control" v-model="item.container">
                    <option v-for="container in character.containers" v-bind:key="container.name" :value="container">{{container.name}}</option>
                  </select><br />
                  <button type="button" class="btn btn-danger print-hide" @click="removeEquipment(index)">Delete</button>
                </b-modal>
              </div>
            </div>
            <button type="button" class="btn btn-sm btn-primary print-hide" @click="equipModal = true">+Equipment</button>
            <button type="button" class="btn btn-sm btn-primary print-hide" @click="containModal = true">+Container</button>
            <b-modal v-model="equipModal" title="Add Equipment" @ok="addEquipment()">
              Name
              <input type="text" class="form-control" v-model="newequip.name" />
              Weight
              <input type="number" class="form-control" v-model="newequip.weight" />
              Quantity
              <input type="number" class="form-control" v-model="newequip.quantity" />
              <input type="checkbox" v-model="newequip.attunement" /> Attunement<br />
              Container
                <select class="form-control" v-model="newequip.container">
                  <option v-for="container in character.containers" v-bind:key="container.name" :value="container">{{container.name}}</option>
                </select>
            </b-modal>
            <b-modal v-model="containModal" title="Add Container" @ok="addContainer()">
              Name
              <input type="text" class="form-control" v-model="newcontain.name" />
              Capacity
              <input type="number" class="form-control" v-model="newcontain.capacity" /><br />
              Weight Counts
              <input type="checkbox" v-model="newcontain.weightCounts" /><br />
              Select Predefined Type
              <select v-model="newcontain" class="form-control">
                <option v-for="c in ctypes" :value="c" v-bind:key="c.name">{{c.name}}</option>
              </select>
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
        </b-tab>
        <b-tab title="Build">
          <div class="row">
            <h4 class="col-12">Load/Save From Disk</h4>
            <div class="btn-group col-12">
              <input type="button" value="Save" @click="save()" class="btn btn-primary" />
              <input type="button" value="Load" @click="load()" class="btn btn-success" />
            </div>
            <input type="file" id="fileload" class="col-12" />
          </div>
          <div class="row" v-if="loggedin">
            <h4 class="col-12">Load/Save From Server</h4>
            <div class="btn-group col-12">
              <input type="button" v-if="character._id" value="Save" @click="updateToServer()" class="btn btn-primary" />
              <input type="button" value="Save New" @click="newToServer()" class="btn btn-primary" />
              <input type="button" value="Load" @click="getFromServer()" class="btn btn-success" />
            </div>
          </div>
          <div class="row" v-if="googletoken">
            <h4 class="col-12">Load/Save From Google</h4>
            <div class="col" style="margin-top:15px;">
              <img src="https://developers.google.com/drive/images/drive_icon.png" alt="Google Drive" style="width:38px;height:38px;">
              <div class="btn-group">
                <button type="button" @click="getDriveFiles()" class="btn btn-primary">Load</button>
                <button type="button" @click="saveToDrive()" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <h4 class="col-12">Load/Save From Google</h4>
            <p class="col">Login to Google from the Menu to enable load and save from drive.</p>
          </div>
          <div class="row" style="margin-top: 10px;">
            <div class="btn-group col-12">
              <button class="btn btn-primary" @click="shortrest()">Short Rest</button>
              <button class="btn btn-success" @click="longrest()">Long Rest</button>
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
        </b-tab>
      </b-tabs>
    </div>
    <b-modal id="drivemodal" title="Load File from Google Drive">
      <table class="table table-striped">
        <tr>
          <th>File Name</th><th>Modified Date</th>
        </tr>
        <tr v-for="(file, index) in filelist" v-bind:key="index">
          <td><span class="clickable" @click="loadFromDrive(file.id)">{{file.name}}</span></td>
          <td>{{file.modifiedTime | date}}</td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="servermodal" title="Load File from Server">
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in characters" v-bind:key="character._id">
          <td><span class="clickable" @click="loadChar(character)">{{character.name}}</span></td><td>{{charlevel(character)}}</td>
          <td><input type="button" @click="deleteFromServer(character)" class="btn btn-danger" value="X" /></td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="loading"
      no-close-on-backdrop no-close-on-esc hide-header hide-footer>
      <img src="/static/images/giphy.gif" alt="Loading" />
    </b-modal>
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
