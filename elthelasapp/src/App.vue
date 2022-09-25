<script>
import headercomponent from '@/components/global/header.vue';
import footerComp from '@/components/global/footer.vue';
import { useStaticsStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const statics = useStaticsStore();
    const user = useUserStore();
    
    statics.getAll();
    user.loadTheme();

    const { darkmode } = storeToRefs(user);    

    return {
      statics,
      user,
      darkmode
    };
  },
  components: {
    footerComp,
    headercomponent
  },
  created () {
  }
};

</script>

<template>
  <div class="fullBody" :class="darkmode">
    <headercomponent />
    <div class='container-fluid' id="pagebody">
      <div class="row">
        <router-view class="view two col-sm-2" name="sidebar" />
        <router-view class="view one col-sm-10" />
      </div>
    </div>
    <footer-comp />
  </div>
</template>
<style src="./components/scss/globalstyles.scss" lang="scss"></style>