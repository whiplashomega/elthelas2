<template>
  <div>
    <p>
      A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies training, experience, and abilities beyond what a class provides.
    </p>
    <p>
      At certain levels, your class gives you the Ability Score Improvement feature. Using the optional feats rule, you can forgo taking that feature to take a feat of your choice instead. You can take each feat only once, unless the feat's description says otherwise.
    </p>
    <p>
      You must meet any prerequisite specified in a feat to take that feat. If you ever lose a feat's prerequisite, you can't use that feat until you regain the prerequisite. For example, the Grappler feat requires you to have a Strength of 13 or higher. If your Strength is reduced below 13 somehow--perhaps by a withering curse--you can't benefit from the Grappler feat until your Strength is restored.
    </p>
    <div v-for="feat in featsort" :key="feat.name">
      <h4>{{ feat.name }}</h4>
      <h6 v-if="feat.prereq !== ''">Prerequisite: {{ feat.prereq }}</h6>
      <p v-html="marked.parse(feat.description)"></p>
    </div>
  </div>
</template>
<script src="./js/feats.js"></script>
