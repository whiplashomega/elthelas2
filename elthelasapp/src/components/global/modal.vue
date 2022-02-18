<template>
  <div>
    <div class="modal fade" :style="modalProps.isActive ? 'Display: block; background-color: rgba(0,0,0,0.4);' : 'Display: none;'" :class="modalProps.isActive ? 'show' : 'hide'" :key="counter">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h5 class="modal-title">{{ modalProps.title }}</h5>
            </slot>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  @click="hideModal()"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="!modalProps.hideFooter">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  @click="hideModal()">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ["modalProps"],
    data () {
      return {
        counter: 0
      }
    },
    methods: {
      hideModal () {
        this.modalProps.isActive = false;
        console.log(this.modalProps);
        this.counter++;
      }
    }
};
</script>

<!--

  <div class="modal modal-lg" tabindex="-1" :style="active ? 'display: block' : ''">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div> 
  
-->