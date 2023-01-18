<template>
  <div>
    <p>
      This page lists custom class descriptions for classes available in the Elthelas Campaign Setting.  As well as optional changes to existing classes
      for balance reasons.
    </p>
    <ul class="list-inline">
      <li class="list-inline-item" v-for="cls in classes" :key="cls.name"><button @click="shownClass = cls" class="racebutton btn btn-primary">{{cls.name}}</button></li>
    </ul>
    <div id="raceDetails" v-if="shownClass.name">
      <h1>{{ shownClass.name }}</h1>
      <table class="table table-striped">
        <thead>
          <tr><th>Level</th><th>Proficiency</th><th>Features</th><th v-for="res in tableResources" :key="res.name">{{ res.name }}</th>
          <th>1st</th><th>2nd</th><th>3rd</th><th>4th</th><th>5th</th><th>6th</th><th>7th</th><th>8th</th><th>9th</th></tr>
        </thead>
        <tbody>
          <tr v-for="num in 20" :key="num">
            <td>{{ num }}</td>
            <td>+{{ Math.floor((num - 1)/4 + 2) }}</td>
            <td>{{ getFeaturesByLevel(num).str }}</td>
            <td v-for="res in tableResources" :key="res.name">{{ getResCount(res, num) }}</td>
            <td>{{  getSlotsByLevel(1, num) }}</td>
            <td>{{  getSlotsByLevel(2, num) }}</td>
            <td>{{  getSlotsByLevel(3, num) }}</td>
            <td>{{  getSlotsByLevel(4, num) }}</td>
            <td>{{  getSlotsByLevel(5, num) }}</td>
            <td>{{  getSlotsByLevel(6, num) }}</td>
            <td>{{  getSlotsByLevel(7, num) }}</td>
            <td>{{  getSlotsByLevel(8, num) }}</td>
            <td>{{  getSlotsByLevel(9, num) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script src="./js/class.js"></script>
<style src="./scss/class.scss" lang="scss" scoped></style>
