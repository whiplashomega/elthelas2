<template>
  <div id="#main" class="col-sm-12">
    <p>
      The following backgrounds are suggested possibilities for players.  Work with your DM to determine the background for your character.
    </p>
    <p>
      Every story has a beginning. Your character's background reveals where you came from, how you became an adventurer, and your place in the world. Your fighter might have been a courageous knight or a grizzled soldier. Your wizard could have been a sage or an artisan. Your rogue might have gotten by as a guild thief or commanded audiences as a jester.
    </p>
    <p>
      Choosing a background provides you with important story cues about your character's identity. The most important question to ask about your background is what changed? Why did you stop doing whatever your background describes and start adventuring? Where did you get the money to purchase your starting gear, or, if you come from a wealthy background, why don't you have more money? How did you learn the skills of your class? What sets you apart from ordinary people who share your background?
    </p>
    <h4>Proficiencies</h4>
    <p>
      Each background gives a character proficiency in two skills.
    </p>
    <p>
      In addition, most backgrounds give a character proficiency with one or more tools.
    </p>
    <p>
      If a character would gain the same proficiency from two different sources, he or she can choose a different proficiency of the same kind (skill or tool) instead.
    </p>
    <h4>Languages</h4>
    <p>
      Each background allows you to learn one language of your choice.
    </p>
    <h4>Feat</h4>
    <p>
      Each background provides 1 feat available to level 1 characters. Alternatively you can take a level 1 feat of your choice.
    </p>
    <h4>Equipment</h4>
    <p>
      Each background provides a package of starting equipment. Alternatively, you can forgo the starting equipment and spend an extra 50 gp on equipment of your choice.
    </p>
    <h4>Suggested Characteristics</h4>
    <p>
      A background contains suggested personal characteristics based on your background. You can pick characteristics, roll dice to determine them randomly, or use the suggestions as inspiration for characteristics of your own creation. Customizing a Background You might want to tweak some of the features of a background so it better fits your character or the campaign setting. To customize a background, you can replace one feature with any other one, choose any two skills, and choose a total of two tool proficiencies or languages from the sample backgrounds. You can either use the equipment package from your background or spend coin on gear as described in the equipment section. (If you spend coin, you can't also take the equipment package suggested for your class.) Finally, choose two personality traits, one ideal, one bond, and one flaw. If you can't find a feature that matches your desired background, work with your GM to create one.
    </p>
    <div  v-if="statics.backgroundsv2">
      <div v-for="background in statics.backgroundsv2" :key="background.name"
          class="card">
        <h3 class="card-title">{{ background.name }}<button type="button" class="btn btn-primary" style="float:right;" @click="background.isCollapsed = !background.isCollapsed">
          <span v-if="!background.isCollapsed">&#x25B2;</span><span v-if="background.isCollapsed">&#x25BC;</span>
        </button></h3>
        <div v-if="!background.isCollapsed">
          <div marked="background.description"></div>
          <p v-if="background.skills">
            <strong>Skills: </strong>{{ background.skills.join(', ') }}<br />
            <strong>Tools: </strong>{{ background.tools.join(', ') }}<span v-if="background.tools.length === 0">None</span><br />
            <span v-if="background.languages"><strong>Languages: </strong>{{ background.languages }} of your choice</span><br />
            <strong>Feat: </strong>{{background.feature }}
          </p>
          <p>
            {{background.description}}
          </p>
          <p>
            <strong>Equipment: </strong><span v-html="background.equipment"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/backgrounds.js"></script>
<style src="./scss/backgrounds.scss" lang="scss" scoped></style>
