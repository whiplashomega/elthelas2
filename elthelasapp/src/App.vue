<script>
import headercomponent from '@/components/global/header.vue';
import footerComp from '@/components/global/footer.vue';
import { useStaticsStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useMeta } from 'vue-meta';

export default {
  setup () {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'en', amp: true }
    });
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
    <metainfo>
      <template v-slot:title="{ content }">{{ content ? `${content} | Elthelas Campaign Setting` : `Elthelas Campaign Setting` }}</template>
    </metainfo>
    <headercomponent />
    <div class='container-fluid' id="pagebody">
      <div class="row">
        <router-view class="view one col-sm-12" :key="$route.fullPath" />
      </div>
    </div>
    <footer-comp />
  </div>
</template>
<style src="./components/scss/globalstyles.scss" lang="scss"></style>