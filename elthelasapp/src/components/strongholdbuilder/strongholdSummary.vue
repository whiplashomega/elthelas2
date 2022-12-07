<template>
  <div>
    <div class="row">
      <h1 class="col-sm-5">
        <div class="btn-group">
          <button class="btn btn-warning" @click="newmodal = true">
            New / Load
          </button>
          <button class="btn btn-success" @click="saveNewStronghold()">
            Save New
          </button>
          <button
            class="btn btn-primary"
            v-if="stronghold._id"
            @click="saveStronghold()"
          >
            Save
          </button>
        </div>
        {{ stronghold.castleName }} : {{ stronghold.townName }} {{ gameDate }}
        {{ dayofweek }}&nbsp;&nbsp;<button
          class="btn btn-primary"
          @click="newDay()"
        >
          New Day
        </button>
      </h1>
      <div class="col-sm-7">
        <div class="row">
          <div :class="netRevenue < 0 ? 'red' : ''" class="col-sm-3">
            <strong>Gold: </strong> {{ stronghold.treasury }} (<span
              v-if="netRevenue >= 0"
              >+</span
            >{{ netRevenue }})
          </div>
          <div class="col-sm-3">
            <strong>Available Beds: </strong> {{ availableStaffBeds }}
          </div>
          <div class="col-sm-3">
            <strong>Total Staff Beds:</strong> {{ staffBeds }}
          </div>
          <div class="col-sm-3"><strong>Unrest: </strong> {{ unrest }}%</div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <strong>Total Population: </strong> {{ getPop }}
          </div>
          <div class="col-sm-3">
            <strong>Non-Staff Population: </strong> {{ nonstaffPop }}
          </div>
          <div class="col-sm-3">
            <strong>Non-Staff Housing: </strong> {{ totalHousing }}
          </div>
          <div class="col-sm-3">
            <strong>Max Laborers: </strong> {{ maxLaborers }}
          </div>
        </div>
        <div class="row">
          <div
            v-for="(resource, key) in stronghold.resources"
            :key="key"
            class="col-sm-3"
            :class="calcTotalRevenue[key] < 0 ? 'red' : ''"
          >
            <strong>{{ key }}</strong
            >: {{ resource }} (<span v-if="calcTotalRevenue[key] >= 0">+</span
            >{{ calcTotalRevenue[key] }})
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-danger" v-if="usedStorage >= totalStorage">
      At Maximum Storage, newly stockpiled resources may be discarded
    </div>
    <b-modal v-model="newmodal">
      Castle Name
      <input type="text" v-model="stronghold.castleName" class="form-control" />
      Town Name
      <input type="text" v-model="stronghold.townName" class="form-control" />
      <h5>Start Date</h5>
      <div class="row">
        <label class="col-sm-4">
          Month
          <input
            type="number"
            min="1"
            max="12"
            class="form-control"
            v-model="stronghold.gameMonth"
          />
        </label>
        <label class="col-sm-4">
          Day
          <input
            type="number"
            min="1"
            max="30"
            class="form-control"
            v-model="stronghold.gameDay"
          />
        </label>
        <label class="col-sm-4">
          Year
          <input
            type="number"
            min="1800"
            max="1846"
            class="form-control"
            v-model="stronghold.gameYear"
          />
        </label>
      </div>
      <div class="row">
        <div class="col-sm-12">
          Starting Land (km^2)
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            class="form-control"
            v-model="stronghold.improvements[0].count"
          />
        </div>
      </div>
      <h4>Load Stronghold</h4>
      <ul>
        <li v-for="stronghold in allStrongholds" :key="stronghold._id">
          <a
            href="#"
            @click="
              newmodal = false;
              loadStronghold(stronghold);
            "
            >{{ stronghold.castleName }}</a
          >&nbsp;&nbsp;
          <button
            class="btn btn-danger"
            @click="deleteStronghold({ stronghold: stronghold })"
          >
            X
          </button>
        </li>
      </ul>
      <button class="btn btn-secondary" @click="newStronghold()">New/Clear</button>
    </b-modal>
  </div>
</template>
<script src="./js/summary.js"></script>
<style src="./scss/stronghold.scss" lang="scss" scoped></style>
