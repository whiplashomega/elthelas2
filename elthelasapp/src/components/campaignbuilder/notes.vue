<template>
  <div>
    <div v-if="campaign" class="col-sm-12">
      <div class="notes">
        <h1 v-if="!campaign.buildmode">{{ campaign.title }} <button @click="campaign.buildmode = true" class="btn btn-primary">&#9998;</button></h1>
        <div class="row" v-if="campaign.buildmode">
          <label class="col-sm-6">
            Campaign Title
            <input type="text" v-model="campaign.title" class="form-control" /> <button @click="campaign.buildmode = false" class="btn btn-primary">Done</button>
          </label>
          <label class="col-sm-6">
            URI (campaign information will be reachable via https://elthelas.com/tools/campaigns/{{ campaign.url }}
            <input type="text" v-model="campaign.url" class="form-control" />
          </label>
        </div>
        <div class="row">
          <div class="col-sm-3" v-if="showChapters">
            <nav class="sidenav nav flex-column nav-pill">
              <li class="navitem" v-for="(chapter, $index) in campaign.chapters" :key="chapter.id">
                <a href="#" @click="loadChapter(chapter)">Chapter {{ $index }}: {{ chapter.title }}</a>
                <button @click="moveChUp($index)">↑</button><button @click="moveChDown($index)">↓</button><button @click="deleteChapter($index)">&#128465;</button>
              </li>
            </nav>
            <button class="btn btn-primary" @click="addChapter()" style="margin-top: 12px;">Add Chapter</button>
          </div>
          <div :class="showChapters ? 'col-sm-9' : 'col-sm-12'">
            <h2 v-if="!chapter.buildmode">{{ chapter.title }} <button @click="chapter.buildmode = true" class='btn btn-primary'>&#9998;</button></h2>
            <div class="row" v-if="chapter.buildmode">
              <label class="col-sm-12">
                Chapter Title
                <input type="text" class="form-control" v-model="chapter.title" />
              </label>
              <button @click="chapter.buildmode = false" class="btn btn-primary">Done</button>
            </div>
            <div v-for="(encounter, $index) in chapter.encounters" :key="encounter.id" :class="encounter.complete ? 'complete' : ''">
              <div v-if="!encounter.buildmode">
                <h3>
                  <a :href="encounter.link" target="_blank">{{ encounter.name }}</a>
                  <button @click="moveEnUp($index)">↑</button><button @click="moveEnDown($index)">↓</button>
                  <button @click="loadEncounter(encounter.link)" class="btn btn-success">Run in Tab</button>
                </h3>
                <button class="btn btn-primary" @click="encounter.buildmode = true;">&#9998;</button>
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
                <div v-html="marked.parse(encounter.text)" v-if="!encounter.closed"></div>
                <div v-html="marked.parse(encounter.treasure)" v-if="!encounter.closed"></div>
                <div>
                  <h4>Session Notes</h4>
                  <textarea v-model="encounter.sessionnotes" class="form-control"></textarea>
                </div>
              </div>
              <div v-if="encounter.buildmode">
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
                  <div class="col-sm-6" v-html="marked.parse(encounter.text)"></div>
                </div>
                <div>
                  <label>Potential Treasure (markdown allowed)</label>
                  <textarea v-model="encounter.treasure" class="form-control"></textarea>
                </div>
                <button @click="encounter.buildmode = false" class="btn btn-primary">Done</button>
              </div>
            </div>
            <div v-for="(section, $index) in chapter.sections" :key="section.id" :class="section.complete ? 'complete' : ''">
              <div v-if="!section.buildmode">
                <h3>
                  {{ section.title }}
                  <button @click="moveSectionUp($index)" class="btn btn-sm">↑</button>
                  <button @click="moveSectionDown($index)" class="btn btn-sm">↓</button>
                  <button @click="section.buildmode = true" class="btn btn-sm">&#9998;</button>
                </h3>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="section.complete" />
                  <label class="form-check-label">Complete</label>
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="section.hidden" />
                  <label class="form-check-label">Hide</label>
                </div>
                <div v-html="marked.parse(section.description)" v-if="!section.hidden"></div>
              </div>
              <div v-if="section.buildmode">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Title</label><button @click="moveSectionUp($index)" class="btn btn-sm">↑</button>
                    <button @click="moveSectionDown($index)" class="btn btn-sm">↓</button>
                    <button @click="deleteSection(section)" class="btn btn-sm">&#128465;</button>
                    <button @click="section.buildmode = false" class="btn btn-sm">Done</button>
                    <input type="text" class="form-control" v-model="section.title" />
                  </div>
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="section.hidden" />
                  <label class="form-check-label">Hide</label>
                </div>
                <div class="row" v-if="!section.hidden">
                  <div class="col-sm-6">
                    <label>Section Description (markdown allowed)</label>
                    <textarea v-model="section.description" class="form-control encounterbox"></textarea>
                  </div>
                  <div class="col-sm-6" v-html="marked.parse(section.description)"></div>
                </div>
              </div>
              <div v-if="!section.hidden">
                <div v-for="(encounter, $index) in section.encounters" :key="encounter.id"
                    :class="encounter.complete ? 'complete' : ''">
                  <div v-if="!encounter.buildmode">
                    <h4>
                      <a :href="encounter.link" target="_blank">{{ encounter.name }}</a>
                      <button @click="moveEncounterUpInSection({ section: section, index: $index })" class="btn btn-xs">↑</button>
                      <button @click="moveEncounterDownInSection({ section: section, index: $index })" class="btn btn-xs">↓</button>
                      <button @click="loadEncounter(encounter.link)" class="btn btn-success btn-xs">Run in Tab</button>
                      <button @click="encounter.buildmode = true" class="btn btn-xs">&#9998;</button>
                    </h4>
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
                    <div v-html="marked.parse(encounter.text)" v-if="!encounter.closed"></div>
                    <div v-html="marked.parse(encounter.treasure)" v-if="!encounter.closed"></div>
                    <div>
                      <h4>Session Notes</h4>
                      <textarea v-model="encounter.sessionnotes" class="form-control"></textarea>
                    </div>
                  </div>
                  <div v-if="encounter.buildmode">
                    <hr />
                    <div class="row">
                      <div class="col-sm-6">
                        <label>Name</label><button @click="moveEncounterUpInSection({ section: section, index: $index })" class="btn btn-xs">↑</button>
                        <button @click="moveEncounterDownInSection({ section: section, index: $index })" class="btn btn-sm">↓</button>
                        <button @click="deleteEncounterFromSection({ section: section, encounter: encounter })" class="btn btn-xs">&#128465;</button>
                        <button @click="encounter.buildmode = false" class="btn btn-xs">Done</button>
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
                          <input type="checkbox" class="form-check-input" v-model="encounter.complete" />
                          <label class="form-check-label">Complete</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <label>Encounter Text (markdown allowed)</label>
                        <textarea v-model="encounter.text" class="form-control"></textarea>
                      </div>
                      <div class="col-sm-6" v-html="marked.parse(encounter.text)"></div>
                    </div>
                    <div>
                      <label>Potential Treasure (markdown allowed)</label>
                      <textarea v-model="encounter.treasure" class="form-control"></textarea>
                    </div>
                    <div>
                      Move to Section
                      <select v-model="section2" class="form-control form-control-sm">
                        <option v-for="sec2 in chapter.sections" :key="sec2.id" :value="sec2">{{ section.title }}</option>
                      </select>
                      <button class="btn btn-success btn-sm" @click="moveEncounterFromSectionToSection({ section1: section, section2: section2, encounter: encounter })">Go</button>
                      <button class="btn btn-primary btn-sm" @click="addEncounterToSection({ section: section, index: $index + 1 })">Add Encounter After This One</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="!section.hidden">
                <hr />
                <div class="btn-group">
                  <button class="btn btn-primary" @click="addEncounterToSection({ section: section, index: section.encounters.length })">Add Encounter</button>
                </div>
              </div>
            </div>
            <div class="row">
              <hr />
              <div class="btn-group">
                <button class="btn btn-primary" @click="addSection()">Add Section</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/notes.js"></script>
<style>
  .navitem {
    margin-top: 12px;
  }

  textarea.form-control.encounterbox {
    min-height: 500px;
  }
  .light .complete {
    background-color: rgba(180, 180, 230, 0.3);
    font-size: 0.8rem;
  }
  .dark .complete {
    background-color: rgba(55, 55, 80, 0.3);
  }
  .notes table td, table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  .notes table tbody tr:nth-of-type(odd) {
    background-color: rgba(0,0,0,.05);
  }
  .notes table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }
</style>
