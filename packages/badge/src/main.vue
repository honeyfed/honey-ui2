<template>
  <div class="t-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        :class="{
          't-badge--dot': isDot,
          't-badge--circle': !isDot && circle,
          't-badge--round': !isDot && !circle,
          't-size-s': isSmall
        }"
      >
        {{ content }}
      </sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ElBadge',

  props: {
    value: [String, Number],
    max: Number,
    isDot: Boolean,
    circle: { type: Boolean, default: true },
    hidden: Boolean,
    type: {
      type: String,
      validator(val) {
        return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1;
      }
    },
    size: {
      type: String,
      default: 'medium'
    }
  },

  computed: {
    content() {
      if (this.isDot) return;

      const value = this.value;
      const max = this.max;

      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }

      return value;
    },
    isSmall() {
      return this.size === 'small';
    }
  }
};
</script>
