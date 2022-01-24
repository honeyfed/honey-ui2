<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask t-loading__overlay"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="el-loading-spinner t-loading--center t-size-m t-loading">
        <!-- <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg> -->
        <svg
          v-if="!spinner"
          class="t-loading__gradient t-icon-loading"
          viewBox="0 0 14 14"
          version="1.1"
          width="1em"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <foreignObject x="1" y="1" width="12" height="12">
            <div class="t-loading__gradient-conic" ref="circle" />
          </foreignObject>
        </svg>
        <!-- <i v-else :class="spinner"></i> -->
        <el-icon v-else :tdName="spinner" />
        <div v-if="text" class="t-loading__text">{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ''
    };
  },

  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    },
    setText(text) {
      this.text = text;
    }
  }
};
</script>
