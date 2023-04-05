<template>
<div>
  <p>
    This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.
  </p>
  <b-tabs>
    <b-tab title="Search">
      <div id="search">
        <div class="row">
          <div class="col-sm-8">
            <input type="text" class="form-control col-sm-10" v-model="searchtext" />
          </div>
          <div class="col-sm-4 btn-group">
            <button type="button" class="btn btn-primary" @click="showresults = true">Search</button>
            <button type="button" class="btn btn-warning" @click="showresults = false;searchtext = ''">Clear</button>
          </div>
        </div>
        <hr />
        <div id="rulesresults" v-if="showresults">
          <div v-for="rule in rulesresults" :key="rule.category + rule.subcategory + rule.title">
            <h4>{{ rule.title }} <button type="button" class="btn btn-primary" style="float:right;" @click="rule.isCollapsed = !rule.isCollapsed">
              <span v-if="rule.isCollapsed">&#x25B2;</span><span v-if="!rule.isCollapsed">&#x25BC;</span>
            </button></h4>
            <h6>{{ rule.category }} - {{ rule.subcategory }}</h6>
            <div v-html="rule.description" v-show="rule.isCollapsed"></div>
            <hr />
          </div>
        </div>
      </div>
    </b-tab>
    <b-tab title="Index">
      <div v-for="category in rulesByCategory" :key="category.title">
        <h2><button type="button" class="btn btn-primary" style="float:left;" @click="category.isCollapsed = !category.isCollapsed">
              <span v-if="category.isCollapsed">&#x25B2;</span><span v-if="!category.isCollapsed">&#x25BC;</span>
            </button>&nbsp;&nbsp;{{ category.title }}</h2>
        <div v-show="category.isCollapsed">
          <div v-for="subcategory in category.subcategories" :key="subcategory.title" style="margin-left:40px;">
            <h3><button type="button" class="btn btn-primary btn-sm" style="float:left;" @click="subcategory.isCollapsed = !subcategory.isCollapsed">
              <span v-if="subcategory.isCollapsed">&#x25B2;</span><span v-if="!subcategory.isCollapsed">&#x25BC;</span>
            </button>&nbsp;&nbsp;{{ subcategory.title }}</h3>
            <div v-for="rule in subcategory.rules" :key="rule.title" v-show="subcategory.isCollapsed" style="margin-left:40px;">
              <hr />
              <h4><button type="button" class="btn btn-primary btn-sm" style="float:left;" @click="rule.isCollapsed = !rule.isCollapsed">
                <span v-if="rule.isCollapsed">&#x25B2;</span><span v-if="!rule.isCollapsed">&#x25BC;</span>
              </button>&nbsp;&nbsp;{{ rule.title }}</h4>
              <div v-html="rule.description" v-show="rule.isCollapsed"></div>
            </div>
            <hr />
          </div>
        </div>
        <hr />
      </div>
    </b-tab>
  </b-tabs>
</div>

</template>
<script src="./js/srdhome.js"></script>
<style></style>