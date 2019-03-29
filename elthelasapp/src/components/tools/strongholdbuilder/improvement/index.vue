<template>
  <div>
    <h6>
      {{ improvement.name }} x {{ improvement.count }}
      <button @click="improvement.hide = !improvement.hide" class="btn btn-sm btn-primary">
        <span v-if="improvement.hide">Show</span>
        <span v-if="!improvement.hide">Hide</span>
      </button>&nbsp;
      <input type="number" v-model="improvement.removeNum"
             style="width: 75px; display:inline; margin-top:1px;" class="form-control form-control-sm"
             min=0 :max="improvement.count"
             step="1" />&nbsp;
      <button @click="removeImprovement(improvement)" class="btn btn-sm btn-danger">
        X
      </button>
    </h6>
    <table v-if="!improvement.hide">
      <tr><th>Benefit</th><td>{{ improvement.benefit }}</td></tr>
      <tr><th>Income</th><td>{{ calculateIncome(improvement) }}</td></tr>
      <tr><th>Operational</th><td><input type="checkbox" v-model="improvement.operating" /></td></tr>
      <tr>
        <th>Resources Produced</th>
        <td>
          <div v-for="(amount, res) in calculateRevenue(improvement)" :key="res" v-if="improvement.revenue[res] !== 0">{{ res }}: {{ amount }}</div>
        </td>
      </tr>
      <tr><th>Population</th><td>{{ improvement.count * improvement.pop }}</td></tr>
      <tr><th>Efficiency</th><td>{{ calcRevRatio(improvement) * 100 }}%</td></tr>
      <tr><th>Employs</th><td><input type="number" v-model="improvement.laborers"
                                     class="form-control" style="max-width:75px; display:inline"
                                     min=0 :max="min([improvement.employs * improvement.count, Number(improvement.laborers) + availableLaborers])" /> / {{ improvement.employs * improvement.count }}</td></tr>
      <tr>
        <th>Staff Required to Operate</th>
        <td>
          <span v-if="improvement.staff.length === 0">None</span>
          <div v-for="staff in improvement.staff" :key="staff.name">
            <input type="number" v-model="staff.cur"
                   style="width: 75px; display: inline;" class="form-control"
                   min="0" :max="min([Number(staff.cur) + availableOfType(staff.name), staff.num * improvement.count])" /> / <span v-if="staff.num > 0">{{ staff.num * improvement.count }}</span> {{ staff.name }}
            <span v-if="staff.num === 0">(Can be shared with another job)</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script src="./improvement.js"></script>
<style>
.modal-xl {
  max-width: 1300px;
}
</style>
