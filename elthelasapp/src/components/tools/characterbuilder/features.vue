<template>
  <div>
    <!-- Injuries -->
    <div class="charsheet-static">
      Injuries/Madnesses
      <div v-for="(injury, index) in character.injuries" :key="index">
        <input type="text" v-model="injury.name" class="charsheet-text col-9" />
        <button class="btn btn-sm btn-danger print-hide" type="button" @click="removeInjury(index)">X</button>
      </div>
      <button class="btn btn-sm btn-primary print-hide" type="button" @click="addInjury">+</button>
    </div>
    <!-- Death Saves -->
    <div class="charsheet-static">
      <h4>Death Saves</h4>
      Sucesses: <input type="number" class="charsheet-num" v-model="character.deathsuccess" /><br />
      Failures: <input type="number" class="charsheet-num" v-model="character.deathfail" />
    </div>
    <!-- Feats -->
    <div class="charsheet-static">
      Feats/ASIs {{ numASI }}
      <div v-for="(feat, index) in character.feats" :key="index" style="clear:both;">
        <select class="charsheet-text col-9" v-model="character.feats[index]">
          <option :value="character.feats[index]">{{ character.feats[index].name }}</option>
          <option v-for="feat in featsort" :key="feat.name"
                  :value="feat" :title="feat.description">{{ feat.name }}</option>
        </select>
        <button class="btn btn-sm print-hide float-right" type="button"
                @click="setval(feat, 'show', true)" v-if="!feat.show">
          &#x25BC;
        </button>
        <button class="btn btn-sm print-hide float-right" type="button"
                @click="setval(feat, 'show', false)" v-if="feat.show">
          &#x25B2;
        </button>
        <p v-if="feat.show" v-html="$options.filters.marked(feat.description)"></p>
      </div>
    </div>
    <!-- Features -->
    <div class="charsheet-static" id="featurebox">
      Features
      <p class="smalltext" v-if="character.background.feature.name.length > 0">
        <span :title="character.background.feature.description">{{ character.background.feature.name }}</span>
        <button class="btn btn-sm print-hide float-right" type="button"
                @click="setval(character.background.feature, 'show', true)" v-if="!character.background.feature.show">
          &#x25BC;
        </button>
        <button class="btn btn-sm print-hide float-right" type="button"
                @click="setval(character.background.feature, 'show', false)" v-if="character.background.feature.show">
          &#x25B2;
        </button>
        <span v-if="character.background.feature.show" v-html="$options.filters.marked(character.background.feature.description)"></span>
      </p>
      <div v-for="trait in character.race.traits" class="smalltext" :key="trait.name">
        <p>
          <span :title="trait.description">{{ trait.name }}</span>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(trait, 'show', true)" v-if="!trait.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(trait, 'show', false)" v-if="trait.show">
            &#x25B2;
          </button>
          <span v-if="trait.show" v-html="$options.filters.marked(trait.description)"></span>
        </p>
      </div>
      <div class="smalltext" v-for="charclass in character.charclasses" :key="charclass.thisclass.name">
        <p v-for="feature in charclass.thisclass.features" :key="feature.name" v-if="feature.level <= charclass.level">
          <span :title="feature.description">{{ feature.name }}</span>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(feature, 'show', true)" v-if="!feature.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(feature, 'show', false)" v-if="feature.show">
            &#x25B2;
          </button>
          <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
        </p>
        <div v-for="feature in charclass.selsubclass.features" :key="feature.name">
          <p v-if="feature.level <= charclass.level">
            <span :title="feature.description">{{ feature.name }}</span>
            <button class="btn btn-sm print-hide float-right" type="button"
                    @click="setval(feature, 'show', true)" v-if="!feature.show">
              &#x25BC;
            </button>
            <button class="btn btn-sm print-hide float-right" type="button"
                    @click="setval(feature, 'show', false)" v-if="feature.show">
              &#x25B2;
            </button>
            <span v-if="feature.show" v-html="$options.filters.marked(feature.description)"></span>
          </p>
        </div>
      </div>
      <div v-if="level >= 1" v-html="$options.filters.marked(character.faction.level1)" class="smalltext"></div>
      <div v-if="level >= 10" v-html="$options.filters.marked(character.faction.level10)" class="smalltext"></div>
      <div class="smalltext" v-for="(feature, index) in character.features" :key="index">
        <p>
          <span :title="feature.description">{{ feature.name }}</span>
          <button class="btn btn-sm print-hide float-right btn-danger" type="button" @click="removeFeature(index)">X</button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(feature, 'show', true)" v-if="!feature.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(feature, 'show', false)" v-if="feature.show">
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
</template>
<script src="./js/features.js"></script>
<style src="../scss/characterbuilder.scss" lang="scss" scoped></style>
