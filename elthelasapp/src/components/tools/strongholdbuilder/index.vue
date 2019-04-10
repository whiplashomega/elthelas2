<template>
  <div class="col-sm-12">
    <stronghold-summary />
    <b-tabs>
      <b-tab title="General Information">
        <general-information />
      </b-tab>
      <b-tab title="Improvements">
        <improvements />
      </b-tab>
      <b-tab title="Staff">
        <staff />
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
                      <button class="btn btn-primary" @click="addResource(key, resourceChange[key])">Add</button>
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
            <h4>Exports/Imports</h4>
            Today's Exports and Imports: {{ currentExportWeight }}<br />
            Maximum Exports and Imports: {{ exportLimit }}<br />
            Current Stored Goods: {{ usedStorage }}<br />
            Total Storage Space: {{ totalStorage }}
          </div>
          <div class="col-sm-3">
            <h4>Taxes</h4>
            <p>
              Collecting taxes requires a steward to be employed. Further, tax efficiency is determined by the rule of law in your demense, which is increased by hiring constables and guards. The higher the population, the more constables and guards you need. Constables require a constables office to do their job effectively, but are much more efficient at enforcing taxes and handling petty crime than guards.
            </p>
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
            <h4>Other Laws</h4>
            <input type="number" class="form-control"
                   min="0" :max="stronghold.resources.food"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.foodSubsidies"
                   step="1" title="Food subsidies are expensive, but reduce unrest." />
            Food Subsidies (person days of food)
            <br />
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
          <div class="col-sm-4">
            <h4>Merchants</h4>
            <button class="btn btn-success" @click="addMerchant()">Add</button>
            <div v-for="merchant in stronghold.merchants" :key="merchant.id" class="row">
              <label class="col-sm-7">
                Name
                <input type="text" class="form-control form-control-sm" v-model="merchant.name" />
              </label>
              <label class="col-sm-4">
                Carry Weight
                <input type="number" class="form-control form-control-sm"
                       v-model="merchant.carryweight" min="0"
                       title="amount that this merchant is able to carry out in kilograms in a day, a typical average merchant will have a value between 1000 and 2000" />
              </label>
              <div class="col-sm-1">
                <button class="btn btn-sm btn-danger" style="margin-top:22px;" @click="deleteMerchant(merchant)">X</button>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <h4>{{ stronghold.townName }} Private Enterprises</h4>
            <div v-for="improvement in stronghold.privateEnterprise" :key="improvement.id">
              <h5>{{ improvement.name }} x {{ improvement.count }}</h5>
            </div>
          </div>
          <div class="col-sm-4">
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
