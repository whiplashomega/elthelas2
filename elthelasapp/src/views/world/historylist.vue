<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <button class="btn btn-primary" @click="addEvent()">+</button>
    </div>
    <div v-for="event in sortedEvents" :key="event.start_date.year + event.start_date.month + event.start_date.day + event.text.headline" class="card">
      <div v-if="event.edit">
        <div class="row">
          <div class="col-12">
            <label>Title</label>
            <input type="text" class="charsheet-text" v-model="event.text.headline" />
          </div>
          <div class="col-6">
            <label>Start Date</label>
            Day: <input type="number" class="charsheet-num" v-model="event.start_date.day" /><br />
            Month: <input type="number" class="charsheet-num" v-model="event.start_date.month" /><br />
            Year: <input type="number" class="charsheet-num" v-model="event.start_date.year" />
          </div>
          <div class="col-6">
            <label>End Date</label>
            Day: <input type="number" class="charsheet-num" v-model="event.end_date.day" /><br />
            Month: <input type="number" class="charsheet-num" v-model="event.end_date.month" /><br />
            Year: <input type="number" class="charsheet-num" v-model="event.end_date.year" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <label>Description</label>
            <textarea class="charsheet-textarea" v-model="event.text.text"></textarea>
          </div>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" @click="save(event)">Save</button>
          <button class="btn btn-danger" @click="deleteEvent(event)">Delete</button>
        </div>
      </div>
      <div v-else>
        <h4 class="card-title">
          <span v-if="event.start_date.month">{{ event.start_date.day }} {{ convertMonth(event.start_date.month) }},</span>{{ event.start_date.year }}
          <span v-if="event.end_date.year"> - <span v-if="event.end_date.month">{{ event.end_date.day }} {{ convertMonth(event.end_date.month) }},</span> {{ event.end_date.year }}</span>
          {{ event.text.headline }}
          <button class="btn btn-warning" @click="event.edit = true">Edit</button>
          <button type="button" class="btn btn-primary" style="float:right;" @click="event.expand = !event.expand">
            <span v-if="event.expand">&#x25B2;</span><span v-if="!event.expand">&#x25BC;</span>
          </button>
        </h4>
        <div v-html="marked.parse(event.text.text)" v-if="event.expand"></div>
      </div>
    </div>
  </div>
</template>
<script src="./js/historylist.js"></script>
<style lang="scss"></style>
