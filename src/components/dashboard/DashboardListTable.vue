<template>
<table class="dashboard-list-table">
	<thead class="dashboard-list-table__thead">
		<tr class="dashboard-list-table__row dashboard-list-table__row--head">
			<th 
				class="dashboard-list-table__cell dashboard-list-table__cell--head dashboard-list-table__cell--coin"
				@click="sort('coin')">
				<span class='dashboard-trades-table__text'>coin</span>
				<icon-angle-down class='dashboard-list-table__head-img'
				:class='{"sort-image-active": status.coin.direction, "sort-active-arrow": status.coin.active}'/>		
			</th>
			<th 
				class="dashboard-list-table__cell dashboard-list-table__cell--head"
				@click="sort('exchange')">
				<span class='dashboard-trades-table__text'>exchange</span>
				<icon-angle-down class='dashboard-list-table__head-img'
				:class='{"sort-image-active": status.exchange.direction, "sort-active-arrow": status.exchange.active}'/>	
			</th>
			<th 
				class="dashboard-list-table__cell dashboard-list-table__cell--right dashboard-list-table__cell--head"
				@click="sort('price')">
				<span class='dashboard-trades-table__text'>price</span>
				<icon-angle-down class='dashboard-list-table__head-img'
				:class='{"sort-image-active": status.price.direction, "sort-active-arrow": status.price.active}'/>	
			</th>
			<th 
				class="dashboard-list-table__cell dashboard-list-table__cell--right dashboard-list-table__cell--head"
				@click="sort(sortBy)">
				<span class='dashboard-trades-table__text'>{{ sortBy }}</span>
				<icon-angle-down class='dashboard-list-table__head-img'
				:class='{"sort-image-active": status[sortBy].direction, "sort-active-arrow": status[sortBy].active}'/>	
			</th>
			<th class="dashboard-list-table__cell dashboard-list-table__cell--head">
				<span class='dashboard-trades-table__text'>graph</span>
			</th>
			<th class="dashboard-list-table__cell dashboard-list-table__cell--head"></th>
		</tr>
	</thead>
	<tbody class="dashboard-list-table__tbody" v-if="myApi.length">
		<tr class="dashboard-list-table__row" v-for="(item, index) in wishList" :key='index'>
			<td class="dashboard-list-table__cell">{{ item.coin }}</td>
			<td class="dashboard-list-table__cell">{{ item.exchange }}</td>
			<td class="dashboard-list-table__cell dashboard-list-table__cell--right dashboard-list-table__cell--price">{{ item.price }}</td>
			<td class="dashboard-list-table__cell dashboard-list-table__cell--right dashboard-list-table__cell--day">{{ item[sortBy] }}%</td>
			<td class="dashboard-list-table__cell">
				<img src="@/assets/images/mini_graph.jpg" alt="graph">
			</td>
			<td class="dashboard-list-table__cell">
				<button 
					class="dashboard-list-table__delete"
					@click='deleteCoin(index)'>
					<icon-trash class="dashboard-list-table__delete-img"/>
				</button>
			</td>
		</tr>	
	</tbody>
	<div class="dashboard-list-table__lock-wrapper" v-else>
		<p class="dashboard-list-table__lock-text">You have no recent trades yet</p>
	</div>
</table>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	name: 'DashboardListTable',
	props: {
		sortBy: {
			type: String,
			default: 'day'
		}
	},
	components: {
		IconAngleDown,
		IconTrash
	},
	data () {
		return {
			status: {
				coin: {
					active: false,
					direction: false
				},
				exchange: {
					active: false,
					direction: false
				},
				price: {
					active: false,
					direction: false
				},
				day: {
					active: false,
					direction: false
				},
				week: {
					active: false,
					direction: false
				},
				month: {
					active: false,
					direction: false
				},
			}
		}
	},
	methods: {
		...mapActions('dashboard', [
			'sortWishList'
		]),
		...mapMutations('dashboard', [
			'deleteCoin'
		]),
		sort(type) {
			this.cleanStatus(type);
			this.status[type].active = true;
			this.status[type].direction = !this.status[type].direction;
			this.sortWishList(type);
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
	},
	computed: {
		...mapState({
			myApi: state => state.exchangesApi.myApi,
			wishList: state => state.dashboard.wishList
    })
	}
}
</script>
<style lang="scss">
.dashboard-list-table {
	@extend %table;
	&__head-img {
		@extend %table-head-img;
	}
	&__thead {
		@extend %table-head;
		padding-bottom: 0px;
	}
	&__tbody {
		@extend %table-body;
	}
	&__row {
		display: grid;
		grid-template-columns: repeat(5, 2fr) 1fr;
		justify-items: start;
		justify-content: space-between;
		align-items: center;
		grid-column-gap: 32px;
		padding: 0 6px 6px 0;
		&--head {
			padding-bottom: 14px;
		}
	}
	&__text {
		padding-right: 6px;
	}
	&__cell {
		@extend %table-cell;
		color: $darker-grey;
		&--head {
			@extend %table-cell-head;
		}
		&--right {
			justify-self: end;
		}
		&--price {
			color: $text-hover-color;
		}
		&--day {
			color: $text-sell-color;
		}
	}
	&__delete {
		background-color: transparent;
		width: 24px;
		height: 24px;
		@include flex-row(center);
		justify-self: end;
		transition: 0.2s ease-in-out;
		@media (min-width: 480px) {
			&:hover {
				opacity: 0.95;
			}
		}
	}
	&__delete-img {
		width: 14px;
		height: 14px;
		fill: $text-hover-color;
		pointer-events: none;
		transition: 0.2s ease-in-out;
	}
	&__lock-wrapper {
		@extend %lock-wrapper;
	}
	&__lock-text {
		@extend %lock-text;
		margin: 0;
	}
}
</style>