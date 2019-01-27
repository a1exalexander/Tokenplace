<template>
  <section class="trading-order-book" @click.self="hideDrop">
    <div
      class="trading-order-book__wrapper trading-order-book__wrapper--red"
      @click.self="hideDrop"
    >
      <div class="trading-order-book__head" @click.self="hideDrop">
        <h1 class="trading-order-book__title" @click="hideDrop">Order book</h1>
        <button class="trading-order-book__button" @click="decimalsVisible = !decimalsVisible">
          <p class="trading-order-book__button-text">{{ decimalSelected }}</p>
          <icon-angle-down class="trading-order-book__button-img"/>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated dur03 pullDownLight"
            leave-active-class="animated dur02 pullDownLight revers"
          >
            <div class="trading-order-book__drop-list" v-show="decimalsVisible">
              <p
                class="trading-order-book__drop-item"
                v-for="(item, index) in decimals"
                :key="index"
                @click="selectDecimal(item)"
              >{{ item }}</p>
            </div>
          </transition>
        </button>
      </div>
      <table class="trading-order-book__table trading-order-book__table--red" @click="hideDrop">
        <thead class="trading-order-book__table-thead">
          <tr class="trading-order-book__table-row trading-order-book__table-row--head">
            <th
              class="trading-order-book__table-cell
              trading-order-book__table-cell--head
              trading-order-book__table-cell--price"
            >Price</th>
            <th
              class="trading-order-book__table-cell
              trading-order-book__table-cell--head
              trading-order-book__table-cell--amount"
            >amount</th>
            <th
              class="trading-order-book__table-cell
              trading-order-book__table-cell--head
              trading-order-book__table-cell--total"
            >total</th>
          </tr>
        </thead>
        <tbody class="trading-order-book__table-body">
          <tr class="trading-order-book__table-row" v-for="(item, index) in orderBook" :key="index">
            <td
              class="trading-order-book__table-cell
              trading-order-book__table-cell--price
              trading-order-book__table-cell--red"
            >{{ item.price }}</td>
            <td
              class="trading-order-book__table-cell trading-order-book__table-cell--amount"
            >{{ item.amount }}</td>
            <td
              class="trading-order-book__table-cell trading-order-book__table-cell--total"
            >{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="trading-order-book__wrapper trading-order-book__wrapper--green" @click="hideDrop">
      <div class="trading-order-book__label">
        <h3 class="trading-order-book__label-number">4839.5</h3>
        <p class="trading-order-book__label-subnumber">-5526.97</p>
      </div>
      <table class="trading-order-book__table trading-order-book__table--green">
        <tbody class="trading-order-book__table-body">
          <tr class="trading-order-book__table-row" v-for="(item, index) in orderBook" :key="index">
            <td
              class="trading-order-book__table-cell
              trading-order-book__table-cell--price
              trading-order-book__table-cell--green"
            >{{ item.price }}</td>
            <td
              class="trading-order-book__table-cell trading-order-book__table-cell--amount"
            >{{ item.amount }}</td>
            <td
              class="trading-order-book__table-cell trading-order-book__table-cell--total"
            >{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue';
import { mapState } from 'vuex';

export default {
  name: 'TradingOrderBook',
  components: {
    IconAngleDown,
  },
  data() {
    return {
      decimals: [],
      decimalSelected: 'Decimals',
      decimalsVisible: false,
    };
  },
  methods: {
    // TODO: functions must be replaced by Http request
    pushDecimals() {
      // eslint-disable-next-line
      for (let i = 1; i < 9; i++) {
        this.decimals.push(`${i} decimals`);
      }
    },
    selectDecimal(name) {
      this.decimalSelected = name;
    },
    hideDrop() {
      this.decimalsVisible = false;
    },
  },
  computed: {
    ...mapState('trading', ['orderBook']),
  },
  beforeMount() {
    this.pushDecimals();
  },
};
</script>
<style lang="scss">
.trading-order-book {
  position: relative;
  @extend %box;
  padding: 24px;
  &__wrapper {
    flex: 1 0 50%;
    @include flex-col(flex-start);
    align-items: stretch;
    &--red {
      flex-basis: 52%;
    }
    &--green {
      flex-basis: 48%;
    }
  }
  &__head {
    display: flex;
    align-items: center;
    padding-right: 1rem;
    flex-wrap: nowrap;
  }
  &__title {
    margin-right: 12px;
    white-space: nowrap;
    font-size: $size-8;
  }
  &__button {
    background-color: $bg-color;
    border-radius: 2px;
    min-width: 100px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    transition: all ease-in-out 0.2s;
    position: relative;
    @include flex-row(space-between);
    &:active {
      background-color: $form-bg-color;
      .trading-order-book__button-text {
        color: $text-pressed-color;
      }
    }
  }
  &__drop-list {
    padding: 12px 0;
    @extend %drop-list;
    box-shadow: 0 3px 10px 0 rgba(20, 15, 28, 0.1);
    max-height: calc(42px * 4);
    border-radius: 2px;
    border: none;
    left: -1px;
    right: -1px;
  }
  &__drop-item {
    @extend %drop-item;
    height: auto;
    padding: 8px 16px;
  }
  &__button-text {
    font-family: $base-font;
    font-size: $size-2;
    color: $text-hover-color;
    font-weight: 600;
    text-transform: capitalize;
    margin-right: 6px;
    white-space: nowrap;
    transition: all ease-in-out 0.2s;
  }
  &__button-img {
    fill: $text-hover-color;
    width: 10px;
    height: 10px;
  }
  &__table {
    flex: 1 1 100%;
    max-width: 100%;
    border: none;
    overflow-y: auto;
    @include flex-col-def(stretch);
    align-items: stretch;
    padding: 10px 0 0;
    &--red {
      padding-bottom: 6px;
    }
    &--green {
      padding-bottom: 0;
    }
  }
  &__table-thead {
    max-width: 100%;
    @include flex-col(stretch);
    align-items: stretch;
    padding-right: 8px;
    padding-bottom: 12px;
  }
  &__table-body {
    padding-right: 4px;
    @include flex-col-def(stretch);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      width: 4px;
      border-radius: 10px;
      background: $scroll-color;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
  &__table-row {
    flex: 1 0 100%;
    @include flex-row(space-between);
    padding-bottom: 12px;
    &--head {
      padding-bottom: 12px;
    }
  }
  &__table-cell {
    font-family: $second-font;
    color: $dark-grey;
    font-size: $size-3;
    text-transform: uppercase;
    font-weight: 600;
    flex: 0 0 33%;
    padding-right: 0.5rem;
    &--head {
      font-family: $base-font;
      color: $middle-grey;
      font-size: $size-2;
      @include flex-row-def(baseline);
    }
    &--price {
      flex-basis: 35%;
    }
    &--total {
      flex-basis: 31%;
    }
    &--red {
      color: $text-sell-color;
    }
    &--green {
      color: $text-percent-color;
    }
  }
  &__label {
    padding: 10px;
    border-radius: 4px;
    background-color: $bg-color;
    @include flex-row(center);
    align-items: baseline;
  }
  &__label-number {
    margin-right: 6px;
  }
  &__label-subnumber {
    font-family: $second-font;
    font-size: $size-3;
    color: $light-grey;
    font-weight: 600;
    &::after {
      content: ' USD';
    }
  }
}
</style>
