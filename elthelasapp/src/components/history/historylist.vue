<template>
  <div class="col-sm-12">
    <h1>History</h1>
    <div>
      <div v-for="event in sortedEvents" :key="event.startdate.year + event.startdate.month + event.startdate.day + event.text.headline">
        <h3>{{ event.text.headline }}</h3>
        <h4>{{ event.startdate.day }} {{ event.startdate.month }}, {{ event.startdate.year }} - {{ event.enddate.day }} {{ event.enddate.month }}, {{ event.enddate.year }}</h4>
        <div v-html="$options.filters.marked(event.text.text)"></div>
      </div>
    </div>
  </div>
</template>
<script src="./js/historylist.js"></script>
<style lang="scss"></style>