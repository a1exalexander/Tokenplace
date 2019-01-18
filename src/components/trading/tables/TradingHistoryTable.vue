<template>
<table class="trading-history-table">
	<thead class="trading-history-table__thead">
		<tr class="trading-history-table__row">
			<th 
				class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--pair"
				@click="sort('pair')">pair
				<icon-arrow-up 
					class='trading-history-table__head-img'
					:class='{"sort-image-active": status.pair.direction, "sort-active-arrow": status.pair.active}'/>		
			</th>
			<th 
				class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--type"
				@click="sort('type')">type
				<icon-arrow-up 
					class='trading-history-table__head-img'
					:class='{"sort-image-active": status.type.direction, "sort-active-arrow": status.type.active}'/>
			</th>
			<th class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--exchange">exchange
			</th>
			<th class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--amount">amount
			</th>
			<th class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--price">price
			</th>
			<th class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--date">date
			</th>
			<th class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--status">status
			</th>
			<th class="trading-history-table__cell trading-history-table__cell--head trading-history-table__cell--profit">profit
			</th>
		</tr>
	</thead>
	<tbody class="trading-history-table__tbody">
		<tr class="trading-history-table__row" v-for='(item, index) in getTradeHistory' :key='index'>
			<td class="trading-history-table__cell trading-history-table__cell--pair">{{ item.pair }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--type">{{ item.type }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--exchange">{{ item.exchange }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--amount">{{ item.amount }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--price">{{ item.price }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--date">{{ item.date }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--status">{{ item.status }}</td>
			<td class="trading-history-table__cell trading-history-table__cell--profit">{{ item.profit }}</td>
		</tr>	
	</tbody>
</table>
</template>
<script>
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import { mapState, mapActions } from 'vuex';

export default {
	name: 'TradingHistoryTable',
	props: {
		searchChars: {
			type: [String, Number],
			default: ''
		}
	},
	components: {
		IconArrowUp
	},
	data () {
		return {
			status: {
				pair: {
					active: false,
					direction: false
				},
				type: {
					active: false,
					direction: false
				},
				exchange: {
					active: false,
					direction: false
				},
				amount: {
					active: false,
					direction: false
				},
				price: {
					active: false,
					direction: false
				},
				date: {
					active: false,
					direction: false
				},
				status: {
					active: false,
					direction: false
				},
				profit: {
					active: false,
					direction: false
				}
			}
		}
	},
	computed: {
		...mapState("trading", [
			'tradeHistory'
		]),
		getTradeHistory() {
			let chars = this.searchChars;
			if(chars && this.validChars(chars)) {
				let	re = new RegExp(chars, 'gi');
				return this.tradeHistory.filter(el => {
					return el.pair.match(re);
				})
			} else {
				return this.tradeHistory;
			}	
		}
	},
	methods: {
		...mapActions('trading', [
			'sortTradeHistory',
			'sortTradeHistoryDates'
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
			this.sortTradeHistory(type);
		},
		sortDates(type) {
			this.cleanStatus(type);
			this.status[type].active = true;
			this.status[type].direction = !this.status[type].direction;
			this.sortTradeHistoryDates(type);
		},
		cleanStatus(type) {
			let object = this.status;
			for (const key in object) {
				if(key !== type) {
					for (const item in object[key]) {
						object[key][item] = false;
					}
				}
			}
		}
	}
}
</script>
<style lang="scss">
.trading-history-table {
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
		flex: 1 1 10%;
		margin-right: 0.5rem;
		&--head {
			@extend %table-cell-head;
		}
		&--pair {
			flex-basis: 10%;
		}
		&--type {
			flex-basis: 6%;
			justify-content: flex-end;
			text-align: right;
			margin-right: 0.5rem;
		}
		&--amount {
			justify-content: flex-end;
			text-align: right;
		}
		&--price {
			justify-content: flex-end;
			text-align: right;
			margin-right: 0.5rem;
		}
		&--date {
			justify-content: flex-end;
			text-align: right;
		}
		&--status {
			justify-content: flex-end;
			text-align: right;
			margin-right: 1rem;
		}
		&--profit {
			justify-content: flex-end;
			text-align: right;
			margin: 0;
			margin-right: 1.5rem;
		}
	}
}


</style>
