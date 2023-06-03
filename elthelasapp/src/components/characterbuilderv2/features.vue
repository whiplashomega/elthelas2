<template>
  <div>
    <!-- Injuries -->
    <div class="charsheet-static">
      Injuries/Madnesses
      <div v-for="(injury, index) in character.injuries" :key="index" class="row">
        <div class="col-10"><input type="text" v-model="injury.name" class="charsheet-text" /></div>
        <div class="col-2"><button class="btn btn-sm btn-danger print-hide" type="button" @click="removeInjury(index)">X</button></div>
      </div>
      <button class="btn btn-sm btn-primary print-hide" type="button" @click="addInjury">+</button>
    </div>
    <!-- Death Saves
    <div class="charsheet-static">
      <h4>Death Saves</h4>
      Sucesses: <input type="number" class="charsheet-num" v-model="character.deathsuccess" /><br />
      Failures: <input type="number" class="charsheet-num" v-model="character.deathfail" />
    </div>-->
    <!-- Feats -->
    <div class="charsheet-static">
      Feats/ASIs {{ numASI }}<br />
      <div v-for="(feat, index) in character.feats" :key="index" style="clear:both;" class="row">
        <div v-if="index == 0" class="col-10">
          <select class="charsheet-text" v-model="character.feats[index]">
            <option :value="character.feats[index]">{{ character.feats[index].name }}</option>
            <option v-for="feat in lvl1feats" :key="feat.name"
                    :value="feat" :title="feat.description">{{ feat.name }}</option>
          </select>
        </div>
        <div class="col-10" v-else>
          <select class="charsheet-text" v-model="character.feats[index]">
            <option :value="character.feats[index]">{{ character.feats[index].name }}</option>
            <option v-for="feat in featsort" :key="feat.name"
                    :value="feat" :title="feat.description">{{ feat.name }}</option>
          </select>
        </div>
        <div class="col-1">
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(feat, 'show', true)" v-if="!feat.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(feat, 'show', false)" v-if="feat.show">
            &#x25B2;
          </button>
        </div>
        <p v-if="feat.show" v-html="marked.parse(feat.description)"></p>
      </div>
    </div>
    <!-- Features -->
    <div class="charsheet-static" id="featurebox">
      Features
      <p class="smalltext" v-if="character.background.feature.length > 0">
        <span title="You should select this feat as the first feat in the feat list above. If you want a different first level feat you can select that instead.">Background Feat: {{ character.background.feature }}</span>
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
          <span v-if="trait.show" v-html="marked.parse(trait.description)"></span>
        </p>
      </div>
      <div class="smalltext" v-for="charclass in character.charclasses" :key="charclass.thisclass.name">
        <div v-for="feature in charclass.thisclass.features" :key="feature.name">
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
            <select v-if="feature.choice" v-model="feature.chosen">
              <option v-for="ch in feature.choice" :title="ch.description">{{ch.name}}</option>
            </select>
            <span v-if="feature.show" v-html="marked.parse(feature.description)"></span>
          </p>
        </div>
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
            <select v-if="feature.choice" v-model="feature.chosen">
              <option v-for="ch in feature.choice" :title="ch.description">{{ch.name}}</option>
            </select>
            <span v-if="feature.show" v-html="marked.parse(feature.description)"></span>
          </p>
        </div>
      </div>
      <div class="smalltext" v-for="style in character.fightingstyles" :key="style.name">
        <p>
          <span :title="style.description">{{ style.name }}</span>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(style, 'show', true)" v-if="!style.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(style, 'show', false)" v-if="style.show">
            &#x25B2;
          </button>
          <span v-if="style.show" v-html="marked.parse(style.description)"></span>
        </p>
      </div>
      <div class="smalltext" v-for="metamagic in character.metamagic" :key="metamagic.name">
        <p>
          <span :title="metamagic.description">{{metamagic.name}}</span>

            <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(metamagic, 'show', true)" v-if="!metamagic.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(metamagic, 'show', false)" v-if="metamagic.show">
            &#x25B2;
          </button>
          <span v-if="metamagic.show" v-html="marked.parse(metamagic.description)"></span>
        </p>
      </div>
      <div class="smalltext" v-for="invocation in character.invocations" :key="invocation.name">
        <p>
          <span :title="invocation.description">{{invocation.name}}</span>

            <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(invocation, 'show', true)" v-if="!invocation.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(invocation, 'show', false)" v-if="invocation.show">
            &#x25B2;
          </button>
          <span v-if="invocation.show" v-html="marked.parse(invocation.description)"></span>
        </p>
      </div>
      <div class="smalltext" v-for="invocation in character.skilltricks" :key="invocation.name">
        <p>
          <span :title="invocation.description">{{invocation.name}}</span>

            <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(invocation, 'show', true)" v-if="!invocation.show">
            &#x25BC;
          </button>
          <button class="btn btn-sm print-hide float-right" type="button"
                  @click="setval(invocation, 'show', false)" v-if="invocation.show">
            &#x25B2;
          </button>
          <span v-if="invocation.show" v-html="marked.parse(invocation.description)"></span>
        </p>
      </div>
      <div class="smalltext" v-if="character.infusions.length">
        Infusions Known: <span v-for="inf in character.infusions" :title="inf.description" :key="inf.name">{{inf.name}}, </span>
      </div>
      <div v-for="org in character.faction" :key="org.faction.id">
        <p v-for="feature in org.faction.features" :key="feature.name" class="smalltext">
          <div v-if="org.rank.index >= feature.minrank">
            <span :title="feature.description">{{ feature.name }}</span>
            <button class="btn btn-sm print-hide float-right" type="button"
                    @click="setval(feature, 'show', true)" v-if="!feature.show">&#x25BC;</button>
            <button class="btn btn-sm print-hide float-right" type="button"
                    @click="setval(feature, 'show', false)" v-if="feature.show">&#x25B2;</button>
            <span v-if="feature.show" v-html="marked.parse(feature.description)"></span>
          </div>
        </p>
      </div>
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
          <span v-if="feature.show" v-html="marked.parse(feature.description)"></span>
        </p>
      </div>
      <button class="btn btn-sm print-hide btn-primary" type="button" @click="newFeatureModal = true">+</button>
      <b-modal title="Add Feature" v-model="newFeatureModal"
               @ok="addFeature()" :modal-class="userinfo.themesetting">
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
