<template>
  <table class="dashboard-holding-table">
    <thead class="dashboard-holding-table__thead">
      <tr class="dashboard-holding-table__row dashboard-holding-table__row--head">
        <th
          class="dashboard-holding-table__cell
            dashboard-holding-table__cell--head
            dashboard-holding-table__cell--coin"
          @click="sort('coin')"
        >
          <span>coin</span>
          <icon-angle-down
            class="dashboard-holding-table__head-img"
            :class="{
              'sort-image-active': status.coin.direction,
              'sort-active-arrow': status.coin.active
            }"
          />
        </th>
        <th
          class="dashboard-holding-table__cell dashboard-holding-table__cell--head"
          @click="sort('amount')"
        >
          <span>amount</span>
          <icon-angle-down
            class="dashboard-holding-table__head-img"
            :class="{
              'sort-image-active': status.amount.direction,
              'sort-active-arrow': status.amount.active
            }"
          />
        </th>
        <th
          class="dashboard-holding-table__cell dashboard-holding-table__cell--head"
          @click="sort('price')"
        >
          <span>price, usd</span>
          <icon-angle-down
            class="dashboard-holding-table__head-img"
            :class="{
              'sort-image-active': status.price.direction,
              'sort-active-arrow': status.price.active
            }"
          />
        </th>
        <th
          class="dashboard-holding-table__cell dashboard-holding-table__cell--head"
          @click="sort(sortBy)"
        >
          <span>{{ sortBy }}</span>
          <icon-angle-down
            class="dashboard-holding-table__head-img"
            :class="{
              'sort-image-active': status[sortBy].direction,
              'sort-active-arrow': status[sortBy].active
            }"
          />
        </th>
        <th
          class="dashboard-holding-table__cell dashboard-holding-table__cell--head"
          @click="sort('value')"
        >
          <span>value, usd</span>
          <icon-angle-down
            class="dashboard-holding-table__head-img"
            :class="{
              'sort-image-active': status.value.direction,
              'sort-active-arrow': status.value.active
            }"
          />
        </th>
        <th
          class="dashboard-holding-table__cell dashboard-holding-table__cell--head"
          @click="sort('percent')"
        >
          <span>%</span>
          <icon-angle-down
            class="dashboard-holding-table__head-img"
            :class="{
              'sort-image-active': status.percent.direction,
              'sort-active-arrow': status.percent.active
            }"
          />
        </th>
      </tr>
    </thead>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur03 fadeIn"
      leave-active-class="animated dur03 fadeOut"
      mode="out-in"
    >
      <tbody class="dashboard-holding-table__tbody" v-if="myApi.length">
        <tr
          class="dashboard-holding-table__row"
          v-for="(item, index) in holdings"
          :key="index">
          <td
            class="dashboard-holding-table__cell dashboard-holding-table__cell--coin"
          >{{ item.coin }}</td>
          <td class="dashboard-holding-table__cell">{{ item.amount }}</td>
          <td
            class="dashboard-holding-table__cell dashboard-holding-table__cell--price"
          >$ {{ item.price }}</td>
          <td
            class="dashboard-holding-table__cell dashboard-holding-table__cell--day"
          >{{ item[sortBy] }}%</td>
          <td class="dashboard-holding-table__cell">$ {{ item.value }}</td>
          <td class="dashboard-holding-table__cell">{{ item.percent }}%</td>
        </tr>
      </tbody>
      <div class="dashboard-holding-table__lock-wrapper" v-else>
        <p
          class="dashboard-holding-table__lock-text"
        >Please add your exchange API to unlock Holdings</p>
        <router-link
          to="/exchanges"
          class="dashboard-holding-table__lock-button">Add API Key
        </router-link>
      </div>
    </transition>
  </table>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DashboardHoldingTable',
  props: {
    sortBy: {
      type: String,
      default: 'day',
    },
  },
  components: {
    IconAngleDown,
  },
  data() {
    return {
      status: {
        coin: {
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
        day: {
          active: false,
          direction: false,
        },
        week: {
          active: false,
          direction: false,
        },
        month: {
          active: false,
          direction: false,
        },
        value: {
          active: false,
          direction: false,
        },
        percent: {
          active: false,
          direction: false,
        },
      },
    };
  },
  computed: {
    ...mapState({
      myApi: state => state.exchangesApi.myApi,
      holdings: state => state.dashboard.holdings,
    }),
  },
  methods: {
    ...mapActions('dashboard', ['sortHoldings']),
    sort(type) {
      this.cleanStatus(type);
      this.status[type].active = true;
      this.status[type].direction = !this.status[type].direction;
      this.sortHoldings(type);
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
.dashboard-holding-table {
  @extend %table;
  &__head-img {
    @extend %table-head-img;
  }
  &__thead {
    @extend %table-head;
    padding-right: 0;
    padding-bottom: 0;
    margin-bottom: 6px;
  }
  &__tbody {
    @extend %table-body;
  }
  &__row {
    display: grid;
    grid-template-columns: 2fr 2fr 3fr 2fr 3fr 2fr;
    justify-items: end;
    justify-content: space-between;
    grid-column-gap: 12px;
    padding: 0 6px 12px 0;
  }

  &__cell {
    @extend %table-cell;
    color: $darker-grey;
    &--head {
      @extend %table-cell-head;
    }
    &--coin {
      justify-self: start;
    }
    &--price {
      color: $text-hover-color;
    }
    &--day {
      color: $text-sell-color;
    }
  }
  &__lock-wrapper {
    @extend %lock-wrapper;
  }
  &__lock-text {
    @extend %lock-text;
  }
  &__lock-button {
    @extend %button;
    @extend %button-buy;
  }
}
</style>
