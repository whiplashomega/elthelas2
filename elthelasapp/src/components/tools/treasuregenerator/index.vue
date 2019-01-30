<template>
  <div>
    <select v-model="challenge">
      <option :value="1">CR 0-4</option>
      <option :value="2">CR 5-10</option>
      <option :value="3">CR 11-14</option>
      <option :value="4">CR 15+</option>
    </select>
    <select v-model="horde">
      <option :value="true">Horde</option>
      <option :value="false">Individual</option>
    </select>
    <input type="number" min=1 max=100 v-model="d100" /> Roll Value
    <button @click="generateTreasure()">Generate!</button>
    <button @click="generateTreasureSetRoll()">Generate with Set Roll</button>
    <div>{{ treasure }}</div>
  </div>
</template>
<script src="./treasuregenerator.js"></script>
