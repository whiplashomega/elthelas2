<template>
  <div>
    <h1>Player Races</h1>
    <div>
      <div v-for="race in races" :key="race.id" class="racebuttondiv">
        <button class="racebutton btn btn-primary" @click="loadRace(race.id)" v-if="race.id !== 'custom'">{{ race.name }}</button>
      </div>
    </div>
    <p style="clear:both;">
      Note that for all PC races, starting languages are determined by country of origin, not race, although classes or backgrounds may provide bonus
      languages as specified in their descriptions.
    </p>
    <div id="raceDiv" v-if="currentRace.name">
      <h2>{{ currentRace.name }}</h2>
      <img :src="currentRace.subraces[0].image" :alt="currentRace.name" class="raceimage" />
      <div v-html="marked.parse(currentRace.description)"></div>
      <div class="subrace" v-for="(subrace, index) in currentRace.subraces" :key="subrace.id">
        <h3 v-if="subrace.name !== 'default'">{{ subrace.name }}</h3>
        <img :src="subrace.image" :alt="subrace.name"
             v-if="subrace.image && index !== 0" class="raceimage" />
        <div v-html="marked.parse(subrace.description)"></div>
        <ul>
          <li v-for="trait in currentRace.traits" :key="trait.name"><div v-if="typeof trait === 'string'" v-html="marked.parse(trait)"></div><div v-else><strong>{{ trait.name }}</strong><span v-html="marked.parse(trait.description)"></span></div></li>
          <li v-for="trait in subrace.traits" :key="trait.name"><div v-if="typeof trait === 'string'" v-html="marked.parse(trait)"></div><div v-else><strong>{{ trait.name }}</strong><span v-html="marked.parse(trait.description)"></span></div></li>
        </ul>
      </div>
    </div>
    <h3 style="clear:both;">Age</h3>
    <p>
      Age in Elthelas differs from default D&amp;D, particularly in that none of the major races differ from humans in max age by more than an order
      of magnitude.  Only dragons, outsiders, fae, and a few other animals and monsters live longer than 200 years without divine
      or magical intervention.  Such intervention usually draws the ire of the Gods (specifically Nera, goddess of death and rebirth, but the other
      Gods usually frown on it as well).
    </p>
    <p>
      Typical ages of various life stages for each of the major races.  Note "max age" is not a strict maximum age, but rather the age when 95%
      of any particular cohort has died.  Start of Puberty and Sexual Maturity are given in exact median age (any individual is usually +/- 2), all
      others are rounded to the nearest multiple of 5.
    </p>
    <div class="row">
      <div class="col-sm-6">&nbsp;</div>
      <div class="col-sm-6"><b-form-input v-model="ageFilter" placeholder="Type to Search" /></div>
    </div>
    <table class="table table-striped">
      <thead>
        <th v-for="field in ageFields" :key="field.key">
            <button @click="changeAgeSort(field)" class="tablebutton">
              {{ field.name }}
              <span v-if="ageSortBy===field.key && ageSortDesc">&#8595;</span>
              <span v-if="ageSortBy===field.key && !ageSortDesc">&#8593;</span>
            </button>          
        </th>
      </thead>
      <tbody>
        <tr v-for="item in filterage" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.puberty }}</td>
          <td>{{ item.sexualmaturity }}</td>
          <td>{{ item.mentalmaturity }}</td>
          <td>{{ item.middleage }}</td>
          <td>{{ item.oldage }}</td>
          <td>{{ item.averagelifespan }}</td>
          <td>{{ item.maxage }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Height and Weight</h3>
    <p>
      You can use the tables below to either get an idea of an appropriate height and weight for your character, or to randomly determine a height and weight. To randomly determine a height and weight for your character first start with height. Roll the dice indicated, and write down the result. Then add the result to the base height. This is your characters height in inches. To determine the weight, roll the dice indicated under weightroll. Take the result, multiply it by your result from the height roll and then add it to the base weight. This is your characters weight in pounds. So for example, say a protector Aasimar character rolls 2d10 on their height roll and gets a 12. She adds that to the base height of 58 and gets a height of 70 inches (or 5'10"). Next she rolls the weight roll, 2d4, and gets a 4. She multiplies this by her height roll of 12 to get a result of 48, which she then adds to the base weight (120) to get a total weight of 168 lbs. So on her character sheet under height she puts 5'10" and under weight she writes 168 lbs.
    </p>
    <p>
      If alternatively you want to use this to get reasonable ranges to choose from for your character, use the table to determine minimum and maximums for your character. First look at the height roll and imagine what the lowest and highest numbers you could roll would be. For our Protector Aasimar example the minimum would be 2, and the maximum would be 20. This gives a range of 60 inches - 78 inches or 5'0" - 6'6". She picks a number she feels is appropriate for her character that falls within that range, say 5'7", which would be a roll of 9. She then can use that to determine what an appropriate possible weight would be. 2d4 has results ranging from 2 - 8. So the minimum would be 2 * 9 + 120, or 138 lbs, while the maximum would be 8 * 9 + 120, or 192 lbs. She decides she wants to be on the lighter side without being gaunt, so she decides her character weighs 150 lbs.
    </p>
    <div class="row">
      <div class="col-sm-6">&nbsp;</div>
      <div class="col-sm-6"><b-form-input v-model="hwFilter" placeholder="Type to Search" /></div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-for="field in hwFields" :key="field.key">
            <button @click="changeHWSort(field)" class="tablebutton">
              {{ field.name }}
              <span v-if="hwSortBy===field.key && hwSortDesc">&#8595;</span>
              <span v-if="hwSortBy===field.key && !hwSortDesc">&#8593;</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterhw" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.averageheight }}</td>
          <td>{{ item.baseheight }}</td>
          <td>{{ item.heightroll }}</td>
          <td>{{ item.averageweight }}</td>
          <td>{{ item.baseweight }}</td>
          <td>{{ item.weightroll }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script src="./js/races.js"></script>
<style src="./scss/races.scss" lang="scss" scoped></style>
