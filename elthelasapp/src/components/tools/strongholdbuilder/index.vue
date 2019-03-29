<template>
  <div class="col-sm-12">
    <div class="row">
      <h1 class="col-sm-5">
        <div class="btn-group">
          <button class="btn btn-warning" @click="newStronghold(); newmodal = true">New / Load</button>
          <button class="btn btn-success" @click="saveNewStronghold()">Save New</button>
          <button class="btn btn-primary" v-if="stronghold._id" @click="saveStronghold()">Save</button>
        </div>
        {{ stronghold.castleName }} : {{ stronghold.townName }}
        {{ gameDate }}&nbsp;&nbsp;<button class="btn btn-primary" @click="newDay()">New Day</button>
      </h1>
      <div class="col-sm-7">
        <div class="row">
          <div :class="netRevenue < 0 ? 'red' : ''" class="col-sm-3">
            <strong>Gold: </strong> {{ stronghold.treasury }} (<span v-if="netRevenue >= 0">+</span>{{ netRevenue }})
          </div>
          <div class="col-sm-3">
            <strong>Available Beds: </strong> {{ availableStaffBeds }}
          </div>
          <div class="col-sm-3">
            <strong>Max Laborers: </strong> {{ maxLaborers }}
          </div>
          <div class="col-sm-3">
            <strong>Unrest: </strong> {{ unrest }}%
          </div>
        </div>
        <div class="row">
          <div v-for="(resource, key) in stronghold.resources" :key="key"
               class="col-sm-3" :class="calcTotalRevenue[key] < 0 ? 'red' : ''">
            <strong>{{ key }}</strong>: {{ resource }} (<span v-if="calcTotalRevenue[key] >= 0">+</span>{{ calcTotalRevenue[key] }})
          </div>
        </div>
      </div>
    </div>
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
    <b-tabs>
      <b-tab title="General Information">
        <div class="row">
          <div class="col-sm-3">
            <h4>Land Details</h4>
            Total Land: {{ totalLand }}<br />
            Total Forested Land: {{ forestedLand }}<br />
            Land Used For Timber Harvesting: {{ timberLand }}<br />
            Available Forested Land: {{ availableForestedLand }}<br />
            Total Cleared Land: {{ availableClearedLand + farmLand + urbanLand }}<br />
            Available Cleared Land: {{ availableClearedLand }}<br />
            Farm Land: {{ farmLand }}<br />
            Urban Land: {{ urbanLand }}<br />
          </div>
          <div class="col-sm-3">
            <h4>Population Statistics</h4>
            Total Population: {{ getPop }}<br />
            Your Employees: {{ totalEmployees }}<br />
            Total Number Employed: {{ totalEmployees + privateLaborers + stronghold.privateEmployees.length }}<br />
            Unemployment Rate: {{ unemploymentRate }}%<br />
            Beds for Staff: {{ staffBeds }}<br />
            Available Beds: {{ availableStaffBeds }}<br />
            Unrest: {{ unrest }}%<br />
          </div>
          <div class="col-sm-6">
            <h4>Notes</h4>
            <textarea class="form-control" v-model="stronghold.notes" style="min-height:400px;"></textarea>
          </div>
        </div>
      </b-tab>
      <b-tab title="Improvements">
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
            <table class="table table-striped table-responsive" style="width:100%;">
              <colgroup>
                <col />
                <col />
                <col style="width:30%;" />
                <col style="width:5%;" />
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
      </b-tab>
      <b-tab title="Staff">
        <h2>Staff</h2>
        <div class="row">
          <div class="col-sm-5">
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
                             :max="maxLaborers" title="You can hire laborers up to 70% of the total population (not including staff, the other 30% are kids too young to work), private enterprises will suck up a certain percentage of the labor market though." /></td>
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
            <div v-if="stronghold.laborers >= maxLaborers" class="red">Not Enough Housing To Hire Additional Laborers</div>
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
      </b-tab>
      <b-tab title="Budget">
        <div class="row">
          <div class="col-sm-6">
            <h4>Current Treasury</h4>
            <h6>Gold Transactions</h6>
            <p>
              <input type="number" v-model="changeby"
                     class="form-control" style="width:15%;display:inline;" />
              &nbsp;&nbsp;
              <input v-model="record" type="text"
                     class="form-control" placeholder="transaction record"
                     style="width: 70%; display:inline;" />
            </p>
            <div class="btn-group">
              <button class="btn btn-primary" @click="addToTreasury(changeby, record)">Add to Treasury</button>
              <button class="btn btn-success" @click="showTransactionRecord = true">Transaction Record</button>
            </div><br />
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
            <table class="table table-striped">
              <thead>
                <tr><th>Resource</th><th>On Hand</th><th>Sell</th><th>Buy</th><th>Daily Sell/Buy</th><th>Change By</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr v-for="(resource, key) in stronghold.resources" :key="key">
                  <th>{{ key }}</th>
                  <td>{{ resource }}</td>
                  <td><span>{{ sellTable[key] }}</span></td>
                  <td><span>{{ buyTable[key] }}</span></td>
                  <td>
                    <input type="number" v-model="stronghold.autoSell[key]"
                           class="form-control" style="width:75px;"
                           :min="-stronghold.resources[key]" />
                  </td>
                  <td>
                    <input type="number" class="form-control"
                           style="width: 75px; display:inline;" min="0"
                           v-model="resourceChange[key]" />
                  </td>
                  <td>
                    <div class="btn-group">
                      <button class="btn btn-primary" @click="sellResource(key, resourceChange[key])">Sell</button>
                      <button class="btn btn-primary" @click="buyResource(key, resourceChange[key])">Buy</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-3">
            <h4>Revenue</h4>
            Total Revenue: {{ grossRevenue }}<br />
            Direct Income: {{ improvementRevenue }}<br />
            Resource Sales: {{ resourceRevenue }}<br />
            Total Tax Revenue: {{ taxRevenue }}<br />
            Income Tax Revenue: {{ incomeTax }}<br />
            Head Tax Revenue: {{ headTax }}<br />
            Property Tax Revenue: {{ propertyTax }}<br />
            Bank Revenue: {{ bankRevenue }}
            <h4>Expenses</h4>
            Total Expenses: {{ expenses }}<br />
            Employee Salaries: {{ totalSalary }}<br />
            Building Maintenance: {{ buildingMaintenance }}<br />
            Resource Purchases: {{ resourceCost }}
          </div>
          <div class="col-sm-3">
            <h4>Taxes</h4>
            <input type="number" class="form-control"
                   min="0" max="0.5"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.headTaxRate"
                   step="0.1" title="Head taxes are a flat tax on every person living on your land, these taxes are common, but are considered oppressive by the populace, particularly the poor or unemployed, who may not have the ability to pay." />
            Head Tax Rate (gp / person)
            <br />
            <input type="number" class="form-control"
                   min="0" max="100"
                   step="1" style="max-width:75px; display:inline;"
                   v-model="stronghold.laws.incomeTaxRate" title="income taxes tax a percentage of the populations income, low income taxes are easily tolerated, but higher than 10% or so and people start to feel upset" />
            Income Tax Rate (%)
            <br />
            <input type="number" class="form-control"
                   min="0" max="1"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.propertyTaxRate"
                   step="0.1" title="property taxes return a portion of the value of private property built on your land. The daily assessment cannot exceed 1% or property owners will simply sell out and leave." />
            Property Tax Rate (%)
            <br />
            <input type="number" class="form-control"
                   min="0" max="stronghold.resources.food"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.foodSubsidies"
                   step="1" title="Food subsidies are expensive, but reduce unrest." />
            Food Subsidies (person days of food)
            <p>
              Collecting taxes requires a steward to be employed. Further, tax efficiency is determined by the rule of law in your demense, which is increased by hiring constables and guards. The higher the population, the more constables and guards you need. Constables require a constables office to do their job effectively, but are much more efficient at enforcing taxes and handling petty crime than guards.
            </p>
          </div>
        </div>

      </b-tab>
      <b-tab title="Animals">
        <div class="row">
          <div class="col-sm-3">
            Name
            <input type="text" class="form-control" v-model="newanimal.name" />
          </div>
          <div class="col-sm-3">
            Species
            <input type="text" class="form-control" v-model="newanimal.species" />
          </div>
          <div class="col-sm-3">
            Lives At
            <select class="form-control" v-model="newanimal.livesat">
              <option value="animal-sanctuary">Animal Sanctuary</option>
              <option value="stable">Stable</option>
              <option value="ayrie">Ayrie</option>
            </select>
          </div>
          <div class="col-sm-2">
            Daily Food Cost
            <input type="number" class="form-control" v-model="newanimal.cost" />
          </div>
          <div class="col-sm-1">
            <button @click="addAnimal()" class="btn btn-success" style="margin-top:22px;">Add</button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <h4>Animal Sanctuary</h4>
            <table class="table table-sm table-striped">
              <thead>
                <tr><th>Name</th><th>Species</th><th>Food Cost</th><th>Delete</th></tr>
              </thead>
              <tbody>
                <tr v-for="animal in sanctuaryAnimals" :key="animal.id">
                  <td>{{ animal.name }}</td>
                  <td>{{ animal.species }}</td>
                  <td>{{ animal.foodcost }}</td>
                  <td><button class="btn btn-danger" @click="removeAnimal(animal)">X</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-4">
            <h4>Stables</h4>
            <table class="table table-sm table-striped">
              <thead>
                <tr><th>Name</th><th>Species</th><th>Food Cost</th><th>Delete</th></tr>
              </thead>
              <tbody>
                <tr v-for="animal in stableAnimals" :key="animal.id">
                  <td>{{ animal.name }}</td>
                  <td>{{ animal.species }}</td>
                  <td>{{ animal.foodcost }}</td>
                  <td><button class="btn btn-danger" @click="removeAnimal(animal)">X</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-4">
            <h4>Ayrie</h4>
            <table class="table table-sm table-striped">
              <thead>
                <tr><th>Name</th><th>Species</th><th>Food Cost</th><th>Delete</th></tr>
              </thead>
              <tbody>
                <tr v-for="animal in ayrieAnimals" :key="animal.id">
                  <td>{{ animal.name }}</td>
                  <td>{{ animal.species }}</td>
                  <td>{{ animal.foodcost }}</td>
                  <td><button class="btn btn-danger" @click="removeAnimal(animal)">X</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-tab>
      <b-tab title="Private Enterprises">
        <div class="row">
          <div class="col-sm-6">
            <h4>{{ stronghold.townName }} Private Enterprises</h4>
            <div v-for="improvement in stronghold.privateEnterprise" :key="improvement.id">
              <h5>{{ improvement.name }} x {{ improvement.count }}</h5>
            </div>
          </div>
          <div class="col-sm-6">
            <h4>Private Staff</h4>
            <p><strong>Laborers: {{ privateLaborers }}</strong></p>
            <p v-for="staff in stronghold.privateEmployees" :key="staff.id">{{ staff.name }}</p>
          </div>
        </div>
      </b-tab>
    </b-tabs>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>
<script src="./stronghold.js"></script>
<style>
.modal-xl {
  max-width: 1400px;
}
.red {
  color: red;
}
.bold {
  color: darkblue;
}
</style>
