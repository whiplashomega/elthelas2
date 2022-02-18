<script>
import { RouterLink, RouterView } from 'vue-router';
import headercomponent from '@/components/global/header.vue';
import footerComp from '@/components/global/footer.vue';
import { useRoute } from "vue-router";

export default {
  components: {
    footerComp,
    headercomponent
  },
  data: function () {
    console.log(this.$route)
    return {
      title: this.$route.meta.title ? " - " + this.$route.meta.title : ""
    }
  }
}

</script>

<template>
  <div :class="getThemeSetting" class="fullBody">
    <headercomponent :title="title" />
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