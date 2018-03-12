<template>
  <div class="col-sm-12">
    <h1>Character Builder</h1>
    <div class="row">
      <div class="col-md-4">
        <label style="width:100%;"><input id="charname" type="text" class="form-control" v-model="character.name" />Character Name</label>
        <label style="width:100%;"><input type="file" class="form-control" id="fileload" /></label>
        <div class="btn-group" style="width:100%;">
          <input type="button" class="btn btn-success" value="Load" @click="character.load()" />
          <input type="button" class="btn btn-primary" value="Save" @click="character.save()" />
          <button id="authorize-button" class="btn" style="display: none;">Authorize</button>
          <button id="signout-button" class="btn" style="display: none;">Sign Out</button>
        </div>
      </div>
      <div class="col-md-8">
        <div class="bordered-section row">
          <label class="col-sm-8">
            <span v-for="myclass in character.classes" v-bind:key="myclass.thisclass.name">
              <select v-model="myclass.thisclass" class="form-control" style="width: 38%; display: inline-block;">
                <option :value="selclass" v-for="selclass in classes" v-bind:key="selclass.name">{{selclass.name}}</option>
              </select>
              <select v-model="myclass.selsubclass" class="form-control" style="width: 38%; display: inline-block;">
                <option :value="subc" v-for="subc in myclass.thisclass.subclass" v-bind:key="subc.name">{{subc.name}}</option>
              </select>
              <input type="number" v-model="myclass.level" class="form-control" style="width:15%; display: inline-block"/>
              <button class="btn btn-danger" @click="character.removeClass(myclass)">&times;</button>
            </span>
            Class & Level
            <div class="btn-group" style="width:20%; margin-top: 5px;">
              <button class="btn btn-success" @click="character.addClass()">+</button>
            </div>
          </label>
          <label class="col-sm-4">
          <select v-model="character.race" class="form-control">
            <option :value="race" v-for="race in races" v-bind:key="race.id">{{race.name}}</option>
          </select>Race
        </label>
        <label class="col-sm-8">
          <select v-model="character.background" class="form-control">
            <option :value="background" v-for="background in backgrounds" v-bind:key="background.name">{{background.name}}</option>
          </select> Background
        </label>
          <div class="col-sm-4">
            <select v-model="character.subrace" class="form-control">
              <option :value="subrace" v-for="subrace in character.race.subraces" v-bind:key="subrace.id">{{subrace.name}}</option>
            </select>
            Sub-Race
          </div>
          <div class="clear-b">&nbsp;</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class='col-lg-3'>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Stat</th><th>Score</th><th>Racial</th><th>Bonus</th><th>Save</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>STR</th>
              <td><input type="number" v-model="character.str" class="statscore" min="0" /></td>
              <td><input type="number" v-model="character.racialstr" class="statscore" min="-5" /></td>
              <td><span v-if="character.str >= 10">+</span>{{character.strmod()}}</td>
              <td><input type="checkbox" v-model="character.strsave" /> <span v-if="character.strsavebonus() >= 0">+</span>{{character.strsavebonus()}}</td>
            </tr>
            <tr>
              <th>DEX</th>
              <td><input type="number" v-model="character.dex" class="statscore" min="0" /></td>
              <td><input type="number" v-model="character.racialdex" class="statscore" min="-5" /></td>
              <td><span v-if="character.dex >= 10">+</span>{{character.dexmod()}}</td>
              <td><input type="checkbox" v-model="character.dexsave" /> <span v-if="character.dexsavebonus() >= 0">+</span>{{character.dexsavebonus()}}</td>
            </tr>
            <tr>
              <th>CON</th>
              <td><input type="number" v-model="character.con" class="statscore" min="0" /></td>
              <td><input type="number" v-model="character.racialcon" class="statscore" min="-5" /></td>
              <td><span v-if="character.con >= 10">+</span>{{character.conmod()}}</td>
              <td><input type="checkbox" v-model="character.consave" /> <span v-if="character.consavebonus() >= 0">+</span>{{character.consavebonus()}}</td>
            </tr>
            <tr>
              <th>INT</th>
              <td><input type="number" v-model="character.int" class="statscore" min="0" /></td>
              <td><input type="number" v-model="character.racialint" class="statscore" min="-5" /></td>
              <td><span v-if="character.int >= 10">+</span>{{character.intmod()}}</td>
              <td><input type="checkbox" v-model="character.intsave" /> <span v-if="character.intsavebonus() >= 0">+</span>{{character.intsavebonus()}}</td>
            </tr>
            <tr>
              <th>WIS</th>
              <td><input type="number" v-model="character.wis" class="statscore" min="0" /></td>
              <td><input type="number" v-model="character.racialwis" class="statscore" min="-5" /></td>
              <td><span v-if="character.wis >= 10">+</span>{{character.wismod()}}</td>
              <td><input type="checkbox" v-model="character.wissave" /> <span v-if="character.wissavebonus() >= 0">+</span>{{character.wissavebonus()}}</td>
            </tr>
            <tr>
              <th>CHA</th>
              <td><input type="number" v-model="character.cha" class="statscore" min="0" /></td>
              <td><input type="number" v-model="character.racialcha" class="statscore" min="-5" /></td>
              <td><span v-if="character.cha >= 10">+</span>{{character.chamod()}}</td>
              <td><input type="checkbox" v-model="character.chasave" /> <span v-if="character.chasavebonus() >= 0">+</span>{{character.chasavebonus()}}</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Point Buy Total: {{character.pointbuytotal()}}</strong></p>
        <h4>Save Bonus Modifier</h4>
        <table class="table">
          <thead><tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr></thead>
          <tbody>
            <tr>
              <td><input type="number" class="statscore" v-model="character.strsavemagic" /></td>
              <td><input type="number" class="statscore" v-model="character.dexsavemagic" /></td>
              <td><input type="number" class="statscore" v-model="character.consavemagic" /></td>
              <td><input type="number" class="statscore" v-model="character.intsavemagic" /></td>
              <td><input type="number" class="statscore" v-model="character.wissavemagic" /></td>
              <td><input type="number" class="statscore" v-model="character.chasavemagic" /></td>
            </tr>
          </tbody>
        </table>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Skill</th><th>Mod</th><th>Prof?</th><th>Exp?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="skill in character.skills" v-bind:key="skill.name">
              <th>{{skill.name}}</th><td>{{character.getSkillMod(skill.name)}}</td><td><input type="checkbox" v-model="skill.prof" /></td>
              <td><input type="checkbox" v-model="skill.expertise" /></td>
            </tr>
          </tbody>
        </table>
        <label>
          <input class="checkbox-inline" type="checkbox" v-model="character.jack" />Jack-of-All Trades
        </label>
        <div class="bordered-section">
          <h4>Proficiencies</h4>
          <textarea v-model="character.proficiencies" class="form-control" style="max-width: 100%;"></textarea>
        </div>
      </div>
      <div class='col-lg-5'>
        <div class="row">
          <div class="col-4">
            <label class="bordered-section" style="text-align:center;">
              <span v-if="character.prof() >= 0">+</span>{{character.prof()}}<br />
              Proficiency
            </label>
          </div>
          <div class="col-4">
            <label class="bordered-section" style="margin-top:10px; text-align:center;">
              {{character.ac()}}<br />
              AC
            </label>
          </div>
          <div class="col-4">
            <div class="bordered-section" style="text-align:center;">
              <strong>{{character.init()}}</strong><br />
              <label class="form-inline">Bonus: <input type="number" class="form-control" v-model="character.initiative" style="max-width: 50%" /></label>
              Initiative
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <label class="bordered-section">
              <div style="width: 100%; margin-top: 10px"><input type="number" class="statscore" v-model="character.hpcurrent"/> / <input type="number" class="statscore" v-model="character.hpmax" />
              </div>
              Hit Points
              <p>
                NPC: {{character.npchp()}}, Heroic: {{character.heroichp()}}
              </p>
            </label>
          </div>
          <div class="col-6">
            <label class="bordered-section">
              Hit Dice
              <div v-for="charclass in character.classes" v-bind:key="charclass.thisclass.name">
                <input class="statscore" type="number" v-model="charclass.thisclass.hitdieremaining" />d{{charclass.thisclass.hitdie}} max {{charclass.thisclass.level}}
              </div>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <label class="bordered-section">
              <input type="text" v-model="character.speed" class="form-control" />Speed
            </label>
          </div>
          <div class="col-4">
            <div class="bordered-section">
              <h4>Death Saves</h4>
              <strong>Successes</strong>
                <label><input type="checkbox" v-model="character.deathsuccess1"  class="checkbox-inline" /></label>
                <label><input type="checkbox" v-model="character.deathsuccess2" class="checkbox-inline" /></label>
                <label><input type="checkbox" v-model="character.deathsuccess3" class="checkbox-inline" /></label><br />
              <strong>Failures</strong>
              <label><input type="checkbox" v-model="character.deathfailure1"  class="checkbox-inline" /></label>
              <label><input type="checkbox" v-model="character.deathfailure2" class="checkbox-inline" /></label>
              <label><input type="checkbox" v-model="character.deathfailure3" class="checkbox-inline" /></label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="bordered-section">
              <h4>Attacks</h4>
              <div v-for="attack in character.attacks" v-bind:key="attack.id">
                <input type="text" v-model="attack.name" class="form-control" placeholder="Attack Name" style="margin: 5px 0;" />
                <label>Bonus: <input type="number" class="statscore" v-model="attack.att" /></label>
                <label>Damage: <input type="text" class="statscore" style="min-width: 100px;" v-model="attack.dmg" /></label>
                <label>Range: <input type="text" class="statscore" v-model="attack.range" /></label>
                <button class="btn btn-danger" @click="character.removeAttack(attack)">&times;</button>
              </div>
              <button class="btn btn-success" @click="character.addAttack()">+</button>
            </div>
          </div>
          <div class="col-12">
            <div class="bordered-section">
              <h4>Armor</h4>
              <div v-for="armor in character.armor" v-bind:key="armor.id">
                <input type="text" v-model="armor.name" class="form-control" placeholder="Armor Name" style="margin: 5px 0;" />
                <label>AC:
                <input type="number" class="statscore" v-model="armor.ac" /></label>
                <label>Type: <select class="statscore" style="min-width:120px;" v-model="armor.type">
                  <option value="unarmored">Unarmored</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="medium+">Medium (max 3)</option>
                  <option value="heavy">Heavy</option>
                  <option value="shield">Shield</option>
                </select></label>
                <label>Equipped: <input type="checkbox" v-model="armor.equipped" class="checkbox-inline" /></label>
                <div class="btn-group"><button class="btn btn-danger" @click="character.removeArmor(armor)" style="margin-top: 10px;">&times;</button></div>
              </div>
              <button class="btn btn-success" @click="character.addArmor()">+</button>
            </div>
          </div>
          <div class="col-12">
            <div class="bordered-section">
              <h4>Equipment</h4>
              <table class="table">
                <thead>
                  <tr><th>Item</th><th>Weight</th><th>Quantity</th><th>Carried</th><th>Delete</th></tr>
                </thead>
                <tbody>
                  <tr data-ng-repeat="equipment in character.equipment">
                    <td><input type="text" data-ng-model="equipment.name" class="form-control table-input" placeholder="Item" /></td>
                    <td><input type="number" class="form-control table-input" data-ng-model="equipment.weight" /></td>
                    <td><input type="number" class="form-control table-input" data-ng-model="equipment.quantity" /></td>
                    <td><input type="checkbox" class="checkbox" style="margin-top:10px;" data-ng-model="equipment.carried" /></td>
                    <td><button class="btn btn-danger" data-ng-click="character.removeEquipment(equipment)" style="padding: 2px 10px">&times;</button></td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-success clear-b" data-ng-click="character.addEquipment()">+</button>
              <button class="btn btn-success clear-b" data-ng-click="addEquipmentFromList()">Add From List</button>
              <div class="row">
                <label class="col-sm-2"><input type="number" class="statscore" style="width:100%;" data-ng-model="character.cp" />CP</label>
                <label class="col-sm-2"><input type="number" class="statscore" style="width:100%;" data-ng-model="character.sp" />SP</label>
                <label class="col-sm-2"><input type="number" class="statscore" style="width:100%;" data-ng-model="character.ep" />EP</label>
                <label class="col-sm-2"><input type="number" class="statscore" style="width:100%;" data-ng-model="character.gp" />GP</label>
                <label class="col-sm-2"><input type="number" class="statscore" style="width:100%;" data-ng-model="character.pp" />PP</label>
                <label class="col-sm-2">{{character.cp/100 + character.sp/10 + character.gp + character.pp*10 + character.ep/2}}<br />Wealth</label>
              </div>
              <label>Weight Carried: {{character.carryWeight()}} / {{character.carryCapacity()}}</label>
              <label><input type="checkbox" class="checkbox-inline" data-ng-model="character.powerfulbuild" /> Powerful Build</label>
            </div>
          </div>
          <div class="col-12">
            <div class="bordered-section">
              <h4>Attack Bonus and Save DC</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th></th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Bonus</th>
                    <th colspan="2">Atk Magic Bonus</th><td><input type="number" class="statscore" data-ng-model="character.attMagic" /></td>
                    <th colspan="2">Save Magic Bonus</th><td><input type="number" class="statscore" data-ng-model="character.saveMagic" /></td>
                  </tr>
                  <tr>
                    <th>Atk</th>
                    <td>{{character.prof() + character.strmod() + character.attMagic}}</td>
                    <td>{{character.prof() + character.dexmod() + character.attMagic}}</td>
                    <td>{{character.prof() + character.conmod() + character.attMagic}}</td>
                    <td>{{character.prof() + character.intmod() + character.attMagic}}</td>
                    <td>{{character.prof() + character.wismod() + character.attMagic}}</td>
                    <td>{{character.prof() + character.chamod() + character.attMagic}}</td>
                  </tr>
                  <tr>
                    <th>Save</th>
                    <td>{{8 + character.prof() + character.strmod() + character.saveMagic}}</td>
                    <td>{{8 + character.prof() + character.dexmod() + character.saveMagic}}</td>
                    <td>{{8 + character.prof() + character.conmod() + character.saveMagic}}</td>
                    <td>{{8 + character.prof() + character.intmod() + character.saveMagic}}</td>
                    <td>{{8 + character.prof() + character.wismod() + character.saveMagic}}</td>
                    <td>{{8 + character.prof() + character.chamod() + character.saveMagic}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="bordered-section">
              <h4>Spells</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="row">
          <div class="col-sm-12">
            <div class="bordered-section">
              <h4>Personality Traits</h4>
              <textarea v-model="character.personality" class="form-control" style="max-width: 100%;"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="bordered-section">
              <h4>Ideal</h4>
              <textarea v-model="character.ideal" class="form-control" style="max-width: 100%;"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="bordered-section">
              <h4>Bond</h4>
              <textarea v-model="character.bond" class="form-control" style="max-width: 100%;"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="bordered-section">
              <h4>Flaw</h4>
              <textarea v-model="character.flaw" class="form-control" style="max-width: 100%;"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="bordered-section">
              <h2>Abilities and Feats</h2>
              <textarea v-model="character.abilities" class="form-control" style="max-width: 100%;"></textarea>
              <h3>Class Abilities</h3>
              <div v-for="charclass in character.classes" v-bind:key="charclass.thisclass.name">
                <div v-for="feature in charclass.thisclass.features" class="clear-b" v-bind:key="feature.name">
                  <div v-if="feature.level <= charclass.level">
                    <h4>{{feature.name}} <button type="button" class="btn btn-default pull-right" @click="feature.isCollapsed = !feature.isCollapsed">
                      <span v-if="!feature.isCollapsed">&#x25B2;</span><span v-if="feature.isCollapsed">&#x25BC;</span>
                    </button></h4>
                    <p v-html="$options.filters.marked(feature.description)" v-if="!feature.isCollapsed"></p>
                  </div>
                </div>
                <div v-for="feature in charclass.selsubclass.features" class="clear-b" v-bind:key="feature.name">
                  <div v-if="feature.level <= charclass.level">
                    <h4>{{feature.name}} <button type="button" class="btn btn-default pull-right" @click="feature.isCollapsed = !feature.isCollapsed">
                      <span v-if="!feature.isCollapsed">&#x25B2;</span><span v-if="feature.isCollapsed">&#x25BC;</span>
                    </button></h4>
                    <p v-html="$options.filters.marked(feature.description)" v-if="!feature.isCollapsed"></p>
                  </div>
                </div>
              </div>
              <h3><span v-if="character.race.subraces[0].id === 'default'">{{character.race.singular}}</span><span v-if="character.race.subraces[0].id !== 'default'">{{character.subrace.singular}}</span> Racial Traits</h3>
              <p v-for="trait in character.race.traits" v-html="$options.filters.marked(trait)" v-bind:key="trait"></p>
              <p v-for="trait in character.subrace.traits" v-html="$options.filters.marked(trait)" v-bind:key="trait"></p>
              <h3>Background: {{character.background.name}}</h3>
              <p>
                <strong>Background Skills:</strong> {{ character.background.skills.join(', ') }}<br />
                <strong>Background Tools:</strong> {{ character.background.tools.join(', ') }}<br />
                <strong>Background Languages:</strong> {{character.background.languages}} of your choice
              </p>
              <h4>Feature: {{character.background.feature.name}}</h4>
              <div v-html="$options.filters.marked(character.background.feature.description)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="bordered-section">
          <h4>Notes</h4>
          <textarea class="form-control" style="max-width:100%;" v-model="character.notes"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./characterbuilder.scss" scoped lang="scss"></style>
<script src="./characterbuilder.js"></script>
