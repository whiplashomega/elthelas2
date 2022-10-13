<template>
  <div class="container charbuilder">
    <div class="alert alert-danger" v-if="message">
      {{ message }}
    </div>
    <div class="row desktop">
      <div class="print-hide col-sm-12">
        <loadsave minimal />
      </div>
      <div class="print-full" :class="buildHide ? 'col-12' : 'col-8'">
        <characterheader />
        <div class="row print-hide">
          <div class="col">
            <button class="btn btn-primary btn-sm" style="float:right;" @click="buildHide = !buildHide"><span v-if="!buildHide">Hide</span><span v-if="buildHide">Show</span> Build</button>&nbsp;
          </div>
        </div>
        <b-tabs>
          <b-tab title="Character Sheet">
            <div class="row">
              <div class="col-7">
                <div class="row">
                  <!-- Ability Scores -->
                  <div class="col-7">
                    <abilityscores />
                    <skills />
                  </div>
                  <div class="col-5">
                    <!-- Initiative -->
                    <initiative />
                    <!-- HP -->
                    <hitpoints :key="hitdicechanged" />
                    <!-- Combat -->
                    <combat />
                    <!-- Equipment -->
                    <equipment />
                  </div>
                </div>
              </div>
              <div class="col-5">
                <div class="row">
                  <div class="col">
                    <!-- Attacks -->
                    <attacks />
                    <features />
                  </div>
                </div>
              </div>
            </div>
            <div class="print-hide">
              <loadsave :minimal="false" />
            </div>
            <div style="page-break-after: always">&nbsp;</div>
            <!-- Spells -->
            <div class="row">
              <div class="col-12">
                <spells />
              </div>
            </div>
            <!-- Resources -->
            <div class="row">
              <div class="col-12">
                <resources />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <pets />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <actions />
              </div>
            </div>
            <div style="page-break-after: always">&nbsp;</div>
            <!-- Fluff Details -->
            <appearance />
            <fluff />
          </b-tab>
          <b-tab title="Combat HUD">
            <combathud />
          </b-tab>
          <b-tab title="Character Details">
            <!-- Fluff Details -->
            <appearance />
            <fluff />
          </b-tab>
          <b-tab title="Spells &amp; Resources">
            <div class="row">
              <div class="col-12">
                <otherrolls />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <spells />
              </div>
            </div>
            <!-- Resources -->
            <div class="row">
              <div class="col-12">
                <resources />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <pets />
              </div>
            </div>
          </b-tab>
          <b-tab title="Game Notes">
            <gamenotes />
          </b-tab>
        </b-tabs>
      </div>
      <div class="col-4 print-hide" v-if="!buildHide">
        <h2>Build</h2>
        <buildclass />
        <statbuilder />
        <bonus />
        <campaigninfo />
      </div>
    </div>
    <div class="mobile">
      <characterheader />
      <b-accordion>
        <b-accordion-item title="Load/Save">
          <loadsave :minimal="false" />
        </b-accordion-item>
        <b-accordion-item title="Class">
          <buildclass />
        </b-accordion-item>
        <b-accordion-item title="Stats">
          <div class="row">
            <div class="col">
              <abilityscores />
            </div>
          </div>
          <statbuilder />
        </b-accordion-item>
        <b-accordion-item title="Skills">
          <skills />
        </b-accordion-item>
        <b-accordion-item title="Spells">
          <div class="row">
            <div class="col-12">
              <spells />
            </div>
          </div>
        </b-accordion-item>
        <b-accordion-item title="Resources">
          <resources />
        </b-accordion-item>
        <b-accordion-item title="Equipment">
          <equipment />
        </b-accordion-item>
        <b-accordion-item title="HP, Initiative, AC, and Armor">
          <hitpoints />
          <initiative />
          <combat />
        </b-accordion-item>
        <b-accordion-item title="Features">
          <features />
        </b-accordion-item>
        <b-accordion-item title="Actions, Attacks, and Other Rolls">
          <actions />
          <attacks />
          <otherrolls />
        </b-accordion-item>
        <b-accordion-item title="Appearance">
          <appearance />
        </b-accordion-item>
        <b-accordion-item title="Backstory">
          <fluff />
        </b-accordion-item>
        <b-accordion-item title="Pets">
          <pets />
        </b-accordion-item>
        <b-accordion-item title="Bonuses">
          <bonus />
        </b-accordion-item>
        <b-accordion-item title="Game Notes">
          <gamenotes />
        </b-accordion-item>
        <b-accordion-item title="Campaign Info">
          <campaigninfo />
        </b-accordion-item>
      </b-accordion>
    </div>
    <loadsavemodals />
    <b-modal v-model="startGuide" title="Getting Started Guide"
             hide-footer size="lg"
             :modal-class="userinfo.themesetting">
      <div>
        <p>
          Welcome to the Elthelas Character Builder. To get started building your character follow the instructions below.
        </p>
        <ol>
          <li>
            <strong>Name Your Character</strong>
            <p>
              Naming your character is the only prerequisite to saving your character. I recommend saving your character early and often.
            </p>
          </li>
          <li>
            <strong>Make an Initial Save, and then Load It</strong>
            <p>
              If you are logged in to the Elthelas website, you can use the 'Save New' button on the top right to save your character to the server, otherwise you can save it to a file. Also if you are logged in you can check the autosave box. I strongly recommend doing this to make sure you never lose your changes by accidentally navigating away from the page or if the app refreshes for any reason. Once you have saved your character, hit the load button next to the save button and select your character. You have now established an ID for your character in the database and can share a link with your DM so they can view your character sheet. (the link is found in the bottom right of the page titled 'Campaign Information', or in mobile the tab 'Campaign')
            </p>
          </li>
          <li><strong>Choose a Class</strong>
            <p>
              On a mobile device, you will do this using the dropdowns right under 'home town' on the 'basics' tab. On a tablet or desktop you will do this in the 'build' section on the top right. Select your base class, subclass (even if you don't get any features from it yet), level, and casting/primary stat. If you don't know your classes primary stat, check the players handbook Quick Build section for your class, it will be the ability score that they tell you to put your highest score into. If you are multiclassing, select the '+' button underneath your first class and fill in the additional row it creates with your second classes information.
            </p>
          </li>
          <li><strong>Choose a Race</strong>
            <p>
              This is also on the basics page. Remember that if your race has ability score improvements that you get to choose you will have to modify the 'race' line of the ability scores table yourself to add those in. Note that when you do so, your racial abilities appear automatically in features. If you have race based spells or resistances feel free to enter them in the appropriate areas now.
            </p>
          </li>
          <li><strong>Determine Ability Scores</strong>
            <p>
              Talk to your DM about the method for determining your ability scores. You can use the ability score table in the build section (or the 'Stats' section in mobile) to enter your rolls or calculate the point buy. Use the 'Base' row in the table to enter these. If you need to modify your racial bonuses, do that in the 'Racial' row of the table. Meanwhile if you need to enter modifiers due to Ability Score Increases or magic modifiers to ability scores enter them in the 'Bonus' row. The system will automatically total these numbers to give you your actual ability scores.
            </p>
          </li>
          <li><strong>Describe your Character</strong>
            <p>
              Choose a background from the dropdown that is appropriate for your character. Fill in backstory, home country, home town, appearance details, and any other non-mechanical information in the appropriate places.
            </p>
          </li>
          <li><strong>Picking Spells</strong>
            <p>
              With your ability scores, class, and level determined you can move to picking your spells. The system makes it's best guess using what it knows about how many spells you can prepare (if a preparing class) or have known (if a spells known class) at the top of the spells section. You can do a full text search, filter by spell level, and filter by class spell lists. When you select a spell be sure to fill in the 'Spell Added By Class' dropdown (otherwise it will not properly count against your number prepared/known). Then, in the spell list itself, hit the check mark next to each spell to prepare it or properly mark it as known. To browse through your spells you can select a spell level at the top of the spell section. Clicking on a spell will open its full spell description in a modal.
            </p>
          </li>
          <li><strong>Picking Equipment</strong>
            <p>
              In the equipment section things are managed as items within containers. If you select an armor item it will be automatically added to the "Armor" section as well. To then equip that armor select the checkbox.
            </p>
          </li>
          <li><strong>Armor</strong>
            <p>If you added your armor in the equipment section it will appear here automatically. However you can also add things like magical effect based armor modifiers here. Three examples below:</p>
            <ul>
              <li>Mage Armor: The mage armor spell acts like Light Armor (uses your full dex bonus, is a AC formula), so select Light Armor from the "Type" dropdown. In the AC enter the base AC exactly as it appears in the description of the spell. In the case of Mage Armor this would be 13. Enter Mage Armor in the name field, and then hit OK. You should see it in the Armor list now. The AC listed in the list may not match what you entered, this is because it is automatically adding any appropriate modifiers from your dexterity.</li>
              <li>Shield Spell: The shield spell acts like a physical shield, granting a static, stacking AC bonus. Therefore select "Shield" from the Type dropdown. Then enter the AC bonus exactly as it appears in the spell description, in this case 5.</li>
              <li>Monk Unarmored Defense: A monks unarmored defense is an 'unarmored bonus'. A new formula for AC that involves an ability score other than just dexterity. To calculate this select the 'Unarmored Bonus' option from the 'Type' dropdown. A new field will appear, 'Unarmored Bonus Stat'. Because a monks unarmored defense uses wisdom select that from the dropdown. In this case the 'AC' field would be used for any additional static bonus, in this case you can leave it at 0.</li>
            </ul>
          </li>
          <li><strong>Skills and Proficiencies</strong>
            <p>
              The Character builder can automatically calculate skill bonuses if you select the appropriate proficiency level from the dropdown for each skill. For each skill there are 4 options, 'No', 'Yes', 'Half', and 'Exp'. If you are not proficient in a skill, leave it at 'No'. If you have a normal proficiency in a skill, select 'Yes'. The other 2 are special cases. If you have an ability that allows you to add double your proficiency bonus to a skill, such as Expertise, select 'Exp'. If you have something that allows you to add half your proficiency bonus to a skill, such as a bards 'Jack of all Trades' feature, select 'Half'. For things like tool proficiencies, languages, etc enter them in the Proficiencies and Languages box below the standard abilities.
            </p>
          </li>
        </ol>
      </div>
    </b-modal>
  </div>
</template>
<style src="./scss/characterbuilder.scss" scoped lang="scss"></style>
<script src="./js/characterbuilder.js"></script>
