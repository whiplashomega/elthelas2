<template>
  <div class="col-sm-12">
    <h1>History</h1>
    <div>
      <div v-for="event in sortedEvents" :key="event.start_date.year + event.start_date.month + event.start_date.day + event.text.headline">
        <h3>{{ event.text.headline }}</h3>
        <h4>
          <span v-if="event.start_date.month">{{ event.start_date.day }} {{ event.start_date.month }},</span>
          {{ event.start_date.year }}<span v-if="event.end_date.year"> - <span v-if="event.end_date.month">{{ event.end_date.day }} {{ event.end_date.month }},</span> {{ event.end_date.year }}</span></h4>
        <div v-html="$options.filters.marked(event.text.text)"></div>
      </div>
    </div>
  </div>
</template>
<script src="./js/historylist.js"></script>
<style lang="scss"></style>