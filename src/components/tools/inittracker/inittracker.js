
export default {
  computed: {
    initlist() {
      return this.initchars.sort((a, b) => {
        if(Number(a.init) > Number(b.init)) {
          return -1;
        } else if(Number(a.init) < Number(b.init)) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  },
  data () {
    return {
      style: "list",
      initchars: [],
      nextid: 0,
      current: 0
    }
  },
  methods: {
    addInit() {
      this.initchars.push({
        id: this.nextid,
        name: "",
        init: 0
      });
      this.nextid = this.nextid + 1;
    },
    removeInit(id) {
      var index = 0;
      var filteredlist = this.initchars.filter((obj) => {
        if(obj.id !== id) {
          return true;
        } else {
          index = this.initlist.indexOf(obj) + 1;
          return false;
        }
      });
      if (index < this.initlist.length) {
        this.current = this.initlist[index].id;
      } else {
        this.current = this.initlist[0].id;
      }
      this.initchars = filteredlist;
      if (this.initlist.length === 0) {
        this.nextid = 0;
        this.current = 0;
      }
    },
    delay(initchar) {
      var index = this.initlist.indexOf(initchar) + 1;
      if(index < this.initlist.length) {
        var nextchar = this.initlist[index];
        this.current = nextchar.id;
        initchar.init = Number(nextchar.init) - .01;
      } else {
        var nextchar = this.initlist[0];
        this.current = nextchar.id;
        initchar.init = Number(nextchar.init) - .01;
      }
    },
    nextCard(cur) {
      var index = this.initlist.indexOf(cur) + 1;
      if (index === this.initlist.length) {
        index = 0;
      }
      this.current = this.initlist[index].id;
    }
  }
}