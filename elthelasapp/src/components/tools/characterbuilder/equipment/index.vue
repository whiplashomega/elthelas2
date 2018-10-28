<template>
<div class="row">
  <div class="col">
    <div class="charsheet-static" id="equipmentbox">
      <h4>Equipment</h4>
      <div v-for="container in equipmentContainers" v-bind:key="container.name">
        <h4 class="smalltext">
        {{container.name}} <span class="smalltext">{{container.contains}} / {{container.capacity}} lbs <input type="button" class="btn btn-danger btn-sm" value="X" @click="removeContainer(container.container)" /></span>
        </h4>
        <div v-for="(item, index) in container.equipment" v-bind:key="index" class="smalltext">
        <button type="button" class="print-hide btn-symbol float-left" @click="item.edit = true">&#9998;</button>
        {{ item.name }} <input type="number" class="charsheet-num" v-model="item.quantity" /> <span class="float-right">{{item.weight}} lbs</span><br />
        <b-modal v-model="item.edit" title="Edit Equipment">
          Name
          <input type="text" class="form-control" v-model="item.name" />
          Weight
          <input type="number" class="form-control" v-model="item.weight" />
          Quantity
          <input type="number" class="form-control" v-model="item.quantity" /><br />
          <input type="checkbox" v-model="item.attunement" /> Attunement<br />
          Container
            <select class="form-control" v-model="item.container" @change="item.edit = false;">
              <option v-for="container in character.containers" v-bind:key="container.id" :value="container.id">{{container.name}}</option>
            </select><br />
            <button type="button" class="btn btn-danger print-hide" @click="removeEquipment(index)">Delete</button>
          </b-modal>
        </div>
      </div>
      <button type="button" class="btn btn-sm btn-primary print-hide" @click="equipModal = true">+Equipment</button>
      <button type="button" class="btn btn-sm btn-primary print-hide" @click="containModal = true">+Container</button>
      <b-modal v-model="equipModal" title="Add Equipment" @ok="addEquipment()">
        Name
        <input type="text" class="form-control" v-model="newequip.name" />
        Weight
        <input type="number" class="form-control" v-model="newequip.weight" />
        Quantity
        <input type="number" class="form-control" v-model="newequip.quantity" />
        <input type="checkbox" v-model="newequip.attunement" /> Attunement<br />
        Container
        <select class="form-control" v-model="newequip.container">
          <option v-for="container in character.containers" v-bind:key="container.id" :value="container.id">{{container.name}}</option>
        </select>
      </b-modal>
      <b-modal v-model="containModal" title="Add Container" @ok="addContainer()">
        Name
        <input type="text" class="form-control" v-model="newcontain.name" />
        Capacity
        <input type="number" class="form-control" v-model="newcontain.capacity" /><br />
        Weight Counts
        <input type="checkbox" v-model="newcontain.weightCounts" /><br />
        Select Predefined Type
        <select v-model="newcontain" class="form-control">
          <option v-for="c in ctypes" :value="c" v-bind:key="c.name">{{c.name}}</option>
        </select>
      </b-modal>
      <table class="table table-sm smalltext">
        <tbody>
          <tr>
            <th>CP</th><td><input type="number" class="charsheet-num" v-model="character.cp" /></td>
            <th>GP</th><td><input type="number" class="charsheet-num" v-model="character.gp" /></td>
          </tr>
          <tr>
            <th>SP</th><td><input type="number" class="charsheet-num" v-model="character.sp" /></td>
            <th>PP</th><td><input type="number" class="charsheet-num" v-model="character.pp" /></td>
          </tr>
          <tr><th colspan="2">Gems (value)</th><td colspan="2"><input type="number" class="charsheet-num" v-model="character.gems" /></td></tr>
          <tr><th colspan="2">Art (value)</th><td colspan="2"><input type="number" class="charsheet-num" v-model="character.art" /></td></tr>
        </tbody>
      </table>
      <span class="smalltext">Carry Weight: {{ carryWeight }} / {{ carryMax }}</span><br />
      <span class="smalltext">Total Gold: {{ totalGold }}</span>
    </div>
  </div>
</div>
</template>
<script src="./equipment.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
