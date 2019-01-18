<template>
<table class="trading-balance-table">
	<thead class="trading-balance-table__thead">
		<tr class="trading-balance-table__row">
			<th 
				class="trading-balance-table__cell trading-balance-table__cell--head trading-balance-table__cell--currency"
				@click="sort('currency')">currency
				<icon-arrow-up 
					class='trading-balance-table__head-img'
					:class='{"sort-image-active": status.currency.direction, "sort-active-arrow": status.currency.active}'/>		
			</th>
			<th 
				class="trading-balance-table__cell trading-balance-table__cell--head trading-balance-table__cell--total"
				@click="sort('total')">total
				<icon-arrow-up 
					class='trading-balance-table__head-img'
					:class='{"sort-image-active": status.total.direction, "sort-active-arrow": status.total.active}'/>
			</th>
			<th 
				class="trading-balance-table__cell trading-balance-table__cell--head trading-balance-table__cell--rate"
				@click="sort('rate')">rate
				<icon-arrow-up 
					class='trading-balance-table__head-img'
					:class='{"sort-image-active": status.rate.direction, "sort-active-arrow": status.rate.active}'/>
			</th>
			<th class="trading-balance-table__cell trading-balance-table__cell--head trading-balance-table__cell--balance">
				Balance total:  {{ totalBalance }} USD
			</th>
		</tr>
	</thead>
	<tbody class="trading-balance-table__tbody">
		<tr class="trading-balance-table__row" v-for='(item, index) in balance' :key='index'>
			<td class="trading-balance-table__cell trading-balance-table__cell--currency">{{ item.currency }}</td>
			<td class="trading-balance-table__cell trading-balance-table__cell--total">{{ item.total }}</td>
			<td class="trading-balance-table__cell trading-balance-table__cell--rate">{{ item.rate }}</td>
			<td class="trading-balance-table__cell trading-balance-table__cell--balance"></td>
		</tr>	
	</tbody>
</table>
</template>
<script>
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import { mapState, mapActions } from 'vuex';

export default {
	name: 'TradingBalanceTable',
	components: {
		IconArrowUp
	},
	data () {
		return {
			status: {
				currency: {
					active: false,
					direction: false
				},
				total: {
					active: false,
					direction: false
				},
				rate: {
					active: false,
					direction: false
				}
			}	
		}
	},
	computed: {
		...mapState("trading", [
			'balance',
			'totalBalance'
		])
	},
	methods: {
		...mapActions('trading', [
			'sortBalance'
		]),
		sort(type) {
			this.cleanStatus(type);
			this.status[type].active = true;
			this.status[type].direction = !this.status[type].direction;
			this.sortBalance(type);
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
.trading-balance-table {
	@extend %table;
	&__head-img {
		@extend %table-head-img;
	}
	&__thead {
		@extend %table-head;
	}
	&__tbody {
		@extend %table-body;
	}
	&__row {
		@extend %table-row;
	}
	
	&__cell {
		flex: 1 1 11.1%;
		padding-right: 0.5rem;
		@extend %table-cell;
		&--head {
			@extend %table-cell-head;
		}
		&--currency {
			flex-basis: 15%;
		}
		&--total {
			flex-basis: 10%;
		}
		&--rate {
			flex-basis: 10%;
		}
		&--balance {
			color: $grey;
			font-weight: 500;
			justify-content: center;
			flex-basis: 55%;
			text-transform: none;
		}
	}
}


</style>
