<template>
<table class="trading-recent-trades-table">
	<thead class="trading-recent-trades-table__thead">
		<tr class="trading-recent-trades-table__row">
			<th class="trading-recent-trades-table__cell trading-recent-trades-table__cell--time trading-recent-trades-table__cell--head ">Time</th>
			<th class="trading-recent-trades-table__cell trading-recent-trades-table__cell--type trading-recent-trades-table__cell--head ">Type</th>
			<th class="trading-recent-trades-table__cell trading-recent-trades-table__cell--price trading-recent-trades-table__cell--head">price</th>
			<th class="trading-recent-trades-table__cell trading-recent-trades-table__cell--volume trading-recent-trades-table__cell--head">volume</th>
		</tr>
	</thead>
	<tbody class="trading-recent-trades-table__tbody">
		<tr class="trading-recent-trades-table__row" v-for='(item, index) in items' :key='index'>
			<td class="trading-recent-trades-table__cell trading-recent-trades-table__cell--time">{{ item.time }}</td>
			<td class="trading-recent-trades-table__cell trading-recent-trades-table__cell--type" 
				:class="{'trading-recent-trades-table--sell': item.type == 'sell', 'trading-recent-trades-table--buy': item.type == 'buy'}">{{ item.type }}
			</td>
			<td class="trading-recent-trades-table__cell trading-recent-trades-table__cell--price">{{ item.price }}</td>
			<td class="trading-recent-trades-table__cell trading-recent-trades-table__cell--volume">{{ item.volume }}</td>
		</tr>
	</tbody>
</table>
</template>
<script>
import { mapState } from 'vuex'

export default {
	name: 'TradingRecentTradesTable',
	computed: {
		...mapState("trading", {
			items: state => state.recentTrades
    })
	}
}
</script>
<style lang="scss">

.trading-recent-trades-table {
	@include flex-col-def(stretch);
	border: none;
	overflow-y: auto;
	padding: 10px 0;
	&__thead {
		@include flex-col(stretch);
		align-items: stretch;
		padding-right: 8px;
		padding-bottom: 10px;
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
		font-family: $second-font;
		color: $dark-grey;
		font-size: $size-3;
		text-transform: uppercase;
		font-weight: 600;
		flex: 0 0 25%;
		padding-right: 0.5rem;
		&--head {
			font-family: $base-font;
			color: $middle-grey;
			font-size: $size-2;
			text-transform: uppercase;
			font-weight: 600;
			@include flex-row-def(baseline);
		}
		&--time {
			flex-basis: 20%;
		}
		&--type {
			flex-basis: 16%;
		}
		&--price {
			justify-content: flex-end;
			text-align: right;
			flex-basis: 32%;
		}
		&--volume {
			justify-content: flex-end;
			text-align: right;
			flex-basis: 32%;
			
		}
	}
	&--sell {
		color: $text-sell-color;
	}
	&--buy {
		color: $text-buy-color;
	}
}


</style>

