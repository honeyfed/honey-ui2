<template>
  <table @click="handleYearTableClick" class="el-year-table">
    <tbody>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 0)">
          <div>
            <div class="t-date-picker__cell-wrapper">
              <span class="t-date-picker__cell-text">{{ startYear }}</span>
            </div>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 1)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 1 }}</span>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 2)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 2 }}</span>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 3)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 3 }}</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 4)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 4 }}</span>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 5)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 5 }}</span>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 6)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 6 }}</span>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 7)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 7 }}</span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 8)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 8 }}</span>
          </div>
        </td>
        <td class="available" :class="getCellStyle(startYear + 9)">
          <div class="t-date-picker__cell-wrapper">
            <span class="t-date-picker__cell-text">{{ startYear + 9 }}</span>
          </div>
        </td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
import { hasClass } from 'element-ui/src/utils/dom';
import { isDate, range, nextDate, getDayCountOfYear } from 'element-ui/src/utils/date-util';
import { arrayFindIndex, coerceTruthyValueToArray } from 'element-ui/src/utils/util';

const datesInYear = year => {
  const numOfDays = getDayCountOfYear(year);
  const firstDay = new Date(year, 0, 1);
  return range(numOfDays).map(n => nextDate(firstDay, n));
};

export default {
  props: {
    disabledDate: {},
    value: {},
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return val === null || (val instanceof Date && isDate(val));
      }
    },
    date: {}
  },

  computed: {
    startYear() {
      return Math.floor(this.date.getFullYear() / 10) * 10;
    }
  },

  methods: {
    getCellStyle(year) {
      const style = {};
      const today = new Date();

      style['t-is-disabled'] =
        typeof this.disabledDate === 'function' ? datesInYear(year).every(this.disabledDate) : false;
      style['t-date-picker__cell--active'] =
        arrayFindIndex(coerceTruthyValueToArray(this.value), date => date.getFullYear() === year) >= 0;
      style['t-date-picker__cell--now'] = today.getFullYear() === year;
      style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

      return style;
    },

    handleYearTableClick(event) {
      const target = event.target;
      if (target.tagName === 'SPAN') {
        if (hasClass(target.parentNode, 'disabled')) return;
        const year = target.textContent || target.innerText;
        this.$emit('pick', Number(year));
      }
    }
  }
};
</script>
