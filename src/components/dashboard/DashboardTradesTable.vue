<template>
<table class="dashboard-trades-table">
	<thead class="dashboard-trades-table__thead">
		<tr class="dashboard-trades-table__row dashboard-trades-table__row--head">
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--head dashboard-list-table__cell--coin">
				<span class='dashboard-trades-table__text'>time</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>		
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>exchange</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--right dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>type</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>currency</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--right dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>price</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--right dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>amount</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>value</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
			<th class="dashboard-trades-table__cell dashboard-trades-table__cell--right dashboard-trades-table__cell--head">
				<span class='dashboard-trades-table__text'>value usd</span>
				<icon-angle-down class='dashboard-trades-table__head-img'/>	
			</th>
		</tr>
	</thead>
	<tbody class="dashboard-trades-table__tbody" v-if="MyApi.length">
		<tr class="dashboard-trades-table__row" v-for="n in 40" :key='n.id'>
			<td class="dashboard-trades-table__cell">9:20</td>
			<td class="dashboard-trades-table__cell">livecoin</td>
			<td class="dashboard-trades-table__cell dashboard-trades-table__cell--right"></td>
			<td class="dashboard-trades-table__cell">usd</td>
			<td class="dashboard-trades-table__cell dashboard-trades-table__cell--right">387</td>
			<td class="dashboard-trades-table__cell dashboard-trades-table__cell--right">18</td>
			<td class="dashboard-trades-table__cell"></td>
			<td class="dashboard-trades-table__cell dashboard-trades-table__cell--right">$ 12 000</td>
		</tr>	
	</tbody>
	<div class="dashboard-trades-table__lock-wrapper" v-else>
		<p class="dashboard-trades-table__lock-text">You have no recent trades yet</p>
	</div>
</table>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue'
import { mapState } from 'vuex'

export default {
	name: 'DashboardTradesTable',
	components: {
		IconAngleDown
	},
	data () {
		return {
			balance: [],
			balanceTotal: 0
		}
	},
	methods: {
		pushBalance() {
			let data = {
				currency: "",
				total: "",
				rate: ""
			}
			for(let i = 0; i < 1; i++) {
				this.balance.push(data)
			}
		}
	},
	computed: {
		...mapState({
			MyApi: state => state.exchangesApi.myApi
    })
	},
	beforeMount() {
		this.pushBalance()
	}
}
</script>
<style lang="scss">
.dashboard-trades-table {
	border: none;
	overflow-y: auto;
	@include flex-col-def(stretch);
	&__head-img {
		fill: $lightest-grey;
		width: 9px;
		height: 9px;
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
		grid-template-columns: 3.5rem 1fr 3.5rem 1fr 3rem 1fr 3rem 1fr;
		justify-items: start;
		justify-content: space-between;
		grid-column-gap: 12px;
		padding: 0 6px 14px 0;
		&--head {
			padding-bottom: 16px;
		}
	}
	&__text {
		padding-right: 6px;
	}
	&__cell {
		@extend %table-cell;
		color: $darker-grey;
		&--head {
			cursor: pointer;
				color: $middle-grey;
		}
		&--right {
			justify-self: end;
		}
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