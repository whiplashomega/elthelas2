/* globals TL */

import { mapGetters } from 'vuex';
import marked from 'marked';

export default {
  computed: mapGetters({
    events: 'allEvents'
  }),
  data () {
    return {
      options: {
        start_at_end: true,
        timenav_height: 300,
        height: 600,
        hash_bookmark: true,
        language: 'el',
        layout: 'portrait',
        timenav_position: 'top',
        scale_factor: 20,
      },
      timeline: {}
    }  
  },
  created () {
    this.$store.dispatch('getAllEvents').then(() => {
      var timelineevents = {
        events: this.events
      }
      this.timeline = new TL.Timeline('timeline', timelineevents, this.options);
    });
  }
}