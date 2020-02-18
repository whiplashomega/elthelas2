<template>
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
    <span class="smalltext">Save DCs</span>
    <table class="table table-sm smalltext">
      <tr>
        <th v-for="cl in character.charclasses" :key="cl.thisclass.name" v-if="cl.savedcstat">{{ cl.thisclass.name }}</th>
      </tr>
      <tr>
        <td v-for="cl in character.charclasses" :key="cl.thisclass.name" v-if="cl.savedcstat">{{ getSaveDC(cl.savedcstat) }}</td>
      </tr>
    </table>
    <span class="print-hide">{{ displayLevel }}
      slots: <input type="number" v-model="character.availableslots[displayLevel]" class="charsheet-num" /> / {{ totalslots(displayLevel) }}</span><br />
    <span v-if="warlockSlots > 0">Warlock Slots: <input type="number" v-model="character.warlockslotsavailable" class="charsheet-num" /> /
      {{ warlockSlots }} level {{ warlockSlotLevel }} slots</span>
    <div>
      Number Prepared:
      <div v-for="cc in numprepared" :key="cc.classname">{{ cc.classname }}: {{ cc.numprepped }} / {{ cc.maxprepped }}</div>
    </div>
    <div class="smalltext print-hide">
      <table class="table table-sm">
        <thead><tr><th>Spell</th><th>Casting Time</th><th>Duration</th><th>Class</th><th colspan="2">-</th></tr></thead>
        <tbody>
          <tr v-for="spell in sortSpells(character.spells[displayLevel])" :key="spell.title" v-if="(spell.prepared && preparedonly) || !preparedonly || displayLevel === 'cantrip'">
            <td>
              <input type="checkbox" v-model="spell.prepared" v-if="displayLevel !== 'cantrip'" /><span class="clickable" @click="spellDetail(spell)">{{ spell.title }}<span v-if="spell.ritual"> (ritual)</span></span>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
            <td>{{ spell.class }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary print-hide" @click="castSpell(spell)">Cast</button>
              <select v-if="spell.level !== 'cantrip'" v-model="spell.castLevel">
                <option>{{ Number(spell.level) }}</option>
                <option v-for="i in 9 - spell.level" :key="i">{{ Number(i) + Number(spell.level) }}</option>
                <option v-if="warlockSlotLevel >= spell.level" value="warlock">warlock</option>
              </select>
            </td>
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
          <tr v-for="spell in character.spells['cantrip']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 1</td><td>{{ totalslots('level1') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level1']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 2</td><td>{{ totalslots('level2') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level2']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 3</td><td>{{ totalslots('level3') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level3']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
            <td><button type="button" class="btn btn-sm btn-danger print-hide" @click="removeSpell(index)">X</button></td>
          </tr>
          <tr><td colspan="2">Level 4</td><td colspan="2">{{ totalslots('level4') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level4']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 5</td><td>{{ totalslots('level5') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level5']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 6</td><td>{{ totalslots('level6') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level6']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 7</td><td>{{ totalslots('level7') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level7']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 8</td><td>{{ totalslots('level8') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level8']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
          <tr><td colspan="2">Level 9</td><td>{{ totalslots('level9') }} Slots</td></tr>
          <tr v-for="spell in character.spells['level9']" :key="spell.title">
            <td>
              <input type="checkbox" v-model="spell.prepared" /><a href="#" @click="spellDetail(spell)">{{ spell.title }}</a>
            </td>
            <td>{{ spell.castingTime }}</td>
            <td>{{ spell.duration }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button type="button" @click="spellModal = true" class="btn btn-sm btn-primary print-hide">+</button>
    <h4>Cast Log</h4>
    <div class="smalltext" v-for="(spell, index) in character.castlog" :key="index">
      {{ spell.title }} {{ spell.level }}
    </div>    <b-modal v-model="spellModal" title="Add Spell"
                       class="modal-lg" @ok="addSpell(selspell)">
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
        <option value="archivist">Archivist</option>
        <option value="artificer">Artificer</option>
        <option value="bard">Bard</option>
        <option value="cleric">Cleric</option>
        <option value="druid">Druid</option>
        <option value="eldritchknight">Fighter (Eldritch Knight)</option>
        <option value="paladin">Paladin</option>
        <option value="ranger">Ranger</option>
        <option value="sorcerer">Sorcerer</option>
        <option value="warlock">Warlock</option>
        <option value="wizard">Wizard</option>
      </select>
      Spell Added By Class:
      <select v-model="selspellclass" class="form-control" required>
        <option value="race">Race</option>
        <option v-for="charclass in character.charclasses" :value="charclass.thisclass.name" :key="charclass.thisclass.name">{{ charclass.thisclass.name }}</option>
      </select>
      <table class="table table-sm" id="spellList">
        <thead style="float:left; width:100%; display: table;"><tr><th>-</th><th>Spell</th><th>Level</th></tr></thead>
        <tbody style="overflow-y:scroll; max-height: 300px; float: left; width: 100%">
          <tr v-for="spell in filteredspells" :key="spell.title" style="float:left; width:100%; display: table">
            <td><input type="radio" name="selspell"
                       :value="spell" v-model="selspell"
                       required /></td>
            <td><span class="clickable" @click="spellDetail(spell)">{{ spell.title }}</span></td>
            <td>{{ spell.level }}</td>
          </tr>
        </tbody>
      </table>
    </b-modal>
    <b-modal v-model="spellDetailModal" @ok="spellDetailModal = false"
             id="spellmodal" size="lg"
             :title="detailspell.title" ok-only>
      <h4>
        <strong>{{ detailspell.school }}
          <span v-if="detailspell.level !== 'cantrip'">level </span>{{ detailspell.level.toString() }}
        </strong>
        <span v-if="detailspell.ritual"> Ritual</span> ({{ detailspell.source }})
      </h4>
      <p><strong>Casting Time: </strong>{{ detailspell.castingTime }}</p>
      <p><strong>Range: </strong>{{ detailspell.range }}</p>
      <p><strong>Components: </strong>{{ detailspell.components }}</p>
      <p><strong>Duration: </strong>{{ detailspell.duration }}</p>
      <p><strong>Tags: </strong> {{ detailspell.tags.join(", ") }}</p>
      <div v-html="$options.filters.marked(detailspell.description)"></div>
    </b-modal>
  </div>
</template>
<script src="./js/spells.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
