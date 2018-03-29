<template>
  <div class="container">
    <div class="row">
      <div class="col-8 print-full">
        <div class="row">
          <div class="col-9">
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
                      HP: <input type="number" class="charsheet-num" /> / {{getHPTotal()}} Max <br />
                      Temporary: <input type="number" class="charsheet-num" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static">
                      Hit Dice<br />
                      <div v-for="cc in character.charclasses" v-bind:key="cc.thisclass.name">
                        <input type="number" class="charsheet-num" /> / {{cc.level}}d{{cc.thisclass.hitdie}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
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
              </div>
              <div class="col-5">
                <div class="row">
                  <div class="col-6">
                    <div class="charsheet-static center">
                      AC<br />10
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="charsheet-static center">
                      Prof<br /><span v-if="profbonus() > -1">+</span>{{profbonus()}}
                    </div>
                  </div>
                </div>
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
                <div class="row">
                  <div class="col">
                    <div class="charsheet-static">
                      <h4>Attacks</h4>
                    </div>
                    <div class="charsheet-static">
                      <h4>Armor</h4>
                    </div>
                    <div class="charsheet-static">
                      <h4>Equipment</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col">
                <div class="charsheet-static">
                  Injuries
                  <input type="text" class="charsheet-text" />
                  <input type="text" class="charsheet-text" />
                  <input type="text" class="charsheet-text" />
                </div>
                <div class="charsheet-static">
                  Feats/ASIs
                  <select class="charsheet-text">
                    <option>Text</option>
                  </select>
                </div>
                <div class="charsheet-static">
                  Features
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 print-hide">
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
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./characterbuilder.scss" scoped lang="scss"></style>
<script src="./characterbuilder.js"></script>
