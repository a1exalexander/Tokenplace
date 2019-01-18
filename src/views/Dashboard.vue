<template>
	<main class="dashboard" @click.self="hideDrop">
		<section class="dashboard__box dashboard__box--holding" @click.self="hideDrop">
			<div class="dashboard__header" @click.self="hideDrop">
				<div class="dashboard__title-wrapper" @click="hideDrop">
					<h1 class="dashboard__title">Holdings</h1>
				</div>
				<div class="dashboard__header-inner" @click.self="hideDrop">
					<div class="dashboard__day-wrapper" @click.self="hideDrop">
						<p class="dashboard__header-text" @click="hideDrop">Show changes:</p>
						<button class="dashboard__sort-button" @click="toggleSort('holdingsTime')">
							<span class="dashboard__sort-button-text">{{ sortSelect.holdingsTime }}</span>
							<icon-angle-down class="dashboard__sort-button-img" 
								:class='{"sort-image-active": dropVisible.holdingsTime}'/>
							<transition
								name="custom-classes-transition"
								enter-active-class="animated dur03 pullDownLight"
								leave-active-class="animated dur02 pullDownLight revers">
							<div class="dashboard__drop-list" v-show='dropVisible.holdingsTime'>
								<p class="dashboard__drop-item" 
									v-for='(item, index) in timeList' 
									:key='index' 
									@click='selectHoldingsSortTime(item)'>{{ item }}</p>
							</div>
							</transition>
						</button>
					</div>
				</div>
			</div>
			<dashboard-holding-table 
				class="dashboard__table dashboard__table--holding" 
				@click.native="hideDrop"
				:sort-by='sortSelect.holdingsTime'/>
			<div class="dashboard__balance-wrapper" @click="hideDrop">
				<p class="dashboard__balance-text">TOTAL BALANCE:
				</p>
				<p class="dashboard__balance">$ {{ balance }}
				</p>
			</div>
		</section>
		<section class="dashboard__box dashboard__box--trades" @click.self="hideDrop" >
			<div class="dashboard__header" @click="hideDrop">
				<div class="dashboard__title-wrapper">
					<h1 class="dashboard__title">Recent trades</h1>
				</div>
				<p class="dashboard__header-text">{{ getLastActivity }}</p>
			</div>
			<dashboard-trades-table 
				class="dashboard__table dashboard__table--trades" 
				@click.native="hideDrop"/>
		</section>
		<section class="dashboard__box dashboard__box--wish-list" @click.self="hideDrop">
			<div class="dashboard__header" @click.self="hideDrop">
				<div class="dashboard__title-wrapper" @click="hideDrop">
					<h1 class="dashboard__title">Wish list</h1>
				</div>
				<div class="dashboard__header-inner" @click.self="hideDrop">
					<div class="dashboard__day-wrapper" @click.self="hideDrop">
						<p class="dashboard__header-text" @click.self="hideDrop">Show changes:</p>
						<button class="dashboard__sort-button" @click="toggleSort('wishListTime')">
							<span class="dashboard__sort-button-text">{{ sortSelect.wishListTime }}</span>
							<icon-angle-down class="dashboard__sort-button-img" 
								:class='{"sort-image-active": dropVisible.wishListTime}'/>
							<transition
								name="custom-classes-transition"
								enter-active-class="animated dur03 pullDownLight"
								leave-active-class="animated dur02 pullDownLight revers">
							<div class="dashboard__drop-list" v-show='dropVisible.wishListTime'>
								<p class="dashboard__drop-item" 
									v-for='(item, index) in timeList' 
									:key='index' 
									@click='selectWishListSortTime(item)'>{{ item }}
								</p>
							</div>
							</transition>
						</button>
					</div>
					<button class="dashboard__sort-button" @click.self="toggleSort('wishListCoin')">
						<span class="dashboard__sort-button-text">Add new coin</span>
						<icon-plus class="dashboard__sort-button-plus"/>
						<transition
							name="custom-classes-transition"
							enter-active-class="animated dur03 pullDownLight"
							leave-active-class="animated dur02 pullDownLight revers">
						<div 
							class="dashboard__drop-list dashboard__drop-list--addcoin" 
							v-show='dropVisible.wishListCoin'>
							<label class="dashboard__search">
								<icon-search class="dashboard__search-img"/>
								<input 
									type="text" 
									class="dashboard__search-input" 
									placeholder="Search..."
									v-model='searchChars'>
							</label>
							<div class="dashboard__drop-list-inner">
								<div class="dashboard__drop-item dashboard__drop-item--addcoin" 
									v-for="(item, index) in searchCoins" 
									:key='index' 
									@click="$pushData(item)">
									<p class="dashboard__drop-item-name">{{ item }}</p>
									<icon-plus class="dashboard__sort-button-plus dashboard__sort-button-plus--droplist"/>
								</div>
							</div>
						</div>
						</transition>
					</button>
				</div>
			</div>
			<dashboard-list-table 
				class="dashboard__table dashboard__table--wish-list" 
				@click.native="hideDrop"
				:sort-by='sortSelect.wishListTime'/>
		</section>
	</main>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue'
