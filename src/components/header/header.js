(function() {
  var cx = '002019895859863268942:tbtmwpd5jy8'
  var gcse = document.createElement('script')
  gcse.type = 'text/javascript'
  gcse.async = true
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(gcse, s)
})();

import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    title: 'title'
  }),
  methods: mapActions([

  ]),
  created () {
    
  }
}