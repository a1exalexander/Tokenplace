<template>
<div class="exchange" @click.self="visible.dropMenu = false">
	<transition
		name="custom-classes-transition"
		enter-active-class="animated dur1 fadeIn"
		leave-active-class="animated dur05 fadeOut">
	<dir 
		class="exchange__box exchange__box--store exchange__box--margin" 
		@click="visible.dropMenu = false" 
		v-if="myApi.length">
		<div class="exchange__title-wrapper">
			<h1 class="exchange__title">Your API Keys</h1>
		</div>
		<div class="exchange__header">
			<p class="exchange__heading">exchange</p>
			<p class="exchange__heading">api key</p>
			<p class="exchange__heading exchange__heading--balance">balance</p>
			<p class="exchange__heading exchange__heading--status">status</p>
		</div>
		<transition-group 
			name="custom-classes-transition"
			enter-active-class="animated dur06 fadeIn"
			leave-active-class="absolute animated dur06 fadeOut"
			leave-to-class="animated dur06 fadeOut"
			tag='div'>
		<div class="api-item" v-for='(item, index) in myApi' :key='item.id'>
			<div class="api-item__name-wrapper">
				<div class="api-item__name-img"></div>
				<p class="api-item__name">{{ item.name }}</p>
			</div>
			<p class="exchange__api">{{ item.api }}</p>
			<p class="api-item__balance">{{ item.balance }} USD</p>		
			<label class="api-item__status" >
				<input 
					class="api-item__status-input" 
					name='status' 
					type="checkbox"  
					v-model="item.status"/>
				<div class="api-item__status-dot-wrapper">
					<div class="api-item__status-dot"></div>
				</div>
			</label>
			<button class="api-item__delete" @click='$deleteApi(index)'>
				<icon-minus class="api-item__delete-img"/>
			</button>
		</div>
		</transition-group>
	</dir>
	</transition>
	<div class="exchange__box" @click.self="visible.dropMenu = false">
		<div class="exchange__box-inner" @click.self="visible.dropMenu = false">
			<div 
				class="exchange__title-wrapper exchange__title-wrapper--avilible" 
				@click.self="visible.dropMenu = false">
				<h1 class="exchange__title">Avialible Exchanges</h1>
			</div>
			<div 
				class="exchange__drop-menu" 
				@click.self="visible.dropMenu = !visible.dropMenu">
				<p class="exchange__drop-placeholder">{{ dropList.select?dropList.select:"Choose an exchange"}}</p>
				<icon-angle-down 
					class="exchange__sort-button-img" 
					:class='{"sort-image-active": visible.dropMenu}'/>
				<transition
					name="custom-classes-transition"
					enter-active-class="animated dur03 pullDownLight"
					leave-active-class="animated dur02 pullDownLight revers">
				<div class="exchange__drop-list" v-show='visible.dropMenu'>
					<div 
						class="exchange__drop-item" 
						v-for='item in getApiNames' 
						:key='item.id' 
						@click="selectDropItem(item)">
						<div class="exchange__drop-item-img"></div>
						<p class="exchange__drop-item-name">{{ item}}</p>
					</div>
				</div>
				</transition>
			</div>
		</div>
		<div 
			class="exchange__header exchange__header--avilible" 
			@click.self="visible.dropMenu = false">
			<p class="exchange__heading">exchange</p>
			<p class="exchange__heading">api key</p>
		</div>
		<div class="exchange__field" @click="visible.dropMenu = false">
			<transition-group 
				name="custom-classes-transition"
				enter-active-class="animated dur06 fadeIn"
				leave-active-class="absolute"
				leave-to-class="animated dur06 fadeOut"
				tag='div'>
			<div class="api-box" v-for='(item, index) in apiBox' :key='item.id'>
				<div class="api-box__name-wrapper">
					<div class="api-box__name-img"></div>
					<p class="api-box__name">{{ item.name }}</p>
				</div>
				<input class='api-box__input api-box__input--api' 
					type="text" 
					placeholder="API Key"
					v-model.trim="item.api">
				<input class='api-box__input api-box__input--key' 
					type="text" 
					placeholder="Secret Key"
					v-model.trim="item.key">
				<button class="api-box__button-save" 
					:disabled='!(item.api && item.key)'
					@click='$addApi(index)'>Save</button>
				<button class="api-box__create-button">Create an account</button>
			</div>
			</transition-group>
		</div>
	</div>
