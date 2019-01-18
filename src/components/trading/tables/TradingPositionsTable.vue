<template>
<table class="trading-positions-table">
	<thead class="trading-positions-table__thead">
		<tr class="trading-positions-table__row">
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--pair"
				@click="sort('pair')">pair
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.pair.direction, "sort-active-arrow": status.pair.active}'/>		
			</th>
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--type"
				@click="sort('type')">type
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.type.direction, "sort-active-arrow": status.type.active}'/>
			</th>
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--exchange"
				@click="sort('exchange')">exchange
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.exchange.direction, "sort-active-arrow": status.exchange.active}'/>
			</th>
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--amount"
				@click="sort('amount')">amount
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.amount.direction, "sort-active-arrow": status.amount.active}'/>
			</th>
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--price"
				@click="sort('price')">price
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.price.direction, "sort-active-arrow": status.price.active}'/>
			</th>
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--date"
				@click="sortDates('date')">date
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.date.direction, "sort-active-arrow": status.date.active}'/>
			</th>
			<th 
				class="trading-positions-table__cell trading-positions-table__cell--head trading-positions-table__cell--profit"
				@click="sort('profit')">profit
				<icon-arrow-up 
					class='trading-positions-table__head-img'
					:class='{"sort-image-active": status.profit.direction, "sort-active-arrow": status.profit.active}'/>
			</th>
		</tr>
	</thead>
	<tbody class="trading-positions-table__tbody">
		<tr class="trading-positions-table__row" v-for='(item, index) in getPositions' :key='index'>
			<td class="trading-positions-table__cell trading-positions-table__cell--pair">{{ item.pair }}</td>
			<td class="trading-positions-table__cell trading-positions-table__cell--type">{{ item.type }}</td>
			<td class="trading-positions-table__cell trading-positions-table__cell--exchange">{{ item.exchange }}</td>
			<td class="trading-positions-table__cell trading-positions-table__cell--amount">{{ item.amount }}</td>
			<td class="trading-positions-table__cell trading-positions-table__cell--price">{{ item.price }}</td>
			<td class="trading-positions-table__cell trading-positions-table__cell--date">{{ item.date }}</td>
			<td class="trading-positions-table__cell trading-positions-table__cell--profit">{{ item.profit }}</td>			
		</tr>	
	</tbody>
</table>
</template>
<script>
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'TraadingPositionsTable',
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
				profit: {
					active: false,
					direction: false
				}
			}
		}
	},
	computed: {
		...mapState("trading", [
			'positions'
		]),
		getPositions() {
			let chars = this.searchChars;
			if(chars && this.validChars(chars)) {
				let	re = new RegExp(chars, 'gi');
				return this.positions.filter(el => {
					return el.pair.match(re);
				})
			} else {
				return this.positions;
			}	
		}
	},
	methods: {
		...mapActions('trading', [
			'sortPositions',
			'sortPositionsDates'
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
			this.sortPositions(type);
		},
		sortDates(type) {
			this.cleanStatus(type);
			this.status[type].active = true;
			this.status[type].direction = !this.status[type].direction;
			this.sortPositionsDates(type);
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
.trading-positions-table {
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
		@extend %table-cell;
		margin-right: 0.5rem;
		flex: 1 1 10%;
		&--head {
			@extend %table-cell-head;
		}
		&--pair {
			flex-basis: 10%;
		}
		&--type {
			flex-basis: 5%;
			justify-content: flex-end;
			text-align: right;
			margin-right: 2rem;
		}
		&--amount {
			justify-content: flex-end;
			text-align: right;
		}
		&--price {
			justify-content: flex-end;
			text-align: right;
			margin-right: 1rem;
		}
		&--profit {
			margin: 0;
		}
	}
}


</style>
