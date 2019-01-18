<template>
<main class="portfolio" @click.self='hideDrop'>
	<div class="portfolio__box" @click.self='hideDrop'>
		<div class="portfolio__head" @click.self='hideDrop'>		
			<h1 class="portfolio__title" @click.self='hideDrop'>Portfolio</h1>			
			<div class="portfolio__head-inner" @click.self='hideDrop'>
				<button 
					class="portfolio__filter portfolio__filter--exchanges"
					@click="filterExchanges.dropList = !filterExchanges.dropList">
					<p class="portfolio__filter-text">{{ filterExchanges.selected? filterExchanges.selected: "All Exchanges" }}
					</p>
					<icon-angle-down class="portfolio__filter-img"/>
					<transition
						name="custom-classes-transition"
						enter-active-class="animated dur03 pullDownLight"
						leave-active-class="animated dur02 pullDownLight revers">
					<div class="portfolio__drop-list" v-show='filterExchanges.dropList'>
						<p class="portfolio__drop-item" 
							v-for='(item, index) in getApiNames' 
							:key='index' 
							@click='selectFilterByName(item.name)'>{{ item.name }}</p>
					</div>
				</transition>
				</button>
				<label class="portfolio__search" @click='hideDrop'>
					<icon-search class="portfolio__search-img"/>
					<input 
						type="text" 
						class="portfolio__search-input" 
						placeholder="Search..."
						v-model='searchChars'>
				</label>
			</div>	
		</div>
		<ul class="portfolio__table-row portfolio__table-row--head" @click='hideDrop'>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head"
				@click="sort('coin')">
				<p class="portfolio__table-text">coin</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.coin.direction, "sort-active-arrow": statusSort.coin.active}'/>
			</li>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head portfolio__table-cell--end"
				@click="sort('amount')">
				<p class="portfolio__table-text">amount</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.amount.direction, "sort-active-arrow": statusSort.amount.active}'/>
			</li>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head"
				@click="sort('exchanges')">
				<p class="portfolio__table-text">exchanges</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.exchanges.direction, "sort-active-arrow": statusSort.exchanges.active}'/>
			</li>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head"
				@click="sort('price')">
				<p class="portfolio__table-text">price, usd</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.price.direction, "sort-active-arrow": statusSort.price.active}'/>
			</li>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head portfolio__table-cell--end"
				@click="sortDates('day')">
				<p class="portfolio__table-text">day</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.day.direction, "sort-active-arrow": statusSort.day.active}'/>
			</li>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head portfolio__table-cell--end"
				@click="sort('value')">
				<p class="portfolio__table-text">value, usd</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.value.direction, "sort-active-arrow": statusSort.value.active}'/>
			</li>
			<li 
				class="portfolio__table-cell portfolio__table-cell--head portfolio__table-cell--end"
				@click="sort('percent')">
				<p class="portfolio__table-text">%</p>
				<icon-angle-down 
					class='portfolio__angle-img'
					:class='{"sort-image-active": statusSort.percent.direction, "sort-active-arrow": statusSort.percent.active}'/>
			</li>
		</ul>
		<div 
			class="portfolio__list-field" 
			:class="{'portfolio__list-field--max': someOpenWindow}"
			@click='hideDrop'>
			<div class="portfolio__elements" v-if='myApi.length'>
				<article class="portfolio__element" v-for='(item, index) in getPortfolio' :key='item.id'>
					<ul class="portfolio__table-row">
						<li class="portfolio__table-cell">{{ item.coin }}</li>
						<li class="portfolio__table-cell portfolio__table-cell--end">{{ item.amount }}</li>
						<li class="portfolio__table-cell">{{ item.exchanges }}</li>
						<li class="portfolio__table-cell">{{ item.price }} USD</li>
						<li class="portfolio__table-cell portfolio__table-cell--end">{{ item.day }}</li>
						<li class="portfolio__table-cell portfolio__table-cell--end">{{ item.value }} USD</li>
						<li class="portfolio__table-cell portfolio__table-cell--end portfolio__table-cell--percent">{{ item.percent }}%</li>
						<li 
							class="portfolio__table-cell portfolio__table-cell--end portfolio__table-cell--line"
							:class="{'portfolio__table-cell--noline':(item.deposit || item.withdraw)}">
							<button class="portfolio__button portfolio__button--deposit" 
								:class="{'active-deposit-button': item.deposit}" 
								:id-data='item.id'
								@click='toggleDeposit(index)'>Deposit
							</button>
						</li>
						<li class="portfolio__table-cell portfolio__table-cell--end">
							<button class="portfolio__button portfolio__button--withdraw" 
								:class="{'active-withdraw-button': item.withdraw}"
								@click='toggleWithdraw(index)'>Withdraw
							</button>
						</li>
					</ul>
					<transition
						name="custom-classes-transition"
						enter-active-class="animated pullDown dur04"
						mode="out-in">
					<section class="deposit-window" v-if="item.deposit" key='deposit'>
						<button 
							class="deposit-window__close"
							@click='toggleDeposit(index)'>
							<icon-close class="deposit-window__close-icon"/>
						</button>
						<p class="deposit-window__caption">Your Bitcoin Deposit Address</p>
						<div class="deposit-window__inner">
							<input type="url" 
								class="deposit-window__address" 
								:class='{"input-error": copyUnsuccessful, "input-accepted": copySuccessful}'
								:value="item.depositAddress" readonly>
							<input type="hidden" id='deposit-address' :value="item.depositAddress" readonly>
							<button class="deposit-window__button" 
								@click='copy'>Copy
							</button>
						</div>
						<p class="deposit-window__information">IMPORTANT: Send only BTC to this deposit address </p>
						<div class="deposit-window__line"></div>
					</section>
					<section class="withdraw-window" v-else-if="item.withdraw" key='withdraw'>
						<button 
							class="withdraw-window__close"
							@click='toggleWithdraw(index)'>
							<icon-close class="withdraw-window__close-icon"/>
						</button>
						<div class="withdraw-window__row">
							<p class="withdraw-window__info withdraw-window__info--margin-right">Your have 0.000400906 BTC available for withdrawal</p>
							<p class="withdraw-window__info">min: 0.00005 BTC; max: 6000 BTC</p>
						</div>
						<div class="withdraw-window__inner">
							<label class="withdraw-window__label">
								<p class="withdraw-window__input-name">Address</p>
								<input type="text" class="withdraw-window__input">
							</label>
							<label class="withdraw-window__label">
								<p class="withdraw-window__input-name">Amount</p>
								<input 
									type="text" 
									class="withdraw-window__input"
									:class="{'input-error': !checkAmount && withdraw.amount, 'input-accepted': checkAmount}" 
									v-model.number='withdraw.amount'>
							</label>
							<button class="withdraw-window__button" 
								:class='{"button-loading": item.loading}' 
								@click='toggleLoading(item.id)'>Withdraw
							</button>
							<p class="withdraw-window__text withdraw-window__text--transaction">Transaction Fee:</p>
							<p class="withdraw-window__text withdraw-window__text--total">Total:</p>
						</div>
						<div class="withdraw-window__line"></div>
					</section>
					</transition>
				</article>
			</div>
			<div class="portfolio__lock-wrapper" v-else>
				<p class="portfolio__lock-text">Please add your exchange API to unlock Holdings</p>
				<router-link to='/exchanges' class="portfolio__lock-button">Add API Key</router-link>
			</div>
		</div>	
	</div>
	<div class="portfolio__box portfolio-status" @click.self='hideDrop'>
		<p class="portfolio-status__heading">HOLDINGS</p>
		<p class="portfolio-status__heading">CHANGE 7d</p>
		<p class="portfolio-status__heading">ORIGINAL COST</p>
		<p class="portfolio-status__heading">REALIZED P/L</p>
		<p class="portfolio-status__text">${{ values.holdings }}</p>
		<p class="portfolio-status__text portfolio-status__text--green">${{ values.change7d }}</p>
		<p class="portfolio-status__text">${{ values.original }}</p>
		<p class="portfolio-status__text portfolio-status__text--green">${{ values.realised }}</p>
	</div>
	<div class="portfolio__box portfolio-graph" @click.self='hideDrop'>
		<div class="portfolio__title-wrapper portfolio-graph__header">
			<h1 class="portfolio__title">Balance chart</h1>
		</div>
		<div class="portfolio-graph__field"></div>
		<div class="portfolio-graph__value-box">
			<p class="portfolio-graph__value" v-for='n in 6' :key='n.id'>{{260 - 20 * n}},000</p>
		</div>
		<div class="portfolio-graph__date-box">
			<p class="portfolio-graph__date">21 Oct</p>
			<p class="portfolio-graph__date">28 Oct</p>
			<p class="portfolio-graph__date">04 Oct</p>
			<p class="portfolio-graph__date">11 Oct</p>
			<p class="portfolio-graph__date">18 Oct</p>
			<p class="portfolio-graph__date">25 Oct</p>
			<p class="portfolio-graph__date">Dev</p>
			<p class="portfolio-graph__date">09 Dev</p>
		</div>
	</div>
