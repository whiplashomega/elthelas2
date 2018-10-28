<template>
<div>
  <table class="abilitytable">
    <thead>
      <tr><th>Skill</th><th>Prof?</th><th>Mod</th><th>Magic</th></tr>
    </thead>
    <tbody>
      <tr v-for="skill in character.skills" v-bind:key="skill.name">
        <th>{{skill.name}}</th>
        <td>
          <select v-model="skill.prof" class="charsheet-num">
            <option :value="0">No</option>
            <option :value="0.5">Half</option>
            <option :value="1">Yes</option>
            <option :value="2">Exp</option>
          </select>
        </td>
        <td><span v-if="getSkillMod(skill) > -1">+</span>{{getSkillMod(skill)}}</td>
        <td><input type="number" class="charsheet-num" v-model="skill.magic" /></td>
      </tr>
    </tbody>
  </table>
  <div class="charsheet-static">
    <h5>Proficiencies and Languages</h5>
    <textarea v-model="character.proficiencies" class="charsheet-textarea smalltext" id="profbox"></textarea>
  </div>
</div>
</template>
<script src="./skills.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
