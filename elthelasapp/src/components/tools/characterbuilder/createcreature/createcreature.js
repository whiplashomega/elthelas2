export default {
  computed: {
    character: "getCharacter"
  },
  data () {
    return {
      creatureText: "---<br />layout:post<br />title:$charactername<br />date:" + Date().toString() +
                    "<br />tags: $tagsarray<br />---<br /><br />" +
                    "**Medium humanoid ($racename), $alignment**<br /><br />" +
                    "**Armor Class:** $AC<br /><br />" +
                    "**Hit Points:** $HPMax",
      creatureTextModal: false,
      cr: 0
    };
  },
  methods: {
    buildCreatureEntry () {
      this.creatureTextModal = true;
    }
  }
};
