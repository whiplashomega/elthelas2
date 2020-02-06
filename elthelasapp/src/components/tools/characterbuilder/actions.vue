<template>
  <div class="charsheet-static smalltext" id="attackdiv">
    <b-tabs>
      <b-tab title="Actions">
        <h6 @click="showstandard = !showstandard">Common Actions<span v-if="showstandard">&#x25B2;</span><span v-if="!showstandard">&#x25BC;</span></h6>
        <div v-if="showstandard">
          <div title="you gain extra movement for the current turn. The increase equals your speed, after applying any modifiers.">
            <strong>Dash</strong>
          </div>
          <div title="your movement doesn’t provoke opportunity attacks for the rest of the turn.">
            <strong>Disengage</strong>
          </div>
          <div title="Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.">
            <strong>Dodge</strong>
          </div>
          <div title="the creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn.">
            <strong>Help</strong>
          </div>
          <div title="you make a Dexterity (Stealth) check in an attempt to hide, following the rules in chapter 7 for hiding. If you succeed, you gain certain benefits, as described in the “Unseen Attackers and Targets” section">
            <strong>Hide</strong>
          </div>
          <div title="decide what perceivable circumstance will trigger your reaction. Then, you choose the action you will take in response to that trigger, or you choose to move up to your speed in response to it. When the trigger occurs, you can either take your reaction right after the trigger finishes or ignore the trigger.">
            <strong>Ready</strong>
          </div>
          <div title="you devote your attention to finding something.">
            <strong>Search</strong>
          </div>
          <div title="When an object requires your action for its use, you take the Use an Object action.">
            <strong>Use an Object</strong>
          </div>
          <div title="as part of an attack action, you can replace 1 attack with a grapple check so long as you have 1 free hand.">
            <strong>Attack with Grapple</strong>
          </div>
          <div title="as part of an attack action, you can replace 1 attack with a shove.">
            <strong>Attack with Shove</strong>
          </div>
        </div>
        <div v-for="action in actions" :key="action.id">
          <p :title="action.description"><strong>{{ action.name }}</strong> <button @click="deleteAction(action)" v-if="action.useradd">X</button></p>
        </div>
      </b-tab>
      <b-tab title="Bonus Actions">
        <div v-for="action in bonus" :key="action.id">
          <p :title="action.description"><strong>{{ action.name }}</strong> <button @click="deleteAction(action)" v-if="action.useradd">X</button></p>
        </div>
      </b-tab>
      <b-tab title="Reactions">
        <div title="When an opponent moves out of your reach you can use a reaction to make 1 attack against them">
          <strong>Opportunity Attack</strong>
        </div>
        <div v-for="action in reactions" :key="action.id">
          <p :title="action.description"><strong>{{ action.name }}</strong> <button @click="deleteAction(action)" v-if="action.useradd">X</button></p>
        </div>
      </b-tab>
      <button @click="addActionModal = true">+</button>
      <b-modal v-model="addActionModal" @ok="addAction()">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="newaction.name" />
        <label>Action Type:</label>
        <select v-model="newaction.actiontype" class="form-control">
          <option value="action">Action</option>
          <option value="bonus">Bonus Action</option>
          <option value="reaction">Reaction</option>
        </select>
        <label>Description:</label>
        <textarea v-model="newaction.description" class="form-control"></textarea>
      </b-modal>
    </b-tabs>
  </div>
</template>
<script src="./js/actions.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
