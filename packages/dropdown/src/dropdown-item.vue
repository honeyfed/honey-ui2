<template>
  <div>
    <div class="t-divider t-divider--horizontal" v-if="divided"></div>
    <div
      class="t-dropdown__item"
      :class="{
        'is-disabled': disabled
      }"
      @click="handleClick"
      :aria-disabled="disabled"
      :tabindex="disabled ? null : -1"
    >
      <div class="t-dropdown__item-content">
        <span class="t-dropdown__item-text">
          <i :class="icon" v-if="icon"></i>
          <slot></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElDropdownItem',

  mixins: [Emitter],

  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },

  methods: {
    handleClick(e) {
      this.dispatch('ElDropdown', 'menu-item-click', [this.command, this]);
    }
  }
};
</script>
