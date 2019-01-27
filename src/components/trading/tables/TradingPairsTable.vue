<template>
<section class="trading-pairs-table__wrapper">
	<label class="trading-pairs-table__search">
		<icon-search class="trading-pairs-table__search-img"/>
		<input type="text"
			class="trading-pairs-table__search-input" placeholder="Search..."
			v-model='searchChars'>
	</label>
	<table class="trading-pairs-table">
		<thead class="trading-pairs-table__thead">
			<tr class="trading-pairs-table__row">
				<th
					class="trading-pairs-table__cell trading-pairs-table__cell--pair trading-pairs-table__cell--head"
					@click="sort('pair')">Pair
					<icon-arrow-up
						class='trading-pairs-table__head-img'
						:class='{"sort-image-active": status.pair.direction, "sort-active-arrow": status.pair.active}'/>
				</th>
				<th
					class="trading-pairs-table__cell trading-pairs-table__cell--price trading-pairs-table__cell--head"
					@click="sort('price')">price
					<icon-arrow-up
						class='trading-pairs-table__head-img'
						:class='{"sort-image-active": status.price.direction, "sort-active-arrow": status.price.active}'/>
				</th>
				<th
					class="trading-pairs-table__cell trading-pairs-table__cell--hours trading-pairs-table__cell--head"
					@click="sort('hours')">24h
					<icon-arrow-up
						class='trading-pairs-table__head-img'
						:class='{"sort-image-active": status.hours.direction, "sort-active-arrow": status.hours.active}'/>
				</th>
			</tr>
		</thead>
		<tbody class="trading-pairs-table__tbody">
			<tr class="trading-pairs-table__row" v-for='item in getPairs' :key='item.id'>
				<td class="trading-pairs-table__cell trading-pairs-table__cell--pair trading-pairs-table__cell--star" @click="toggleFavorite(item.id)">
					<icon-star class="trading-pairs-table__star" :class="{'trading-pairs-table__star--active': item.star}"/>
					{{ item.pair }}
				</td>
				<td class="trading-pairs-table__cell trading-pairs-table__cell--price">{{ item.price }}</td>
				<td class="trading-pairs-table__cell trading-pairs-table__cell--hours">{{ item.hours }}%</td>
			</tr>
		</tbody>
	</table>
</section>
</template>
<script>
import IconArrowUp from '@/components/icons/IconArrowUp.vue';
import IconStar from '@/components/icons/IconStar.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TradingPairsTable',
  components: {
    IconArrowUp,
    IconStar,
    IconSearch,
  },
  data() {
    return {
      status: {
        pair: {
          active: false,
          direction: false,
        },
        price: {
          active: false,
          direction: false,
        },
        hours: {
          active: false,
          direction: false,
        },
      },
      searchChars: '',
    };
  },
  computed: {
    ...mapState('trading', [
      'pairs',
    ]),
    getPairs() {
      const chars = this.searchChars;
      if (chars && this.validChars(chars)) {
        const	re = new RegExp(chars, 'gi');
        return this.pairs.filter(el => el.pair.match(re));
      }
      return this.pairs;
    },
  },
  methods: {
    ...mapActions('trading', [
      'toggleFavorite',
      'sortPairs',
    ]),
    validChars(chars) {
      // eslint-disable-next-line
			let re = /^(\w|\d)+$/;
      return re.test(chars);
    },
    sort(type) {
      this.cleanStatus(type);
      this.status[type].active = true;
      this.status[type].direction = !this.status[type].direction;
      this.sortPairs(type);
    },
    cleanStatus(type) {
      const object = this.status;
      for (const key in object) {
        if (key !== type) {
          for (const item in object[key]) {
            object[key][item] = false;
          }
        }
      }
    },
  },
};
</script>
<style lang="scss">

.trading-pairs-table {
	@include flex-col-def(stretch);
	border: none;
	overflow-y: auto;
	padding: 10px 0;
	&__star {
		fill: none;
		widows: 20px;
		height: 20px;
		stroke: $middle-grey;
		transition-property: stroke, fill;
		transition-duration: 0.2s;
		transition-timing-function: ease-in-out;
		&--active {
			stroke: $star-color-active;
			fill: $star-color-active;
		}
	}
	&__thead {
		@include flex-col(stretch);
		align-items: stretch;
		padding-right: 8px;
		padding-bottom: 10px;
	}
	&__head-img {
		margin-left: 4px;
		fill: $lightest-grey;
		width: 9px;
		height: 9px;
	}
	&__tbody {
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
	&__row {
		flex: 1 0 100%;
		@include flex-row(space-between);
		padding-bottom: 12px;
	}
	&__cell {
		@include flex-row-def(center);
		font-family: $second-font;
		color: $dark-grey;
		font-size: $size-3;
		text-transform: uppercase;
		font-weight: 600;
		flex: 0 0 33.3%;
		padding-right: 0.5rem;
		&--head {
			font-family: $base-font;
			color: $middle-grey;
			font-size: $size-2;
			text-transform: uppercase;
			font-weight: 600;
			@include flex-row-def(baseline);
			cursor: pointer;
			&:active  .trading-pairs-table__head-img {
				fill: $text-hover-color;
			}
		}
		&--star {
			cursor: pointer;
		}
		&--pair {
			flex-basis: 35%;
		}
		&--price {
			flex-basis: 40%;
		}
		&--hours {
			justify-content: flex-end;
			text-align: right;
			flex-basis: 25%;
		}
	}
	&__search {
		@extend %search;
		border: none;
  }
  &__search-img {
    @extend %search-img;
  }
  &__search-input {
    @extend %search-input;
  }
}


</style>
