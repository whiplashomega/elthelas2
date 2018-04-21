export default {
  data () {
    return {
      chaptertext: ""
    };
  },
  methods: {
    start () {
      this.$http.get('/static/md/book4/' + this.$route.params.chapter + '.md').then((response) => {
        this.chaptertext = response.body;
      });
    }
  },
  watch: {
    '$route' (to, from) {
      this.start();
    }
  },
  mounted () {
    this.start();
  }
};
