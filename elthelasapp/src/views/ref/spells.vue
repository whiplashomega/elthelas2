<template>
  <div>
        <h3>Spells</h3>
        <b-row>
          <b-col md="8">
            Filter by Class
            <select v-model="spelltable.classFilter" class="form-control">
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
          </b-col>
          <b-col md="4" class="my-1">
            Search
            <b-input-group>
              <b-form-input v-model="spelltable.filterValue" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!spelltable.filterValue" @click="filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <table class="table table-striped">
          <thead>
            <tr>
              <th><a href="#" @click.stop="spelltable.sortBy = 'title'; spelltable.sortDesc = !spelltable.sortDesc;">Title</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'level'; spelltable.sortDesc = !spelltable.sortDesc;">Level</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'school'; spelltable.sortDesc = !spelltable.sortDesc;">School</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'castingTime'; spelltable.sortDesc = !spelltable.sortDesc;">Casting Time</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'duration'; spelltable.sortDesc = !spelltable.sortDesc;">Duration</a></th>
              <th>Tags</th>
            </tr>
            <tr>
              <th><input type="text" v-model="spelltable.titleFilter" class="form-control" /></th>
              <th><select v-model="spelltable.levelFilter" class="form-control">
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
              </select></th>
              <th><select v-model="spelltable.schoolFilter" class="form-control">
                <option value="all">All</option>
                <option value="abjuration">Abjuration</option>
                <option value="conjuration">Conjuration</option>
                <option value="divination">Divination</option>
                <option value="enchantment">Enchantment</option>
                <option value="evocation">Evocation</option>
                <option value="illusion">Illusion</option>
                <option value="necromancy">Necromancy</option>
                <option value="transmutation">Transmutation</option>
              </select></th>
              <th><select v-model="spelltable.timeFilter" class="form-control">
                <option value="all">All</option>
                <option value="1 action">1 action</option>
                <option value="1 bonus action">1 bonus action</option>
                <option value="1 reaction">1 reaction</option>
                <option value="1 minute">1 minute</option>
                <option value="10 minutes">10 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="8 hours">8 hours</option>
                <option value="24 hours">24 hours</option>
              </select></th>
              <th><input type="checkbox" v-model="spelltable.concFilter" /> Exclude Concentration <select v-model="spelltable.durationFilter" class="form-control">
                <option value="all">All</option>
                <option value="instantaneous">Instantaneous</option>
                <option value="1 round">1 round</option>
                <option value="1 minute">1 minute</option>
                <option value="10 minutes">10 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="6 hours">6 hours</option>
                <option value="8 hours">8 hours</option>
                <option value="24 hours">24 hours</option>
                <option value="10 days">10 days</option>
                <option value="until dispelled">until dispelled</option>
              </select></th>
              <th><input type="text" v-model="spelltable.tagsFilter" class="form-control" /> </th>
            </tr>
          </thead>
            <tbody class="spelltable">
              <tr style="margin-top:100px;"><td colspan="6"></td></tr>
              <tr v-for="spell in filteredSpells" :key="spell.title">
                <td><a href="#" @click.stop="info(spell, 0, $event.target)">{{ spell.title }}</a></td>
                <td>{{ spell.level }}</td>
                <td>{{ spell.school }}</td>
                <td>{{ spell.castingTime }}</td>
                <td>{{ spell.duration }}</td>
                <td>{{ spell.tagsText }}</td>
              </tr>
            </tbody>
        </table>
        <modal id="spellmodal" :modalProps="spellModalProps">
          <h4>
            <strong>{{ spelltable.modalInfo.content.school }}
              {{ spelltable.modalInfo.content.level.replace('level', 'level ') }}
            </strong>
            <span v-if="spelltable.modalInfo.content.ritual"> Ritual</span> ({{ spelltable.modalInfo.content.source }})
          </h4>
          <p><strong>Casting Time: </strong>{{ spelltable.modalInfo.content.castingTime }}</p>
          <p><strong>Range: </strong>{{ spelltable.modalInfo.content.range }}</p>
          <p><strong>Components: </strong>{{ spelltable.modalInfo.content.components }}</p>
          <p><strong>Duration: </strong>{{ spelltable.modalInfo.content.duration }}</p>
          <p><strong>Tags: </strong> {{ spelltable.modalInfo.content.tagText }}</p>
          <div v-html="marked.parse(spelltable.modalInfo.description)"></div>
        </modal>
  </div>
</template>
<script src="./js/spells.js"></script>
<style src="./scss/spells.scss" lang="scss" scoped></style>
