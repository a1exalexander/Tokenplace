<template>
<section class="reset-pass">
	<form class="reset-pass__card">
		<div class="reset-pass__logo-wrapper">
			<icon-logo class="reset-pass__logo"/>
		</div>
		<p class="reset-pass__heading">Reset Password</p>
		<p class="reset-pass__description animated fadeIn slow" 
			v-if="success">Follow the instruction from the letter we just sent to your Email adress to reset your password
		</p>
		<p 
			class="reset-pass__description" 
			v-if="!success">Enter your email address below and we'll send you a link to reset your password.
		</p>
		<label class="reset-pass__label" v-if="!success">
			<p class="reset-pass__input-name">Email</p>
			<input 
				type="email" 
				class="reset-pass__input" 
				:class="{'input-error': !checkEmail && email, 'input-accepted': checkEmail}"
				autocomplete="on"
				v-model.trim="email">
		</label>
		<button 
			class="reset-pass__button reset-pass__button--success animated delay-02 fadeIn slow" 
			v-if="success" 
			@click.prevent='resetSuccess'>Log In
		</button>
		<div class="reset-pass__button-wrapper" v-if="!success">
			<a 
				href="#" 
				class="reset-pass__link" 
				@click.prevent='toSignIn'>
				<icon-angle-left class="reset-pass__link-img"/>
				Back to Log In
			</a>
			<button 
				class="reset-pass__button" 
				:class='{"button-loading": buttonLoading}'
				:disabled='!checkEmail' 
				@click.prevent="sendEmail">Reset
			</button>
		</div>
	</form>
</section>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue'
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue'
import http from "axios"
import { mapMutations } from 'vuex'

export default {
	name: "ResetPassword",
	components: {
		IconLogo,
		IconAngleLeft
	},
	data () {
		return {
			success: false,
			email: null,
			errors: [],
			buttonLoading: false
		}
	},
	methods: {
		...mapMutations('login', [
			'changeMessage'
		]),
		sendEmail() {
			this.buttonLoading = true;
			http
				.post('https://jsonplaceholder.typicode.com/posts', this.email)
				.then(() => {
					this.buttonLoading = false;
					this.success = true;
				})
				.catch(error => {
					this.errors.push(error)
				});
		},
		toSignIn() {
			this.$emit('toSignIn');
		},
		resetSuccess() {
			this.changeMessage('newPassword');
			this.$emit('toSignIn');
		},
		validEmail(email) {
			// eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
		}
	},
	computed: {
		checkEmail() {
			return this.validEmail(this.email);
		}
	}
}
</script>
<style lang="scss">
.reset-pass {
	@include flex-col-def(stretch);
	&__card {
		@include flex-col-def(stretch);
		@extend %login-card;
		margin-bottom: 27px;
	}
	&__logo-wrapper {
		text-align: center;
		margin-bottom: 24px;
	}
	&__logo {
		width: 120px;
		height: 60px;
	}
	&__heading {
		@extend %login-heading;
	}
	&__label {
		@include flex-col-def(stretch);
		margin-bottom: 32px;
	}
	&__input-name {
		@extend %login-input-name;
	}
	&__input {
		@extend %input;
		color: $semidark-grey;
	}
	&__button {
		@extend %button;
		@extend %button-buy;
		align-self: flex-end;
		text-transform: capitalize;
		&--success {
			align-self: center;
		}
	}
	&__button-wrapper {
		@include flex-row(space-between);
	}
	&__description {
		@extend %login-description;
	}
	&__link {
		@include flex-row-def(center);
		@extend %login-link;
	}
	&__link-img {
		@extend %login-link-img;
	}
}
</style>
