<template>
  <div>
    <h5>
      {{ improvement.name }} x {{ improvement.count }}
      <button @click="improvement.hide = !improvement.hide" class="btn btn-sm btn-primary">
        <span v-if="improvement.hide">Show</span>
        <span v-if="!improvement.hide">Hide</span>
      </button>&nbsp;
      <input type="number" v-model="improvement.removeNum"
             style="width: 75px; display:inline;" class="form-control"
             min=0 :max="improvement.count"
             step="1" />&nbsp;
      <button @click="removeImprovement(improvement)" class="btn btn-sm btn-danger">
        X
      </button>
    </h5>
    <table v-if="!improvement.hide">
      <tr><th>Benefit</th><td>{{ improvement.benefit }}</td></tr>
      <tr>
        <th>Resources Produced</th>
        <td>
          <span v-if="improvement.id === 'lumber-camp'">{{ 0.5 * forestedLand }} metric tons of lumber</span>
          <span v-else>{{ improvement.revenue * improvement.count }}</span>
        </td>
      </tr>
      <tr><th>Population</th><td>{{ improvement.count * improvement.pop }}</td></tr>
      <tr><th>Employs</th><td><span v-if="improvement.id === 'lumber-camp'">{{ 5 * forestedLand }}</span><span v-else>{{ improvement.employs * improvement.count }}</span></td></tr>
      <tr>
        <th>Staff Required to Operate</th>
        <td>
          <span v-if="improvement.staff.length === 0">None</span>
          <span v-for="staff in improvement.staff" :key="staff.name">
            <input type="number" v-model="staff.cur"
                   style="width: 75px; display: inline;" class="form-control" /> / <span v-if="staff.num > 0">{{ staff.num }}</span> {{ staff.name }}
            <span v-if="staff.num === 0">(Can be shared with another job)</span>
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script src="./improvement.js"></script>
<style>
.modal-xl {
  max-width: 1140px;
}
</style>
