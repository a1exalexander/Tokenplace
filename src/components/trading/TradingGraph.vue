<template>
  <section class="trading-graph">
    <div class="trading-graph-nav trading-graph-nav--padding">
      <div class="trading-graph-nav__inner">
        <button class="trading-graph-drop" @click="dropListGraphsShow = !dropListGraphsShow">
          <img
            class="trading-graph-drop__img"
            :src="dropListGraphs.ico"
            :alt="dropListGraphs.name"
            v-if="getApiNamesIcons.length && dropListGraphs.ico"
          >
          <p
            class="trading-graph-drop__text"
          >{{ getApiNamesIcons.length && dropListGraphs.name
              ? dropListGraphs.name: "All Exhanges" }}
          </p>
          <icon-angle-down
            class="trading-graph-drop__angle-img"
            :class="{'sort-image-active': dropListGraphsShow}"
          />
          <transition
            name="custom-classes-transition"
            enter-active-class="animated dur03 pullDownLight"
            leave-active-class="animated dur02 pullDownLight revers"
          >
            <div class="trading-graph-drop__list" v-show="dropListGraphsShow">
              <div
                class="trading-graph-drop__item"
                v-for="(item, index) in getApiNamesIcons"
                :key="index"
                @click="selectGraph(item)"
              >
                <img
                  class="trading-graph-drop__img trading-graph-drop__img--item"
                  :src="item.ico"
                  alt="image"
                >
                <p class="trading-graph-drop__item-text">{{ item.name }}</p>
              </div>
            </div>
          </transition>
        </button>
        <div class="trading-graph-nav__label">
          <p class="trading-graph-nav__text trading-graph-nav__text--bitcoin">BCH/BTC</p>
        </div>
        <div class="trading-graph-nav__col trading-graph-nav__col--margin">
          <p class="trading-graph-nav__caption trading-graph-nav__caption--margin">LAST PRICE</p>
          <div class="trading-graph-nav__row trading-graph-nav__row--numbers">
            <p class="trading-graph-nav__text trading-graph-nav__text--dark">3783</p>
            <p class="trading-graph-nav__text trading-graph-nav__text--float">.347633</p>
            <p class="trading-graph-nav__text trading-graph-nav__text--percent">+4.56%</p>
            <icon-arrow-up class="trading-graph-nav__arrow-up"/>
          </div>
        </div>
      </div>
      <div class="trading-graph__nav-inner">
        <div class="trading-graph__toggle-box">
          <button
            class="trading-graph__toggle-button"
            :class="{'toggle-button-active': timeFilter.day}"
            @click="chooseFilter('day')"
          >1D</button>
          <button
            class="trading-graph__toggle-button"
            :class="{'toggle-button-active': timeFilter.week}"
            @click="chooseFilter('week')"
          >1w</button>
          <button
            class="trading-graph__toggle-button"
            :class="{'toggle-button-active': timeFilter.month}"
            @click="chooseFilter('month')"
          >1m</button>
          <button
            class="trading-graph__toggle-button"
            :class="{'toggle-button-active': timeFilter.threeMonths}"
            @click="chooseFilter('threeMonths')"
          >3m</button>
        </div>
      </div>
    </div>
    <div class="trading-graph__inner">
      <div class="trading-graph__frame"></div>
      <div class="trading-graph__variables">
        <div class="trading-graph__variables-cell">
          <p class="trading-graph__text">3800</p>
        </div>
        <div class="trading-graph__variables-cell">
          <p class="trading-graph__text">3650</p>
        </div>
        <div class="trading-graph__variables-cell">
          <p class="trading-graph__text">3500</p>
        </div>
        <div class="trading-graph__variables-cell">
          <p class="trading-graph__text">3350</p>
        </div>
        <div class="trading-graph__variables-cell">
          <p class="trading-graph__text">3200</p>
        </div>
        <div class="trading-graph__variables-cell">
          <p class="trading-graph__text">3150</p>
        </div>
      </div>
    </div>
    <div class="trading-graph__timeline">
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">8:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">9:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">10:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">11:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">12:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">13:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">14:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">15:00</p>
      </div>
      <div class="trading-graph__timeline-cell">
        <p class="trading-graph__text">16:00</p>
      </div>
    </div>
  </section>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
  name: 'TradingGraph',
  components: {
    IconAngleDown,
    IconArrowUp,
  },
  data() {
    return {
      timeFilter: {
        day: true,
        week: false,
        month: false,
        threeMonths: false,
      },
      dropListGraphs: {
        name: '',
        ico: '',
      },
      dropListGraphsShow: false,
    };
  },
  methods: {
    ...mapMutations('trading', ['setGraph']),
    chooseFilter(type) {
      const filters = this.timeFilter;
      Object.keys(filters).forEach((key) => {
        filters[key] = (key === type);
      });
    },
    selectGraph(item) {
      this.dropListGraphs.name = item.name;
      this.dropListGraphs.ico = item.ico;
      this.setGraph(item.name);
    },
  },
  computed: {
    ...mapState('trading', ['mainGraph']),
    ...mapGetters({
      getApiNamesIcons: 'exchangesApi/getApiNamesIcons',
    }),
  },
};
</script>
<style lang="scss">
.trading-graph {
  @include flex-col(stretch);
  align-items: stretch;
  @extend %box;
  padding: 12px;
  box-shadow: 0 6px 8px 0 rgba(20, 15, 28, 0.1);
  &__inner {
    flex: 1 1 100%;
    @include flex-row(stretch);
    align-items: stretch;
  }
  &__text {
    color: $middle-grey;
    font-family: $second-font;
    font-size: $size-1;
    font-weight: 500;
    text-transform: uppercase;
  }
  &__frame {
    flex-basis: 100%;
    min-height: 200px;
    background-image: url('~@/assets/images/graph.jpg');
    @extend %bg-image;
    border-radius: 4px;
    border: 1px solid $form-bg-color;
  }
  &__timeline {
    flex: 1 0 32px;
    padding: 12px 60px 0 0;
    @include flex-row(stretch);
  }
  &__timeline-cell {
    flex: 1 1 11.1%;
    @include flex-row(flex-end);
  }
  &__variables {
    padding: 0 0 1.1rem 12px;
    flex: 0 0 58px;
    @include flex-col(stretch);
    align-items: stretch;
  }
  &__variables-cell {
    flex: 1 1 16.6%;
    @include flex-col(flex-end);
    &:nth-child(1) {
      flex: 1 1 12%;
    }
  }
  &__toggle-box {
    @extend %toggle-box;
  }
  &__toggle-button {
    @extend %toggle-button;
  }
}
.trading-graph-nav {
  @include flex-row(space-between);
  align-items: center;
  padding-bottom: 12px;
  &__inner {
    @include flex-row(flex-start);
  }
  &__col {
    @include flex-col(space-between);
    flex-shrink: 0;
    align-items: flex-start;
    &--margin {
      padding-right: 2rem;
      @media screen and (max-width: 1320px) {
        padding-right: 0.5rem;
      }
    }
  }
  &__row {
    @include flex-row(flex-start);
    &--numbers {
      flex-wrap: nowrap;
    }
  }
  &__label {
    @include flex-row(baseline);
    padding: 0 24px;
    @media screen and (max-width: 1320px) {
      padding: 0 0.6rem;
    }
  }
  &__text {
    text-transform: uppercase;
    font-size: $size-1;
    font-family: $second-font;
    font-weight: 500;
    color: $light-grey;
    &--bitcoin {
      font-weight: 600;
      font-size: $size-4;
      text-transform: uppercase;
      font-family: $base-font;
      color: $dark-grey;
    }
    &--dark {
      color: $dark-grey;
      font-size: $size-3;
      font-weight: 600;
    }
    &--float {
      margin-right: 6px;
      font-size: $size-3;
      font-weight: 600;
    }
    &--percent {
      font-size: $size-3;
      color: $text-percent-color;
      font-weight: 600;
      margin-right: 4px;
    }
  }
  &__arrow-up {
    width: 12px;
    height: 12px;
    fill: $btn-color-buy;
  }
  &__caption {
    text-transform: uppercase;
    font-size: $size-1;
    font-family: $second-font;
    font-weight: 500;
    color: $middle-grey;
    &--margin {
      margin-bottom: 5px;
    }
  }
  &--padding {
    padding-right: 58px;
  }
}
.trading-graph-drop {
  flex: 1 0 130px;
  @include flex-row-def(center);
  padding: 6px 24px 6px 12px;
  border-radius: 2px;
  background-color: $bg-color;
  position: relative;
  min-height: 36px;
  transition: all ease-in-out 0.2s;
  &:active {
    background-color: $form-bg-color;
    .trading-graph-drop__text {
      color: $text-pressed-color;
    }
    .trading-graph-drop__angle-img {
      fill: $text-pressed-color;
    }
  }
  &__angle-img {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    fill: $dark-grey;
    position: absolute;
    right: 12px;
    transition: all ease-in-out 0.2s;
  }
  &__img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  &__text {
    font-family: $base-font;
    color: $text-active-color;
    font-weight: 600;
    font-size: $size-2;
    text-transform: capitalize;
    transition: all ease-in-out 0.2s;
  }
  &__list {
    padding: 0;
    @extend %drop-list;
    box-shadow: 0 3px 10px 0 rgba(20, 15, 28, 0.1);
    border-radius: 2px;
    border: none;
    max-height: max-content;
  }
  &__item {
    @extend %drop-item;
    text-align: left;
    padding: 8px 12px;
    height: 36px;
  }
  &__item-text {
    color: $text-active-color;
    letter-spacing: 0.28px;
  }
}
</style>