</div>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
	name: "MyExchanges",
	components: {
		IconMinus,
		IconAngleDown
	},
	data () {
		return {
			visible: {
				dropMenu: false
			},
			dropList: {
				select: ""
			}
		}
	},
	methods: {
		selectDropItem(name) {
			this.dropList.select = name;
			this.visible.dropMenu = false;
		},
		...mapActions('exchangesApi', [
			'addApi',
			'deleteApi'
		]),
		...mapMutations('dashboard', [
			'setLastActivity'
		]),
		$addApi(api) {
			this.addApi(api);
			this.setLastActivity();
		},
		$deleteApi(api) {
			this.deleteApi(api);
			this.setLastActivity();
		}
	},
	computed: {
		...mapState({
			apiBox: state => state.exchangesApi.apiBox,
			myApi: state => state.exchangesApi.myApi
		}),
		...mapGetters('exchangesApi', [
			'getApiNames'
		])
	}
}
</script>
<style lang="scss" scoped>
.exchange {
	@include flex-col(stretch);
	align-items: stretch;
	padding: 64px 13% 24px;
	&__box {
		@include flex-col-def(stretch);
		@extend %box;
		padding: 0;
		position: relative;
		z-index: 2;
		transition-property: height, max-height, flex, flex-basis;
		transition-duration: 0.5s;
		transition-timing-function: ease-in-out;
		&--store {
			z-index: 0;
		}
		&--margin {
			margin-bottom: 16px;
		}
	}
	&__box-inner {
		@include flex-row(space-between);
		padding: 30px 32px;
	}
	&__title-wrapper {
		@include flex-row-def(center);
		padding: 30px 32px;
		&--avilible {
			padding: 0;
		}
	}
	&__title {
		margin-right: 17px;
		font-size: $size-13;
	}
	&__header {
		padding: 5px 32px 20px;
		display: grid;
		grid-template-columns: 140px 8fr 3fr 3fr 1fr;
		justify-items: start;
		grid-column-gap: 24px;
		&--avilible {
			grid-template-columns: 140px auto;
		}
	}
	&__heading {
		font-size: $size-5;
		color: $middle-grey;
		font-weight: 600;
		letter-spacing: 0.35px;
		text-transform: uppercase;
		&--balance {
			justify-self: end;
		}
		&--status {
			margin-left: 4rem;
		}
	}
	&__field {
		overflow-y: auto;
		flex: 1 1 512px;
	}
	&__drop-menu {
		@extend %drop-menu;
		width: 200px;
		height: 36px;
	}
	&__drop-placeholder {
		font-family: $second-font;
		font-size: $size-3;
		color: $semidark-grey;
		pointer-events: none;
	}
	&__drop-list {
		@extend %drop-list;
		top: calc(100% + 1px);
	}
	&__drop-item {
		@extend %drop-item;
	}
	&__drop-item-img {
		@extend %drop-item-img;
	}
	&__drop-item-name {
		@extend %drop-item-name;
	}
	&__sort-button-img {
		@extend %blue-img;
	}
}
.api-item {
	padding: 25px 35px;
	display: grid;
	grid-template-columns: 140px 8fr 3fr 3fr 1fr;
	justify-items: start;
	grid-column-gap: 24px;
	align-items: center;
	font-size: $size-3;
	color: $text-active-color;
	font-weight: 600;
	border-top: 1px solid $line-color;
	transition: all 0.6s;
	&__name-wrapper {
		@include flex-row-def(center);
	}
	&__name-img {
		height: 24px;
		width: 24px;
		background-color: $text-hover-color;
		border-radius: 50%;
		margin-right: 1rem;
	}
	&__name {
		text-transform: capitalize;
	}
	&__balance {
		justify-self: end;
	}
	&__delete {
		background-color: transparent;
		width: 26px;
		height: 26px;
		@include flex-row(center);
		justify-self: end;
		transition: 0.2s ease-in-out;
		&:active svg {
			fill: $text-pressed-color;
		}
		@media (min-width: 480px) {
			&:hover {
				opacity: 0.95;
			}
		}
	}
	&__delete-img {
		width: 18px;
		height: 18px;
		fill: $text-hover-color;
		pointer-events: none;
		transition: 0.2s ease-in-out;
	}
	&__status {
		width: 36px;
		margin-left: 4rem;
		position: relative;
		@include flex-row-def(center);
		z-index: 2;
		cursor: pointer;
		@media (min-width: 480px) {
			&:hover {
				filter: brightness(1.02);
			}
		}
	}
	&__status-input {
		left: 6px;
		opacity: 0;
		z-index: -1;
		position: absolute;
		pointer-events: none;
		&:checked + .api-item__status-dot-wrapper .api-item__status-dot {
			background-color: $text-hover-color;
			transform: translateX(95%);
		}
		&:checked + .api-item__status-dot-wrapper {
			background-color: rgba(0, 115, 255, 0.5);
		}
	}
	&__status-dot-wrapper {
		width: 34px;
		height: 14px;
		border-radius: 25px;
		background-color: rgba(208, 219, 230, 0.8);
		transition: 0.3s ease-in-out;
		@include flex-row-def(center);
	}
	&__status-dot {
		width: 20px;
		height: 20px;
		background-color: $light-grey;
		border-radius: 50%;
		transition: 0.3s ease-in-out;
		transform: translateX(-4px);
	}
}

.api-box {
	padding: 20px 35px;
	display: grid;
	grid-template-columns: 140px 1fr 1fr auto auto;
	grid-column-gap: 24px;
	justify-items: start;
	align-items: center;
	font-size: $size-3;
	color: $text-active-color;
	font-weight: 600;
	background-color: $white;
	border-top: 1px solid $line-color;
	&__input {
		@extend %input;
		justify-self: stretch;
	}
	&__name-wrapper {
		@include flex-row-def(center);
	}
	&__name-img {
		height: 24px;
		width: 24px;
		background-color: $text-hover-color;
		border-radius: 50%;
		margin-right: 1rem;
	}
	&__name {
		text-transform: capitalize;
	}
	&__button-save {
		@extend %button;
		@extend %button-buy;
		text-transform: capitalize;
	}
	&__question {
		width: 20px;
		height: 20px;
		fill: $lightest-grey;
		cursor: pointer;
		transition: fill ease-in-out 0.15s;
		background-color: transparent;
		@include flex-row(center);
		@media (min-width: 480px) {
			&:hover .api-box__question-img{
				fill: $light-grey;
			}
		}
	}
	&__question-img {
		width: 17px;
		height: 17px;
		fill: $lightest-grey;
		pointer-events: none;
		transition: fill ease-in-out 0.15s;
	}
	&__create-button {
		white-space: nowrap;
		background-color: transparent;
		color: $text-hover-color;
		font-size: $size-3;
		font-weight: 600;
		transition: fill ease-in-out 0.15s;
		@media (min-width: 480px) {
			&:hover {
				opacity: 0.95;
			}
		}
	}
}

</style>



