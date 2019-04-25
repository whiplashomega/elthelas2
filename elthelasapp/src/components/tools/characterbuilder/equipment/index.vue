<template>
  <div class="row">
    <div class="col">
      <div class="charsheet-static" id="equipmentbox">
        <h4>Equipment</h4>
        <div v-for="container in equipmentContainers" :key="container.name" style="clear:both;">
          <h4 class="smalltext">
            {{ container.name }} <span class="smalltext">{{ container.contains }} / {{ container.capacity }} lbs
              <input type="button" class="btn btn-danger btn-sm"
                     value="X" @click="removeContainer(container)" /></span>
          </h4>
          <div v-for="item in container.equipment" :key="item.id"
               class="smalltext" style="clear:both;">
            <button type="button" class="print-hide btn-symbol float-left" @click="item.edit = true">&#9998;</button>
            <span :class="item.attunement ? 'attuned' : ''" :title="'Quantity: ' + item.quantity + ' Weight: ' + item.weight + ' lbs'">{{ item.name }}</span><br />
            <b-modal v-model="item.edit" title="Edit Equipment">
              Name
              <input type="text" class="form-control" v-model="item.name" />
              Weight
              <input type="number" class="form-control" v-model="item.weight" />
              Quantity
              <input type="number" class="form-control" v-model="item.quantity" />
              Value (gp)
              <input type="number" class="form-control" v-model="item.cost" /><br />
              <input type="checkbox" v-model="item.attunement" /> Attunement<br />
              Container
              <select class="form-control" v-model="item.container" @change="item.edit = false;">
                <option v-for="container in character.containers" :key="container.id" :value="container.id">{{ container.name }}</option>
              </select><br />
              Description
              <textarea v-model="item.description" class="form-control"></textarea>
              <button type="button" class="btn btn-danger print-hide" @click="removeEquipment(item)">Delete</button>
            </b-modal>
          </div>
        </div>
        <div class="btn-group" style="clear:both;">
          <button type="button" class="btn btn-sm btn-primary print-hide" @click="equipModal = true">+Equipment</button>
          <button type="button" class="btn btn-sm btn-primary print-hide" @click="containModal = true">+Container</button>
        </div>
        <b-modal v-model="equipModal" title="Add Equipment">
          Quantity
          <input type="number" class="form-control" v-model="newequip.quantity" />
          Container
          <select class="form-control" v-model="newequip.container">
            <option v-for="container in character.containers" :key="container.id" :value="container.id"> {{ container.name }}</option>
          </select>
          <b-tabs id="existingEquip">
            <b-tab title="New">
              Name
              <input type="text" class="form-control" v-model="newequip.name" />
              Weight
              <input type="number" class="form-control" v-model="newequip.weight" />
              Value (gp)
              <input type="number" class="form-control" v-model="newequip.cost" />
              <input type="checkbox" v-model="newequip.attunement" /> Attunement<br />
              Description
              <textarea v-model="newequip.description" class="form-control"></textarea>
              <button @click="addEquipment()" class="btn btn-sm btn-primary">Add Now</button>
            </b-tab>
            <b-tab title="Adventuring Gear">
              <input placeholder="search" v-model="searchEquip" class="form-control" />
              <table class="table table-striped table-sm">
                <thead><tr><th>Item</th><th>Weight</th></tr></thead>
                <tbody>
                  <tr v-for="item in allGear" :key="item.Item">
                    <td><a href="#" @click="addExistingEquipment(item, newequip.quantity, newequip.container)">{{ item.Item }}</a></td>
                    <td>{{ item.Weight }}</td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
            <b-tab title="Weapons">
              <input placeholder="search" v-model="searchEquip" class="form-control" />
              <table class="table table-striped table-sm">
                <thead><tr><th>Item</th><th>Weight</th></tr></thead>
                <tbody>
                  <tr v-for="item in allWeapons" :key="item.Name">
                    <td><a href="#" @click="addExistingWeapon(item, newequip.quantity, newequip.container)">{{ item.Name }}</a></td>
                    <td>{{ item.Weight }}</td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
            <b-tab title="Armor">
              <input placeholder="search" v-model="searchEquip" class="form-control" />
              <table class="table table-striped table-sm">
                <thead><tr><th>Item</th><th>Type</th><th>AC</th><th>Weight</th></tr></thead>
                <tbody>
                  <tr v-for="item in allArmor" :key="item.Armor">
                    <td><a href="#" @click="addExistingArmor(item, newequip.quantity, newequip.container)">{{ item.Armor }}</a></td>
                    <td>{{ item.Type }}</td>
                    <td>{{ item.AC }}</td>
                    <td>{{ item.Weight }}</td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
          </b-tabs>
        </b-modal>
        <b-modal v-model="containModal" title="Add Container" @ok="addContainer()">
          Name
          <input type="text" class="form-control" v-model="newcontain.name" />
          Capacity
          <input type="number" class="form-control" v-model="newcontain.capacity" /><br />
          Weight Counts
          <input type="checkbox" v-model="newcontain.weightCounts" /><br />
          Container Weight
          <input type="number" class="form-control" v-model="newcontain.weight" /><br />
          Select Predefined Type
          <select v-model="ctypeselected" class="form-control" @change="newContainerType(ctypeselected)">
            <option v-for="c in ctypes" :value="c" :key="c.name">{{ c.name }}</option>
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
