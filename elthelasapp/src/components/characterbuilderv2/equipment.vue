<template>
  <div class="row">
    <div class="col">
      <div class="charsheet-static" id="equipmentbox">
        <h4>Equipment</h4>
        <div v-for="container in equipmentContainers" :key="container.name" style="clear:both;">
          <h4 class="smalltext">
            {{ container.name }} <span class="smalltext">{{ container.contains }} / {{ container.capacity }} lbs
              <input type="button" class="btn btn-danger btn-sm print-hide"
                     value="X" @click="removeContainer(container)" /></span>
          </h4>
          <div v-for="item in container.equipment" :key="item.id"
               class="smalltext" style="clear:both;">
            <button type="button" class="print-hide btn-symbol float-left" @click="item.edit = { isActive: true, title: item.name }">&#9998;</button>
            <span :class="item.attunement ? 'attuned' : ''" :title="'Item Weight: ' + item.weight + ' lbs, Total Weight ' + item.weight * item.quantity + ' lbs'">
              {{ item.name }}
            </span><input type="number" class="charsheet-num" v-model="item.quantity" /><br />
            <modal :modalProps="item.edit">
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
            </modal>
          </div>
        </div>
        <div class="btn-group" style="clear:both;">
          <button type="button" class="btn btn-sm btn-primary print-hide" @click="newEquipModal.isActive = true">+Equipment</button>
          <button type="button" class="btn btn-sm btn-primary print-hide" @click="containModal = true">+Container</button>
        </div>
        <modal :modalProps="newEquipModal">
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
              <div style="overflow-y:scroll;height:500px;">
                <table class="table table-striped table-sm">
                  <thead><tr><th>Item</th><th>Cost</th><th>Weight</th></tr></thead>
                  <tbody>
                    <tr v-for="item in allGear" :key="item">
                      <td><a href="#" @click="addExistingEquipment(item, newequip.quantity, newequip.container, false)">{{ item.Item }}</a></td>
                      <td>{{ item.Cost }}</td>
                      <td>{{ item.Weight }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
            <b-tab title="Weapons">
              <input placeholder="search" v-model="searchEquip" class="form-control" />
              <div style="overflow-y:scroll;height:500px;">
                <table class="table table-striped table-sm">
                  <thead><tr><th>Item</th><th>Damage</th><th>Properties</th><th>Cost</th><th>Weight</th></tr></thead>
                  <tbody>
                    <tr v-for="item in allWeapons" :key="item.Weapon">
                      <td><a href="#" @click="addExistingWeapon(item, newequip.quantity, newequip.container)">{{ item.Weapon }}</a></td>
                      <td>{{ item.Damage}} {{ item.Dtype }}</td>
                      <td>{{ item.Properties }}</td>
                      <td>{{ item.Cost }}</td>
                      <td>{{ item.Weight }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
            <b-tab title="Armor">
              <input placeholder="search" v-model="searchEquip" class="form-control" />
              <div style="overflow-y:scroll;height:500px;">
                <table class="table table-striped table-sm">
                  <thead><tr>
                    <th><span @click.stop="armorSort = 'Armor'; armorSortDir = !armorSortDir">Item</span></th>
                    <th><span @click.stop="armorSort = 'Type'; armorSortDir = !armorSortDir">Type</span></th>
                    <th><a @click.stop="armorSort = 'Cost'; armorSortDir = !armorSortDir">Cost</a></th>
                    <th><a @click.stop="armorSort = 'AC'; armorSortDir = !armorSortDir">AC</a></th>
                    <th><a @click.stop="armorSort = 'MaxDex'; armorSortDir = !armorSortDir">MaxDex</a></th>
                    <th><a @click.stop="armorSort = 'PC'; armorSortDir = !armorSortDir">PC</a></th>
                    <th><a @click.stop="armorSort = 'Weight'; armorSortDir = !armorSortDir">Weight</a></th>
                  </tr></thead>
                  <tbody>
                    <tr v-for="item in allArmor" :key="item.Armor">
                      <td><a href="#" @click="addExistingArmor(item, newequip.quantity, newequip.container)">{{ item.Armor }}</a></td>
                      <td>{{ item.Type }}</td>
                      <td>{{ item.Cost }}</td>
                      <td>{{ item.AC }}</td>
                      <td>{{ item.MaxDex == 99 ? "Unlimited" : item.MaxDex }}</td>
                      <td>{{ item.PC }}</td>
                      <td>{{ item.Weight }} lbs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
          </b-tabs>
        </modal>
        <b-modal v-model="containModal" title="Add Container"
                 @ok="addContainer()" :modal-class="userinfo.themesetting">
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
<script src="./js/equipment.js"></script>
<style src="@/views/character/scss/characterbuilder.scss" lang="scss" scoped></style>
