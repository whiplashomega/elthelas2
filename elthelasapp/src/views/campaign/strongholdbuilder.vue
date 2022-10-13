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
            <tr><td>1</td><td>You gain 5 levels instantly and find 100000 gold.</td></tr>
            <tr><td>2</td><td>Roll twice more and use both results. This event can stack.</td></tr>
            <tr><td>3</td><td>Your people, grateful for your kind rule, give you gifts worth d20 * 20 gp</td></tr>
            <tr><td>4</td><td>A wandering mercenary arrives in town looking for work. (Fighter level = 2d4 + 1, max of the player level)</td></tr>
            <tr><td>5</td><td>A wandering cleric arrives in town looking for work. (Cleric level = 2d4 + 1, max of the player level)</td></tr>
            <tr><td>6</td><td>Unbranded cattle have wandered into town and are captured by the townspeople. Add 200 food to your stockpiles.</td></tr>
            <tr><td>7-10</td><td>A wealthy family moves into town, building a manor house and a new random business (private enterprises).</td></tr>
            <tr><td>11</td><td>5d6 Kobold prospectors show up at your keep shouting about how they have discovered gold or a rare metal! They offer to mine it for you in exchange for the rights to live in town. (Build a Gold Mine).</td></tr>
            <tr><td>12</td><td>5d6 Kobold prospectors show up at your keep shouting about how they have discovered iron or coal! They offer to mine it for you in exchange for the rights to live in town. (Build an Iron Mine or Coal Mine).</td></tr>
            <tr><td>13-14</td><td>A wandering prospector arrives and excitedly proclaims that he has found valuable minerals on your land (1d100, 1-5 rare metal, 6-15 gold, 16-50 coal, 51-90 coal, 91-100, something bad).</td></tr>
            <tr><td>15-18</td><td>Your people find rare edible fruits and mushrooms in the forests. Roll 3d20 and gain that many units of food.</td></tr>
            <tr><td>19</td><td>You find a cache of money in an unexpected place. Roll 2d100 and gain that much gold.</td></tr>
            <tr><td>20-23</td><td>8d8 (3d8 children, 5d8 adults) colonists arrive unexpectedly from one of the Alliance nations (roll randomly), hoping for a place to settle. They bring enough materials and money to build 3 houses and a large farm.</td></tr>
            <tr><td>24-27</td><td>A family moves into town. (2 adults, 1d6-1 children)</td></tr>
            <tr><td>28-31</td><td>Workers are particularly productive. Increase revenue by 25% today.</td></tr>
            <tr><td>32</td><td>Your miners stumble on a cache of buried treasure.</td></tr>
            <tr><td>33-36</td><td>A merchant arrives in town offering special wares, including a selection of magic items.</td></tr>
            <tr><td>37-43</td><td>A middle class family moves to town and builds a house.</td></tr>
            <tr><td>44</td><td>Your workers discover an old shed in the woods, filled with booze. Gain 100 alcohol.</td></tr>
            <tr><td>45-46</td><td>A wandering cleric comes through town and heals 3d4 people before moving on.</td></tr>
            <tr><td>47-50</td><td>An invitation from a neighboring Lord arrives to join them for a feast.</td></tr>
            <tr><td>51</td><td>A wandering druid casts Plant Growth on one of your farms, doubling its yield for the day.</td></tr>
            <tr><td>52-53</td><td>Mercenaries arrive in town and offer their services.</td></tr>
            <tr><td>54</td><td>An Artificer arrives in town offering to sell a device he has invented.</td></tr>
            <tr><td>55-57</td><td>A rare animal is spotted in the woods.</td></tr>
            <tr><td>58</td><td>One of the townspeople is convinced a family member is a doppleganger.</td></tr>
            <tr><td>59</td><td>A pair of mages arrive in town separately, begin dueling in the town square, the residents are terrified.</td></tr>
            <tr><td>60</td><td>A mysterious stranger arrives in town selling cursed items to townsfolk.</td></tr>
            <tr><td>61</td><td>One of the townsfolk finds a treasure map in the attic left behind by his recently deceased grandfather.</td></tr>
            <tr><td>62-64</td><td>An adventurer arrives in town with tales of a lost treasure. His companions fell trying to claim it.</td></tr>
            <tr><td>65</td><td>A dragon lands in the center of town and takes a nap.</td></tr>
            <tr><td>66</td><td>A wandering duelist comes to town and challenges one of the players to a duel of honor (to the blood, not the death)</td></tr>
            <tr><td>67-72</td><td>1d6 sick people recover naturally.</td></tr>
            <tr><td>73</td><td>A worker is injured in an accident (1 adult becomes invalid).</td></tr>
            <tr><td>74</td><td>If the number of adults is greater than 450 a worker is injured in an accident (1 adult becomes invalid).</td></tr>
            <tr><td>75</td><td>If the number of adults is greater than 900 a worker is injured in an accident (1 adult becomes invalid).</td></tr>
            <tr><td>76</td><td>A worker has retired.</td></tr>
            <tr><td>77</td><td>A baby is born in town.</td></tr>
            <tr><td>78</td><td>If number of adults is greater than 150 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>79</td><td>If the number of adults is greater than 300 a worker has retired. Otherwise nothing happens.</td></tr>
            <tr><td>80</td><td>If number of adults is greater than 300 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>81</td><td>If number of adults is greater than 450 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>82</td><td>If the number of adults is greater than 600 a worker has retired. Otherwise nothing happens.</td></tr>
            <tr><td>83</td><td>If number of adults is greater than 600 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>84</td><td>If number of adults is greater than 750 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>85</td><td>If the number of adults is greater than 900 a worker has retired. Otherwise nothing happens.</td></tr>
            <tr><td>86</td><td>If number of adults is greater than 900 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>87</td><td>If number of adults is greater than 1050 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>88</td><td>If the number of adults is greater than 1200 a worker has retired. Otherwise nothing happens.</td></tr>
            <tr><td>89</td><td>If number of adults is greater than 1200 A baby is born in town. Otherwise nothing happens.</td></tr>
            <tr><td>91-95</td><td>If number of homeless people is greater than 0, your people build a house (private enterprise), otherwise nothing happens.</td></tr>
            <tr><td>96-100</td><td>If number of available staff beds is less than 3, your people build a staff house (private enterprise), otherwise nothing happens.</td></tr>
            <tr><td>101-105</td><td>If number of homeless people is greater than 0, your people build a log cabin (private enterprise), otherwise nothing happens.</td></tr>
            <tr><td>106-110</td><td>Nothing interesting happens.</td></tr>
            <tr><td>111</td><td>If number of sick/elderly is greater than 1200, an elderly person dies. Otherwise nothing happens.</td></tr>
            <tr><td>112</td><td>If the number of children is greater than 1200 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>113</td><td>If the number of children is greater than 1050 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>114</td><td>If number of sick/elderly is greater than 900, an elderly person dies. Otherwise nothing happens.</td></tr>
            <tr><td>115</td><td>If the number of children is greater than 900 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>116</td><td>If the number of children is greater than 750 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>117</td><td>If number of sick/elderly is greater than 600, an elderly person dies. Otherwise nothing happens.</td></tr>
            <tr><td>118</td><td>If the number of children is greater than 600 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>119</td><td>If the number of children is greater than 450 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>120</td><td>If number of sick/elderly is greater than 300, an elderly person dies. Otherwise nothing happens.</td></tr>
            <tr><td>121</td><td>If the number of children is greater than 300 a child has reached adulthood (1 child becomes an adult). Otherwise nothing happens.</td></tr>
            <tr><td>122</td><td>An elderly person in town dies.</td></tr>
            <tr><td>123</td><td>A child has reached adulthood (1 child becomes an adult).</td></tr>
            <tr><td>124</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 25 gp</td></tr>
            <tr><td>125</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 50 gp</td></tr>
            <tr><td>126</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 75 gp</td></tr>
            <tr><td>127</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 100 gp</td></tr>
            <tr><td>128</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 125 gp</td></tr>
            <tr><td>129</td><td>A Tax Collector from a ruler arrives and demands a tax payment of d20 * 150 gp</td></tr>
            <tr><td>130</td><td>3d4 (1d4 children, 1d4 adults, 1d4 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>131</td><td>3d6 (1d6 children, 1d6 adults, 1d6 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>132</td><td>3d8 (1d8 children, 1d8 adults, 1d8 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>133</td><td>6d4 (2d4 children, 2d4 adults, 2d4 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>134</td><td>6d6 (2d6 children, 2d6 adults, 2d6 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>135</td><td>6d8 (2d8 children, 2d8 adults, 2d8 invalids) Refugees arrive at your town begging for a place to live.</td></tr>
            <tr><td>136-138</td><td>Exceptionally beautiful weather has left the townsfolk in a good mood, reduce the effect of unrest on your next roll by 2.</td></tr>
            <tr><td>139-140</td><td>Your construction workers have been unusually productive, any buildings you actively have under construction progress an extra day towards completion.</td></tr>
            <tr><td>141-142</td><td>The local children snuck away to go fishing, and had a bumper catch. Gain 1d10 food.</td></tr>
            <tr><td>143-144</td><td>A lost but apparently domesticated animal wanders into town.</td></tr>
            <tr><td>145-146</td><td>A traveling bard passes through town.</td></tr>
            <tr><td>147-149</td><td>A wandering cleric passes through town and gives a sermon in town.</td></tr>
            <tr><td>150</td><td>A wandering wizard comes through town looking for work and a place to study.</td></tr>
            <tr><td>151</td><td>A skilled fighter wanders through town.</td></tr>
            <tr><td>152-153</td><td>A creepy looking mage wanders into town. He says he means no harm, but the people find him unsettling.</td></tr>
            <tr><td>154-156</td><td>An ill omen appears, unsettling the townsfolk. The effect of unrest on your next roll is increased by 2.</td></tr>
            <tr><td>157</td><td>A chromatic dragon attacks and demands tribute from the town.</td></tr>
            <tr><td>158</td><td>A townsperson made a deal with a hag that they regret, they will give anything to have it undone.</td></tr>
            <tr><td>159-160</td><td>River pirates attack the town.</td></tr>
            <tr><td>161</td><td>A necromancer has raided the town graveyard and loosed his creations on the town.</td></tr>
            <tr><td>162</td><td>A random magical occurance causes an abberation to appear in the middle of town and start causing havoc.</td></tr>
            <tr><td>163-164</td><td>A leak springs in the roof of the keep, right above one of your beds. Roll to determine which party member has a bad nights sleep.</td></tr>
            <tr><td>165-167</td><td>A sudden illness kills some of your livestock, lose 2d20 food.</td></tr>
            <tr><td>168-170</td><td>A large storm causes damage to some buildings. It will cost 2d100 for repairs.</td></tr>
            <tr><td>171</td><td>A person falls out of the sky, splattering on the ground. No one saw what happened.</td></tr>
            <tr><td>172-173</td><td>Apparently its a local holiday, all the shops in town are closed.</td></tr>
            <tr><td>174</td><td>Some of the children have gone missing. The parents beg you to help them.</td></tr>
            <tr><td>175-176</td><td>Your construction workers are delayed by an accident, any buildings you actively have under construction are delayed by a day.</td></tr>
            <tr><td>177</td><td>Some nearby fey folk are causing trouble for the towns lumberjacks.</td></tr>
            <tr><td>178-179</td><td>Slave hunters arrive claiming some of your townsfolk are escaped slaves. They are beligerent and insistent.</td></tr>
            <tr><td>180</td><td>There is a murder in town! The people beg the players to investigate.</td></tr>
            <tr><td>181</td><td>A wolf pack has killed some sheep on a farm you own. Lose 100 food, and it has a 25% chance of happening again each day until the wolves are found and dealt with.</td></tr>
            <tr><td>182</td><td>People die in a tragic accident, 1d6 people die.</td></tr>
            <tr><td>183-185</td><td>There is a Monster lurking near town (roll randomly to determine type).</td></tr>
            <tr><td>186</td><td>A large group of townspeople have joined a suspicious cult, your steward is concerned.</td></tr>
            <tr><td>187</td><td>A large group of townspeople have converted to a new religion.</td></tr>
            <tr><td>188-189</td><td>Flooding in town causes damage to several buildings.</td></tr>
            <tr><td>190</td><td>Some of your people are convinced by wandering adventurers to join their quest. 1d4 adults leave town.</td></tr>
            <tr><td>191</td><td>Plague sweeps into town, sickening 2d6 people per day until it is dealt with.</td></tr>
            <tr><td>192-193</td><td>Robbery! Robbers break into the keep in the night and attempt to make off with any stored gold.</td></tr>
            <tr><td>194</td><td>A chromatic dragon demands tribute or it will burn the town.</td></tr>
            <tr><td>195</td><td>Graves have been dug up in the night, the Steward suspects a necromancer.</td></tr>
            <tr><td>196-199</td><td>People leave your town. 3d6 people (1d6 children and 2d6 adults) leave town to find a new home.</td></tr>
            <tr><td>200</td><td>Roll twice more and use both results. This event can stack.</td></tr>
            <tr><td>201-202</td><td>One of the loyalists in town is attacked by a mob and killed.</td></tr>
            <tr><td>203-205</td><td>Revolutionaries attack and attempt to take the town!</td></tr>
            <tr><td>206-207</td><td>Work strike happens. 50% of yesterdays income lost. Will continue until demands are met or otherwise dealt with.</td></tr>
            <tr><td>208-210</td><td>Revolt. The people in your village are taking up arms to attack you!</td></tr>
            <tr><td>211-213</td><td>Drug problems are sweeping through town causing working adults to become sick. 1d6 people each day become sick until it is dealt with.</td></tr>
            <tr><td>214-215</td><td>Starving people have begun to grow sick, 2d6 adults become invalids</td></tr>
            <tr><td>216-218</td><td>An Assassin strikes in the night attempting to kill one of the players or a member of their staff.</td></tr>
            <tr><td>219</td><td>A lycanthrope has bitten some people in your town. If not dealt with, it is likely to spread.</td></tr>
            <tr><td>220</td><td>Arsonists strike in the night burning down a random building. The cost to rebuild depends on the building and the effectiveness of the response.</td></tr>
            <tr><td>221-222</td><td>Petty criminals plague the town, robbing houses and picking pockets. Tax revenues are reduced by 25% until they are dealt with, and things in storage may randomly disappear.</td></tr>
            <tr><td>223-224</td><td>Starving people have raided your storehouses, stealing all of your stored food.</td></tr>
            <tr><td>225+</td><td>Revolt. The people in your village are taking up arms to attack you!</td></tr>
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
<script src="./js/stronghold.js"></script>
<style src="@/components/strongholdbuilder/scss/stronghold.scss" lang="scss" scoped></style>
