<template>
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
                <tr><th>Resource</th><th>On Hand</th><th>Sell</th><th>Buy</th><th>Daily Sell/Buy</th><th>Pop Needs</th><th>Change By</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr v-for="(resource, key) in stronghold.resources" :key="key">
                  <th>{{ key }}</th>
                  <td>{{ resource }}</td>
                  <td><span>{{ sellTable[key] }}</span></td>
                  <td><span>{{ buyTable[key] }}</span></td>
                  <td><span>{{ popNeeds[key] }}</span></td>
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
          <div class="col-sm-3">
            <h4>Revenue</h4>
            Total Revenue: {{ grossRevenue }}<br />
            Direct Income: {{ improvementRevenue }}<br />
            Resource Sales: {{ resourceRevenue }}<br />
            Total Tax Revenue: {{ taxRevenue }}<br />
            Income Tax Revenue: {{ incomeTax }}<br />
            Head Tax Revenue: {{ headTax }}<br />
            Property Tax Revenue: {{ propertyTax }}<br />
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
              <option value="homeless">Homeless</option>
              <option value="stable">Stable</option>
              <option value="animal-sanctuary">Animal Sanctuary</option>
              <option value="ayrie">Ayrie</option>
            </select>
          </div>
          <div class="col-sm-2">
            Daily Food Cost
            <input type="number" class="form-control" v-model="newanimal.foodcost" title="see bottom of page for typical food costs by animal size and diet." />
          </div>
          <div class="col-sm-1">
            <button @click="addAnimal()" class="btn btn-success" style="margin-top:22px;">Add</button>
          </div>
        </div>
        <div class="row">
          <h4>Homeless</h4>
          <p>Homeless animals require double food and increase unrest by 0.5% each. While they may actually live in various locations, the lack of a proper home for them is frustrating for the staff and causes an increase in maintenance costs.</p>
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
      <b-tab title="Private Enterprises">
        <div class="row">
          <div class="col-sm-6">
            <h4>{{ stronghold.townName }} Private Enterprises</h4>
            <div v-for="improvement in stronghold.privateEnterprise" :key="improvement.id">
              <h5>{{ improvement.name }} x {{ improvement.count }} <button @click="deletePrivateEnterprise(improvement)" class="btn btn-danger">X</button></h5>
            </div>
          </div>
          <div class="col-sm-6">
            <h4>Private Staff</h4>
            <p><strong>Laborers: {{ privateLaborers }}</strong></p>
            <p v-for="staff in stronghold.privateEmployees" :key="staff.id">{{ staff.name }}</p>
          </div>
        </div>
      </b-tab>
      <b-tab title="Random Events">
        <table style="table table-striped">
          <thead><tr><th>Roll</th><th>Event</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Your people, grateful for your kind rule, give you gifts worth d20 * 20 gp</td></tr>
            <tr><td>2</td><td>An itinerant wizard arrives in town looking for work. (Wizard level = 2d4 + 1, max of the player level)</td></tr>
            <tr><td>3</td><td>A wandering mercenary arrives in town looking for work. (Fighter level = 2d4 + 1, max of the player level)</td></tr>
            <tr><td>4</td><td>A wandering cleric arrives in town looking for work. (Cleric level = 2d4 + 1, max of the player level)</td></tr>
            <tr><td>5-6</td><td>Unbranded cattle have wandered into town and are captured by the townspeople. Add 200 food to your stockpiles.</td></tr>
            <tr><td>7-8</td><td>A wealthy family moves into town, building a manor house and a new random business (private enterprises).</td></tr>
            <tr><td>9</td><td>5d6 Kobold prospectors show up at your keep shouting about how they have discovered gold! They offer to mine it for you in exchange for the rights to live in town. (Build a Gold Mine).</td></tr>
            <tr><td>10</td><td>5d6 Kobold prospectors show up at your keep shouting about how they have discovered iron! They offer to mine it for you in exchange for the rights to live in town. (Build an Iron Mine).</td></tr>
            <tr><td>11</td><td>5d6 Kobold prospectors show up at your keep shouting about how they have discovered coal! They offer to mine it for you in exchange for the rights to live in town. (Build a Coal Mine).</td></tr>
            <tr><td>12</td><td>A wandering prospector arrives and excitedly proclaims that he has found gold on your land.</td></tr>
            <tr><td>13-14</td><td>A wandering prospector arrives and excitedly proclaims that he has found iron on your land.</td></tr>
            <tr><td>15-16</td><td>A wandering prospector arrives and excitedly proclaims that he has found coal on your land.</td></tr>
            <tr><td>17</td><td>A wandering prospector arrives and excitedly proclaims that he has found a random rare metal on your land (roll a d3, 1=Mithral, 2=Adamantium, 3=Orichalcum).</td></tr>
            <tr><td>18-22</td><td>A wandering prospector arrives and offers to search your lands for valuable metals in return for a job as head miner (roll a d100, 1-5 he finds a rare metal, 5-15 he finds gold, 16-60 he finds Iron, 61-100 he finds coal).</td></tr>
            <tr><td>23-26</td><td>8d8 (3d8 children, 5d8 adults) colonists arrive unexpectedly from one of the Alliance nations (roll randomly), hoping for a place to settle. They bring enough materials and money to build 3 houses and a large farm.</td></tr>
            <tr><td>27</td><td>Your miners stumble on a cache of buried treasure.</td></tr>
            <tr><td>28</td><td>A merchant arrives in town offering special wares, including a selection of magic items.</td></tr>
            <tr><td>29-30</td><td>A middle class family moves to town and builds a house.</td></tr>
            <tr><td>31</td><td>Your workers discover an old shed in the woods, filled with booze. Gain 100 alcohol.</td></tr>
            <tr><td>31-33</td><td>1d6 sick people recover naturally.</td></tr>
            <tr><td>34</td><td>A wandering cleric comes through town and heals 3d4 people before moving on.</td></tr>
            <tr><td>35-36</td><td>An invitation from a neighboring Lord arrives to join them for a feast.</td></tr>
            <tr><td>37</td><td>A wandering druid casts Plant Growth on one of your farms, doubling its yield for the day.</td></tr>
            <tr><td>38</td><td>Mercenaries arrive in town and offer their services.</td></tr>
            <tr><td>39</td><td>An Artificer arrives in town offering to sell a device he has invented.</td></tr>
            <tr><td>40-45</td><td>A baby is born in town.</td></tr>
            <tr><td>46-50</td><td>An elderly person in town dies.</td></tr>
            <tr><td>51-55</td><td>A child has reached adulthood (1 child becomes an adult).</td></tr>
            <tr><td>56-57</td><td>A rare animal is spotted in the woods.</td></tr>
            <tr><td>58</td><td>One of the townspeople is convinced a family member is a doppleganger.</td></tr>
            <tr><td>59</td><td>A pair of mages arrive in town separately, begin dueling in the town square, the residents are terrified.</td></tr>
            <tr><td>60</td><td>A mysterious stranger arrives in town selling cursed items to townsfolk.</td></tr>
            <tr><td>61</td><td>One of the townsfolk finds a treasure map in the attic left behind by his recently deceased grandfather.</td></tr>
            <tr><td>62-63</td><td>An adventurer arrives in town with tales of a lost treasure. His companions fell trying to claim it.</td></tr>
            <tr><td>64</td><td>A dragon lands in the center of town and takes a nap.</td></tr>
            <tr><td>65</td><td>A wandering duelist comes to town and challenges one of the players to a duel of honor (to the blood, not the death)</td></tr>
            <tr><td>66</td><td>A worker is injured in an accident (1 adult becomes invalid).</td></tr>
            <tr><td>67-69</td><td>A worker has retired.</td></tr>
            <tr><td>70</td><td>Nothing interesting happens.</td></tr>
            <tr><td>71</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 25 gp</td></tr>
            <tr><td>72</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 50 gp</td></tr>
            <tr><td>73</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 75 gp</td></tr>
            <tr><td>74</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 100 gp</td></tr>
            <tr><td>75</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 125 gp</td></tr>
            <tr><td>76</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 150 gp</td></tr>
            <tr><td>77</td><td>3d4 (1d4 children, 1d4 adults, 1d4 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>78</td><td>3d6 (1d6 children, 1d6 adults, 1d6 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>79</td><td>3d8 (1d8 children, 1d8 adults, 1d8 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>80</td><td>6d4 (2d4 children, 2d4 adults, 2d4 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>81</td><td>6d6 (2d6 children, 2d6 adults, 2d6 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>82</td><td>6d8 (2d8 children, 2d8 adults, 2d8 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>83</td><td>There is a murder in town! The people beg the players to investigate.</td></tr>
            <tr><td>84</td><td>A wolf pack has killed some sheep on a farm you own. Lose 100 food, and it has a 25% chance of happening again each day until the wolves are found and dealt with.</td></tr>
            <tr><td>85</td><td>People die in a tragic accident, 1d6 people die.</td></tr>
            <tr><td>86</td><td>There is a Monster lurking near town (roll randomly to determine type).</td></tr>
            <tr><td>87</td><td>A large group of townspeople have joined a suspicious cult, your steward is concerned.</td></tr>
            <tr><td>88</td><td>A large group of townspeople have converted to a new religion.</td></tr>
            <tr><td>89</td><td>Flooding in town causes damage to several buildings.</td></tr>
            <tr><td>90</td><td>Some of your people are convinced by wandering adventurers to join their quest. 1d4 adults leave town.</td></tr>
            <tr><td>91</td><td>Plague sweeps into town, sickening 2d6 people per day until it is dealt with.</td></tr>
            <tr><td>92-93</td><td>Robbery! Robbers break into the keep in the night and attempt to make off with any stored gold.</td></tr>
            <tr><td>94</td><td>A chromatic dragon demands tribute or it will burn the town.</td></tr>
            <tr><td>95</td><td>Graves have been dug up in the night, the Steward suspects a necromancer.</td></tr>
            <tr><td>96-99</td><td>People leave your town. 3d6 people (1d6 children and 2d6 adults) leave town to find a new home.</td></tr>
            <tr><td>100-102</td><td>One of the loyalists in town is attacked by a mob and killed.</td></tr>
            <tr><td>103-105</td><td>Revolutionaries attack and attempt to take the town!</td></tr>
            <tr><td>106-107</td><td>Work strike happens. 50% of yesterdays income lost. Will continue until demands are met or otherwise dealt with.</td></tr>
            <tr><td>108-110</td><td>Revolt. The people in your village are taking up arms to attack you!</td></tr>
            <tr><td>111-113</td><td>Drug problems are sweeping through town causing working adults to become sick. 1d6 people each day become sick until it is dealt with.</td></tr>
            <tr><td>114-115</td><td>Starving people have begun to grow sick, 2d6 adults become invalids</td></tr>
            <tr><td>116-118</td><td>An Assassin strikes in the night attempting to kill one of the players or a member of their staff.</td></tr>
            <tr><td>119</td><td>A lycanthrope has bitten some people in your town. If not dealt with, it is likely to spread.</td></tr>
            <tr><td>120</td><td>Arsonists strike in the night burning down a random building. The cost to rebuild depends on the building and the effectiveness of the response.</td></tr>
            <tr><td>121-122</td><td>Petty criminals plague the town, robbing houses and picking pockets. Tax revenues are reduced by 25% until they are dealt with, and things in storage may randomly disappear.</td></tr>
            <tr><td>123-124</td><td>Starving people have raided your storehouses, stealing all of your stored food.</td></tr>
            <tr><td>125+</td><td>Revolt. The people in your village are taking up arms to attack you!</td></tr>
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
              <td>1/2 day</td>
            </tr>
            <tr>
              <td>Get local refugees to join the town. (1d6 kids, 1d6 adults, 1d6 invalids)</td>
              <td>10 gp</td>
              <td>1/2 day</td>
            </tr>
            <tr>
              <td>Recruit skilled worker from the population. Requires an investigation check for success. DC = 10 + base salary</td>
              <td>0 gp</td>
              <td>1/2 day</td>
            </tr>
            <tr>
              <td>Encourage people to leave town (1d6 kids, 2d6 adults).</td>
              <td>50-unrest gp</td>
              <td>1/2 day</td>
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
              <td>Seek guidance from a God via omens or prayer. Roll a DC 15 religion check. On a success gain advantage on a skill check of your choice in the next day. If you fail by five or more, get disadvantage instead on a check of the DMs choice.</td>
              <td>0 gp</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Hire spies to dig up information on another Lord. The DM will roll an investigation check in secret on the spies behalf, depending on the result you may or may not get useful information.</td>
              <td>200 gp</td>
              <td>1 day</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
    </b-tabs>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>
<script src="./strongholdbuilder/js/stronghold.js"></script>
<style src="./strongholdbuilder/scss/stronghold.scss" lang="scss" scoped></style>
