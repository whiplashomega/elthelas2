<template>
  <div>
    <h2>Improvements &nbsp;<button @click="addImprovementModal = true" class="btn btn-success">+</button></h2>
    <div class="row">
      <div class="col-sm-3">
        <h4>{{ stronghold.castleName }} Castle Improvements</h4>
        <div v-for="improvement in castleImprovements" :key="improvement.id">
          <improvement :improvement="improvement" :stronghold="stronghold" />
        </div>
      </div>
      <div class="col-sm-3">
        <h4>Countryside Improvements</h4>
        <div v-for="improvement in countrysideImprovements" :key="improvement.id" v-if="improvement.id !== 'new-land' && improvement.id !== 'clear-land'">
          <improvement :improvement="improvement" :stronghold="stronghold" />
        </div>
      </div>
      <div class="col-sm-3">
        <h4>{{ stronghold.townName }} Town Improvements</h4>
        <div v-for="improvement in townImprovements" :key="improvement.id">
          <improvement :improvement="improvement" :stronghold="stronghold" />
        </div>
      </div>
      <div class="col-sm-3">
        <h4>Under Construction</h4>
        <table class="table table-sm table-striped">
          <thead><tr><th>Improvement</th><th>Days Remaining</th></tr></thead>
          <tbody>
            <tr v-for="(imp, index) in stronghold.construction" :key="imp.id + index">
              <td>{{ imp.name }} <span v-if="imp.private">(private)</span></td><td>{{ imp.buildtime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-modal v-model="addImprovementModal" title="Add Improvement" size="xl">
        <input type="checkbox" v-model="showAvailable" /> Only Show Available Improvements
        <input type="checkbox" v-model="dmGift" /> DM Gift (added without cost)
        <input type="checkbox" v-model="addImediately" /> Ignore Construction Time
        <select v-model="tagFilter">
          <option value="all">All</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="income">Income</option>
          <option value="player-benefit">Player Benefit</option>
          <option value="housing">Housing</option>
          <option value="defense">Defense</option>
          <option value="faction-base">Potential Base</option>
        </select>
        <table class="table table-striped table-responsive" style="width:100%;">
          <colgroup>
            <col style="width:10%;" />
            <col />
            <col style="width:30%;" />
            <col style="width:10%;" />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Improvement</th><th>Private</th><th>Benefit</th><th>Staff</th><th>Revenue</th><th>Pop / Beds</th><th>Employs</th><th>Cost</th><th>Build Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="improvement in availableImprovements" :key="improvement.id">
              <td><a href="#" @click="addToConstruction(improvement)">{{ improvement.name }}</a></td>
              <td><input type="checkbox" v-model="improvement.private" /></td>
              <td>{{ improvement.benefit }}</td>
              <td><span v-for="staff in improvement.staff" :key="staff.name"><span v-if="staff.num > 0">{{ staff.num }}</span> {{ staff.name }} </span></td>
              <td>
                <div>Gold: {{ improvement.income }}</div>
                <div v-for="(res, key) in improvement.revenue" :key="key" v-if="res !== 0">
                  {{ key }}: {{ res }}
                </div>
              </td>
              <td>{{ improvement.pop }} / {{ improvement.staffpop }}</td>
              <td>{{ improvement.employs }}</td>
              <td>
                <div>Gold: {{ improvement.goldCost }}</div>
                <div v-for="(res, key) in improvement.resourceCost" :key="key" v-if="res !== 0">
                  {{ key }}: {{ res }}
                </div>
              </td>
              <td>{{ improvement.buildtime }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Improvement</th><th>Benefit</th><th>Staff</th><th>Revenue</th><th>Pop</th><th>Employs</th><th>Cost</th><th>Build Time</th>
            </tr>
          </tfoot>
        </table>
      </b-modal>
    </div>
    <h4>Land Details</h4>
    <div class="row">
      <div class="col-sm-3">
        Total Land: {{ totalLand }}<br />
        Total Cleared Land: {{ availableClearedLand + farmLand + urbanLand }}<br />
      </div>
      <div class="col-sm-3">
        Total Forested Land: {{ forestedLand }}<br />
        Land Used For Timber Harvesting: {{ timberLand }}<br />
        Available Forested Land: {{ availableForestedLand }}<br />
      </div>
      <div class="col-sm-3">
        Available Cleared Land: {{ availableClearedLand }}<br />
        Farm Land: {{ farmLand }}<br />
        Urban Land: {{ urbanLand }}<br />
      </div>
    </div>
  </div>
</template>
<script src="./js/improvements.js"></script>
<style src="./scss/stronghold.scss" lang="scss" scoped></style>
