<template>
  <main class="trading">
    <trading-graph class="trading__graph"/>
    <trading-order-book class="trading__order-book"/>
    <trading-time-box class="trading__time-table"/>
    <trading-tables class="trading__tables"/>
    <trading-form class="trading__form"/>
  </main>
</template>
<script>
import TradingGraph from '@/components/trading/TradingGraph.vue';
import TradingForm from '@/components/trading/TradingForm.vue';
import TradingOrderBook from '@/components/trading/TradingOrderBook.vue';
import TradingTables from '@/components/trading/TradingTables.vue';
import TradingTimeBox from '@/components/trading/TradingTimeBox.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Trading',
  components: {
    TradingGraph,
    TradingForm,
    TradingOrderBook,
    TradingTables,
    TradingTimeBox,
  },
  computed: {
    ...mapState('trading', {
      trading: state => state,
    }),
  },
  methods: {
    ...mapActions('trading', {
      getData: 'downloadAll',
    }),
  },
  beforeMount() {
    this.getData();
  },
};
</script>
<style lang="scss">
.trading {
  background-color: transparent;
  padding: 64px 1rem 1rem;
  display: grid;
  grid-template-columns: auto 304px 324px;
  grid-template-rows: (4, auto);
  grid-template-areas:
    "graph order table"
    "tables form form"
    ". . ."
    ". . .";
  grid-column-gap: 0.6rem;
  grid-row-gap: 18px;
  @media screen and (max-width: 1280px) {
    grid-template-areas:
      "graph graph order"
      "tables tables table"
      "form form form"
      ". . .";
  }
  &__graph {
    grid-area: graph;
    height: 55vh;
    min-height: 478px;
    margin-right: 0.6rem;
  }
  &__order-book {
    @include flex-col-def(stretch);
    grid-area: order;
    height: 55vh;
    min-height: 478px;
  }
  &__tables {
    height: 35vh;
    min-height: 394px;
    grid-area: tables;
    margin-right: 0.6rem;
    @media screen and (max-width: 1280px) {
      height: 55vh;
      min-height: 478px;
    }
  }

  &__form {
    height: 35vh;
    min-height: 394px;
    grid-area: form;
    @media screen and (max-width: 1280px) {
      width: 624px;
      justify-self: center;
    }
  }
  &__time-table {
    height: 55vh;
    min-height: 478px;
    grid-area: table;
  }
}
</style>
