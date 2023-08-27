<template>
  <div>
    <div class="row">
        <div class="col">
          <input list="countrylist" type="text"
                 class="charsheet-text" v-model="character.homecountry">
          Home Country
        </div>
        <div class="col">
          <input list="citylist" type="text"
                 class="charsheet-text" v-model="character.hometown">
          Home Town
        </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Notes</h5>
          <textarea v-model="character.notes" class="charsheet-textarea smalltext"
                    ref="notes" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Allies</h5>
          <textarea v-model="character.allies" class="charsheet-textarea smalltext"
                    ref="allies" @input="textareaResize" ></textarea>
        </div>
      </div>
      <div class="col">
        <h5>Organizations</h5>
        <div class="row">
          <div class="col-sm-5">Faction</div><div class="col-sm-2">Disposition</div><div class="col-sm-4">Rank</div>
        </div>
        <div v-for="(faction, index) in character.faction" :key="faction.id" class="row">
          <div class="col-sm-5">
            <select class="charsheet-text" v-model="faction.faction">
              <option :value="faction.faction">{{ faction.faction.title }}</option>
              <option v-for="faction in factions" :value="faction"
                      :key="faction.id">{{ faction.title }}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <input type="number" class="charsheet-num" v-model="faction.disposition" />
          </div>
          <div class="col-sm-4">
            <select class="charsheet-text" v-model="faction.rank">
              <option :value="faction.rank" v-if="faction.rank">{{ faction.rank.name }}</option>
              <option v-for="rank in faction.faction.ranks" :key="rank.name" :title="rank.description" :value="rank">{{ rank.name }}</option>
            </select>
            Minimum Disposition: <span v-if="faction.rank">{{ faction.rank.minDisposition }}</span>
          </div>
          <div class="col-sm-1">
            <button class="btn btn-danger btn-sm print-hide" @click="removeFaction(index)">-</button>
          </div>
        </div>

        <button @click="addFaction()" class="btn btn-primary btn-sm print-hide">+</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Family</h5>
          <textarea v-model="character.family" class="charsheet-textarea smalltext"
                    ref="family" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Backstory</h5>
          <textarea v-model="character.backstory" class="charsheet-textarea smalltext"
                    ref="backstory" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Bond</h5>
          <textarea v-model="character.bond" class="charsheet-textarea smalltext"
                    ref="bond" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Personality</h5>
          <textarea v-model="character.personality" class="charsheet-textarea smalltext"
                    ref="personality" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/fluff.js"></script>
