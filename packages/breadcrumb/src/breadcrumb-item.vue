<template>
  <span class="t-breadcrumb__item light">
    <span :class="['t-breadcrumb--text-overflow', to ? 'is-link' : '']" ref="link" role="link">
      <span class="t-breadcrumb__inner">
        <slot></slot>
      </span>
    </span>

    <span v-if="separator" class="t-breadcrumb__separator" role="presentation">{{ separator }}</span>
    <span v-else class="t-breadcrumb__separator" role="presentation">
      <el-icon tdName="chevron-right" />
    </span>
    <!-- <i v-if="separatorClass" class="t-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="t-breadcrumb__separator" role="presentation">{{ separator }}</span> -->
  </span>
</template>
<script>
export default {
  name: 'ElBreadcrumbItem',
  props: {
    to: {},
    replace: Boolean
  },
  data() {
    return {
      separator: '',
      separatorClass: ''
    };
  },

  inject: ['elBreadcrumb'],

  mounted() {
    this.separator = this.elBreadcrumb.separator;
    this.separatorClass = this.elBreadcrumb.separatorClass;
    const link = this.$refs.link;
    link.setAttribute('role', 'link');
    link.addEventListener('click', _ => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  }
};
</script>
