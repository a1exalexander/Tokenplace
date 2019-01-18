<template>
<div class="login">
	<transition
	appear
	name="custom-classes-transition"
	enter-active-class="animated dur06 fadeIn"
	leave-active-class="animated dur04 fadeOut"
	mode="out-in">
	<sign-in 
		class="login__box" 
		@toSignUp='toSignUp' 
		@toTwoStepVerification='toTwoStepVerification'
		@toResetPassword='toResetPassword'
		v-if="visible.signIn" 
		key='signIn'/>
	<sign-up 
		class="login__box"  
		@toSignIn='toSignIn' 
		v-else-if="visible.signUp" 
		key='signUp'/>
	<two-step-login 
		class="login__box"  
		v-else-if='visible.twoStepVerification' 
		key='twoStepVerification'/>
	<reset-password 
		class="login__box" 
		@toSignIn='toSignIn' 
		v-else 
		key='resetPassword'/>
	</transition>
</div>
</template>
<script>
import SignUp from '@/components/login/SignUp.vue'
import SignIn from '@/components/login/SignIn.vue'
import ResetPassword from '@/components/login/ResetPassword.vue'
import TwoStepLogin from '@/components/login/TwoStepLogin.vue'

export default {
	name: "Login",
	components: {
		SignUp,
		SignIn,
		ResetPassword,
		TwoStepLogin
	},
	data () {
		return {
			visible: {
				signUp: false,
				signIn: true,
				resetPassword: false,
				twoStepVerification: false
			}
		}
	},
	methods: {
		toSignIn() {
			this.cleanVisible()
			this.visible.signIn = true;
		},
		toTwoStepVerification() {
			this.cleanVisible()
			this.visible.twoStepVerification = true;
		},
		toSignUp() {
			this.cleanVisible();
			this.visible.signUp = true;
		},
		toResetPassword() {
			this.cleanVisible()
			this.visible.resetPassword = true;
		},
		cleanVisible() {
			let obj = this.visible;
			for(let item in obj) {
				obj[item] = false;
			}
		}
	}
}
</script>

<style lang="scss">
	.login {
		min-height: 100vh;
		padding: 16px;
		@include flex-row(center);
		&__box {
			flex: 0 0 400px;
		}
	}
</style>
