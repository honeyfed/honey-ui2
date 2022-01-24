<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        't-message',
        type && !iconClass ? `t-is-${type}` : '',
        center ? 'is-center' : '',
        showClose ? 't-is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <!-- <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i> -->
      <el-icon :tdName="iconClass" v-if="iconClass" />
      <el-icon :tdName="typeClass" v-else />
      <slot>
        <span v-if="!dangerouslyUseHTMLString">{{ message }}</span>
        <span v-else v-html="message"></span>
      </slot>
      <span class="t-message__close">
        <el-icon tdName="close" v-if="showClose" @click="close" />
      </span>
      <!-- <i v-if="showClose" class="t-message__close" @click="close"></i> -->
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'check-circle-filled',
  info: 'info-circle-filled',
  warning: 'error-circle-filled',
  error: 'error-circle-filled',
  question: 'help-circle-filled'
};

export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    };
  },

  computed: {
    typeClass() {
      return this.type && !this.iconClass ? `${typeMap[this.type]}` : '';
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`
      };
    }
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },

  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
};
</script>
