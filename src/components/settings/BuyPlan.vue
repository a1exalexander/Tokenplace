<template>
<div class="buy-plan__wrapper">
	<main class="buy-plan animated dur1 fadeIn">
		<section class="buy-plan__header">
			<icon-logo class="buy-plan__logo"/>
			<h1 class="buy-plan__title">Buy subscription plan</h1>
		</section>
		<section class="buy-plan__row">
			<section class="buy-plan__col buy-plan__col--form">
				<p class="buy-plan__heading">Your Payment Mentod</p>
				<div class="buy-plan__form">
					<label for="card-input" class="buy-plan__label buy-plan__label--card-label">Card number</label>
					<p class="buy-plan__label buy-plan__label--expiries-label">Expires on</p>
					<p class="buy-plan__label buy-plan__label--security-label">Security code</p>
					<label for="country-input" class="buy-plan__label buy-plan__label--country-label">Country</label>
					<label for="index-input" class="buy-plan__label buy-plan__label--country-label">Country</label>
					<label for="-input" class="buy-plan__label buy-plan__label--index-label">Index</label>
					<input 
						id='card-input' 
						type="text" 
						maxlength="19"
						class="buy-plan__input buy-plan__input--card"
						:class="{'input-error': !status.cardNumber && inputValues.cardNumber, 'input-accepted': status.cardNumber}"
						v-model='inputValues.cardNumber'>
					<div class='buy-plan__input-wrapper buy-plan__input-wrapper--expiries-m'>
						<div class="buy-plan__arrows"></div>
						<input 
							type="number" 
							min='1' max='12'  
							class="buy-plan__input buy-plan__input--number buy-plan__input--expiries-m"
							:class="{'input-error': !checkExpiriesMonth && inputValues.expiriesMonth, 'input-accepted': checkExpiriesMonth}"
							v-model.number='inputValues.expiriesMonth'>
					</div>
					<div class='buy-plan__input-wrapper buy-plan__input-wrapper--expiries-y'>
						<div class="buy-plan__arrows"></div>
						<input 
							type="number" 
							:min='year'  
							class="buy-plan__input buy-plan__input--number buy-plan__input--expiries-y"
							:class="{'input-error': !checkExpiriesYear && inputValues.expiriesYear, 'input-accepted': checkExpiriesYear}"
							v-model.number='inputValues.expiriesYear'>
					</div>
					<input 
						type="text"
						id='securityCode-1' 
						maxlength="1"
						class="buy-plan__input buy-plan__input--security buy-plan__input--security-1"
						:class="{'input-error': !status.securityCode_1 && inputValues.securityCode_1, 'input-accepted': status.securityCode_1}"
						v-model='inputValues.securityCode_1'>
					<input 
						type="text"
						id='securityCode-2' 
						maxlength="1" 
						class="buy-plan__input buy-plan__input--security buy-plan__input--security-2"
						:class="{'input-error': !status.securityCode_2 && inputValues.securityCode_2, 'input-accepted': status.securityCode_2}"
						v-model='inputValues.securityCode_2'>
					<input 
						type="text"
						id='securityCode-3' 
						maxlength="1" 
						class="buy-plan__input buy-plan__input--security buy-plan__input--security-3"
						:class="{'input-error': !status.securityCode_3 && inputValues.securityCode_3, 'input-accepted': status.securityCode_3}"
						v-model='inputValues.securityCode_3'>
					<div class="buy-plan__input buy-plan__input--country" 
						:class="{'input-accepted': inputValues.country}"
						@click='countriesDrop = !countriesDrop'>
						<p class="buy-plan__placeholder">{{ inputValues.country }}</p>
						<icon-triangle class="buy-plan__triangle" 
							:class="{'image-rotate': countriesDrop}"/>
						<transition
							name="custom-classes-transition"
							enter-active-class="animated dur03 pullDownLight"
							leave-active-class="animated dur02 pullDownLight revers">
						<div class="buy-plan__drop-list" v-if='countriesDrop'>
							<p class="buy-plan__drop-item" 
								v-for='(item, index) in countries' 
								:key='index'
								@click="selectCountry(item)">{{ item }}
							</p>
						</div>
						</transition>
					</div>
					<input 
						id='index-input' 
						type="text" 
						maxlength="5" 
						class="buy-plan__input buy-plan__input--index"
						:class="{'input-error': !checkIndex && inputValues.index, 'input-accepted': checkIndex}"
						v-model.number='inputValues.index'>
				</div>
				<div class="buy-plan__check-wrapper">
					<label class="buy-plan__label-check">
						<input 
							class="buy-plan__check-default" 
							type="checkbox" 
							v-model='status.agree'>
						<div class="buy-plan__check">
							<icon-check class="buy-plan__check-img"/>
						</div>
					</label>
					<p class="buy-plan__check-text">I agree to the
						<a href="#" class="buy-plan__check-text buy-plan__check-text--link">Tokenplace Terms</a> 
						and the
						<a href="#" class="buy-plan__check-text buy-plan__check-text--link">Automatic Renewal Terms</a> 
						above
					</p>
				</div>
			</section>
			<section class="buy-plan__col">
				<p class="buy-plan__heading">{{ plan.name }}</p>
				<p class="buy-plan__price-label">To pay now:
					<span class="buy-plan__price">$ {{ plan.price }}</span>
				</p>
				<p class="buy-plan__text">{{ plan.description }}</p>
			</section>
		</section>
		<section class="buy-plan__footer">
			<a href="#" class="buy-plan__button-cancel" @click="cancel">Cancel</a>
			<button 
				class="buy-plan__button" 
				@click.prevent="buyPlan(plan.id)"
				:disabled='!showButtonBuy'>Buy now
			</button>
		</section>
	</main>
