<template>
  <div>
    <div class="row">
      <div class="col-sm-3">
        <h2>Browse Gods By...</h2>
        <h4>Name</h4>
        <p>
          <b-form-select v-model="SelectedGod" :options="gods"
                         text-field="name" value-field="id" />
        </p>
        <h4>Alignment</h4>
        <p>
          <b-form-select v-model="alignment">
            <option value="" selected="selected">Select an Alignment</option>
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="Neutral">Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaotic Evil">Chaotic Evil</option>
          </b-form-select>
        </p>
        <p>
          <b-form-select v-if="alignment !== ''" :options="alignmentGods"
                         v-model="SelectedGod" text-field="name"
                         value-field="id" />
        </p>
        <h4>Domain</h4>
        <p>
          <b-form-select v-model="domain">
            <option value="" selected>Select a Domain</option>
            <option value="Air">Air</option>
            <option value="Arcana">Arcana</option>
            <option value="Craft">Craft</option>
            <option value="Death">Death</option>
            <option value="Earth">Earth</option>
            <option value="Fire">Fire</option>
            <option value="Knowledge">Knowledge</option>
            <option value="Life">Life</option>
            <option value="Light">Light</option>
            <option value="Nature">Nature</option>
            <option value="Tempest">Tempest</option>
            <option value="Trade">Trade</option>
            <option value="Trickery">Trickery</option>
            <option value="War">War</option>
            <option value="Water">Water</option>
          </b-form-select>
        </p>
        <p>
          <b-form-select v-if="domain !== ''" :options="domainGods"
                         v-model="SelectedGod" text-field="name"
                         value-field="id" />
        </p>
      </div>
      <div class="col-sm-9">
        <div v-if="GodByName">
          <h2>{{ GodByName.name }}</h2>
          <table class="table table-striped table-responsive">
            <tr>
              <td>Holy Symbol</td>
              <td>
                <span data-ng-if="GodByName.symbolimage == undefined">{{ GodByName.holysymbol }}</span>
                <img class="symbolimage" v-if="GodByName.symbolimage != undefined"
                     :src="GodByName.symbolimage" :alt="GodByName.holysymbol"
                     :title="GodByName.holysymbol" />
              </td>
            </tr>
            <tr>
              <td>Alignment</td><td>{{ GodByName.alignment }}</td>
            </tr>
            <tr>
              <td>Domains 3.5e</td><td>{{ GodByName.domains }}</td>
            </tr>
            <tr>
              <td>Domains 5e</td><td>{{ GodByName.domains5 }}</td>
            </tr>
            <tr>
              <td>Interfaith Blessing</td><td>{{ GodByName.interfaithblessing }}</td>
            </tr>
            <tr>
              <td>Favored Weapon</td><td>{{ GodByName.weapon }}</td>
            </tr>
            <tr>
              <td>Cleric Alignments</td><td>{{ GodByName.allowedalignments }}</td>
            </tr>
          </table>
          <h3>Worshippers</h3>
          <div v-html="$options.filters.marked(GodByName.worshippers)"></div>
          <h3>Appearance</h3>
          <div v-html="$options.filters.marked(GodByName.appearance)"></div>
          <h3>Dogma</h3>
          <div v-html="$options.filters.marked(GodByName.dogma)"></div>
          <h3>Clergy</h3>
          <div v-html="$options.filters.marked(GodByName.clergy)"></div>
          <h3>Home</h3>
          <div v-html="$options.filters.marked(GodByName.home)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./gods.js"></script>
<style src="./gods.scss" lang="scss" scoped></style>
