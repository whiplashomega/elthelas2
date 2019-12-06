<template>
  <div class="row">
    <div class="col-sm-3">
      <h4>Land Details</h4>
      Total Land: {{ totalLand }}<br />
      Total Forested Land: {{ forestedLand }}<br />
      Land Used For Timber Harvesting: {{ timberLand }}<br />
      Available Forested Land: {{ availableForestedLand }}<br />
      Total Cleared Land: {{ availableClearedLand + farmLand + urbanLand }}<br />
      Available Cleared Land: {{ availableClearedLand }}<br />
      Farm Land: {{ farmLand }}<br />
      Urban Land: {{ urbanLand }}<br />
    </div>
    <div class="col-sm-3">
      <h4>Population Statistics</h4>
      Total Population: {{ getPop }}<br />
      Your Employees: {{ totalEmployees }}<br />
      Total Number Employed: {{ totalEmployees + privateLaborers + stronghold.privateEmployees.length }}<br />
      Unemployment Rate: {{ unemploymentRate }}%<br />
      Beds for Staff: {{ staffBeds }}<br />
      Available Beds: {{ availableStaffBeds }}<br />
      Unrest: {{ unrest }}%<br />
    </div>
    <div class="col-sm-6">
      <h4>Notes</h4>
      <textarea class="form-control" v-model="stronghold.notes" style="min-height:400px;"></textarea>
    </div>
  </div>
</template>
<script src="./js/generalinformation.js"></script>
<style></style>