</main>
</template>
<script>
import IconAngleDown from "@/components/icons/IconAngleDown.vue"
import IconSearch from "@/components/icons/IconSearch.vue"
import IconClose from "@/components/icons/IconClose.vue"
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
	name: "Portfolio",
	components: {
		IconAngleDown,
		IconSearch,
		IconClose
	},
	data () {
		return {
			copySuccessful: false,
			copyUnsuccessful: false,
			filterExchanges: {
				dropList: false,
				selected: 'All Exchanges'
			},
			searchChars: '',
			statusSort: {
				coin: {
					active: false,
					direction: false
				},
				amount: {
					active: false,
					direction: false
				},
				exchanges: {
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
				value: {
					active: false,
					direction: false
				},
				percent: {
					active: false,
					direction: false
				}
			},
			withdraw: {
				address: '',
				amount: ''
			}
		}
	},
	computed: {
		...mapState({
			myApi: state => state.exchangesApi.myApi,
			portfolio: state => state.portfolio.portfolio,
			values: state => state.portfolio.values
    }),
		...mapGetters({
			someOpenWindow: "portfolio/someOpenWindow",
			getApiNamesIcons: "exchangesApi/getApiNamesIcons"
		}),
		getApiNames() {
			let selected = this.filterExchanges.selected,
					newArray =  this.getApiNamesIcons.concat({name: 'All Exchanges'});
			return newArray.filter(el => {
				return el.name !== selected;
			});
		},
		getPortfolio() {
			let selected = this.filterExchanges.selected,
					array = this.portfolio;
			if(selected == 'All Exchanges') {
				return this.searchInArray(array);
			} else {
				let re_2 = new RegExp(selected, 'gi');
				array = array.filter(el => {
					return el.exchanges.match(re_2);
				});
				return this.searchInArray(array);
			}
		},
		checkAmount() {
			return this.withdraw.amount? this.validAmount(this.withdraw.amount): false;
		}
	},
	methods: {
		...mapActions('portfolio', [
			'downloadAll',
			'sortPortfolio',
			'toggleDeposit', 
			'toggleWithdraw',
			'sortPortfolioDates'
		]),
		searchInArray(array) {
			let chars = this.searchChars;
			if(chars && this.validChars(chars)) {
				let	re = new RegExp(chars, 'gi');
				return array.filter(el => {
					return el.coin.match(re);
				})
			} else {
				return array;
			}	
		},
		validChars(chars) {
			// eslint-disable-next-line
			let re = /^(\w|\d)+$/;
			return re.test(chars);
		},
		validAmount(value) {
			// eslint-disable-next-line
			let re = /^(\d)+$/;
			return re.test(value);
		},
		...mapMutations('portfolio', [
			'toggleLoading'
		]),
		selectFilterByName(name) {
			this.filterExchanges.selected = name;
		},
		copy() {
			let link = document.querySelector('#deposit-address');
			link.setAttribute('type', 'text');
			link.select();
			try {
				let successful = document.execCommand('copy');
				if(successful) {
					this.copySuccessful = true;
					this.copyUnsuccessful = false;
					setTimeout(()=>{
						this.copySuccessful = false;
					}, 10000)
				} else {
					this.copySuccessful = false;
					this.copyUnsuccessful = true;
					setTimeout(()=>{
						this.copyUnsuccessful = false;
					}, 10000)
				}
			} catch (err) {
				this.errors.push(err);
				this.copySuccessful = false;
				this.copyUnsuccessful = true;
			}
			link.setAttribute('type', 'hidden');
			window.getSelection().removeAllRanges();
		},
		hideDrop() {
			this.filterExchanges.dropList = false;
		},
		sort(type) {
			this.cleanStatusSort(type);
			this.statusSort[type].active = true;
			this.statusSort[type].direction = !this.statusSort[type].direction;
			this.sortPortfolio(type);
		},
		sortDates(type) {
			this.cleanStatusSort(type);
			this.statusSort[type].active = true;
			this.statusSort[type].direction = !this.statusSort[type].direction;
			this.sortPortfolioDates(type);
		},
		cleanStatusSort(type) {
			let object = this.statusSort;
			for (const key in object) {
				if(key !== type) {
					for (const item in object[key]) {
						object[key][item] = false;
					}
				}
			}
		}
	},
	beforeMount() {
		this.downloadAll();
	}
}
</script>

