<template>
  <div>
    <h2>Staff</h2>
    <div class="row">
      <div class="col-sm-5">
        <h4>Population</h4>
        <table class="table table-striped table-sm">
          <colgroup>
            <col />
            <col style="wdith: 15%;" />
          </colgroup>
          <tbody>
            <tr>
              <td>Healthy Adults</td>
              <td>
                <input type="number" v-model="stronghold.population.adults"
                       class="form-control" min="0" />
              </td>
            </tr>
            <tr>
              <td>Children</td>
              <td>
                <input type="number" v-model="stronghold.population.children"
                       class="form-control" min="0" />
              </td>
            </tr>
            <tr>
              <td>Sick</td>
              <td>
                <input type="number" v-model="stronghold.population.invalid"
                       class="form-control" min="0" />
              </td>
            </tr>
            <tr>
              <td>Total Population</td>
              <td>
                {{ getPop }}
              </td>
            </tr>
          </tbody>
        </table>
        <h4>Staff Summary</h4>
        Total Staff Salary: {{ totalSalary }}
        <table class="table table-striped table-sm">
          <colgroup>
            <col />
            <col style="width: 15%;" />
          </colgroup>
          <thead><th>Job</th><th>Total</th><th>Needed</th><th>Bonus</th></thead>
          <tbody>
            <tr>
              <td>Guards</td>
              <td><input type="number" v-model="stronghold.guards"
                         class="form-control" min="0"
                         :max="availableStaffBeds + Number(stronghold.guards)" /></td>
              <td>{{ guardsNeeded }}</td>
              <td>Protects your stronghold from attack, can also collect taxes.</td>
            </tr>
            <tr>
              <td>Servants</td>
              <td><input type="number" v-model="stronghold.servants"
                         class="form-control" min="0"
                         :max="availableStaffBeds + Number(stronghold.servants)" /></td>
              <td>{{ servantsNeeded }}</td>
              <td>Handles common household tasks like cleaning and cooking.</td>
            </tr>
            <tr>
              <td>Laborers</td>
              <td><input type="number" v-model="stronghold.laborers"
                         class="form-control" min="0"
                         :max="maxLaborers" title="You can hire laborers up to the number of healthy adults (not including staff, the other 30% are kids too young to work), private enterprises will suck up a certain percentage of the labor market though." /></td>
              <td>{{ laborersNeeded }}</td>
              <td>Does manual labor in many employments, from a blacksmiths apprentice/journeyman to cutting down trees.</td>
            </tr>
            <tr v-for="staff in staffSummary" :key="staff.job.name + staff.job.subtype">
              <td>{{ staff.job.name }} <span v-if="staff.job.subtype">({{ staff.job.subtype }})</span></td>
              <td>{{ staff.count }}</td>
              <td>{{ staff.needed }}</td>
              <td>{{ staff.job.bonus }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="stronghold.laborers >= maxLaborers" class="red">Not Enough Housing or Healthy Adults To Hire Additional Laborers</div>
        <div v-if="availableStaffBeds <= 0" class="red">Not Enough Beds To House Additional Skilled Staff</div>
      </div>
      <div class="col-sm-2">
        <h4>Unmet Needs</h4>
        <div v-for="staff in unmetStaffNeed" :key="staff.name">
          {{ staff.name }} x {{ staff.num }}
        </div>
        <h4>Add Staff</h4>
        <div>
          <label>
            Name
            <input type="text" v-model="newstaff.name" class="form-control form-control-sm" />
          </label>
        </div>
        <div>
          <label>
            Job
            <select v-model="newstaff.job" class="form-control form-control-sm">
              <option v-for="type in staffTypes" :value="type" :key="type.name">{{ type.name }}</option>
            </select>
          </label>
          <label v-if="typeof newstaff.job.subtypes !== 'undefined'">
            Sub Type
            <select v-model="newstaff.job.subtype" class="form-control form-control-sm">
              <option v-for="type in newstaff.job.subtypes" :value="type" :key="type">{{ type }}</option>
            </select>
          </label><br />
          Bonus: {{ newstaff.job.bonus }}
        </div>
        <div>
          <label>
            Salary
            <input type="number" v-model="newstaff.salary" class="form-control form-control-sm" />
          </label><br />
          Typical: {{ newstaff.job.typicalSalary }} gp
        </div>
        <div>
          <button @click="addStaff()" class="btn btn-success btn-sm" :disabled="!availableStaffBeds">Add</button>
        </div>
      </div>
      <div class="col-sm-5">
        <h4>Staff List</h4>
        <table class="table table-striped table-sm">
          <thead>
            <th :class="staffSort === 'name' ? 'bold' : ''" @click="staffSort = 'name'">Name</th>
            <th :class="staffSort === 'job' ? 'bold' : ''" @click="staffSort = 'job'">Job</th>
            <th :class="staffSort === 'salary' ? 'bold' : ''" @click="staffSort = 'salary'">Salary</th>
            <th>Fire</th>
          </thead>
          <tbody>
            <tr v-for="staff in staffList" :key="staff.id">
              <td>{{ staff.name }}</td>
              <td>{{ staff.job.name }} <span v-if="staff.job.subtype">({{ staff.job.subtype }})</span></td>
              <td>{{ staff.salary }}</td><td><button class="btn btn-danger" @click="fireStaff(staff)">X</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script src="./js/staff.js"></script>
<style src="./scss/stronghold.scss" lang="scss" scoped></style>
