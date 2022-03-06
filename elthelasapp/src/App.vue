<script>
import headercomponent from '@/components/global/header.vue';
import footerComp from '@/components/global/footer.vue';
import { useStaticsStore } from '@/stores/index';

export default {
  setup () {
    const statics = useStaticsStore();
    return {
      statics
    };
  },
  components: {
    footerComp,
    headercomponent
  },
  created () {
    this.statics.getAll();
  }
};

</script>

<template>
  <div class="fullBody">
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