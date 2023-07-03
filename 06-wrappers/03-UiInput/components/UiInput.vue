<template>
  <div :class="[{'input-group_icon': Boolean($slots['left-icon'] || Boolean($slots['right-icon']))}, {'input-group_icon-left': Boolean($slots['left-icon'])}, {'input-group_icon-right': Boolean($slots['right-icon'])}]" class="input-group ">
    <div v-if="Boolean($slots['left-icon'])" class="input-group__icon">
      <slot name="left-icon" class="icon" alt="icon"></slot>
    </div>

    <component :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" :is="inputType" ref="input" :class="computedClassInput" class="form-control" />

    <div v-if="Boolean($slots['right-icon'])" class="input-group__icon">
      <slot name="right-icon" class="icon" alt="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  inheritAttrs: false,
  props: {
    modelValue: [String, Number],
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
  },
  emits: ['update:modelValue'],
  computed: {
    computedClassInput(){
      return [{'form-control_sm' : this.small }, {'form-control_rounded' : this.rounded }]
    },
    inputType(){
      return this.multiline ? 'textarea' : 'input'
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  }
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
