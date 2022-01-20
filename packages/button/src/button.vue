<template>
  <button
    v-ripple
    class="t-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      `t-button--variant-${buttonVariant}`,
      type ? 't-button--theme-' + type : '',
      buttonSize ? 't-size-' + buttonSize : '',
      {
        't-is-disabled': buttonDisabled || loading,
        't-is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading t-loading" v-if="loading"></i>
    <template v-if="(tdIcon || icon) && !loading">
      <el-icon v-if="tdIcon" :tdName="tdIcon" />
      <i v-else :class="icon"></i>
    </template>
    <span class="t-button_text" v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
import ripple from 'element-ui/src/utils/ripple';

export default {
  name: 'ElButton',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    variant: {
      type: String,
      default: 'base'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    tdIcon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },

  directives: { ripple },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      // return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return (this.size || this._elFormItemSize || (this.$ELEMENT || {}).size) === 'medium' ? 's' : 'm';
    },
    buttonVariant() {
      return this.type === 'text' ? 'text' : this.variant;
    },
    buttonDisabled() {
      return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.elForm || {}).disabled;
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
