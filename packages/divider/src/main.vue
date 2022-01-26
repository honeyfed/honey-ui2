<template functional>
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[
      data.staticClass,
      't-divider',
      `t-divider--${props.direction}`,
      props.dashed ? 't-divider--dashed' : '',
      slots().default && props.direction !== 'vertical'
        ? `t-divider--with-text t-divider--with-text-${props.contentPosition}`
        : ''
    ]"
  >
    <div v-if="slots().default && props.direction !== 'vertical'" :class="['t-divider__inner-text']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    },
    dashed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showInnerText() {
      return this.$slots.default && this.props.direction !== 'vertical';
    }
  }
};
</script>
