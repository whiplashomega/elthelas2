<template>
  <div>
    <h1>{{ stronghold.castleName }} : {{ stronghold.townName }}</h1>
    <b-modal v-model="newmodal">
      Castle Name <input type="text" v-model="stronghold.castleName" class="form-control" />
      Town Name <input type="text" v-model="stronghold.townName" class="form-control" />
      <h5>Start Date</h5>
      <div class="row">
        <label class="col-sm-4">
          Month <input type="number" min="1"
                       max="12" class="form-control"
                       v-model="stronghold.gameMonth" />
        </label>
        <label class="col-sm-4">
          Day <input type="number" min="1"
                     max="30" class="form-control"
                     v-model="stronghold.gameDay" />
        </label>
        <label class="col-sm-4">
          Year <input type="number" min="1800"
                      max="1846" class="form-control"
                      v-model="stronghold.gameYear" />
        </label>
      </div>
      <h4>Load Stronghold</h4>
      <ul>
        <li v-for="stronghold in allStrongholds" :key="stronghold._id">
          <a href="#" @click="loadStronghold(stronghold)">{{ stronghold.castleName }}</a>&nbsp;&nbsp;
          <button class="btn btn-danger" @click="deleteStronghold({ stronghold: stronghold })">X</button>
        </li>
      </ul>
    </b-modal>
    <div class="row">
      <div class="col-sm-3">
        <div class="btn-group">
          <button class="btn btn-warning" @click="newStronghold(); newmodal = true">New / Load</button>
          <button class="btn btn-success" @click="saveNewStronghold()">Save New</button>
          <button class="btn btn-primary" v-if="stronghold._id" @click="saveStronghold()">Save</button>
        </div><br />
        <strong>Current Treasury: {{ stronghold.treasury }}</strong><br />
        <strong>Net Revenue: {{ netRevenue }}</strong>&nbsp;&nbsp;
        <button class="btn btn-sm btn-primary" @click="newDay()">New Day</button><br />
        Current Date: {{ gameDate }}<br />
        <h5>Add Transactions</h5>
        <input v-model="changeby" type="number" class="form-control" />
        <input v-model="record" type="text"
               class="form-control" placeholder="transaction record" /><br />
        <div class="btn-group">
          <button class="btn btn-primary" @click="addToTreasury(changeby, record)">Add to Treasury</button>
          <button class="btn btn-success" @click="showTransactionRecord = true">Transaction Record</button>
        </div>
        <b-modal v-model="showTransactionRecord" title="Transaction Record">
          <table class="table table-striped">
            <thead><tr><th>Amount</th><th>Description</th><th>Balance</th></tr></thead>
            <tbody>
              <tr v-for="transaction in reverseTransactions" :key="transaction.id">
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.description }}</td>
                <td>{{ transaction.balance }}</td>
                <td>{{ transaction.date }}</td>
              </tr>
            </tbody>
          </table>
        </b-modal>
      </div>
      <div class="col-sm-3">
        Total Population: {{ getPop }}<br />
        Number Employed: {{ totalEmployees }}<br />
        Beds for Staff: {{ staffBeds }}<br />
        Available Beds: {{ availableStaffBeds }}<br />
        Total Land: {{ totalLand }}<br />
        Forested Land: {{ forestedLand }}<br />
        Available Cleared Land: {{ availableClearedLand }}<br />
        Farm Land: {{ farmLand }}<br />
        Urban Land: {{ urbanLand }}<br />
        Gross Daily Revenue: {{ grossRevenue }}<br />
        Tax Revenue: {{ taxRevenue }}<br />
        Bank Revenue: {{ bankRevenue }}<br />
        Lumber Camp Revenue: {{ lumberRevenue }}<br />
        Expenses: {{ expenses }}<br />
      </div>
      <div class="col-sm-3">
        <h4>Needed Staff</h4>
        <div v-for="staff in neededStaff" :key="staff.id">
          {{ staff.name }} x {{ staff.num }}
        </div>
        <h4>Unmet Needs</h4>
        <div v-for="staff in unmetStaffNeed" :key="staff.name">
          {{ staff.name }} x {{ staff.num }}
        </div>
      </div>
      <div class="col-sm-3">
        <h4>Under Construction</h4>
        <table class="table table-sm table-striped">
          <thead><tr><th>Improvement</th><th>Days Remaining</th></tr></thead>
          <tbody>
            <tr v-for="(imp, index) in stronghold.construction" :key="index">
              <td>{{ imp.name }}</td><td>{{ imp.buildtime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <h2>Improvements</h2>
        <button @click="addImprovementModal = true" class="btn btn-success">+</button>
        <h4>{{ stronghold.castleName }} Castle Improvements</h4>
        <div v-for="improvement in castleImprovements" :key="improvement.id">
          <improvement :improvement="improvement" :stronghold="stronghold" />
        </div>
        <h4>Countryside Improvements</h4>
        <div v-for="improvement in countrysideImprovements" :key="improvement.id">
          <improvement :improvement="improvement" :stronghold="stronghold" />
        </div>
        <h4>{{ stronghold.townName }} Town Improvements</h4>
        <div v-for="improvement in townImprovements" :key="improvement.id">
          <improvement :improvement="improvement" :stronghold="stronghold" />
        </div>
        <b-modal v-model="addImprovementModal" title="Add Improvement" size="xl">
          <input type="checkbox" v-model="showAvailable" /> Only Show Available Improvements
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Improvement</th><th>Benefit</th><th>Staff</th><th>Revenue</th><th>Pop</th><th>Employs</th><th>Cost</th><th>Build Time</th><th>Prerequisites</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="improvement in availableImprovements" :key="improvement.id">
                <td><a href="#" @click="addToConstruction(improvement)">{{ improvement.name }}</a></td>
                <td>{{ improvement.benefit }}</td>
                <td><span v-for="staff in improvement.staff" :key="staff.name">{{ staff.num }} {{ staff.name }} </span></td>
                <td>{{ improvement.revenue }}</td>
                <td>{{ improvement.pop }}</td>
                <td>{{ improvement.employs }}</td>
                <td>{{ improvement.cost }}</td>
                <td>{{ improvement.buildtime }}</td>
                <td><span v-for="prereq in improvement.prerequisites" :key="prereq">{{ prereq }}</span></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Improvement</th><th>Benefit</th><th>Staff</th><th>Revenue</th><th>Pop</th><th>Employs</th><th>Cost</th><th>Build Time</th><th>Prerequisites</th>
              </tr>
            </tfoot>
          </table>
        </b-modal>
      </div>
      <div class="col-sm-8">
        <h2>Staff</h2>
        <div class="row">
          <div class="col-sm-3">
            <label>
              Name
              <input type="text" v-model="newstaff.name" class="form-control" />
            </label>
          </div>
          <div class="col-sm-5">
            <div class="row">
              <label class="col-sm-6">
                Job
                <select v-model="newstaff.job" class="form-control">
                  <option v-for="type in staffTypes" :value="type" :key="type.name">{{ type.name }}</option>
                </select>
              </label>
              <label class="col-sm-6" v-if="typeof newstaff.job.subtypes !== 'undefined'">
                Sub Type
                <select v-model="newstaff.job.subtype" class="form-control">
                  <option v-for="type in newstaff.job.subtypes" :value="type" :key="type">{{ type }}</option>
                </select>
              </label>
            </div>
            Bonus: {{ newstaff.job.bonus }}
          </div>
          <div class="col-sm-2">
            <label>
              Salary
              <input type="number" v-model="newstaff.salary" class="form-control" />
            </label>
            Typical: {{ newstaff.job.typicalSalary }} gp
          </div>
          <div class="col-sm-2">
            <button @click="addStaff()" class="btn btn-success" style="margin-top: 23px;">Add</button>
          </div>
        </div>
        <h4>Staff Summary</h4>
        Total Staff Salary: {{ totalSalary }}
        <table class="table table-striped table-sm">
          <thead><th>Job</th><th>Total</th><th>Bonus</th></thead>
          <tbody>
            <tr v-for="staff in staffSummary" :key="staff.job.name + staff.job.subtype">
              <td>{{ staff.job.name }} <span v-if="staff.job.subtype">({{ staff.job.subtype }})</span></td><td>{{ staff.count }}</td><td>{{ staff.job.bonus }}</td>
            </tr>
          </tbody>
        </table>
        <h4>Staff List</h4>
        <table class="table table-striped table-sm">
          <thead><th>Name</th><th>Job</th><th>Salary</th><th>Fire</th></thead>
          <tbody>
            <tr v-for="staff in stronghold.staff" :key="staff.id">
              <td>{{ staff.name }}</td>
              <td>{{ staff.job.name }} <span v-if="staff.job.subtype">({{ staff.job.subtype }})</span></td>
              <td>{{ staff.salary }}</td><td><button class="btn btn-danger" @click="fireStaff(staff)">X</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>
<script src="./stronghold.js"></script>
<style>
.modal-xl {
  max-width: 1140px;
}
</style>
