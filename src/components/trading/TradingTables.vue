<template>
  <section class="trading-tables">
    <div class="trading-tables__nav">
      <div class="trading-tables__toggle-box">
        <button
          class="trading-tables__toggle-button"
          :class="{'toggle-button-active': mainTables.openOrders}"
          @click="chooseMainTable('openOrders')"
        >Open orders</button>
        <button
          class="trading-tables__toggle-button"
          :class="{'toggle-button-active': mainTables.balance}"
          @click="chooseMainTable('balance')"
        >Balance</button>
        <button
          class="trading-tables__toggle-button"
          :class="{'toggle-button-active': mainTables.positions}"
          @click="chooseMainTable('positions')"
        >Positions</button>
        <button
          class="trading-tables__toggle-button"
          :class="{'toggle-button-active': mainTables.tradingHistory}"
          @click="chooseMainTable('tradingHistory')"
        >Trade history</button>
        <button
          class="trading-tables__toggle-button"
          :class="{'toggle-button-active': mainTables.pricingAlerts}"
          @click="chooseMainTable('pricingAlerts')"
        >Pricing alerts</button>
      </div>
      <label class="trading-tables__search">
        <icon-search class="trading-tables__search-img"/>
        <input
          type="text"
          class="trading-tables__search-input"
          placeholder="Search..."
          v-model="searchChars"
        >
      </label>
    </div>
    <div class="trading-tables__field">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur03 fadeIn"
        leave-active-class="animated dur03 fadeOut"
        mode="out-in"
      >
        <trading-open-orders-table
          :search-chars="searchChars"
          class="trading-tables__table"
          v-if="mainTables.openOrders"
        />
        <trading-balance-table class="trading-tables__table" v-else-if="mainTables.balance"/>
        <trading-positions-table
          :search-chars="searchChars"
          class="trading-tables__table"
          v-else-if="mainTables.positions"
        />
        <trading-history-table
          :search-chars="searchChars"
          class="trading-tables__table"
          v-else-if="mainTables.tradingHistory"
        />
        <trading-pricing-alerts-table class="trading-tables__table" v-else/>
      </transition>
    </div>
  </section>
</template>
<script>
import TradingPositionsTable from '@/components/trading/tables/TradingPositionsTable.vue';
import TradingOpenOrdersTable from '@/components/trading/tables/TradingOpenOrdersTable.vue';
import TradingBalanceTable from '@/components/trading/tables/TradingBalanceTable.vue';
import TradingHistoryTable from '@/components/trading/tables/TradingHistoryTable.vue';
import TradingPricingAlertsTable from '@/components/trading/tables/TradingPricingAlertsTable.vue';
import IconSearch from '@/components/icons/IconSearch.vue';

export default {
  name: 'TradingTables',
  components: {
    TradingPositionsTable,
    TradingOpenOrdersTable,
    TradingBalanceTable,
    TradingHistoryTable,
    TradingPricingAlertsTable,
    IconSearch,
  },
  data() {
    return {
      mainTables: {
        openOrders: true,
        balance: false,
        positions: false,
        tradingHistory: false,
        pricingAlerts: false,
      },
      searchChars: '',
    };
  },
  methods: {
    chooseMainTable(table) {
      const tables = this.mainTables;
      Object.keys(tables).forEach((key) => {
        tables[key] = (key === table);
      });
    },
  },
};
</script>
<style lang="scss">
.trading-tables {
  @extend %box;
  @include flex-col-def(stretch);
  padding: 24px;
  &__nav {
    @include flex-row(space-between);
    padding-bottom: 20px;
  }
  &__toggle-box {
    margin-right: 1rem;
    flex: 0 1 600px;
    @extend %toggle-box;
  }
  &__toggle-button {
    @extend %toggle-button;
  }
  &__field {
    flex: 0 1 90%;
    padding: 0 1rem 0 0;
    @include flex-col-def(stretch);
  }
  &__search {
    flex: 0 1 300px;
    min-width: 120px;
    @extend %search;
  }
  &__search-img {
    @extend %search-img;
  }
  &__search-input {
    @extend %search-input;
  }
}
</style>
