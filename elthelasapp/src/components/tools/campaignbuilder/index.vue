<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <button class="btn btn-primary" @click="buildmode = !buildmode">Toggle <span v-if="buildmode">View</span><span v-else>Build</span> Mode</button>
      <button class="btn btn-primary" @click="save()" v-if="campaign._id">Save</button>
      <button class="btn btn-primary" @click="saveNew()" v-if="!campaign._id">Save New</button>
      <button class="btn btn-success" @click="getAll(comp)">Load</button>
      <button class="btn btn-warning" @click="newCamp()">New Campaign</button>
    </div>
    <div v-if="campaign" class="col-sm-12">
      <div v-if="buildmode">
        <div class="row">
          <label class="col-sm-6">
            Campaign Title
            <input type="text" v-model="campaign.title" class="form-control" />
          </label>
          <label class="col-sm-6">
            URI (campaign information will be reachable via https://elthelas.com/tools/campaigns/{{ campaign.url }}
            <input type="text" v-model="campaign.url" class="form-control" />
          </label>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <h3>Chapters</h3>
            <nav class="sidenav nav flex-column nav-pill">
              <button class="btn btn-primary" @click="addChapter()">Add Chapter</button>
              <li class="nav-item" v-for="(chapter, $index) in campaign.chapters" :key="chapter.id">
                <a href="#" @click="loadChapter(chapter)">Chapter {{ $index }}: {{ chapter.title }}</a>
                <button @click="moveChUp($index)">↑</button><button @click="moveChDown($index)">↓</button><button @click="deleteChapter($index)">&#128465;</button>
              </li>
            </nav>
          </div>
          <div class="col-sm-9" v-if="chapter">
            <div class="row">
              <label class="col-sm-12">
                Chapter Title
                <input type="text" class="form-control" v-model="chapter.title" />
              </label>
            </div>
            <div v-for="(encounter, $index) in chapter.encounters" :key="encounter._id">
              <hr />
              <div class="row">
                <div class="col-sm-6">
                  <label>Name</label><button @click="moveEnUp($index)">↑</button><button @click="moveEnDown($index)">↓</button><button @click="deleteEncounter($index)">&#128465;</button>
                  <input type="text" class="form-control" v-model="encounter.name" />
                </div>
                <!--<div class="col-sm-6">
                  <label>Prerequisite</label>
                  <select v-model="encounter.prereq" class="form-control">
                    <option value="">None</option>
                    <option v-for="enc in all" :value="enc._id" :key="enc._id">{{ enc.name }}</option>
                  </select>
                </div>-->
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <label>Runner Link</label>
                  <input type="text" class="form-control" v-model="encounter.link" />
                </div>
                <div class="col-sm-6">
                  <label>Image URL</label>
                  <input type="text" class="form-control" v-model="encounter.image" />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <label>Environment</label>
                  <select v-model="encounter.environment" class="form-control">
                    <option value="Any">Any</option>
                    <option value="Desert">Desert</option>
                    <option value="Grassland">Grassland</option>
                    <option value="Forest">Forest</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Rural">Rural</option>
                    <option vlaue="Swamp">Swamp</option>
                    <option value="Underground">Underground</option>
                    <option value="Urban">Urban</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label>Tier</label>
                  <select v-model="encounter.tier" class="form-control">
                    <option value="Any">Any</option>
                    <option value="Beginners">Beginners (levels 1-4)</option>
                    <option value="Heroic">Heroic (levels 5-10)</option>
                    <option value="Epic">Epic (levels 11-16)</option>
                    <option value="Masters">Masters (levels 17-20)</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label>Flags</label>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" v-model="encounter.random" />
                    <label class="form-check-label">Random</label>
                  </div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" v-model="encounter.complete" />
                    <label class="form-check-label">Complete</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <label>Encounter Text (markdown allowed)</label>
                  <textarea v-model="encounter.text" class="form-control" style="min-height:150px;"></textarea>
                </div>
                <div class="col-sm-6" v-html="$options.filters.marked(encounter.text)"></div>
              </div>
              <div>
                <label>Potential Treasure (markdown allowed)</label>
                <textarea v-model="encounter.treasure" class="form-control" style="min-height:150px;"></textarea>
              </div>
            </div>
            <div class="row">
              <hr />
              <div class="btn-group">
                <button class="btn btn-primary" @click="addEncounter()">Add Encounter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!buildmode">
        <h1>{{ campaign.title }}</h1>
        <div class="row">
          <div class="col-sm-3">
            <nav class="sidenav nav flex-column nav-pill">
              <a href="#" class="nav-item"
                 v-for="(chapter, $index) in campaign.chapters" @click="loadChapter(chapter)"
                 :key="chapter.id">Chapter {{ $index }}: {{ chapter.title }}</a>
            </nav>
          </div>
          <div class="col-sm-9">
            <h2>{{ chapter.title }}</h2>
            <div v-for="(encounter, $index) in chapter.encounters" :key="encounter._id">
              <div>
                <h3><a :href="encounter.link" target="_blank">{{ encounter.name }}</a><button @click="moveEnUp($index)">↑</button><button @click="moveEnDown($index)">↓</button></h3>
                <div style="float:right;max-width:40%;" v-if="encounter.image">
                  <img :src="encounter.image" :alt="encounter.name" />
                </div>
                <div v-html="$options.filters.marked(encounter.text)"></div>
                <div v-html="$options.filters.marked(encounter.treasure)"></div>
                <div>
                  <h4>Session Notes</h4>
                  <textarea v-model="encounter.sessionnotes" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal id="campaignmodal" title="Load File from Server">
        <table class="table table-striped">
          <tr>
            <th>Campaign Name</th><th>-</th>
          </tr>
          <tr v-for="camp in allCampaigns" :key="camp._id">
            <td><span class="clickable" @click="load({ campaign: camp, comp: comp })">{{ camp.title }}</span></td>
            <td>
              <input type="button" @click="deleteCamp(camp)"
                     class="btn btn-danger" value="X" />
            </td>
          </tr>
        </table>
      </b-modal>
    </div>
  </div>
</template>
<script src="./campaignbuilder.js"></script>
