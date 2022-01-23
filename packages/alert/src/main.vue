<template>
  <transition name="el-alert-fade">
    <div class="t-alert" :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]" v-show="visible" role="alert">
      <!-- <i class="el-alert__icon" :class="[iconClass, isBigIcon]" v-if="showIcon"></i> -->
      <div class="t-alert__icon">
        <el-icon :tdName="iconClass" />
      </div>
      <div class="t-alert__content">
        <div class="t-alert__title" :class="[isBoldTitle]" v-if="hasTitleAndContent">
          <slot name="title">{{ title }}</slot>
        </div>
        <div
          class="t-alert__message"
          v-if="!hasTitleAndContent || ($slots.default && !description) || (description && !$slots.default)"
        >
          <div class="t-alert__description" v-if="!hasTitleAndContent">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="t-alert__description" v-if="$slots.default && !description"><slot></slot></div>
          <div class="t-alert__description" v-if="description && !$slots.default">{{ description }}</div>
        </div>
      </div>
      <el-icon
        class="t-alert__close"
        style="align-self: center"
        tdName="close"
        v-show="closable"
        @click="close()"
      />
      <!-- <i
        class="t-alert__close"
        :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }"
        v-show="closable"
        @click="close()"
        >{{ closeText }}</i
      > -->
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  success: 'check-circle-filled',
  warning: 'error-circle-filled',
  error: 'error-circle-filled',
  info: 'info-circle-filled'
};
export default {
  name: 'ElAlert',

  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: value => {
        return ['light', 'dark'].indexOf(value) !== -1;
      }
    }
  },

  data() {
    return {
      visible: true
    };
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    }
  },

  computed: {
    typeClass() {
      return `t-alert--${this.type}`;
    },

    iconClass() {
      return TYPE_CLASSES_MAP[this.type || 'info'];
    },

    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : '';
    },

    isBoldTitle() {
      return this.description || this.$slots.default ? 'is-bold' : '';
    },

    hasTitle() {
      return !!(this.title || this.$slots.title);
    },

    hasContent() {
      return !!((this.$slots.default && !this.description) || (this.description && !this.$slots.default));
    },

    hasTitleAndContent() {
      return this.hasTitle && this.hasContent;
    }
  }
};
</script>
