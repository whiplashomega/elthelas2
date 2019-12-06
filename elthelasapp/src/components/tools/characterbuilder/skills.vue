<template>
  <div>
    <table class="abilitytable">
      <thead>
        <tr><th>Skill</th><th>Prof?</th><th>Mod</th><th>Magic</th></tr>
      </thead>
      <tbody>
        <tr v-for="skill in character.skills" :key="skill.name">
          <th>{{ skill.name }}</th>
          <td>
            <select v-model="skill.prof" class="charsheet-num">
              <option :value="0">No</option>
              <option :value="0.5">Half</option>
              <option :value="1">Yes</option>
              <option :value="2">Exp</option>
            </select>
          </td>
          <td><button @click="rollCheck(getSkillMod(skill))"><span v-if="getSkillMod(skill) > -1">+</span>{{ getSkillMod(skill) }}</button></td>
          <td><input type="number" class="charsheet-num" v-model="skill.magic" /></td>
        </tr>
      </tbody>
    </table>
    <div class="charsheet-static">
      <h5>Proficiencies and Languages</h5>
      <p style="font-size:9px;margin-bottom:2px;"><strong>Background Proficiencies: </strong>
        {{ [character.background.skills.join(", "), character.background.tools.join(", ")].join(", ") }}
        and {{ character.background.languages }} bonus language<span v-if="character.background.languages !== 1">s</span>
      </p>
      <p style="font-size:9px;margin-bottom:2px;"><strong>Class Skills: </strong> pick {{ character.charclasses[0].thisclass.proficiencies.numskills }} from {{ character.charclasses[0].thisclass.proficiencies.skills.join(", ") }}</p>
      <p style="font-size:9px;margin-bottom:2px;"><strong>Armor: </strong>{{ character.charclasses[0].thisclass.proficiencies.armor.join(", ") }}</p>
      <p style="font-size:9px;margin-bottom:2px;"><strong>Weapons: </strong>{{ character.charclasses[0].thisclass.proficiencies.weapons.join(", ") }}</p>
      <p style="font-size:9px;margin-bottom:2px;"><strong>Tools: </strong>{{ character.charclasses[0].thisclass.proficiencies.tools.join(", ") }}</p>
      <p style="font-size:9px;margin-bottom:2px;"><strong>Saves: </strong>{{ character.charclasses[0].thisclass.proficiencies["saving throws"].join(", ") }}</p>
      <textarea v-model="character.proficiencies" class="charsheet-textarea smalltext" id="profbox"></textarea>
    </div>
  </div>
</template>
<script src="./js/skills.js"></script>
<style src="../scss/characterbuilder.scss" lang="scss" scoped></style>
