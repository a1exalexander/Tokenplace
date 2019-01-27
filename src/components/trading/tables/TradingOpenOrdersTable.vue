<template>
  <table class="trading-open-order-table">
    <thead class="trading-open-order-table__thead">
      <tr class="trading-open-order-table__row">
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--pair"
          @click="sort('pair')"
        >pair
          <icon-arrow-up
            class="trading-open-order-table__head-img"
            :class="{
              'sort-image-active': status.pair.direction,
              'sort-active-arrow': status.pair.active
            }"
          />
        </th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--type"
          @click="sort('type')"
        >type
          <icon-arrow-up
            class="trading-open-order-table__head-img"
            :class="{
              'sort-image-active': status.type.direction,
              'sort-active-arrow': status.type.active
            }"
          />
        </th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--exchange"
          @click="sort('exchange')"
        >exchange
          <icon-arrow-up
            class="trading-open-order-table__head-img"
            :class="{
              'sort-image-active': status.exchange.direction,
              'sort-active-arrow': status.exchange.active
            }"
          />
        </th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--amount"
          @click="sort('amount')"
        >amount
          <icon-arrow-up
            class="trading-open-order-table__head-img"
            :class="{
              'sort-image-active': status.amount.direction,
              'sort-active-arrow': status.amount.active
            }"
          />
        </th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--price"
          @click="sort('price')"
        >price
          <icon-arrow-up
            class="trading-open-order-table__head-img"
            :class="{
              'sort-image-active': status.price.direction,
              'sort-active-arrow': status.price.active
            }"
          />
        </th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--date"
          @click="sortDates('date')"
        >date
          <icon-arrow-up
            class="trading-open-order-table__head-img"
            :class="{
              'sort-image-active': status.date.direction,
              'sort-active-arrow': status.date.active}"
          />
        </th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--edit"
        ></th>
        <th
          class="trading-open-order-table__cell
            trading-open-order-table__cell--head
            trading-open-order-table__cell--decline"
        ></th>
      </tr>
    </thead>
    <tbody class="trading-open-order-table__tbody">
      <tr class="trading-open-order-table__row" v-for="(item, index) in getOpenOrders" :key="index">
        <td
          class="trading-open-order-table__cell trading-open-order-table__cell--pair"
        >{{ item.pair }}</td>
        <td
          class="trading-open-order-table__cell trading-open-order-table__cell--type"
        >{{ item.type }}</td>
        <td
          class="trading-open-order-table__cell trading-open-order-table__cell--exchange"
        >{{ item.exchange }}</td>
        <td
          class="trading-open-order-table__cell trading-open-order-table__cell--amount"
        >{{ item.amount }}</td>
        <td
          class="trading-open-order-table__cell trading-open-order-table__cell--price"
        >{{ item.price }}</td>
        <td
          class="trading-open-order-table__cell trading-open-order-table__cell--date"
        >{{ item.date }}</td>
        <td class="trading-open-order-table__cell trading-open-order-table__cell--edit">
          <button class="trading-open-order-table__button">Edit</button>
        </td>
        <td class="trading-open-order-table__cell trading-open-order-table__cell--decline">
          <button
            class="trading-open-order-table__button"
            @click="deleteOrderItem(index)">Decline
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import IconArrowUp from '@/components/icons/IconArrowUp.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TradingOpenOrderTable',
  props: {
    searchChars: {
      type: [String, Number],
      default: '',
    },
  },
  components: {
    IconArrowUp,
  },
  data() {
    return {
      status: {
        pair: {
          active: false,
          direction: false,
        },
        type: {
          active: false,
          direction: false,
        },
        exchange: {
          active: false,
          direction: false,
        },
        amount: {
          active: false,
          direction: false,
        },
        price: {
          active: false,
          direction: false,
        },
        date: {
          active: false,
          direction: false,
        },
      },
    };
  },
  computed: {
    ...mapState('trading', ['openOrders']),
    getOpenOrders() {
      const chars = this.searchChars;
      if (chars && this.validChars(chars)) {
        const re = new RegExp(chars, 'gi');
        return this.openOrders.filter(el => el.pair.match(re));
      }
      return this.openOrders;
    },
  },
  methods: {
    ...mapActions('trading', ['sortOpenOrders', 'sortOpenOrdersDates', 'deleteOrderItem']),
    validChars(chars) {
      // eslint-disable-next-line
      let re = /^(\w|\d)+$/;
      return re.test(chars);
    },
    sort(type) {
      this.cleanStatus(type);
      this.status[type].active = true;
      this.status[type].direction = !this.status[type].direction;
      this.sortOpenOrders(type);
    },
    sortDates(type) {
      this.cleanStatus(type);
      this.status[type].active = true;
      this.status[type].direction = !this.status[type].direction;
      this.sortOpenOrdersDates(type);
    },
    cleanStatus(type) {
      const object = this.status;
      Object.keys(object).forEach((item) => {
        if (item !== type) {
          Object.keys(object[item]).forEach((subitem) => {
            object[item][subitem] = false;
          });
        }
      });
    },
  },
};
</script>
<style lang="scss">
.trading-open-order-table {
  @extend %table;
  &__head-img {
    @extend %table-head-img;
  }
  &__thead {
    @extend %table-head;
    flex: 1 0 20px;
  }
  &__tbody {
    @extend %table-body;
  }
  &__row {
    @extend %table-row;
  }

  &__cell {
    @extend %table-cell;
    flex: 1 0 8%;
    margin-right: 0.5rem;
    &--head {
      @extend %table-cell-head;
    }
    &--pair {
      min-width: 62px;
      flex-basis: 5%;
    }
    &--type {
      min-width: 50px;
      flex-basis: 5%;
      justify-content: flex-end;
      text-align: right;
      margin-right: 3rem;
    }
    &--exchange {
      min-width: 80px;
      flex-basis: 6%;
    }
    &--amount {
      justify-content: flex-end;
      text-align: right;
    }
    &--price {
      justify-content: flex-end;
      text-align: right;
      margin: 0;
      margin-right: 3rem;
    }
    &--date {
      margin-right: 0;
    }
    &--edit {
      text-align: right;
      margin-right: 2rem;
    }
  }
  &__button {
    white-space: nowrap;
    @extend %link;
    &:active {
      color: $text-pressed-color;
    }
  }
}
</style>
