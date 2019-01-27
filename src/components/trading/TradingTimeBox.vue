<template>
  <section class="trading-time-box">
    <div class="trading-time-box__toggle-box">
      <button
        class="trading-time-box__toggle-button"
        :class="{'toggle-button-active': timeTables.pairs}"
        @click="chooseTimeTable('pairs')"
      >Pairs</button>
      <button
        class="trading-time-box__toggle-button"
        :class="{'toggle-button-active': timeTables.favorites}"
        @click="chooseTimeTable('favorites')"
      >Favorites</button>
      <button
        class="trading-time-box__toggle-button"
        :class="{'toggle-button-active': timeTables.recent}"
        @click="chooseTimeTable('recent')"
      >Recent Trades</button>
    </div>
    <div class="trading-time-box__field">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur03 fadeIn"
        leave-active-class="animated dur03 fadeOut"
        mode="out-in"
      >
        <trading-pairs-table :search-chars="searchChars" v-if="timeTables.pairs" key="pairs"/>
        <trading-favorites-table
          :search-chars="searchChars"
          v-else-if="timeTables.favorites"
          key="favorites"
        />
        <trading-recent-trades-table v-else key="recent"/>
      </transition>
    </div>
  </section>
</template>
<script>
import TradingRecentTradesTable from '@/components/trading/tables/TradingRecentTradesTable.vue';
import TradingPairsTable from '@/components/trading/tables/TradingPairsTable.vue';
import TradingFavoritesTable from '@/components/trading/tables/TradingFavoritesTable.vue';

export default {
  name: 'TradingTimeBox',
  components: {
    TradingRecentTradesTable,
    TradingPairsTable,
    TradingFavoritesTable,
  },
  data() {
    return {
      timeTables: {
        pairs: true,
        favorites: false,
        recent: false,
      },
      searchChars: '',
    };
  },
  methods: {
    chooseTimeTable(table) {
      this.searchChars = '';
      const tables = this.timeTables;
      Object.keys(tables).forEach((key) => {
        tables[key] = (key === table);
      });
    },
  },
};
</script>
<style lang="scss">
.trading-time-box {
  @extend %box;
  padding: 24px 9px 24px 24px;
  @include flex-col-def(stretch);
  &__toggle-box {
    @extend %toggle-box;
    margin-bottom: 12px;
  }
  &__toggle-button {
    @extend %toggle-button;
  }
  &__field {
    flex: 0 1 90%;
    padding: 0;
    @include flex-col-def(stretch);
  }
}
</style>
