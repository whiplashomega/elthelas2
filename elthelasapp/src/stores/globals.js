export default {
  id: 'globals',
  state: () => {
    return {
      mobile: false,
      title: ""
    };
  },
  getters: {
    titleForHeader: (state) => {
      if (state.title.length > 0) {
        return " - " + state.title;
      }
      return "";
    }
  },
  actions: {
    setMobile (val) {
      this.mobile = val;
    },
    changeTitle (val) {
      this.title = val;
    }
  }
};