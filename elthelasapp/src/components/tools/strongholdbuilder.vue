**<template>
  <div class="col-sm-12 strongholdbuilder">
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
          <div class="col-sm-7">
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
              <button class="btn btn-primary" @click="addToTreasury({ changeby: changeby, record: record })">Add to Treasury</button>
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
                <tr><th>Resource</th><th>On Hand</th><th>Sell</th><th>Buy</th><th>Pop Needs</th><th>Your Production</th><th>Private Production</th><th>Daily Sell/Buy</th><th>Change By</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr v-for="(resource, key) in stronghold.resources" :key="key">
                  <th>{{ key }}</th>
                  <td>{{ resource }}</td>
                  <td><span>{{ sellTable[key] }}</span></td>
                  <td><span>{{ buyTable[key] }}</span></td>
                  <td><span>{{ popNeeds[key] }}</span></td>
                  <td><span>{{ calcGrossRevenue[key] }}</span></td>
                  <td><span>{{ privateProduced[key] }}</span></td>
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
                      <button class="btn btn-primary" @click="buyResource({ type: key, amount: resourceChange[key] })">Buy</button>
                      <button class="btn btn-primary" @click="addResource(key, resourceChange[key])">Add</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-2">
            <h4>Revenue</h4>
            Total Revenue: {{ grossRevenue }}<br />
            Direct Income: {{ improvementRevenue }}<br />
            Resource Sales: {{ resourceRevenue }}<br />
            Total Tax Revenue: {{ taxRevenue }}<br />
            Income Tax Revenue: {{ incomeTax }}<br />
            Head Tax Revenue: {{ headTax }}<br />
            Property Tax Revenue: {{ propertyTax }}<br />
            Vassal Tax Revenue: {{ vassalTax }}<br />
            Rents Revenue: {{ rents }}<br />
            Bank Revenue: {{ bankRevenue }}
            <h4>Expenses</h4>
            Total Expenses: {{ expenses }}<br />
            Employee Salaries: {{ totalSalary }}<br />
            Building Maintenance: {{ buildingMaintenance }}<br />
            Resource Purchases: {{ resourceCost }}
            <h4>Storage</h4>
            Current Stored Goods: {{ usedStorage }}<br />
            Total Storage Space: {{ totalStorage }}
          </div>
          <div class="col-sm-3">
            <h4>Taxes</h4>
            <p>
              Collecting taxes requires a steward to be employed. Further, tax efficiency is determined by the rule of law in your demense, which is increased by hiring constables and guards. The higher the population, the more constables and guards you need. Constables require a constables office to do their job effectively, but are much more efficient at enforcing taxes and handling petty crime than guards. For maximum tax efficiency you need at least 1 guard for every 100 people or at least 1 constable for every 500 people, combined. So if you have a population of 600, you would have maximum tax efficiency with 2 constables, 1 constable and 1 guard, or 6 guards.
            </p>
            <p>
              Current Tax Efficiency: <strong>{{ taxEfficiency * 100 }}%</strong>
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
            <br />
            <input type="number" class="form-control"
                   min="0" max="0.5"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.rentRate"
                   step="0.01" title="rents on public owned housing." />
            Daily Rent for Laborers (Middle Class housing pays 5 times this amount)
            <br />
            <input type="number" class="form-control"
                   min="0" max="50"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.vassalTaxRate"
                   step="1" title="vassal taxes enforce taxes on your vassals. Enforcing vassal taxes requires hiring a tax collector. Additionally, vassal tax rates above 10% increase the amount of vassal unrest by the amount above 10%" />
            Vassal Tax Rate (%)
            <h4>Other Laws</h4>
            <input type="number" class="form-control"
                   min="0" :max="stronghold.resources.food"
                   style="max-width:75px; display:inline;" v-model="stronghold.laws.foodSubsidies"
                   step="1" title="Food subsidies are expensive, but reduce unrest." />
            Food Subsidies (person days of food)
            <br />
            <input type="checkbox" v-model="stronghold.laws.conscription" title="conscription involves forcing people to work as soldiers. It enables you to make any portion of your population guards, and reduces the cost of guards to the cost of laborers. However, your unrest will increase by the percentage of your population that is guards." />
            Conscription
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
              <option value="homeless">Homeless</option>
              <option value="stable">Stable</option>
              <option value="animal-sanctuary">Animal Sanctuary</option>
              <option value="ayrie">Ayrie</option>
            </select>
          </div>
          <div class="col-sm-2">
            Daily Food Cost
            <input type="number" class="form-control"
                   v-model="newanimal.foodcost" title="see bottom of page for typical food costs by animal size and diet." />
          </div>
          <div class="col-sm-1">
            <button @click="addAnimal()" class="btn btn-success" style="margin-top:22px;">Add</button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <h4>Homeless</h4>
            <table class="table table-sm table-striped">
              <thead>
                <tr><th>Name</th><th>Species</th><th>Food Cost</th><th>Delete</th></tr>
              </thead>
              <tbody>
                <tr v-for="animal in homelessAnimals" :key="animal.id">
                  <td>{{ animal.name }}</td>
                  <td>{{ animal.species }}</td>
                  <td>{{ animal.foodcost * 2 }} (base {{ animal.foodcost }})</td>
                  <td><button class="btn btn-danger" @click="removeAnimal(animal)">X</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
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
        </div>
        <div class="row">
          <div class="col-sm-12">
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
        </div>
        <div class="row">
          <div class="col-sm-12">
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
        <div class="row">
          <div class="col-sm-12">
            <h4>Typical Food Costs by Diet and Size (in units of food)</h4>
            <table>
              <thead><tr><th>Size</th><th>Diet</th><th>Typical Food Cost</th></tr></thead>
              <tbody>
                <tr><td>Tiny</td><td>Any</td><td>0.05</td></tr>
                <tr><td>Small</td><td>Herbivore/Frugivore</td><td>0.1</td></tr>
                <tr><td>Small</td><td>Omnivore/Carnivore</td><td>0.5</td></tr>
                <tr><td>Medium</td><td>Herbivore</td><td>0.25</td></tr>
                <tr><td>Medium</td><td>Frugivore</td><td>0.5</td></tr>
                <tr><td>Medium</td><td>Omnivore/Carnivore</td><td>1</td></tr>
                <tr><td>Large</td><td>Herbivore</td><td>1</td></tr>
                <tr><td>Large</td><td>Frugivore</td><td>2</td></tr>
                <tr><td>Large</td><td>Omnivore/Carnivore</td>4</tr>
                <tr><td>Huge</td><td>Herbivore</td><td>4</td></tr>
                <tr><td>Huge</td><td>Frugivore</td><td>8</td></tr>
                <tr><td>Huge</td><td>Omnivore/Carnivore</td><td>16</td></tr>
              </tbody>
            </table>
            <h4>Multipliers for Other Traits</h4>
            <table>
              <thead><tr><th>Trait</th><th>Multiplier</th></tr></thead>
              <tbody>
                <tr><td>Flying Speed</td><td>2</td></tr>
                <tr><td>Monstrous Type</td><td>2</td></tr>
                <tr><td>Size Greater than Huge</td><td>4</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-tab>
      <b-tab title="Private Enterprises and Vassals">
        <div class="row">
          <div class="col-sm-4">
            <h4>{{ stronghold.townName }} Private Enterprises</h4>
            <div v-for="improvement in stronghold.privateEnterprise" :key="improvement.id">
              <h5>{{ improvement.name }} x {{ improvement.count }} <button @click="deletePrivateEnterprise(improvement)" class="btn btn-danger">X</button></h5>
            </div>
          </div>
          <div class="col-sm-4">
            <h4>Private Staff</h4>
            <p><strong>Laborers: {{ privateLaborers }}</strong></p>
            <p v-for="staff in stronghold.privateEmployees" :key="staff.id">{{ staff.name }}</p>
          </div>
          <div class="col-sm-4">
            <h4>Vassals</h4>
            <table class="table table-striped">
              <tr>
                <th>Name</th><th>Income</th>
              </tr>
              <tr v-for="vassal in stronghold.vassals" :key="vassal.id">
                <td><input type="text" v-model="vassal.name" /></td>
                <td><input type="number" v-model="vassal.income" /></td>
              </tr>
            </table>
            <div class="btn-group">
              <button @click="addVassal()" class="btn btn-sm btn-primary">+</button>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Random Events">
        <p>
          Roll 2d100 + Unrest and consult the table below.
        </p>
        <table style="table table-striped">
          <thead><tr><th>Roll</th><th>Event</th></tr></thead>
          <tbody>
            <tr v-for="event in randomEvents">
              <td>{{event.minroll}}<span v-if="event.maxroll > event.minroll">-{{event.maxroll}}</span></td>
              <td>{{event.eventText}}</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab title="Actions">
        <h2>Actions</h2>
        <p>This is not a final and complete list. Players are encouraged to think creatively about what to do with their time.</p>
        <table class="table table-striped">
          <tbody>
            <tr><th>Action</th><th>Cost</th><th>Time</th></tr>
            <tr>
              <td>Recruit Colonists from the Homeland (1d6 kids, 2d6 adults).</td>
              <td>100 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Get local refugees to join the town. (1d6 kids, 1d6 adults, 1d6 invalids)</td>
              <td>10 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Recruit skilled worker from the population. Requires an investigation check for success. DC = 10 + base salary</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Encourage people to leave town (1d6 kids, 2d6 adults).</td>
              <td>50-unrest gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Recruit skilled worker from out of town.</td>
              <td>5 * typical salary signing bonus</td>
              <td>2 days</td>
            </tr>
            <tr>
              <td>Hold a Feast (roll a DC 12 Persuasion check). Success reduces effect of unrest on next 7 random event rolls by half.</td>
              <td>100 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Patrol the area. Who knows what could happen?</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Send an emissary to another Lord</td>
              <td>20 gp</td>
              <td>1/2 day</td>
            </tr>
            <tr>
              <td>Hire Prospector to Search for Minerals. Roll 1d100, 1-10 something bad happens. 11-50, they find nothing. 51-75, they find coal. 76-95, you find iron. 96-99, you find gold (or silver). 100 you find a rare metal, roll a 1d3, on 1 it is Orichalcum, on a 2 it is Adamantium, on a 3 it is Mithril.</td>
              <td>200 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Hire druids/clerics to tend to the sick. Heal 2d6 sick people in town.</td>
              <td>200 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Search for rare medicinal herbs in the woods. (roll a DC 20 Nature check). On a success you find enough herbs to heal 1d6 sick people.</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Seek guidance from a God via omens or prayer. Roll a DC 12 religion check. On a success gain advantage on two skill checks of your choice in the next day. If you fail by five or more, get disadvantage instead on a check of the DMs choice.</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Hire spies to dig up information on another Lord. The DM will roll an investigation check in secret on the spies behalf, depending on the result you may or may not get useful information. Spy returns after enough time to travel to the Lord's home and back has passed.</td>
              <td>200 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Go Hunting. Roll a survival check. Result determines how much is gained. 1-9: 1 unit of food (caught a rabbit, found some berries). 10-14: 2-5 units of food. 15-20: 10 units of food and 1 leather (a deer). 21+: 20 units of food and 2 leather.</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Research a topic. Make a relevant knowledge check, result determines how much information is discovered. DC determined by DM.</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Aid Construction Efforts. Requires a Carpenters Tools check (if the building is mostly wood) or Mason's tools check if it is mostly stone. DC 5: Reduce labor-days required by 1. DC 10: Reduce labor-days required by 2. DC 15+: Reduce labor days required by 3 + the amount over 15. This also reduces the total material costs of the building as a result.</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Hold Court</td>
              <td>0 gp</td>
              <td>Roll a random event roll. The second roll may have limited effect.</td>
            </tr>
            <tr>
              <td>Calm the People</td>
              <td>0 gp</td>
              <td>Spend your day with the people of the town helping to calm them and make your presence known. Make a DC 20 Persuasion check, reducing the effect of unrest on he next random event roll by 2.</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab title="Weather">
        <p>
          Today's Weather: {{ stronghold.currentTemperature }} Degrees Farenheit. {{ stronghold.rainString }}. Average Windspeed: {{ stronghold.windSpeed }}
        </p>
        <label>Typical Yearly Rainfall:
          <select v-model="stronghold.laws.rainfall" class="form-control">
            <option :value="0">Supernatural Desert (0 rain)</option>
            <option :value="5">Desert (1-10 inches rain)</option>
            <option :value="17">Dry Grassland (11-25 inches rain)</option>
            <option :value="33">Grassland or Savannah (26-40 inches rain)</option>
            <option :value="48">Forest (41-55 inches rain)</option>
            <option :value="65">Wet Forest, Marsh or Swamp (56-80 inches rain)</option>
            <option :value="100">Rainforest (80+ inches rain)</option>
          </select>
        </label>
        <label>Annual Mean Temperature (F):
          <input type="number" min="-70"
                 max="120" v-model="stronghold.laws.temperature" />
        </label>
        <label>
          Continental (More than 200 miles from the coast):
          <input type="checkbox" v-model="stronghold.laws.continental" />
        </label>
        <label>Lattitiude:
          <input type="number" min="-90"
                 max="90" v-model="stronghold.laws.lattitude" />
        </label>
      </b-tab>
    </b-tabs>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>
<script src="./strongholdbuilder/js/stronghold.js"></script>
<style src="./strongholdbuilder/scss/stronghold.scss" lang="scss" scoped></style>
