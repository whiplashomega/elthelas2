<template>
  <div>
    <h5>
      {{ improvement.name }} x {{ improvement.count }}
      <button @click="improvement.hide = !improvement.hide" class="btn btn-sm btn-primary">
        <span v-if="improvement.hide">Show</span>
        <span v-if="!improvement.hide">Hide</span>
      </button>&nbsp;
      <button @click="removeImprovement(improvement)" class="btn btn-sm btn-danger">
        X
      </button>
    </h5>
    <table v-if="!improvement.hide">
      <tr><th>Benefit</th><td>{{ improvement.benefit }}</td></tr>
      <tr><th>Revenue</th><td>{{ improvement.revenue * improvement.count }}</td></tr>
      <tr><th>Population</th><td>{{ improvement.count * improvement.pop }}</td></tr>
      <tr><th>Employs</th><td>{{ improvement.employs * improvement.count }}</td></tr>
      <tr><th>Staff Required to Operate</th><td><span v-for="staff in improvement.staff" :key="staff.name">{{ staff.num }} {{ staff.name }} </span></td></tr>
    </table>
  </div>
</template>
<script src="./improvement.js"></script>
<style>
.modal-xl {
  max-width: 1140px;
}
</style>
