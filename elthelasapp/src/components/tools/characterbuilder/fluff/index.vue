<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Notes</h5>
          <textarea v-model="character.notes" class="charsheet-textarea smalltext"
                    ref="notes" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Allies and Organizations</h5>
          <textarea v-model="character.allies" class="charsheet-textarea smalltext"
                    ref="allies" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Family</h5>
          <textarea v-model="character.family" class="charsheet-textarea smalltext"
                    ref="family" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Backstory</h5>
          <textarea v-model="character.backstory" class="charsheet-textarea smalltext"
                    ref="backstory" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Bond</h5>
          <textarea v-model="character.bond" class="charsheet-textarea smalltext"
                    ref="bond" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <h5>Personality</h5>
          <textarea v-model="character.personality" class="charsheet-textarea smalltext"
                    ref="personality" @input="textareaResize" ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./fluff.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