</div>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue'
import IconTriangle from '@/components/icons/IconTriangle.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import { mapMutations } from 'vuex'
import moment from 'moment-timezone'
import countries from "@/apps/countries"

export default {
	name: "BuyPlan",
	props: {
		plan: Object
	},
	components: {
		IconLogo,
		IconTriangle,
		IconCheck
	},
	data () {
		return {
			countriesDrop: false,
			form: {
				country: null,
				cardNumber: '',
				index: '',
				expiries: '',
				securityCode: ''
			},
			inputValues: {
				country: '',
				cardNumber: '',
				agree: false,
				index: '',
				expiriesMonth: '',
				expiriesYear: '',
				securityCode_1: '',
				securityCode_2: '',
				securityCode_3: ''
			},
			status: {
				cardNumber: false,
				securityCode_1: false,
				securityCode_2: false,
				securityCode_3: false,
				agree: false
			},
			errors: [],
			countries: countries
		}
	},
	methods: {
		cancel() {
			this.$emit('popup');
		},
		buyPlan(param) {
			this.setPlan(param);
			this.$emit('popup');
		},
		selectCountry(name) {
			this.inputValues.country = name;
		},
		checkSecurity(num) {
			let code = this.inputValues[`securityCode_${num}`];
			if(code) {
				if (this.validSecurity(code)) {
					this.status[`securityCode_${num}`] = true;
					if(num < 3) {
						document.getElementById(`securityCode-${+num + 1}`).focus();
					}
				} else {
					this.status[`securityCode_${num}`] = false;
				}
			} else {
				this.status[`securityCode_${num}`] = false;
			}
		},
		checkCardNumber() {
			let value = this.inputValues.cardNumber;
			if(value) {
				this.formatCardNumber();
				if (this.validCardNumber(value)) {
					this.status.cardNumber = true;
				} else {
					this.status.cardNumber = false;
				}
			} else {
				this.status.cardNumber = false;
			}
		},
		validSecurity(value) {
			let re = /^([0-9]){1}$/g;
			return re.test(value);
		},
		validExpiriesMonth(value) {
			if(value > 0 && value < 13) {
				return true;
			} else {
				return false;
			}
		},
		validExpiriesYear(value) {
			if(value >= this.year && value < 99) {
				return true;
			} else {
				return false;
			}
		},
		validIndex(value) {
			let re = /^([0-9]){5}$/g;
			return re.test(value);
		},
		validCardNumber(value) {
			// eslint-disable-next-line
			let re_1 = /^([1-9]{16})$/g,
			// eslint-disable-next-line
					re_2 = /^(([1-9]{4}(\s|\-)){3}[1-9]{4})$/g;
			return (re_1.test(value) || re_2.test(value));
		},
		...mapMutations('settings', [
			"setPlan"
		]),
		isNumeric(value) {
			return !isNaN(parseFloat(value)) && isFinite(value);
		},
		formatCardNumber() {
			let code = this.inputValues.cardNumber;
			if(code) {
				let codeLength = code.length,
						arr = code.split('');
				if( codeLength == 4 ){
					arr.splice(4, 0, " ");
				} else if (codeLength == 9) {
					arr.splice(9, 0, " ");
				} else if (codeLength == 14) {
					arr.splice(14, 0, " ");
				} else if (codeLength == 16) {
					let flag = arr.every(el => {
						return this.isNumeric(el);
					});
					if (flag) {
						arr.splice(4, 0, " ");
						arr.splice(9, 0, " ");
						arr.splice(14, 0, " ");
					}
				} else if (codeLength > 16) {
					let flag = arr.every(el => {
						return this.isNumeric(el);
					});
					if(flag) {
						arr.splice(16, (codeLength - 16));
					} 
				}
				this.inputValues.cardNumber = arr.join('');
			}
		},
	},
	computed: {
		year() {
			return +moment().format("YY");
		},
		showButtonBuy() {
			let object = this.status;
			let status = true;
			for (const key in object) {
				if(!object[key]) status = false
			}
			return (status &&
							this.checkIndex &&
							this.checkExpiriesYear &&
							this.checkExpiriesMonth &&
							this.inputValues.country);
		},
		checkIndex() {
			return this.validIndex(this.inputValues.index);
		},
		checkExpiriesYear() {
			return this.validExpiriesYear(this.inputValues.expiriesYear);
		},
		checkExpiriesMonth() {
			return this.validExpiriesMonth(this.inputValues.expiriesMonth);
		}
	},
	watch: {
		'inputValues.securityCode_1'() {
			this.checkSecurity(1);
		},
		'inputValues.securityCode_2'() {
			this.checkSecurity(2);
		},
		'inputValues.securityCode_3'() {
			this.checkSecurity(3);
		},
		'inputValues.cardNumber'() {
			this.checkCardNumber();
		}
	}
}
</script>

