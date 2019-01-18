<template>
<main class="security">
	<section class="security__header">
		<h1 class="security__title">Password and security</h1>
	</section>
	<form class="security__section" novalidate='true'>
		<p class="security__caption security__caption--margin-bottom">GANGE PASSWORD</p>
		<label class="security__label">
			<p class="security__text security__text--input">Current password</p>
			<input type="password" 
				class="security__input"  
				v-model.lazy="password.current"
				autocomplete="off"
				:class="{'input-error': password.errors.current.length, 'input-accepted': password.status.current}">
		</label>
		<label class="security__label">
			<p class="security__text security__text--input">New password</p>
			<input type="password" 
				class="security__input"  
				v-model.lazy="password.new"
				autocomplete="off"
				:class="{'input-error': password.errors.new.length, 'input-accepted': password.status.new}">
		</label>
		<label class="security__label security__label--margin">
			<p class="security__text security__text--input">Retype password</p>
			<input type="password" 
				class="security__input"  
				v-model.lazy="password.retype"
				autocomplete="off"
				:class="{'input-error': password.errors.retype.length, 'input-accepted': password.status.retype}">
		</label>
		<button 
			class="security__button" 
			:disabled='showButton'>Change password
		</button>
	</form>
	<section class="security__section security__section--verification">
		<div class="security__row">
			<p class="security__caption security__caption--two-step">Two step verification by google</p>
			<p class="security__status">{{ twoStepVerification?"ENABLED": "DISABLED" }}</p>
		</div>
		<p class="security__text security__text--two-step">Secure your account by requiring a special one-use code from your phone or dedicated security key every time you log in.</p>
		<button 
			class="security__button security__button--turnoff"
			@click='disableTwoStepVerification'
			v-if='twoStepVerification'>Turn off
		</button>
		<button 
			class="security__button security__button--enable"
			@click='showTwoStepVerification = true'
			v-else>Enable two-factor authentication
		</button>
	</section>
	<transition
		name="custom-classes-transition"
		enter-active-class="animated dur04 fadeIn"
		leave-active-class="animated dur05 fadeOut">
	<two-step-popup 
		@cancel='showTwoStepVerification = false' 
		v-if='showTwoStepVerification'/>
	</transition>
</main>
</template>
<script>
import TwoStepPopup from '@/components/settings/TwoStepPopup.vue'
import { mapState, mapMutations } from 'vuex'

export default {
	name: "Security",
	components: {
		TwoStepPopup
	},
	data () {
		return {
			password: {
				current: null,
				new: null,
				retype: null,
				status: {
					new: false,
					current: false,
					retype: false
				},
				errors: {
					new: [],
					current: [],
					retype: []
				}
			},
			showTwoStepVerification: false
		}
	},
	methods: {
		...mapMutations('settings', [
			'disableTwoStepVerification'
		]),
		checkPasswordCurrent() {
			if(this.password.current) {
				if (this.validPassword(this.password.current)) {
					this.password.status.current = true;
					this.password.errors.current = [];
				} else {
					this.pushError(this.password.errors.current, "Password must contain at least eight characters, at least one letter and one number.");
					this.password.status.current = false;
				}
			} else {
				this.password.status.current = false;
				this.password.errors.current = [];
			}
		},
		checkPasswordRetype() {
			if(this.password.retype) {
				if(!this.validPassword(this.password.retype)) {
					this.pushError(this.password.errors.retype, "Password must contain at least eight characters, at least one letter and one number.");
					this.password.status.retype = false;
				} else if (this.password.new !== this.password.retype) {
					this.pushError(this.password.errors.retype, "Passwords do not match.");
					this.password.status.retype = false;
				} else {
					this.password.status.retype = true;
					this.password.errors.retype = [];
				}
			} else {
				this.password.status.retype = false;
				this.password.errors.retype = [];
			}
		},
		checkPasswordNew() {
			if(this.password.new) {
				if(!this.validPassword(this.password.new)) {
					this.pushError(this.password.errors.new, "Password must contain at least eight characters, at least one letter and one number.");
					this.password.status.new = false;
				} else if (this.password.new == this.password.current) {
					this.pushError(this.password.errors.new, "The password is the same as the old one.");
					this.password.status.new = false;
				} else {
					this.password.status.new = true;
					this.password.errors.new = [];
				}
				if(this.password.retype) {
					this.checkPasswordRetype();
				}
			} else {
				this.password.status.new = false;
				this.password.errors.new = [];
			}
		},
		pushError(arr, error) {
			if(arr.length) {
				for(let item of arr) {
					if(item !== error) arr.push(error)
				}
			} else {
				arr.push(error)
			}	
		},
		validPassword(password) {
			let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
			return re.test(password);
		}
	},
	computed: {
		...mapState('settings', [
			'twoStepVerification'
		]),
		showButton() {
			let status = true;
			let obj = this.password.status;
			for(let item in obj) {
				status = !obj[item];
			}
			return status;
		}
	},
	watch: {
		"password.new"() {
			this.checkPasswordNew();
		},
		"password.current"() {
			this.checkPasswordCurrent();
		},
		"password.retype"() {
			this.checkPasswordRetype();
		}
	}
}
</script>
<style lang="scss">
.security {
	&__header {
		border-bottom: 1px solid $line-color;
		padding-bottom: 40px;
	}
	&__section {
		@extend %setting-section;
		@include flex-col-def(flex-start);
		&--verification {
			border: none;
		}
	}
	&__title {
		@extend %setting-title;
	}
	&__caption {
		@extend %setting-caption;
		&--margin-bottom {
			margin-bottom: 31px;
		}
		&--two-step {
			margin: 0 8px 0 0;
		}
		&--margin-right {
			margin: 0 8px 0 0;
		}
	}
	&__status {
		@extend %setting-status;
	}
	&__label {
		@include flex-row(flex-start);
		margin-bottom: 17px;
		&--margin {
			margin-bottom: 31px;
		}
	}
	&__input {
		@extend %input;
		min-width: 260px;
		width: 18%;
	}
	&__text {
		@extend %setting-text;
		&--input {
			width: 190px;
		}
		&--two-step {
			max-width: 450px;
			margin-bottom: 32px;
		}
		&--link {
			color: $text-hover-color;
		}
	}
	&__row {
		@include flex-row-def(center);
		margin-bottom: 24px;
	}
	&__button {
		@extend %button;
		text-transform: none;
		&--enable {
			@extend %button-buy;
		}
		&--turnoff {
			@extend %button-cancel;
			font-weight: 500;
		}
	}
	&__activity {
		@include flex-row(flex-start);
		padding: 24px 32px 24px 0;
		border-bottom: 1px solid $line-color;
		transition: max-height ease-in-out 1s;
		&:last-of-type {
			border: none;
		}		
	}
	&__activity-image-wrapper {
		width: 48px;
		height: 48px;
		margin-right: 32px;
	}
	&__activity-image {
		width: 100%;
		height: auto;
	}
	&__text-wrapper {
		margin-right: 48px;
	}
	&__view-all {
		margin-top: 12px;
		padding: 12px 12px 0 0;
		white-space: nowrap;
		background-color: transparent;
		@include flex-row-def(center);
		@extend %setting-text;
		color: $text-hover-color;
	}
	&__button-ico {
		margin-left: 7px;
		fill: $text-hover-color;
		width: 8px;
		height: 8px;
		transition: transform ease-in-out 0.2s;
	}
}
</style>