import DashboardHoldingTable from '@/components/dashboard/DashboardHoldingTable.vue'
import DashboardListTable from '@/components/dashboard/DashboardListTable.vue'
import DashboardTradesTable from '@/components/dashboard/DashboardTradesTable.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconSearch from "@/components/icons/IconSearch.vue"
import moment from 'moment-timezone';
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
	name: "Dashboard",
	components: {
		IconAngleDown,
		DashboardHoldingTable,
		DashboardListTable,
		DashboardTradesTable,
		IconPlus,
		IconSearch
	},
	data () {
		return {
			searchChars: '',
			timeList: [
				"day", "week", "month"
			],
			sortSelect: {
				holdingsTime: "day",
				wishListTime: "day"
			},
			dropVisible: {
				holdingsTime: false,
				wishListTime: false,
				wishListCoin: false
			},
			getLastActivity: ''
		}
	},
	methods: {
		...mapActions('dashboard', {
			getData: 'downloadAll'
		}),
		...mapMutations('dashboard', [
			'pushData'
		]),
		$pushData(name) {
			let data = {
				coin: name,
				exchange: "LIVECOIN",
				price: '3455,25',
				day: '-4.25',
				week: '-0.44',
				month: '-23'
			}
			this.pushData(['wishList', data]);
		},
		selectHoldingsSortTime(name) {
			this.sortSelect.holdingsTime = name;
		},
		selectHoldingsSortType(name) {
			this.sortSelect.holdingsType = name;
		},
		selectWishListSortTime(name) {
			this.sortSelect.wishListTime = name;
		},
		toggleSort(name) {
			let object = this.dropVisible;
			for (const key in object) {
				key == name? object[key] = !object[key]: object[key] = false;
			}
		},
		hideDrop() {
			let object = this.dropVisible;
			for (const key in object) {
				object[key] = false;
			}
		},
		updateTime() {
			if(this.lastActivity) {
				this.getLastActivity = `Last activity ${moment(this.lastActivity).fromNow()}`;
				setInterval(() => this.getLastActivity = `Last activity ${moment(this.lastActivity).fromNow()}`, 1000 * 60);
			} else {
				this.getLastActivity = "There was no activity yet";
			}
		}
	},
	computed: {
		...mapState("dashboard", [
			"balance",
			'lastActivity',
			'wishListCoins'
		]),
		searchCoins() {
			if(this.searchChars) {
				let	re = new RegExp(this.searchChars, 'gi');
				return this.wishListCoins.filter(el => {
					return el.match(re);
				})
			} else {
				return this.wishListCoins;
			}
			
		}
	},
	beforeMount() {
		this.getData();
		this.updateTime();
	},
	beforeUpdate() {
		this.updateTime();
	}
}

</script>
<style lang="scss">
.dashboard {
	min-height: 640px;
	height: 100vh;
	padding: 64px 16px 16px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas: 
		"holding trades"
		"holding wish-list";
	grid-gap: 16px;
	&__box {
		@extend %box;
		@include flex-col-def(stretch);
		&--holding {
			grid-area: holding;
		}
		&--trades {
			min-height: 300px;
			grid-area: trades;
		}
		&--wish-list {
			min-height: 300px;
			grid-area: wish-list;
		}
	}
	&__header {
		@include flex-row(space-between);
		padding-bottom: 14px;
	}
	&__title-wrapper {
		@include flex-row-def(center);
	}
	&__header-inner {
		@include flex-row(center);
	}
	&__title {
		margin-right: 16px;
		font-size: $size-13;
	}
	&__day-wrapper {
		@include flex-row(center);
	}
	&__sort-wrapper {
		@include flex-row(center);
	}
	&__sort-button {
		margin-left: 16px;
		@extend %button-sort;
		position: relative;
	}
	&__sort-button-text {
		pointer-events: none;
		text-transform: capitalize;
		margin-right: 6px;
	}
	&__sort-button-img {
		@extend %blue-img;
	}
	&__drop-list {
		padding: 12px 0;
		@extend %drop-list;
		box-shadow: 0 3px 10px 0 rgba(20,15,28,0.10);
		border-radius: 2px;
		border: none;
		left: -30px;
		&--addcoin {
			left: -50px;
			max-height: max-content;
		}
	}
	&__drop-list-inner {
		overflow-y: auto;
		max-height: calc(32px * 3);
	}
	&__drop-item {
		@extend %drop-item;
		height: auto;
		padding: 8px 16px;
		&--addcoin {
			@include flex-row(space-between);
			@media screen and (min-width: 600px) {
				&:hover .dashboard__sort-button-plus {
					fill: $text-hover-color;
				}
			}
		}
	}
	&__search {
		@extend %search;
		margin: 8px 16px 12px;
	}
	&__search-img {
		@extend %search-img;
		fill: $text-hover-color;
	}
	&__search-input {
		@extend %search-input;
	}
	&__header-text {
		font-size: $size-4;
		color: $middle-grey;
	}
	&__table {
		flex: 1 1 100%;
		&--holding {
			padding-bottom: 32px;
		}
	}
	&__balance-wrapper {
		padding-right: 6px;
		@include flex-row(flex-end);
	}
	&__balance-text {
		color: $middle-grey;
		font-size: $size-2;
		font-weight: 600;
		margin-right: 16px;
		color: $text-active-color;
	}
	&__balance {
		color: $semi-black;
		font-size: $size-5;
		font-weight: 600;
	}
	&__sort-button-plus {
		@extend %blue-img;
		transition: all ease-in-out 0.2s;
		&--droplist {
			fill: $button-disable-color;
		}
	}
}
</style>
