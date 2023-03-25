<template>
  <div>
    <b-tabs>
      <b-tab index='0' title="Adventuring Gear">
        <h4>Tools</h4>
        <p>
          A tool helps you to do something you couldn't otherwise do, such as craft or repair an item, forge a document, or pick a lock. Your race, class, background, or feats give you proficiency with certain tools. Proficiency with a tool allows you to add your proficiency bonus to any ability check you make using that tool. Tool use is not tied to a single ability, since proficiency with a tool represents broader knowledge of its use. For example, the GM might ask you to make a Dexterity check to carve a fine detail with your woodcarver's tools, or a Strength check to make something out of particularly hard wood.
        </p>
        <b-row>
          <b-col md="6"></b-col>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="equipmenttable.filter" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!equipmenttable.filter" @click="equipmenttable.filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <modal id="gearmodal" :modalProps="gearModalProps">
          <p><strong>Cost (gp): </strong>{{ gearModal.Cost }}</p>
          <p><strong>Weight: </strong>{{ gearModal.Weight }}</p>
          <div v-html="marked.parse(gearModal.Description)"></div>
        </modal>
        <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.equipmenttable.sortBy='Item';this.equipmenttable.sortDesc = !this.equipmenttable.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.equipmenttable.sortBy='Cost';this.equipmenttable.sortDesc = !this.equipmenttable.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.equipmenttable.sortBy='Weight';this.equipmenttable.sortDesc = !this.equipmenttable.sortDesc">
                  Weight
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filterequipment" :key="item.Item">
                <td><a href="#" @click.stop="adventuringGearInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Cost}}</td>
                <td>{{item.Weight}}</td>
              </tr>
            </tbody>
          </table>
      </b-tab>
      <b-tab index='1' title="Armor">
        <h3>Armor</h3>
        <p>
          Fantasy gaming worlds are a vast tapestry made up of many different cultures, each with its own technology level. For this reason, adventurers have access to a variety of armor types, ranging from leather armor to chain mail to costly plate armor, with several other kinds of armor in between. The Armor table collects the most commonly available types of armor found in the game and separates them into three categories: light armor, medium armor, and heavy armor. Many warriors supplement their armor with a shield.
        </p>
        <p>
          The Armor table shows the cost, weight, and other properties of the common types of armor worn in fantasy gaming worlds. Not all potential armor types are listed here. However, existing armor types can be easily reflavored. For example, Brigandine or Llamelar armors would use the same statistics as Scale armors.
        </p>
        <b-row>
          <b-col md="6"></b-col>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="armortable.filter" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!armortable.filter" @click="armortable.filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.armortable.sortBy='Armor';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Armor
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Type';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Type
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='AC';this.armortable.sortDesc = !this.armortable.sortDesc">
                  AC
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='PC';this.armortable.sortDesc = !this.armortable.sortDesc">
                  PC
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='MaxDex';this.armortable.sortDesc = !this.armortable.sortDesc">
                  MaxDex
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Stealth';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Stealth
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Intimidation';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Intimidation
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Strength';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Strength
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Resistance';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Resistance
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Weight';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Weight
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Cost';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Price (gp)
                </a></th>
                <th><a href="#" @click.stop="this.armortable.sortBy='Rarity';this.armortable.sortDesc = !this.armortable.sortDesc">
                  Rarity
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filterarmor" :key="item.Armor + item.Material">
                <td>{{item.Armor}}</td>
                <td>{{item.Type}}</td>
                <td>{{item.AC}}</td>
                <td>{{item.PC}}</td>
                <td>{{ item.MaxDex !== 99 ? item.MaxDex : "Unlimited" }}</td>
                <td>{{item.Stealth}}</td>
                <td>{{ item.Intimidation }}</td>
                <td>{{item.Strength}}</td>
                <td>{{item.Resistance}}</td>
                <td>{{item.Weight}}</td>
                <td>{{item.Cost}}</td>
                <td>{{ item.Rarity }}</td>
              </tr>
            </tbody>
          </table>
          <p>
          <strong>Armor Proficiency.</strong> Anyone can put on a suit of armor or strap a shield to an arm. Only those proficient in the armor's use know how to wear it effectively, however. Your class gives you proficiency with certain types of armor. If you wear armor that you lack proficiency with, you have disadvantage on any ability check, saving throw, or attack roll that involves Strength or Dexterity, and you can't cast spells.
        </p>
        <p>
          <strong>Armor Class (AC).</strong> Armor protects its wearer from attacks. The armor (and shield) you wear determines your base Armor Class. Your Armor Class represents your ability to avoid, block or otherwise negate attacks.
        </p>
        <p>
          <strong>Protection Class (PC).</strong> Even when your armor fails to protect you completely from an attack, it can turn a gash into a small cut or a broken bone into a bruise. Your armors ability to reduce the damage you take is referred to as its Protection Class, and directly reduces the damage you take from any attack that would do bludgeoning, piercing, or slashing damage on a one to one basis.
        </p>
        <p>
          <strong>Maximum Dexterity Bonus (Max Dex).</strong> If you are not wearing armor, your armor class is equal to 10 + your dexterity bonus, representing your natural ability to dodge attacks. However, heavier armor may impede your ability to move and dodge attacks. This is represented by the armors Maximum Dexterity Bonus. Your Armor Class when wearing armor is equal to the base AC of the armor, plus your dexterity bonus, or the maximum dexterity bonus of the armor, whichever is lower. So for example if your Dexterity Bonus is +2, and you are wearing a Leather Hauberk, your Armor Class is 16 (14 + 2). However, if you are wearing a Bone Hauberk, your Armor Class is 15 (15 + 0).
        </p>
        <p>
          <strong>Stealth.</strong> If the Armor table shows "Disadvantage" in the Stealth column, the wearer has disadvantage on Dexterity (Stealth) checks.
        </p>
        <p>
          <strong>Intimidation.</strong> If the Armor table shows "Advantage" in the Intimidation column, it grants advantage on intimidation checks.
        </p>
        <p>
          <strong>Heavy Armor.</strong> Heavier armor interferes with the wearer's ability to move quickly, stealthily, and freely. If the Armor table shows "13" or "15" in the Strength column for an armor type, the armor reduces the wearer's speed by 10 feet unless the wearer has a Strength score equal to or higher than the listed score.
        </p>
        <p>
          <strong>Resistance.</strong> Certain rare armors grant resistance to particular types of damage. If something is listed in the Resistance column of the Armor Table the wearer takes half damage from the damage type it is resistant to.
        </p>
        <p>
          <strong>Shields.</strong> A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time.
        </p>
        <p>
          <strong>Tower Shields.</strong> A Tower Shield is a massive shield large enough for the wielder to hide behind. A Tower Shield can be set as an action, after which the wielder has 3/4 cover against attacks coming from the direction in which it was set, but no shield bonus to AC from attacks from other directions. It can be unset as a free action on your turn, or is unset immediately if the wielder moves (willingly or unwillingly).
        </p>
        <h5>Getting Into and Out of Armor</h5>
        <p>The time it takes to don or doff armor depends on the armor's category.</p>
        <p><strong>Don.</strong> This is the time it takes to put on armor. You benefit from the armor's AC only if you take the full time to don the suit of armor.</p>
        <p><strong>Doff.</strong> This is the time it takes to take off armor. If you have help, reduce this time by half.</p>
        <ul>
          <li>Light Armor - Don: 1 minute - Doff: 1 minute</li>
          <li>Medium Armor - Don: 5 minutes - Doff: 1 minute</li>
          <li>Heavy Armor - Don: 10 minutes - Doff: 5 minutes</li>
          <li>Shield - Don: 1 action - Doff: 1 action</li>
        </ul>
      </b-tab>
      <b-tab index='2' title="Weapons">
        <h3>Weapons</h3>
        <p>
          Your class grants proficiency in certain weapons, reflecting both the class's focus and the tools you are most likely to use. Whether you favor a longsword or a longbow, your weapon and your ability to wield it effectively can mean the difference between life and death while adventuring.
        </p>
        <p>
          The Weapons table shows the most common weapons used in the fantasy gaming worlds, their price and weight, the damage they deal when they hit, and any special properties they possess. Every weapon is classified as either melee or ranged. A melee weapon is used to attack a target within 5 feet of you, whereas a ranged weapon is used to attack a target at a distance.
        </p>
        <input type="text" class="form-control" v-model="homebrewweaponstable.filter" placeholder="Filter" />
        <table class="table table-striped table-responsive">
          <thead>
            <th v-for="field in homebrewweaponstable.fields" :key="field">
              <a href="#" @click.stop="changehwSort(field.key)">{{ field.label }}
                <span v-if="homebrewweaponstable.sortBy == field.key && homebrewweaponstable.sortDesc == false">&uarr;</span>
                <span v-if="homebrewweaponstable.sortBy == field.key && homebrewweaponstable.sortDesc == true">&darr;</span>
              </a>
            </th>
          </thead>
          <tbody>
            <tr v-for="weapon in fhweapons" :key="weapon.Weapon">
              <td>{{ weapon.Weapon }}</td>
              <td>{{ weapon.Type }}</td>
              <td>{{ weapon.Damage }}</td>
              <td>{{ weapon.Dtype }}</td>
              <td>{{ weapon.Properties }}</td>
              <td>{{ weapon.Cost }} gp</td>
              <td>{{ weapon.Weight }} lbs</td>
              <td><span v-if="weapon.Reach > 0">{{ weapon.Reach }} ft</span><span v-else>-</span></td>
              <td><span v-if="weapon.Range > 0">{{ weapon.Range }}/{{ weapon.Range * 3 }} ft</span><span v-else>-</span></td>
            </tr>
          </tbody>
        </table>
        <p>
          * When you use a shield as a weapon the bonus it provides to your AC is reduced by 1.
        </p>
        <h4>Weapon Proficiency</h4>
        <p>
          Your race, class, and feats can grant you proficiency with certain weapons or categories of weapons. The two categories are simple and martial. Most people can use simple weapons with proficiency. These weapons include clubs, maces, and other weapons often found in the hands of commoners. Martial weapons, including swords, axes, and polearms, require more specialized training to use effectively. Most warriors use martial weapons because these weapons put their fighting style and training to best use.
        </p>
        <p>
          Proficiency with a weapon allows you to add your proficiency bonus to the attack roll for any attack you make with that weapon. If you make an attack roll using a weapon with which you lack proficiency, you do not add your proficiency bonus to the attack roll.
        </p>
        <h4>Weapon Properties</h4>
        <p>
          Many weapons have special properties related to their use, as shown in the Weapons table.
        </p>
        <table class="table table-striped">
          <thead>
            <tr><th>Property</th><th>Effect Cost</th><th>Effect</th></tr>
          </thead>
          <tbody>
            <tr><td>Ammunition</td><td>0</td><td>This weapon requires ammunition of an appropriate type in order to be used.</td></tr>
            <tr><td>Armor</td><td>1.5</td><td>This weapon is also armor, or is part of a suit of armor.</td></tr>
            <tr><td>Armor piercing</td><td>1.5</td><td>Once per turn, when you hit an opponent with this weapon you can damage any manufactured armor that they are wearing, reducing it's AC by 1. If the AC is reduced to 10, the armor is destroyed (or 0 in the case of a shield).</td></tr>
            <tr><td>Awkward</td><td>-1</td><td>This weapon is unwieldy at close range. Attacks with this weapon have disadvantage to hit opponents within 5 ft.</td></tr>
            <tr><td>Brutal</td><td>1</td><td>This weapon does one extra die of its damage type on a critical hit. So a weapon that does 2d6 damage would deal 5d6 damage on a critical hit, and a weapon that does 1d12 damage would do 3d12 damage on a critical hit. This stacks with the Brutal Critical feature.</td></tr>
            <tr><td>Common</td><td>0.5</td><td>This weapon is exceedingly common and generally seen as a tool by figures of authority, rather than a weapon.</td></tr>
            <tr><td>Concealable</td><td>0.5</td><td>This weapon is easily concealed in a pocket, boot, or other unobtrusive place such that it is not obvious without a bodily search.</td></tr>
            <tr><td>Finesse</td><td>1</td><td>Can use your choice of dexterity or strength for the attack and damage rolls with this weapon.</td></tr>
            <tr><td>Grapple</td><td>1</td><td>Once per turn, this weapon has the ability to entangle a foe, preventing them from moving. After hitting an opponent with this weapon you can choose to make a strength (athletics) check opposed by either a strength (athletics) or dexterity (acrobatics) check by the opponent. On a success the target is grappled. While the target is grappled in this way you cannot use the weapon to attack until you release the grapple, and if you drop the weapon the grapple is released automatically.</td></tr>
            <tr><td>Heavy</td><td>-0.5</td><td>This weapon is too large and unwieldy for small characters to use effectively, and they have disadvantage on attack rolls while using it.</td></tr>
            <tr><td>Knock down</td><td>1</td><td>Once per turn, after hitting an opponent with this weapon you can choose to attempt to knock them down with it. If you do so, make a strength (athletics) check opposed by either a strength (athletics) or a dexterity (acrobatics) check by the opponent. On a success you knock the opponent prone.</td></tr>
            <tr><td>Light</td><td>1</td><td>This weapon is light and well balanced enough to use one in each hand.</td></tr>
            <tr><td>Loading</td><td>-1</td><td>This weapon takes time to load and can only be used to make 1 attack per round.</td></tr>
            <tr><td>Net special</td><td>4.5</td><td>When you hit a target with this weapon they are restrained. The target can make a strength (athletics) check or a dexterity (acrobatics) check as an action with a DC of 10 to escape the net.</td></tr>
            <tr><td>Poison</td><td>2</td><td>This weapon's ammunition is coated with simple poisons. Those hit by this weapon must make a DC 12 Constitution save or suffer the poisoned condition for one round.</td></tr>
            <tr><td>Polearm</td><td>0.5</td><td>This weapon is a polearm, and is affected by feats or abilities that require polearms.</td></tr>
            <tr><td>Ranged</td><td>0</td><td>Attacks with this weapon are made with disadvantage when within 5 ft of a hostile character. You use dexterity for attack and damage rolls with this weapon.</td></tr>
            <tr><td>Returning</td><td>1.5</td><td>This weapon returns to your hand when thrown as long as nothing prevents it from doing so.</td></tr>
            <tr><td>STR 13 Required</td><td>-2</td><td>This weapon cannot be wielded unless the user has a strength score of at least 13.</td></tr>
            <tr><td>Thrown</td><td>0</td><td>This weapon can be used to make a ranged attack by throwing it.</td></tr>
            <tr><td>Two-handed</td><td>-1</td><td>This weapon requires 2 hands to wield effectively</td></tr>
            <tr><td>Versatile</td><td>1/2 the increase in average damage (so 1d6 to 1d8 costs 0.5 pts, 2d4 to 2d6 costs 1 pt)</td><td>This weapon uses a damage die one size larger when wielded in two hands. 1d4 becomes 1d6, 1d6 becomes 1d8, 1d8 becomes 1d10, and 1d10 becomes 1d12. Similarly 2d4 becomes 2d6, 2d6 becomes 2d8, 2d8 becomes 2d10, and 2d10 becomes 2d12.</td></tr>
            <tr><td>Versatile Damage</td><td>0.5</td><td>This weapon can attack in different ways, doing different damage types depending on how it is used.</td></tr>
          </tbody>
        </table>
        <h4>Improvised Weapons</h4>
        <p>
          Sometimes characters don't have their weapons and have to attack with whatever is at hand. An improvised weapon includes any object you can wield in one or two hands, such as broken glass, a table leg, a frying pan, a wagon wheel, or a dead goblin.
        </p>
        <p>
          Often, an improvised weapon is similar to an actual weapon and can be treated as such. For example, a table leg is akin to a club. At the GM's option, a character proficient with a weapon can use a similar object as if it were that weapon and use his or her proficiency bonus.
        </p>
        <p>
          An object that bears no resemblance to a weapon deals 1d4 damage (the GM assigns a damage type appropriate to the object). If a character uses a ranged weapon to make a melee attack, or throws a melee weapon that does not have the thrown property, it also deals 1d4 damage. An improvised thrown weapon has a normal range of 20 feet and a long range of 60 feet.
        </p>
        <h4>Creating New Weapons</h4>
        <p>The weapons above were balanced using a points system, with each weapon having a value of 8 points. The formula is: <strong>Average Damage + Reach + Range + Properties + Type Modifier.</strong></p>
        <ul>
          <li>Average Damage. This is the average roll of the damage dice the weapon uses. So 1d4 = 2.5, 1d6 = 3.5, 1d8 = 4.5, etc.</li>
          <li>Reach. A 5 ft reach melee attack adds 1 pt, a 10 ft reach adds 2, and a 15 ft reach adds 3.5.</li>
          <li>Range. Every 30 ft of range for ranged attacks adds 1 pt (15 ft adds 0.5 pts).</li>
          <li>Properties. Sum the value of all the properties in the table above that apply to your weapon.</li>
          <li>Type Modifier. Martial weapons should in general be better than simple weapons, add 1.5 to the score of a simple weapon.</li>
        </ul>
        <p><strong>Example: </strong>The dagger does 1d4 damage (2.5 pts), has a 5 ft reach (1 pt), a 25 ft base range (0.5 pts), the finesse (1 pt), light (0.5 pts), concealable (0.5 pts), common (0.5 pts), and thrown properties, and is a simple weapon. So the formula is 2.5 + 1 + 0.5 + 2.5 + 1.5 = 8.</p>
        <p><strong>Example 2: </strong>The heavy crossbow does 2d6 damage (7 pts), has a 0 ft reach (not a melee weapon), a 90 ft range (3 pts), the ranged, ammunition, loading (-1 pt), and two-handed (-1 pt) properties, and is a martial weapon. So the formula is 7 + 0 + 3 + -2 + 0 = 8.</p>
      </b-tab>
      <b-tab index="3" title="Magic Items">
        <div v-if="!printMode">
      <h1>Margo's Mystics Magic Item Catalog</h1>
      <p class="alert alert-warning">
        Note: The In Stock column is only relevant on game day, and reflects the
        items that Margo has in stock at her store during game.
      </p>
      <div class="row">
        <div class="col-md-8">
          <b-form-checkbox label="In Stock Only" v-model="instockonly"
            >Display In Stock Items Only</b-form-checkbox
          >
          <div class="checkbox-group row">
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Item">
                Item
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Type">
                Type
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy['Cost (gp)']">
                Cost (gp)
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Attunement">
                Attunement
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Effect">
                Effect
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Rarity">
                Rarity
              </b-form-checkbox>
            </div>
          </div>
          <div class="checkbox-group row">
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Common">
                Common
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Uncommon">
                Uncommon
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Rare">
                Rare
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity['Very Rare']">
                Very Rare
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Legendary">
                Legendary
              </b-form-checkbox>
            </div>
          </div>
          <label class="col-4">
            Maximum Cost
            <b-form-input
              label="Maximum Cost"
              type="number"
              v-model="magicitemtables.filterCost"/>
          </label>
        </div>
        <b-col md="4" class="my-1">
          <b-input-group>
            <b-form-input
              v-model="magicitemtables.filter"
              placeholder="Type to Search"
            />
            <button
              class="btn btn-primary"
              :disabled="!magicitemtables.filter"
              @click="magicitemtables.filter = ''"
            >
              Clear
            </button>
          </b-input-group>
        </b-col>
      </div>
      <modal id="magicitemmodal" :modalProps="modalProps">
        <p><strong>Type: </strong>{{ magicItemModal.Type }}</p>
        <p><strong>Cost (gp): </strong>{{ magicItemModal["Cost (gp)"] }}</p>
        <p><strong>Attunement: </strong>{{ magicItemModal.Attunement }}</p>
        <p><strong>Rarity: </strong>{{ magicItemModal.Rarity }}</p>
        <p>
          <strong>{{ magicItemModal.instock }}</strong>
        </p>
        <div v-html="marked.parse(magicItemModal.Effect)"></div>
      </modal>
      <b-tabs id="magicitemcatalog">
        <b-tab title="Scrolls">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredScrolls" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Wands">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredWands" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Weapons">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredWeapons" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Armor">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredArmor" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Other">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredOther" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      </b-tabs>
    </div>
    <div class="col-sm-12" v-if="printMode">
      <div
        v-for="item in toPrint"
        :key="item.Item"
        style="margin-bottom: 50px; page-break-inside: avoid"
      >
        <h4 style="font-size: 3em">
          {{ item.Item }} ({{ item.Type }}, {{ item.Rarity }})
        </h4>
        <div v-html="marked.parse(item.Effect)" style="font-size: 1.5em"></div>
      </div>
      <button
        class="btn btn-success print-hide"
        @click="
          toPrint = [];
          printMode = false;
        "
      >
        Exit
      </button>
    </div>
      </b-tab>
      <b-tab index='4' title="Animals and Vehicles">
        <h3>Animals and Vehicles</h3>
        <p>
          A good mount can help you move more quickly through the wilderness, but its primary purpose is to carry the gear that would otherwise slow you down. The Mounts and Other Animals table shows each animal’s speed and base carrying capacity.
        </p>
        <p>
          An animal pulling a carriage, cart, chariot, sled, or wagon can move weight up to five times its base carrying capacity, including the weight of the vehicle. If multiple animals pull the same vehicle, they can add their carrying capacity together.
        </p>
        <p>
          Mounts other than those listed here are available in fantasy gaming worlds, but they are rare and not normally available for purchase. These include flying mounts (pegasi, griffons, hippogriffs, and similar animals) and even aquatic mounts (giant sea horses, for example). Acquiring such a mount often means securing an egg and raising the creature yourself, making a bargain with a powerful entity, or negotiating with the mount itself.
        </p>
        <p>
          <strong>Barding.</strong> Barding is armor designed to protect an animal’s head, neck, chest, and body. Any type of armor shown on the Armor table can be purchased as barding. The cost is four times the equivalent armor made for humanoids, and it weighs twice as much.
        </p>
        <p>
          <strong>Saddles.</strong> A military saddle braces the rider, helping you keep your seat on an active mount in battle. It gives you advantage on any check you make to remain mounted. An exotic saddle is required for riding any aquatic or flying mount.
        </p>
        <p>
          <strong>Vehicle Proficiency.</strong> If you have proficiency with a certain kind of vehicle (land or water), you can add your proficiency bonus to any check you make to control that kind of vehicle in difficult circumstances.
        </p>
        <p>
          <strong>Rowed Vehicles.</strong> Keelboats and rowboats are used on lakes and rivers. If going downstream, add the speed of the current (typically 3 miles per hour) to the speed of the vehicle. These vehicles can’t be rowed against any significant current, but they can be pulled upstream by draft animals on the shores. A rowboat weighs 100 pounds, in case adventurers carry it over land.
        </p>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Animal</th><th>Type</th><th>Cost per Head</th><th>Size</th><th>Speed</th><th>Carrying Capacity</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Camel</td><td>Mount</td><td>110 gp</td><td>Large</td><td>50 ft.</td><td>480 lbs.</td><td>A camel trained for riding.</td>
            </tr>
            <tr>
              <td>Donkey</td><td>Livestock</td><td>15 gp</td><td>Medium</td><td>35 ft.</td><td>420 lbs.</td><td>A donkey trained for carrying goods.</td>
            </tr>
            <tr>
              <td>Mule</td><td>Livestock</td><td>25 gp</td><td>Medium</td><td>40 ft.</td><td>420 lbs.</td><td>A mule trained for carrying goods.</td>
            </tr>
            <tr>
              <td>Draft Horse</td><td>Livestock</td><td>60 gp</td><td>Large</td><td>40 ft.</td><td>540 lbs.</td><td>A large horse trained for carrying goods or pulling a load.</td>
            </tr>
            <tr>
              <td>Riding Horse</td><td>Mount</td><td>100 gp</td><td>Large</td><td>60 ft.</td><td>480 lbs.</td><td>A horse trained for riding.</td>
            </tr>
            <tr>
              <td>Riding Dog(Mastiff)</td><td>Mount</td><td>25 gp</td><td>Medium</td><td>40 ft.</td><td>195 lbs.</td><td>A large dog trained for riding by small or smaller creatures.</td>
            </tr>
            <tr>
              <td>Herding/Work Dog</td><td>Livestock</td><td>15 gp</td><td>Small</td><td>35 ft.</td><td>-</td><td>A dog trained for work such as herding or tracking.</td>
            </tr>
            <tr>
              <td>Pony</td><td>Mount</td><td>40 gp</td><td>Small</td><td>40 ft.</td><td>225 lbs.</td><td>A pony trained for riding.</td>
            </tr>
            <tr>
              <td>War horse</td><td>Mount</td><td>200 gp</td><td>Large</td><td>60 ft.</td><td>540 lbs.</td><td>A large horse trained for riding and fighting in battle.</td>
            </tr>
            <tr>
              <td>War camel</td><td>Mount</td><td>220 gp</td><td>Large</td><td>50 ft.</td><td>540 lbs.</td><td>A camel trained for riding and fighting in battle.</td>
            </tr>
            <tr>
              <td>Milk Cow</td><td>Livestock</td><td>200 gp</td><td>Large</td><td>30 ft.</td><td>600 lbs.</td><td>A cow ready to give milk.</td>
            </tr>
            <tr>
              <td>Ox/Bull</td><td>Livestock</td><td>40 gp</td><td>Large</td><td>30 ft.</td><td>800 lbs.</td><td>An ox or bull trained to haul or pull.</td>
            </tr>
            <tr>
              <td>Pig</td><td>Livestock</td><td>9 gp</td><td>Medium</td><td>20 ft.</td><td>-</td><td>A pig sow, to be raised for meat.</td>
            </tr>
            <tr>
              <td>Sheep</td><td>Livestock</td><td>30 gp</td><td>Medium</td><td>30 ft.</td><td>-</td><td>A sheep that can be raised for wool.</td>
            </tr>
            <tr>
              <td>Goat</td><td>Livestock</td><td>50 gp</td><td>Medium</td><td>40 ft.</td><td>-</td><td>A goat that can be used for milk or meat.</td>
            </tr>
            <tr>
              <td>Elephant</td><td>Livestock</td><td>2250 gp</td><td>Huge</td><td>40 ft.</td><td>1320 lbs.</td><td>A young elephant.</td>
            </tr>
            <tr>
              <td>Chicken</td><td>Livestock</td><td>2 gp</td><td>Tiny</td><td>20 ft.</td><td>-</td><td>An egg laying chicken.</td>
            </tr>
            <tr>
              <td>Goose</td><td>Livestock</td><td>4 gp</td><td>Small</td><td>25 ft. fly 50 ft.</td><td>-</td><td>An egg laying goose.</td>
            </tr>
            <tr>
              <td>Cat</td><td>Livestock</td><td>10 gp</td><td>Tiny</td><td>40 ft., climb 30 ft.</td><td>-</td><td>A mousing cat.</td>
            </tr>
            <tr>
              <td>Wild Beast</td>
              <td>Livestock</td>
              <td>((CR + 1)^2) * 250 gp</td>
              <td>Varies</td>
              <td>Varies</td>
              <td>Varies</td>
              <td>A captured wild beasts cost is based on the difficulty in capturing and taming it.</td>
            </tr>
          </tbody>
        </table>
        <h3>Tack, Harness, and Drawn Vehicles</h3>
        <table class="table table-striped">
          <thead>
            <tr><th>Item</th><th>Cost</th><th>Weight</th></tr>
          </thead>
          <tbody>
            <tr><td>Barding for Medium Creature</td><td>Armor Price x 2</td><td>Armor Weight</td></tr>
            <tr><td>Barding for Large Creature</td><td>Armor Price x 4</td><td>Armor Weight x 2</td></tr>
            <tr><td>Barding for Huge Creature</td><td>Armor Price x 8</td><td>Armor Weight x 4</td></tr>
            <tr><td>Bit and bridle</td><td>2 gp</td><td>1 lb</td></tr>
            <tr><td>Carraige</td><td>100 gp</td><td>600 lb</td></tr>
            <tr><td>Cart</td><td>15 gp</td><td>200 lb</td></tr>
            <tr><td>Chariot</td><td>250 gp</td><td>100 lb</td></tr>
            <tr><td>Feed (for large grazing animals, per day)</td><td>5 cp</td><td>10 lb</td></tr>
            <tr><td>Saddle, Exotic</td><td>60 gp</td><td>40 lb</td></tr>
            <tr><td>Saddle, Military</td><td>20 gp</td><td>30 lb</td></tr>
            <tr><td>Saddle, Pack</td><td>5 gp</td><td>15 lb</td></tr>
            <tr><td>Saddle, Riding</td><td>10 gp</td><td>25 lb</td></tr>
            <tr><td>Saddlebags</td><td>4 gp</td><td>8 lb</td></tr>
            <tr><td>Sled</td><td>20 gp</td><td>300 lb</td></tr>
            <tr><td>Wagon</td><td>35 gp</td><td>400 lb</td></tr>
          </tbody>
        </table>
        <h3>Waterborne Vehicles</h3>
        <table class="table table-striped">
          <thead>
            <tr><th>Item</th><th>Cost (gp)</th><th>Speed</th><th>Length (feet)</th><th>Minimum Crew</th><th>Capacity (persons)</th><th>Capacity(deadweight)</th></tr>
          </thead>
          <tbody>
            <tr><td>Galley</td><td>30000</td><td>8.5 mph</td><td>60</td><td>50</td><td>150</td><td>400000 lbs</td></tr>
            <tr><td>River Keelboat</td><td>3000</td><td>1 mph</td><td>50</td><td>5</td><td>30</td><td>50000 lbs</td></tr>
            <tr><td>Staelic Longship</td><td>10000</td><td>18 mph</td><td>75</td><td>24</td><td>48</td><td>150000 lbs</td></tr>
            <tr><td>Rowboat</td><td>50</td><td>4 mph</td><td>15</td><td>1</td><td>4</td><td>2000 lbs</td></tr>
            <tr><td>Sailing Cog</td><td>20000</td><td>7 mph</td><td>65</td><td>15</td><td>60</td><td>300000 lbs</td></tr>
            <tr><td>Morrind Clipper</td><td>100000</td><td>20 mph</td><td>225</td><td>40</td><td>160</td><td>1000000 lbs</td></tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab index="5" title="Coins">
        <p>
          Common coins come in several different denominations based on the relative worth of the metal from which they are made. The three most common coins are the gold piece (gp), the silver piece (sp), and the copper piece (cp).
        </p>
        <p>
          With one gold piece, a character can buy a bedroll, 50 feet of good rope, or a goat. A skilled (but not exceptional) artisan can earn one gold piece a day. The gold piece is the standard unit of measure for wealth, even if the coin itself is not commonly used. When merchants discuss deals that involve goods or services worth hundreds or thousands of gold pieces, the transactions don't usually involve the exchange of individual coins. Rather, the gold piece is a standard measure of value, and the actual exchange is in gold bars, letters of credit, or valuable goods.
        </p>
        <p>
          One gold piece is worth ten silver pieces, the most prevalent coin among commoners. A silver piece buys a laborer's work for half a day, a flask of lamp oil, or a night's rest in a poor inn.
        </p>
        <p>
          One silver piece is worth ten copper pieces, which are common among laborers and beggars. A single copper piece buys a candle, a torch, or a piece of chalk.
        </p>
        <p>
          In addition, unusual coins made of other precious metals sometimes appear in treasure hoards. The electrum piece (ep) and the platinum piece (pp) originate from fallen empires and lost kingdoms, and they sometimes arouse suspicion and skepticism when used in transactions. An electrum piece is worth five silver pieces, and a platinum piece is worth ten gold pieces.
        </p>
        <p>
          A standard coin weighs about a third of an ounce, so fifty coins weigh a pound.
        </p>
      </b-tab>
      <b-tab index="6" title="Labor">
        <h3>Labor</h3>
        <p>
          Prices listed are per person per day.
        </p>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Worker</th><th>Class Level</th><th>In Vicinity of Home</th><th>Adventuring</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Guard/Mercenary</td><td>Level 1 Fighter</td><td>2 gp</td><td>4 gp</td>
            </tr>
            <tr>
              <td>Unskilled Laborer</td><td>Level 1 Commoner</td><td>5 sp (plus materials)</td><td>1 gp (plus materials)</td>
            </tr>
            <tr>
              <td>Artisan</td><td>Level 5 Commoner</td><td>3 gp (plus materials)</td><td>6 gp (plus materials)</td>
            </tr>
            <tr>
              <td>Master Craftsman</td><td>Level 10 Commoner</td><td>5 gp (plus materials)</td><td>10 gp (plus materials)</td>
            </tr>
            <tr>
              <td>Level 1 NPC</td><td>Any PC Class Level 1</td><td>2 gp</td><td>4 gp</td>
            </tr>
            <tr>
              <td>Level 2 NPC</td><td>Any PC Class Level 2</td><td>10 gp</td><td>20 gp</td>
            </tr>
            <tr>
              <td>Level 3 NPC</td><td>Any PC Class Level 3</td><td>20 gp</td><td>40 gp</td>
            </tr>
            <tr>
              <td>Level 4 NPC</td><td>Any PC Class Level 4</td><td>40 gp</td><td>80 gp</td>
            </tr>
            <tr>
              <td>Level 5 NPC</td><td>Any PC Class Level 5</td><td>60 gp</td><td>240 gp</td>
            </tr>
            <tr>
              <td>Level 6 NPC</td><td>Any PC Class Level 6</td><td>90 gp</td><td>360 gp</td>
            </tr>
            <tr>
              <td>Level 7 NPC</td><td>Any PC Class Level 7</td><td>120 gp</td><td>480 gp</td>
            </tr>
            <tr>
              <td>Level 8 NPC</td><td>Any PC Class Level 8</td><td>160 gp</td><td>640 gp</td>
            </tr>
            <tr>
              <td>Level 9 NPC</td><td>Any PC Class Level 9</td><td>200 gp</td><td>1200 gp</td>
            </tr>
            <tr>
              <td>Level 10 NPC</td><td>Any PC Class Level 10</td><td>250 gp</td><td>1500 gp</td>
            </tr>
            <tr>
              <td>Level 11 NPC</td><td>Any PC Class Level 11</td><td>300 gp</td><td>1800 gp</td>
            </tr>
            <tr>
              <td>Level 12 NPC</td><td>Any PC Class Level 12</td><td>360 gp</td><td>2150 gp</td>
            </tr>
            <tr>
              <td>Level 13 NPC</td><td>Any PC Class Level 13</td><td>420 gp</td><td>3300 gp</td>
            </tr>
            <tr>
              <td>Level 14 NPC</td><td>Any PC Class Level 14</td><td>490 gp</td><td>3900 gp</td>
            </tr>
            <tr>
              <td>Level 15 NPC</td><td>Any PC Class Level 15</td><td>560 gp</td><td>4400 gp</td>
            </tr>
            <tr>
              <td>Level 16 NPC</td><td>Any PC Class Level 16</td><td>640 gp</td><td>5000 gp</td>
            </tr>
            <tr>
              <td>Level 17 NPC</td><td>Any PC Class Level 17</td><td>720 gp</td><td>7125 gp</td>
            </tr>
            <tr>
              <td>Level 18 NPC</td><td>Any PC Class Level 18</td><td>810 gp</td><td>8000 gp</td>
            </tr>
            <tr>
              <td>Level 19 NPC</td><td>Any PC Class Level 19</td><td>900 gp</td><td>9000 gp</td>
            </tr>
            <tr>
              <td>Level 20 NPC</td><td>Any PC Class Level 20</td><td>1000 gp</td><td>10000 gp</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab index='7' title="Trade Goods">
        <h3>Trade Goods</h3>
        <p>
          Most wealth is not in coins. It is measured in livestock, grain, land, rights to collect taxes, or rights to resources (such as a mine or a forest).
        </p>
        <p>
          Guilds, nobles, and royalty regulate trade. Chartered companies are granted rights to conduct trade along certain routes, to send merchant ships to various ports, or to buy or sell specific goods. Guilds set prices for the goods or services that they control, and determine who may or may not offer those goods and services. Merchants commonly exchange trade goods without using currency. The Trade Goods table shows the value of commonly exchanged goods.
        </p>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Name</th><th>Type</th><th>Weight</th><th>Unit of Sale</th><th>Price per Unit</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wheat</td><td>Foodstuff</td><td>60 lbs</td><td>1 bushel</td><td>5 sp</td><td>Unmilled wheat, usually only bought by millers who then make and sell flour</td>
            </tr>
            <tr>
              <td>Flour</td><td>Foodstuff</td><td>10 lb</td><td>sack</td><td>1.8 sp</td><td>milled flour, 8 days of food</td>
            </tr>
            <tr>
              <td>Bread</td><td>Foodstuff</td><td>1 lb</td><td>loaf</td><td>2 cp</td><td>cooked bread 0.5 days of food</td>
            </tr>
            <tr>
              <td>Biscuits</td><td>Foodstuff</td><td>1 lb</td><td>dozen</td><td>3 cp</td><td>soft biscuits 0.8 days of food</td>
            </tr>
            <tr>
              <td>Hardtack</td><td>Foodstuff</td><td>1 lb</td><td>dozen</td><td>2 cp</td><td>hard unappetizing biscuits, 1 day of food</td>
            </tr>
            <tr>
              <td>Salt</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>5 cp</td><td>delicious salt, can be used to preserve meats or flavor food</td>
            </tr>
            <tr>
              <td>Ginger</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>usually sold as whole ginger root, 0.2 days of food</td>
            </tr>
            <tr>
              <td>Cinnamon</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>7 sp</td><td>the bark of the cinnamon tree, sold as rolled sheets, 0.5 days of food</td>
            </tr>
            <tr>
              <td>Pepper</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>7 sp</td><td>The black variety, used to disguise the taste of spoiled meat, 0.5 days of food</td>
            </tr>
            <tr>
              <td>Cloves</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2.5 gp</td><td>A rare spice made from the flower buds of the clove tree, 0.6 days of food</td>
            </tr>
            <tr>
              <td>Vegetables</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2 cp</td><td>Carrots, tomatoes, cucumbers, etc, 0.1 days of food</td>
            </tr>
            <tr>
              <td>Milk</td><td>Foodstuff</td><td>8.5 lb</td><td>gallon</td><td>3 cp</td><td>Delicious cow(or goat, or other mammal) juice, 1.2 days of food</td>
            </tr>
            <tr>
              <td>Cheese</td><td>Foodstuff</td><td>22 lb</td><td>wheel</td><td>5 sp</td><td>A large wheel of cheese, 20 days of food</td>
            </tr>
            <tr>
              <td>Straw</td><td>Foodstuff</td><td>36 lb</td><td>truss</td><td>1 cp</td><td>a decent basic feed for cows, horses, and other grazing herbivores, 3 days of animal feed</td>
            </tr>
            <tr>
              <td>Corn</td><td>Foodstuff</td><td>60 lb</td><td>bushel</td><td>4 sp</td><td>Sweet or flour corn suitable for eating, full ears. Can also be ground into flour.  14 days of food</td>
            </tr>
            <tr>
              <td>Fresh Fruit</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>3 cp</td><td>Fruit, from apples to berries. 0.1 days of food</td>
            </tr>
            <tr>
              <td>Eggs</td><td>Foodstuff</td><td>1.5 lb</td><td>dozen</td><td>2 sp</td><td>Fruit, from apples to berries. 0.5 days of food</td>
            </tr>
            <tr>
              <td>Meat, dried or salted</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Meat is typically dried or salted to preserve it. 0.6 days of food</td>
            </tr>
            <tr>
              <td>Meat, fresh</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>1 sp</td><td>Fresh meat, delicious but spoils easily, 0.5 days of food</td>
            </tr>
            <tr>
              <td>Peasant's diet (daily)</td><td>Foodstuff</td><td>3 lbs</td><td>one days worth of food</td><td>3 cp</td><td>A days worth of simple wheat or corn bread, vegetables, and milk</td>
            </tr>
            <tr>
              <td>Balanced diet (daily)</td><td>Foodstuff</td><td>3 lbs</td><td>one days worth of food</td><td>1.7 sp</td><td>includes some preserved meat, vegetables, fruits, cheese, and bread, but little or no spices.</td>
            </tr>
            <tr>
              <td>Rich diet (daily)</td><td>Foodstuff</td><td>4 lbs</td><td>one days worth of food</td><td>6 sp</td><td>includes fresh meat, vegetables, fruits, cheese, milk, bread, and spices in enough quantity to put on weight over time.</td>
            </tr>
            <tr>
              <td>Survival Rations (daily)</td><td>Foodstuff</td><td>1 lb</td><td>one days worth of food</td><td>5 cp</td><td>Hardtack and a little jerky for protein.</td>
            </tr>
            <tr>
              <td>Good Rations (daily)</td><td>Foodstuff</td><td>1.5 lb</td><td>one days worth of food</td><td>1.2 sp</td><td>preserved meat, biscuits, and cheese.</td>
            </tr>
            <tr>
              <td>Canvas</td><td>Raw Material</td><td>0.5 lb</td><td>square yard</td><td>3 sp</td><td>heavy cotton canvas, good for tents or ships sails.</td>
            </tr>
            <tr>
              <td>Linen</td><td>Raw Material</td><td>0.2 lb</td><td>square yard</td><td>9 sp</td><td>fine linen, used to make comfortable warm weather clothing.</td>
            </tr>
            <tr>
              <td>Silk</td><td>Raw Material</td><td>0.2 lb</td><td>square yard</td><td>6 gp</td><td>fine silks, used for the finest clothing.</td>
            </tr>
            <tr>
              <td>Cotton</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>40 gp</td><td>raw cotton, used to produce cotton cloth.</td>
            </tr>
            <tr>
              <td>Flax</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>120 gp</td><td>raw flax, used to produce linen cloth.</td>
            </tr>
            <tr>
              <td>Wool</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>40 gp</td><td>raw wool, used to produce wool cloth.</td>
            </tr>
            <tr>
              <td>Cotton Cloth</td><td>Raw Material</td><td>0.3 lb</td><td>square yard</td><td>2 sp</td><td>medium weight cotton cloth, suitable for making clothing.</td>
            </tr>
            <tr>
              <td>Wool Cloth</td><td>Raw Material</td><td>0.4 lb</td><td>square yard</td><td>3 sp</td><td>thick wool cloth, suitable for making cold weather clothing.</td>
            </tr>
            <tr>
              <td>Softwood lumber, milled</td><td>Raw Material</td><td>2 lb</td><td>inches thick x square feet</td><td>2 cp</td><td>milled boards of spruce, pine, maple, or other softwoods. Used for the planks of a ship or as a cheap construction material for buildings.</td>
            </tr>
            <tr>
              <td>Softwood lumber, raw logs</td><td>Raw Material</td><td>1 2/3 lb</td><td>radius(feet)^2*length(inches)</td><td>radius(feet)^2*length(inches)*2 cp or 6 gp for a 10 ft. long 12" diameter log</td><td>raw logs of softwood trees.</td>
            </tr>
            <tr>
              <td>Hardwood lumber, milled</td><td>Raw Material</td><td>3.75 lb</td><td>inches thick x square feet</td><td>1 sp</td><td>milled boards of oak, walnut, cherry, or other hardwoods.  Used primarily for furniture.</td>
            </tr>
            <tr>
              <td>Hardwood lumber, raw logs</td><td>Raw Material</td><td>3 lb</td><td>radius(feet)^2*length(inches)</td><td>radius(feet)^2*length(inches)*2 sp or 6 gp for a 10 ft. long 12" diameter log</td><td>raw logs of hardwood trees.</td>
            </tr>
            <tr>
              <td>Ironwood lumber, milled</td><td>Raw Material</td><td>6 lb</td><td>inches thick x square feet</td><td>4 gp</td><td>milled boards of oak, walnut, cherry, or other hardwoods.  Used primarily for furniture.</td>
            </tr>
            <tr>
              <td>Ironwood lumber, raw logs</td><td>Raw Material</td><td>4.8 lb</td><td>radius(feet)^2*length(inches)</td><td>radius(feet)^2*length(inches)*40 sp or 120 gp for a 10 ft. long 12" diameter log</td><td>raw logs of hardwood trees.</td>
            </tr>
            <tr>
              <td>Hides</td><td>Raw Material</td><td>20 lb</td><td>1 finished hide</td><td>10 gp</td><td>A cowhide that has been dried and de-fleshed.</td>
            </tr>
            <tr>
              <td>Leather</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 gp</td><td>Leather ready for use in clothing or armor.</td>
            </tr>
            <tr>
              <td>Dragon Hide</td><td>Raw Material</td><td>150 lb</td><td>1 finished hide</td><td>6000 gp</td><td>A finished dragonhide that has been dried, descaled and de-fleshed.</td>
            </tr>
            <tr>
              <td>Dragon Leather</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>40 gp</td><td>Dragon leather ready for use in clothing or armor.</td>
            </tr>
            <tr>
              <td>Dragon Scales</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>30 gp</td><td>Dragon scales ready for use in clothing or armor.</td>
            </tr>
            <tr>
              <td>Hemp</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>10 gp</td><td>Hemp used for making rope.</td>
            </tr>
            <tr>
              <td>Cut Stone</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>1 gp</td><td>Rough cut stone suitable for construction.</td>
            </tr>
            <tr>
              <td>Brick</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>17 gp</td><td>Molded clay brick suitable for construction.</td>
            </tr>
            <tr>
              <td>Marble</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>135 gp</td><td>cut marble suitable for construction.</td>
            </tr>
            <tr>
              <td>Concrete</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>13 gp</td><td>unmixed concrete.</td>
            </tr>
            <tr>
              <td>Copper</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>3 sp</td><td>Smelted Copper.</td>
            </tr>
            <tr>
              <td>Silver</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>35 gp</td><td>Smelted Silver.</td>
            </tr>
            <tr>
              <td>Gold</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>1000 gp</td><td>Smelted Gold.</td>
            </tr>
            <tr>
              <td>Platinum</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2000 gp</td><td>Smelted Platinum.</td>
            </tr>
            <tr>
              <td>Arcanum Crystal</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>100 gp</td><td>Unaligned Arcanum Crystal.</td>
            </tr>
            <tr>
              <td>Bronze</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>6 sp</td><td>Smelted bronze.</td>
            </tr>
            <tr>
              <td>Tin</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Smelted tin.</td>
            </tr>
            <tr>
              <td>Zinc</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Smelted zinc.</td>
            </tr>
            <tr>
              <td>Iron</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>1 sp</td><td>Smelted iron.</td>
            </tr>
            <tr>
              <td>Steel</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Smelted steel.</td>
            </tr>
            <tr>
              <td>Brass</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>6 sp</td><td>Smelted brass.</td>
            </tr>
            <tr>
              <td>Nickel</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>3 gp</td><td>Smelted nickel.</td>
            </tr>
            <tr>
              <td>Red Parakas Steel</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>5 gp</td><td>Smelted Parakas Steel.</td>
            </tr>
            <tr>
              <td>Adamantium</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>10 gp</td><td>Smelted Adamantium.</td>
            </tr>
            <tr>
              <td>Mithril</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>15 gp</td><td>Smelted Mithril.</td>
            </tr>
            <tr>
              <td>Aluminum</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>1 gp</td><td>Smelted Aluminum.</td>
            </tr>
            <tr>
              <td>Coal</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>5 cp</td><td>Raw Coal.</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script src="./js/equipment.js"></script>
<style></style>