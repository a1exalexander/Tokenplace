<template>
<main class="setting-general">
	<section class="setting-general__header">
		<h1 class="setting-general__title">general</h1>
		<p class="setting-general__userid">USER ID: {{ userId }} </p>
	</section>
	<section class="setting-general__section">
		<label class="setting-general__label">
			<p class="setting-general__caption">EMAIL</p>
			<input type="email" 
				class="setting-general__input setting-general__input--email" 
				:disabled="email.disabled" 
				v-model="email.userEmail">
		</label>
	</section>
	<section class="setting-general__section">
		<div class="setting-general__inner">
			<p class="setting-general__caption">DEFAULT CURRENCY</p>
			<div class="setting-general__input setting-general__input--currency" 
				@click='currency.dropMenu = !currency.dropMenu'>
				<p class="setting-general__placeholder">{{ currentCurrency }}</p>
				<icon-angle-down class="setting-general__input-ico" :class="{'image-rotate': currency.dropMenu}"/>
				<transition
					name="custom-classes-transition"
					enter-active-class="animated dur03 pullDownLight"
					leave-active-class="animated dur02 pullDownLight revers">
				<div class="setting-general__drop-list" v-if='currency.dropMenu'>
					<p class="setting-general__drop-item" 
						v-for='(item, index) in currency.list' 
						:key='index'
						@click='setDefaultCurrency(item)'>{{ item }}
					</p>
				</div>
				</transition>
			</div>
		</div>
		<div class="setting-general__inner setting-general__inner--margin">
			<p class="setting-general__caption">LANGUAGE</p>
			<div class="setting-general__input setting-general__input--language" 
				:class="{'input-disable': language.disabled}"
				@click='language.dropMenu = !language.dropMenu'>
				<p class="setting-general__placeholder">{{ currentLanguage }}</p>
				<icon-angle-down class="setting-general__input-ico" 
					:class="{'image-rotate': language.dropMenu}"/>
				<transition
					name="custom-classes-transition"
					enter-active-class="animated dur03 pullDownLight"
					leave-active-class="animated dur02 pullDownLight revers">
				<div class="setting-general__drop-list" v-if='language.dropMenu'>
					<p class="setting-general__drop-item" 
						v-for='(item, index) in language.list' 
						:key='index'
						@click='setDefaultLanguage(item)'>{{ item }}
					</p>
				</div>
				</transition>
			</div>
		</div>
		<div class="setting-general__inner">
			<p class="setting-general__caption">TIME ZONE</p>
			<div class="setting-general__input setting-general__input--timezone" 
				:class="{'input-disable': timeZone.disabled}"
				@click='timeZone.dropMenu = !timeZone.dropMenu'>
				<p class="setting-general__placeholder">{{ defaultTimeZone }}</p>
				<icon-angle-down class="setting-general__input-ico" 
					:class="{'image-rotate': timeZone.dropMenu}"/>
				<transition
					name="custom-classes-transition"
					enter-active-class="animated dur03 pullDownLight"
					leave-active-class="animated dur02 pullDownLight revers">
				<div class="setting-general__drop-list" v-if='timeZone.dropMenu'>
					<p class="setting-general__drop-item" 
						v-for='(item, index) in timeZone.list' 
						:key='index'
						@click='setDefaultZone(item.key)'>{{ item.value }}
					</p>
				</div>
				</transition>
			</div>
		</div>
	</section>
	<section class="setting-general__section setting-general__section--notification">
		<p class="setting-general__caption">notification</p>
		<label class="setting-general__label-check">
			<input class="setting-general__check-default" type="checkbox" v-model='check'>
			<div class="setting-general__check">
				<icon-check class="setting-general__check-img"/>
			</div>
			<p class="setting-general__text">Show «Cancel order» notification</p>
		</label>
		<div class="setting-general__buttons-wrapper">
			<button class="setting-general__button setting-general__button--save">Save changes</button>
			<router-link to='/dashboard' class="setting-general__button setting-general__button--cancel">Cancel</router-link>
		</div>
	</section>
</main>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import moment from 'moment-timezone'
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
	name: "General",
	components: {
		IconAngleDown,
		IconCheck
	},
	data () {
		return {
			userId: "E512569",
			check: false,
			email: {
				disabled: false,
				userEmail: "kodjima33@gmail.com"
			},
			currency: {
				list: ["USD", "EUR"],
				dropMenu: false
			},
			language: {
				list: ["English", "Русский"],
				dropMenu: false,
				disabled: false
			},
			timeZone: {
				list: [],
				dropMenu: false,
				disabled: false
			}
		}
	},
	methods: {
		...mapMutations('settings', [
			'setDefaultZone',
			'setDefaultLanguage',
			'setDefaultCurrency'
		]),
		getTimeZones() {
			this.timeZone.list = moment.tz.names().map(item=>{
				return {
					value: `(GMT${moment().tz(item).format("Z")}) ${item}`,
					key: item
				}
			})
		}
	},
	computed: {
		...mapGetters("settings", {
			defaultTimeZone: "defaultTimeZone"
		}),
		...mapState("settings", {
			currentLanguage: "language",
			currentCurrency: "currency"
		}),
	},
	beforeMount() {
		this.getTimeZones();
	}
}
</script>
<style lang="scss">
.setting-general {
	&__header {
		border-bottom: 1px solid $line-color;
		padding-bottom: 40px;
	}
	&__section {
		@extend %setting-section;
		@include flex-row-def(center);
		&--notification {
			@include flex-col-def(flex-start);
			border: none;
		}
	}
	&__title {
		@extend %setting-title;
		margin-bottom: 16px;
	}
	&__userid {
		@extend %setting-text;
		text-transform: uppercase;
	}
	&__caption {
		@extend %setting-caption;
	}
	&__inner {
		&--margin {
			margin: 0 56px;
		}
	}
	&__input {
		position: relative;
		@extend %input;
		@include flex-row(space-between);
		color: $light-grey;
		padding-left: 16px;
		&--email {
			min-width: 260px;
			width: 18%;
		}
		&--currency {
			cursor: pointer;
			min-width: 140px;
			width: 10%;
		}
		&--language {
			cursor: pointer;
			min-width: 120px;
			width: 8.4%;
		}
		&--timezone {
			cursor: pointer;
			min-width: 290px;
			width: 16%;
		}
	}
	&__input-ico {
		@extend %setting-input-ico;
	}
	&__drop-list {
		@extend %drop-list;
		top: calc(100% + 1px);
		max-height: calc(42px * 8);
	}
	&__drop-item {
		@extend %drop-item;
	}
	&__placeholder {
		white-space: nowrap;
	}
	&__label-check {
		@include flex-row-def(center);
		margin-bottom: 54px;
		position: relative;
	}
	&__check-img {
		@extend %check-img;
	}
	&__check-default {
		@extend %check-default;
		&:checked + .setting-general__check {
			background-color: $text-hover-color;
			.setting-general__check-img {
				display: block;
			}
		}
	}
	&__check {
		@extend %check;
		margin-right: 24px;
	}
	&__text {
		@extend %setting-text;
	}
	&__buttons-wrapper {
		@include flex-row(center);
	}
	&__button {
		@extend %button;
		text-transform: none;
		&--save {
			margin-right: 24px;
			@extend %button-buy;
		}
		&--cancel {
			@extend %button-cancel;
		}
	}
}
</style>