<style lang="scss">
.buy-plan {
	flex: 0 0 55%;
	min-width: 794px;
	@extend %box;
	padding: 39px 0 0;
	&__wrapper {
		padding: 24px;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		min-height: 100vh;
		background: $wrapper-color;
		z-index: 11;
		@include flex-row(center);
		overflow-y: auto;
	}
	&__header {
		margin-bottom: 32px;
		text-align: center;
	}
	&__logo {
		width: 99px;
		height: 46px;
		margin-bottom: 24px;
	}
	&__title {
		font-size: $size-7;
		color: $semi-black;
	}
	&__text {
		color: $middle-grey;
		font-size: $size-3;
		line-height: 20px;
	}
	&__row {
		@include flex-row(space-between);
		align-items: flex-start;
	}
	&__col {
		width: 50%;
		padding: 0 40px;
	}
	&__heading {
		color: $text-active-color;
		font-size: $size-5;
		font-weight: 600;
		margin-bottom: 16px;
	}
	&__price-label {
		font-size: $size-5;
		color: $text-active-color;
		font-weight: 500;
		margin-bottom: 8px;
	}
	&__price {
		padding-left: 8px;
		color: $btn-color-buy;
		font-size: $size-12;
	}
	&__form {
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 6px 2fr 13px repeat(4, 1fr);
		grid-template-rows: repeat(6, auto);
		grid-column-gap: 5px;
		grid-row-gap: 8px;
		justify-items: stretch;
		grid-template-areas: 
			"card-label card-label card-label . . . . ."
			"card card card card card card card card"
			"expiries-label expiries-label . . security-label security-label security-label ."
			"expiries-m . expiries-y . security-1 security-2 security-3 ."
			"country-label country-label . . . index-label index-label index-label"
			"country country country country . index index index";
		padding-bottom: 16px;
		border-bottom: 1px solid $button-disable-color;
	}
	&__input-wrapper {
		position: relative;
		&--expiries-m {
			grid-area: expiries-m;
		}
		&--expiries-y {
			grid-area: expiries-y;
		}
	}
	&__input {
		@extend %input;
		width: 100%;
		position: relative;
		&--number::-webkit-inner-spin-button {
			height: 26px;
			opacity: 0.5;
		}
		&--security {
			text-align: center;
			padding: 0;
		}
		&--security::-webkit-inner-spin-button {
			-webkit-appearance: textfield;
			-moz-appearance: textfield;
			appearance: textfield;
		}
		&--card {
			grid-area: card;
		}
		&--security-1 {
			grid-area: security-1;
		}
		&--security-2 {
			grid-area: security-2;

		}
		&--security-3 {
			grid-area: security-3;

		}
		&--country {
			grid-area: country;
		}
		&--index {
			grid-area: index;
		}
	}
	&__triangle {
		fill: $border-input;
		position: absolute;
		right: 12px;
		width: 11px;
		height: 11px;
	}
	&__arrows {
		position: absolute;
		pointer-events: none;
		width: 20px;
		background-color: rgba(255, 255, 255, 0.95);
		top: 2px;
		bottom: 2px;
		right: 10px;
		z-index: 1;
		@include flex-col(center);
		&::after,
		&::before {
			content: "";
			z-index: 1;
			position: absolute;
		}
		&::before {
			top: 2px;
			border: 5px solid transparent;	
			border-bottom: 5px solid $border-input;
		}
		&::after {
			bottom: 2px;
			border: 5px solid transparent;	
			border-top: 5px solid $border-input;
		}
	}
	&__label {
		font-size: $size-2;
		color: $text-active-color;
		font-weight: 600;
		&--card-label {
			grid-area: card-label;
		}
		&--expiries-label {
			grid-area: expiries-label;
		}
		&--security-label {
			grid-area: security-label;
		}
		&--country-label {
			grid-area: country-label;
		}
		&--index-label {
			grid-area: index-label;
		}
	}
	&__drop-list {
		@extend %drop-list;
		top: calc(100% + 1px);
		max-height: calc(36px * 6);
		z-index: 3;
	}
	&__drop-item {
		@extend %drop-item;
		height: 36px;
	}
	&__check-wrapper {
		@include flex-row-def(flex-start);
		padding: 16px 0;
	}
	&__label-check {
		@include flex-row-def(center);
		position: relative;
		margin-right: 16px;
	}
	&__check-img {
		@extend %check-img;
	}
	&__check-default {
		@extend %check-default;
		&:checked + .buy-plan__check {
			background-color: $text-hover-color;
			.buy-plan__check-img {
				display: block;
			}
		}
	}
	&__check {
		@extend %check;
	}
	&__check-text {
		flex: 0 1 80%;
		font-size: $size-2;
		color: $text-active-color;
		font-weight: 600;
		font-family: $second-font;
		&--link {
			color: $text-hover-color;
		}
	}
	&__footer {
		background-color: $bg-color;
		@include flex-row(flex-end);
		padding: 16px 36px;
		border-radius: 0 0 6px 6px;
	}
	&__button {
		@extend %button;
		@extend %button-buy;
		flex-shrink: 0;
		text-transform: none;
	}
	&__button-cancel {
		color: $semidark-grey;
		font-size: $size-4;
		margin-right: 32px;
	}
}
</style>
