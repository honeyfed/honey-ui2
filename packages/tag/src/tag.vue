<script>
export default {
  name: 'ElTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      }
    }
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  render(h) {
    const { type, tagSize, hit, effect } = this;
    const classes = [
      't-tag',
      't-tag--ellipsis',
      `t-tag--${type || 'default'}`,
      `t-size-${tagSize || 'm'}`,
      `t-tag--${effect || 'dark'}`,
      hit && 'is-hit'
    ];
    const tagEl = (
      <span class={classes} style={{ backgroundColor: this.color }} on-click={this.handleClick}>
        <span class="t-tag--text">{this.$slots.default}</span>
        {this.closable && <el-icon tdName="close" class="t-tag__icon-close" on-click={this.handleClose} />}
      </span>
    );

    return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{tagEl}</transition>;
  }
};
</script>
