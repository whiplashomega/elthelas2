/* globals TL */

import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    events: 'allEvents'
  }),
  data () {
    return {
      options: {
        // start_at_end: false,
        timenav_height: 300,
        height: 600,
        start_at_slide: 52,
        // hash_bookmark: true,
        language: 'el',
        layout: 'portrait',
        timenav_position: 'top',
        scale_factor: 40
      },
      timeline: {}
    };
  },
  mounted () {
    this.$store.dispatch('getAllEvents').then(() => {
      this.options.start_at_slide = this.events.length - 1;
      var timelineevents = {
        events: this.events
      };
      this.timeline = new TL.Timeline('timeline', timelineevents, this.options);
    });
  }
};
