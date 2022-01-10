<template>
  <icon v-if="tdName" :name="tdName" :size="size ? size : null" />
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
    size: String,
    click: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
