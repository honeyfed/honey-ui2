<template>
  <ul @click="onPagerClick" class="t-pagination__pager">
    <li :class="{ 't-is-current': currentPage === 1, disabled }" v-if="pageCount > 0" class="t-pagination__number">
      1
    </li>
    <li
      class="t-pagination__number t-pagination__number--more quickprev"
      :class="[{ 't-is-disabled': disabled }]"
      v-if="showPrevMore"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'ellipsis'"
    >
      <el-icon :tdName="quickprevIconClass" />
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ 't-is-current': currentPage === pager, disabled }"
      class="t-pagination__number"
    >
      {{ pager }}
    </li>
    <li
      class="t-pagination__number t-pagination__number--more quicknext"
      :class="[{ 't-is-disabled': disabled }]"
      v-if="showNextMore"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'ellipsis'"
    >
      <el-icon :tdName="quicknextIconClass" />
    </li>
    <li
      :class="{ 't-is-current': currentPage === pageCount, disabled }"
      class="t-pagination__number"
      v-if="pageCount > 1"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script type="text/babel">
export default {
  name: 'ElPager',

  props: {
    currentPage: Number,

    pageCount: Number,

    pagerCount: Number,

    disabled: Boolean
  },

  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = 'ellipsis';
    },

    showNextMore(val) {
      if (!val) this.quicknextIconClass = 'ellipsis';
    }
  },

  methods: {
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName === 'UL' || this.disabled) {
        return;
      }

      let newPage = Number(event.target.textContent);
      const pageCount = this.pageCount;
      const currentPage = this.currentPage;
      const pagerCountOffset = this.pagerCount - 2;

      const className = (event.path.filter(node => node.tagName === 'LI')[0] || {}).className;
      if (className.indexOf('more') !== -1) {
        if (className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset;
        } else if (className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset;
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage);
      }
    },

    onMouseenter(direction) {
      if (this.disabled) return;
      if (direction === 'left') {
        this.quickprevIconClass = 'chevron-left-double';
      } else {
        this.quicknextIconClass = 'chevron-right-double';
      }
    }
  },

  computed: {
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);

      let showPrevMore = false;
      let showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }

      const array = [];

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;

      return array;
    }
  },

  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'ellipsis',
      quickprevIconClass: 'ellipsis'
    };
  }
};
</script>
