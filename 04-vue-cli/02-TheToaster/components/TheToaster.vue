<template>
  <div class="toasts">
    <UiToastContainer>
    <div :key="toast.id" v-for="toast in toasts" :class="toast.className" class="toast ">
      <UiIcon class="toast__icon" :icon="toast.icon" />
      <span>{{ toast.text }}</span>
    </div>
  </UiToastContainer>
</div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToastContainer from './UiToastContainer.vue'

export default {
  name: 'TheToaster',
  props: {
    delay: {
      type: Number,
      default: 5000
    },
    closeBtn: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      toasts: []
    }
  },  
  methods: {
    success(text){
      const newToast = {
        id: 'success' + new Date(),
        text,
        className: 'toast_success',
        icon: "check-circle"
      }

      this.toasts.push(newToast);
      this.closeToastWithDelay(newToast.id)
    },
    error(text){
      const newToast = {
        id: 'error' + new Date(),
        text,
        className: 'toast_error',
        icon: "alert-circle"
      }

      this.toasts.push(newToast);
      this.closeToastWithDelay(newToast.id)
    },

    closeToastWithDelay(id){
      setTimeout(()=> {
        this.toasts = this.toasts.filter(el => el.id != id)
      }, this.delay)
    }
  },



  emits: ['handleSuccessClick', 'handleErrorClick'],

  components: { UiIcon, UiToastContainer },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast__close {
	position: absolute;
	top: 4px;
	right: 4px;
	width: 15px;
  height: 15px;
	cursor: pointer;
	border-radius: 50%;
	background-color: var(--grey-2);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
