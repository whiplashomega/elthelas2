<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <button class="btn btn-primary" @click="addEvent()">+</button>
    </div>
    <div v-for="event in sortedEvents" :key="event._id" class="card">
      <div v-if="event.edit">
        <div class="row">
          <div class="col-12">
            <label>Title</label>
            <input type="text" class="charsheet-text" v-model="event.text.headline" />
          </div>
          <div class="col-6">
            <label>Start Date</label><br />
            Month: <input type="number" class="charsheet-num" v-model="event.start_date.month" /><br />
            Day: <input type="number" class="charsheet-num" v-model="event.start_date.day" /><br />
            Year: <input type="number" class="charsheet-num" v-model="event.start_date.year" style="max-width:75px;" />
          </div>
          <div class="col-6">
            <label>End Date</label><br />
            Month: <input type="number" class="charsheet-num" v-model="event.end_date.month" /><br />
            Day: <input type="number" class="charsheet-num" v-model="event.end_date.day" /><br />
            Year: <input type="number" class="charsheet-num" v-model="event.end_date.year" style="max-width:75px;" />
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
          {{ event.start_date.year }} <span v-if="event.start_date.month">{{ convertMonth(event.start_date.month) }} {{ event.start_date.day }}</span>
          <span v-if="event.end_date.year"> - {{ event.end_date.year }} <span v-if="event.end_date.month">{{ convertMonth(event.end_date.month) }} {{ event.end_date.day }}</span></span>:
          <span class="smalltext">{{ event.text.headline }}</span>
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
