<template>
  <div class="trading-form-order">
    <div class="trading-form-order__toggle-box">
      <button
        class="trading-form-order__toggle-button"
        :class="{'toggle-button-active': tradingForms.limit}"
        @click="chooseForm('limit')"
      >Limit orders</button>
      <button
        class="trading-form-order__toggle-button"
        :class="{'toggle-button-active': tradingForms.market}"
        @click="chooseForm('market')"
      >Market order</button>
      <button
        class="trading-form-order__toggle-button"
        :class="{'toggle-button-active': tradingForms.profit}"
        @click="chooseForm('profit')"
      >Stop-loss / Take profit</button>
      <button
        class="trading-form-order__toggle-button"
        :class="{'toggle-button-active': tradingForms.shadow}"
        @click="chooseForm('shadow')"
      >Shadow order</button>
    </div>
    <div class="trading-form-order__inner">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur03 fadeIn"
        leave-active-class="animated dur03 fadeOut"
        mode="out-in"
      >
        <trading-limit-form v-if="tradingForms.limit"/>
        <trading-market-form v-else-if="tradingForms.market"/>
        <trading-profit-form v-else-if="tradingForms.profit"/>
        <trading-shadow-form v-else/>
      </transition>
    </div>
  </div>
</template>
<script>
import TradingLimitForm from '@/components/trading/forms/TradingLimitForm.vue';
import TradingMarketForm from '@/components/trading/forms/TradingMarketForm.vue';
import TradingProfitForm from '@/components/trading/forms/TradingProfitForm.vue';
import TradingShadowForm from '@/components/trading/forms/TradingShadowForm.vue';

export default {
  name: 'TradingForm',
  components: {
    TradingLimitForm,
    TradingMarketForm,
    TradingProfitForm,
    TradingShadowForm,
  },
  data() {
    return {
      tradingForms: {
        limit: true,
        market: false,
        profit: false,
        shadow: false,
      },
    };
  },
  methods: {
    chooseForm(form) {
      const forms = this.tradingForms;
      Object.keys(forms).forEach((key) => {
        forms[key] = (key === form);
      });
    },
  },
};
</script>
<style lang="scss">
.trading-form-order {
  @extend %box;
  @include flex-col(flex-start);
  align-items: stretch;
  &__toggle-box {
    margin-bottom: 12px;
    @extend %toggle-box;
  }
  &__toggle-button {
    @extend %toggle-button;
  }
  &__inner {
    flex: 1 1 100%;
  }
  &__card {
    height: 100%;
    padding: 24px;
    flex: 0 0 49%;
    background-color: $form-bg-color;
    border-radius: 4px;
    @include flex-col(space-between);
    align-items: stretch;
    &--buy {
      margin-right: 2%;
    }
  }
  &__heading {
    font-family: $second-font;
    font-size: $size-3;
    color: $light-grey;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  &__heading-value {
    padding-left: 4px;
    color: $darker-grey;
    text-transform: uppercase;
    &::after {
      content: ' usd';
    }
    &--btc {
      &:after {
        content: ' btc';
      }
    }
  }
  &__label {
    @include flex-row(space-between);
    margin-bottom: 7px;
    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
  &__input-name {
    color: $semidark-grey;
    font-size: $size-4;
    text-transform: capitalize;
  }
  &__input {
    font-family: $second-font;
    width: 160px;
    height: 2.25rem;
    @include flex-row(flex-start);
    padding: 0 1rem;
    border: 1px solid $lightest-grey;
    color: $dark-grey;
    font-weight: 600;
    border-radius: 3px;
    &::placeholder {
      color: $light-grey;
      text-transform: uppercase;
    }
  }
  &__feature {
    align-self: flex-end;
    width: 160px;
    font-family: $second-font;
    color: $middle-grey;
    text-transform: capitalize;
    margin-bottom: 14px;
  }
  &__button {
    @extend %button;
    @extend %button-buy;
    &--sell {
      @extend %button;
      @extend %button-sell;
    }
  }
}
</style>
