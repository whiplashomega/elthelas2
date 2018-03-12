import $ from 'jquery';

export default {
  data () {
    return {

    };
  },
  methods: {
    showClass(id) {
      $(".racediv").hide();
      $("#" + id).show();
    }
  },
  created () {

  }
};