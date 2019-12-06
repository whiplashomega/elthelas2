import { mapActions, mapGetters } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapGetters({})
  },
  data: function () {
    return {
      pcid: ""
    };
  },
  methods: {
    ...mapActions({
      invitePC: "invitePCToCampaign"
    }),
    emit: function () {
      console.log(this);
      this.$socket.emit("invitationSent", this.pcid);
    }
  }
};
