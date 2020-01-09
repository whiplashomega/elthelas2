<template>
  <div>
    <div v-if="campaign" class="col-sm-12">
      <div v-if="buildmode" id="buildmode">
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
          <div class="col-sm-12" v-if="showChapters">
            <h3>Chapters</h3>
            <button class="btn btn-primary" @click="addChapter()">Add Chapter</button>
            <nav class="nav nav-pill">
              <li class="nav-item" v-for="(chapter, $index) in campaign.chapters" :key="chapter.id">
                <a href="#" @click="loadChapter(chapter)">Chapter {{ $index }}: {{ chapter.title }}</a>
                <button @click="moveChUp($index)">↑</button><button @click="moveChDown($index)">↓</button><button @click="deleteChapter($index)">&#128465;</button>
              </li>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12" v-if="chapter">
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
                <div class="col-sm-6">
                  <label>Runner Link</label>
                  <input type="text" class="form-control" v-model="encounter.link" />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <label>Image URL</label>
                  <input type="text" class="form-control" v-model="encounter.image" />
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
                  <textarea v-model="encounter.text" class="form-control encounterbox"></textarea>
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
          <div class="col-sm-3" v-if="showChapters">
            <nav class="sidenav nav flex-column nav-pill">
              <a href="#" class="nav-item"
                 v-for="(chapter, $index) in campaign.chapters" @click="loadChapter(chapter)"
                 :key="chapter.id">Chapter {{ $index }}: {{ chapter.title }}</a>
            </nav>
          </div>
          <div :class="showChapters ? 'col-sm-9' : 'col-sm-12'">
            <h2>{{ chapter.title }}</h2>
            <div v-for="(encounter, $index) in chapter.encounters" :key="encounter._id" :class="encounter.complete ? 'complete' : ''">
              <div>
                <h3>
                  <a :href="encounter.link" target="_blank">{{ encounter.name }}</a>
                  <button @click="moveEnUp($index)">↑</button><button @click="moveEnDown($index)">↓</button>
                  <button @click="loadEncounter(encounter.link)" class="btn btn-success">Run in Tab</button>
                </h3>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="encounter.complete" />
                  <label class="form-check-label">Complete</label>
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="encounter.closed" />
                  <label class="form-check-label">Hide</label>
                </div>
                <div style="float:right;max-width:40%;" v-if="encounter.image && !encounter.closed">
                  <img :src="encounter.image" :alt="encounter.name" />
                </div>
                <div v-html="$options.filters.marked(encounter.text)" v-if="!encounter.closed"></div>
                <div v-html="$options.filters.marked(encounter.treasure)" v-if="!encounter.closed"></div>
                <div>
                  <h4>Session Notes</h4>
                  <textarea v-model="encounter.sessionnotes" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/notes.js"></script>
<style scoped>
  #buildmode .navitem {
    margin-top: 12px;
  }

  .encounterbox {
    min-height: 500px;
  }
  .complete {
    background-color: rgba(180, 180, 230, 0.3);
    font-size: 0.8rem;
  }
</style>
