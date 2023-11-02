<template>
  <button @click="handleClick">{{ state }}</button>
</template>

<script>
export default {
  props: {
    count : {
      type: Number,
      default: 0
    }
  },
  emits: ['update:count'],
  name: 'CounterButton',
  data(){
    return{
      state: this.count
    }
  },
  methods: {
    handleClick(){
      this.state += 1;
      this.$emit('update:count', this.state)
    }
  },
  watch: {
    count(newCount){
      this.state = newCount
    }
  }
};
</script>
