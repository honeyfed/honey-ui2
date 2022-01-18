<template>
  <icon v-if="tdName" :name="tdName" :size="size ? size : null" @click="tdIconClick" />
  <i v-else :class="'el-icon-' + name"></i>
</template>

<script>
import { Icon } from 'tdesign-icons-vue';

export default {
  name: 'ElIcon',

  components: { Icon },

  props: {
    name: String,
    tdName: String,
    size: String
  },

  methods: {
    tdIconClick(e) {
      // 代理 TD-Icon 组件自带的 click 事件，使其响应与标准点击事件回调一致
      this.$listeners.click && this.$listeners.click(e.e || e);
    }
  }
};
</script>
