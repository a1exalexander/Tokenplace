<template>
<section class="two-step">
	<article class="two-step__card animated fadeIn dur08">
		<button 
			class="two-step__button-close"
			@click='cancel'>
			<icon-close class="two-step__close-img"/>
		</button>
		<div class="two-step__logo-wrapper">
			<icon-logo class="sign-in__logo"/>
		</div>
		<p 
			class="two-step__heading animated fadeIn slow" 
			v-if='success'>It works!<br/> You have set up 2-step Verification
		</p>
		<p 
			class="two-step__heading" 
			v-else>Two-step verification<br/> By Google Authenticator set up
		</p>
		<p 
			class="two-step__text animated delay-02 fadeIn slow" 
			v-if='success'>If you want to turn off 2-step Verification — you can do it in your settings, in "Security" section
		</p>
		<form v-else>
			<ol class="two-step__list">
				<li class="two-step__item">Install Google Authenticator App on your Android or IOS device</li>
				<li class="two-step__item">Scan this uniq QR by App
					<div class="two-step__qr-wrapper">
						<img :src="image" alt="qr" class='two-step__qr'>
					</div>
				</li>
				<li class="two-step__item">Write your Authentication code (2fa)
					<input 
						type="text" 
						class="two-step__input" 
						:class="{'input-error': !checkCode && code2fa, 'input-accepted': checkCode}"
						autocomplete="on"
						v-model.trim="code2fa">
				</li>
			</ol>
			<div class="two-step__button-wrapper">
				<button 
					class="two-step__button two-step__button--cancel" 
					@click.prevent='cancel'>Cancel
				</button>
				<button 
					class="two-step__button two-step__button--apply" 
					:class='{"button-loading": buttonLoading}'
					@click.prevent='apply'
					:disabled='!code2fa'>Apply
				</button>
			</div>
		</form>
	</article>
</section>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { mapMutations } from 'vuex'
import http from 'axios'

export default {
	name: 'TwoStepPopup',
	components: {
		IconLogo,
		IconClose
	},
	data () {
		return {
			code2fa: '',
			errors: [],
			buttonLoading: false,
			image: '',
			success: false
		}
	},
	methods: {
		...mapMutations('settings', [
			'enableTwoStepVerification'
		]),
		apply() {
			this.buttonLoading = true;
			http.post('https://jsonplaceholder.typicode.com/posts', this.code2fa)
				.then(() => {
					this.buttonLoading = false;
					this.success = true;
					this.enableTwoStepVerification();
				})
				.catch(error => {
					this.errors.push(error)
				})
		},
		cancel() {
			this.$emit('cancel');
		}
	},
	computed: {
		showTitle() {
			return this.success? "It works! You have set up 2-step Verification": "Two-step verification By Google Authenticator set up";
		},
		checkCode() {
			return !!this.code2fa;
		}
	},
	beforeMount() {
		this.image = require('@/assets/images/test-qr.jpg');
	}
}
</script>
<style lang="scss">
.two-step {
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
	&__card {
		flex: 0 0 30%;
		min-width: 400px;
		@extend %login-card;
		padding: 40px 0 0 0;
		position: relative;
	}
	&__heading {
		@extend %login-heading;
		padding: 0 40px;
	}
	&__input {
		@extend %input;
		color: $semidark-grey;
		width: 260px;
		margin-top: 11px;
	}
	&__logo-wrapper {
		text-align: center;
		margin-bottom: 24px;
		padding: 0 40px;
	}
	&__logo {
		width: 99px;
		height: 46px;
	}
	&__list {
		list-style-position: inside;
		padding: 0 40px;
	}
	&__item {
		font-weight: 600;
		font-size: $size-5;
		color: $text-active-color;
		margin-bottom: 32px;
	}
	&__qr-wrapper {
		margin-top: 18px;
		width: 104px;
		height: 104px;
		border: 1px solid $qr-border-color;
		padding: 1px;
	}
	&__button-wrapper {
		padding: 16px 40px;
		@include flex-row(flex-end);
		background-color: $bg-color;
	}
	&__button {
		@extend %button;
		text-transform: capitalize;
		font-weight: 500;
		&--cancel {
			@extend %button-cancel;
			background-color: transparent;
			margin-right: 16px;
			&:active {
				background-color: transparent;
				color: $darker-grey;
			}
		}
		&--apply {
			@extend %button-buy;
		}
	}
	&__text {
		color: $light-grey;
		font-size: $size-3;
		font-weight: 600;
		font-family: $second-font;
		text-align: center;
		padding: 0 54px 40px;
	}
	&__button-close {
		background-color: transparent;
		padding: 4px;
		position: absolute;
		top: 24px;
		right: 24px;
	}
	&__close-img {
		width: 14px;
		height: 14px;
		fill: $middle-grey;
	}
}
</style>