<style lang="scss" scoped>
.portfolio {
	padding: 64px 0 16px;
	@include flex-col-def(center);
	&__box {
		width: 60%;
		min-width: 800px;
		@extend %box;
		padding: 25px 0 25px 32px;
		margin-bottom: 16px;
	}
	&__lock-wrapper {
		@extend %lock-wrapper;
		height: 100%;
	}
	&__lock-text {
		font-weight: 600;
		text-transform: uppercase;
		font-size: $size-2;
		color: $text-active-color;
		margin-bottom: 24px;
		letter-spacing: 0.28px;
	}
	&__lock-button {
		@extend %button;
		@extend %button-buy;
	}
	&__list-field {
		height: 220px;
		max-height: 220px;
		overflow-y: auto;
		transition-property: max-height, height;
		transition-duration: 0.2s;
		transition-timing-function: ease-in-out;
		padding-right: 32px;
		&--max {
			max-height: 320px;
			height: 320px;
		}
	}
	&__title-wrapper {
		@include flex-row-def(center);
	}
	&__title {
		margin-right: 12px;
		font-size: $size-13;
	}
	&__head {
		@include flex-row(space-between);
		align-items: flex-start;
		margin-bottom: 32px;
		padding-right: 32px;
	}
	&__head-inner {
		@include flex-row(center);
		flex-wrap: nowrap;
	}
	&__date-input {
		@extend %input;
		height: auto;
		padding: 9.5px 12px;
		color: $light-grey;
		&--margin {
			margin-right: 24px;
		}
	}
	&__angle-img {
		@extend %table-head-img;
	}
	&__table-row {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr 1.6fr 2.1fr 2fr 1.4fr 2fr 1.3fr 1.3fr 1.4fr;
		justify-items: start;
		justify-content: space-between;	
		grid-column-gap: 12px;
		&--head {
			padding: 0 36px 19px 0;
		}
	}
	&__table-cell {
		@extend %table-cell;
		padding-bottom: 18px;
		transition: all ease-in-out 0.2s;
		&--head {
			@extend %table-cell-head;
			padding-bottom: 0;
		}
		&--end {
			justify-self: end;
			text-align: right;
		}
		&--percent {
			color: $btn-color-buy;
		}
		&--line {
			text-align: right;
			justify-self: stretch;
			border-left: 1px solid $form-bg-color;
		}
		&--noline {
			padding-bottom: 0;
			margin-bottom: 18px;
		}
	}
	&__table-text {
		white-space: nowrap;
		color: $middle-grey;
		margin-right: 5px;
	}
	&__button {
		background-color: transparent;
		text-transform: capitalize;
		font-weight: 600;
		font-size: $size-3;
		transition: all ease-in-out 0.2s;
		&--deposit {
			color: $text-hover-color;
			&:active {
				color: $deposit-text-active-color;
			}
		}
		&--withdraw {
			color: $btn-color-buy;
			&:active {
				color: $withdraw-text-active-color;
			}
		}
		&--line {
			border-left: 1px solid $form-bg-color;
		}
	}
	&__filter {
		background-color: $bg-color;
		border-radius: 2px;
		padding: 4px 12px;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		margin-right: 22px;
		transition: all ease-in-out 0.2s;
		cursor: pointer;
		@include flex-row(space-between);
		&--exchanges {
			position: relative;
		}
		&:active {
			background-color: $form-bg-color;
			.portfolio__filter-text {
				color: $text-pressed-color;
			}
		}
	}
	&__filter-text {
		font-size: $size-2;
		color: $text-hover-color;
		font-weight: 600;
		text-transform: capitalize;
		margin-right: 6px;
		white-space: nowrap;
		letter-spacing: 0.28px;
		transition: all ease-in-out 0.2s;
	}
	&__filter-img {
		fill: $text-hover-color;
		width: 10px;
		height: 10px;
	}
	&__datepicker-input {
		position: absolute;
		bottom: -4px;
		left: 0;
		z-index: -1;
		opacity: 0;
		visibility: hidden;
	}
	&__search {
    flex: 1 0 180px;
    @extend %search;
    @media screen and (max-width: 1400px) {
      flex: 1 1 auto;
      order: 1;
      margin-bottom: 8px;
    }
  }
  &__search-img {
    @extend %search-img;
  }
  &__search-input {
    @extend %search-input;
	}
	&__drop-list {
		padding: 12px 0;
		@extend %drop-list;
		box-shadow: 0 3px 10px 0 rgba(20,15,28,0.10);
		max-height: calc(42px * 6);
		min-width: 124px;
		border-radius: 2px;
		border: none;
		left: auto;
		right: -1px;
	}
	&__drop-item {
		@extend %drop-item;
		height: auto;
		padding: 8px 16px;
	}
}
.deposit-window {
	padding: 18px 0 0;
	background-color: $form-bg-color;
	position: relative;
	&:after {
		content: ''; 
    position: absolute; 
		top: -20px; 
		right: 12%; 
    border: 10px solid transparent; 
		border-bottom: 10px solid $form-bg-color;  
		animation-name: fadeInUp;
		animation-duration: 0.3s;
	}
	&__close {
		position: absolute;
		right: 12px;
		top: 12px;
		padding: 4px;
		background-color: transparent;
		&:active svg {
			fill: $semidark-grey;
		}
	}
	&__close-icon {
		width: 12px;
		height: 12px;
		fill: $middle-grey;
		transition: all ease-in-out 0.2s;
	}
	&__line {
		height: 18px;
		background-color: $white;
	}
	&__caption {
		color: $text-active-color;
		font-size: $size-3;
		font-weight: 600;
		margin-bottom: 10px;
		padding-left: 32px;
	}
	&__address {
		min-width: 350px;
		@extend %input;
		background-color: $white;
		color: $light-grey;
		margin-right: 12px;
	}
	&__inner {
		@include flex-row-def(stretch);
		height: 36px;
		margin-bottom: 10px;
		padding-left: 32px;
	}
	&__button {
		@extend %button;
		@extend %button-buy;
		text-transform: capitalize;
		font-size: $size-4;
	}
	&__information {
		color: $text-scpecial-color;
		font-size: $size-3;
		font-weight: 600;
		margin-bottom: 15px;
		padding-left: 32px;
	}
}
.withdraw-window {
	padding: 18px 0 0;
	background-color: $form-bg-color;
	position: relative;
	&:after {
		content: ''; 
    position: absolute; 
		top: -20px; 
		right: 24px; 
    border: 10px solid transparent; 
		border-bottom: 10px solid $form-bg-color;  
		animation-name: fadeInUp;
		animation-duration: 0.3s;
	}
	&__close {
		position: absolute;
		right: 12px;
		top: 12px;
		padding: 4px;
		background-color: transparent;
		&:active svg {
			fill: $semidark-grey;
		}
	}
	&__close-icon {
		width: 12px;
		height: 12px;
		fill: $middle-grey;
		transition: all ease-in-out 0.2s;
	}
	&__line {
		height: 18px;
		background-color: $white;
	}
	&__info {
		padding-left: 32px;
		color: $middle-grey;
		font-size: $size-3;
		font-weight: 600;
		margin-bottom: 16px;
		&--margin-right {
			margin-right: 60px;
		}
	}
	&__input-name {
		color: $text-active-color;
		font-size: $size-3;
		font-weight: 600;
		margin-bottom: 10px;
	}
	&__row {
		@include flex-row-def(center);
		padding-right: 32px;
	}
	&__input {
		min-width: 200px;
		@extend %input;
		width: 100%;
	}
	&__inner {
		width: 90%;
		max-width: 800px;
		display: grid;
		grid-template-columns: 2fr 2fr 1fr;
		grid-template-rows: repeat(3, auto);
		grid-column-gap: 32px;
		grid-row-gap: 12px;
		padding: 0 32px 16px;
	}
	&__button {
		align-self: end;
		@extend %button;
		@extend %button-buy;
		text-transform: capitalize;
		font-size: $size-4;
	}
	&__text {
		color: $semidark-grey;
		font-size: $size-5;
		font-weight: 600;
		&--transaction {
			grid-area: 2 / 2 / 3 / 3;
		}
		&--total {
			grid-area: 3 / 2 / 4 / 3;
		}
	}
}
.portfolio-status {
	padding: 25px 32px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, auto);
	grid-gap: 8px;
	justify-items: center;
	&__heading {
		font-size: $size-1;
		font-weight: 500;
		color: $middle-grey;
	}
	&__text {
		color: $light-grey;
		font-size: $size-4;
		font-weight: 600;
		&--green {
			color: $btn-color-buy;
		}
	}
}
.portfolio-graph {
	padding: 25px 12px 25px 32px;
	display: grid;
	grid-template-columns: 8fr 80px;
	grid-template-rows: repeat(3,auto);
	grid-row-gap: 9px;
	grid-template-areas: 
		'header header'
		'graph value'
		'date .';
	&__header {
		grid-area: header;
		padding-bottom: 10px;
	}
	&__field {
		background-image: url('~@/assets/images/Clipboard01.jpg');
		@extend %bg-image;
		min-height: 240px;
		grid-area: graph;
	}
	&__value-box {
		padding-left: 18px;
		grid-area: value;
		display: grid;
		align-items: end;
		justify-content: space-between;
		grid-template-rows: repeat(6, auto);
	}
	&__value {
		padding-bottom: 8px;
	}
	&__date-box {
		grid-area: date;
		display: grid;
		grid-template-columns: repeat(8, auto);
		justify-content: space-between;
	}
	&__date,
	&__value {
		font-size: $size-1;
		color: $middle-grey;
		font-weight: 500;
		letter-spacing: -0.2px;
	}
}
</style>
