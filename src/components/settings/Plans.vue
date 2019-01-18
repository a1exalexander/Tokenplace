<template>
<main class="plans">
	<transition
		name="custom-classes-transition"
		enter-active-class="animated dur04 fadeIn"
		leave-active-class="animated dur05 fadeOut">
	<buy-plan @popup='hidePopup' v-if="popup" :plan="plan"/>
	</transition>
	<section class="plans__header">
		<h1 class="plans__title">Plans</h1>
		<p class="plans__text plans__text--header">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</p>
	</section>
	<section class="plans__section">
		<article class="plan" v-for='plan in plans' :key="plan.id">
			<div class="plan__current animated delay-02 dur04 pullDownLight" v-if="plan.status">
				<p class="plan__current-text">current plan</p>
			</div>
			<div class="plan__wrapper">
				<div class="plan__inner plan__inner--head">
					<h2 class="plan__name">{{ plan.name }}</h2>
					<p class="plan__price">$ {{ plan.price }}</p>
					<p class="plan__interval">{{ plan.interval }}</p>
					<div class="plan__line"></div>
				</div>
				<div class="plan__inner">
					<p class="plan__text plan__text--description">{{ plan.about_1 }}</p>
					<p class="plan__text plan__text--description">{{ plan.about_2 }}</p>
					<p class="plan__text">{{ plan.about_3 }}</p>
				</div>
			</div>
			<div class="plan__inner plan__inner--footer">
				<button class="plan__button animated dur06 fadeIn" 
					v-if="!plan.status" 
					@click='buyPlan(plan)'>Buy now
				</button>
				<button class="plan__text plan__text--button-cancel animated delay-03 dur04 fadeInUp" 
					v-if="plan.status" 
					@click="cancelPlan(plan.id)">Cancel subscription
				</button>
				<p class="plan__expiry animated delay-04 dur04 fadeInUp" v-if="plan.status">Date of Expiry:
					<span class="plan__expiry-date">{{ plan.expiry }}</span>
				</p>
			</div>			
		</article>
	</section>
</main>
</template>
<script>
import BuyPlan from "@/components/settings/BuyPlan.vue"
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
	name: "Plans",
	components: {
		BuyPlan
	},
	data () {
		return {
			popup: false,
			plan: {}
		}
	},
	computed: {
		...mapState("settings", [
			"plans"
		])
	},
	methods: {
		...mapActions("settings", [
			"getPlans"
		]),
		...mapMutations('settings', [
			"cancelPlan"
		]),
		hidePopup() {
			this.popup = false;
		},
		buyPlan(param) {
			this.plan = param;
			this.popup = true;
		}
	},
	beforeMount() {
		this.getPlans();
	}
}
</script>
<style lang="scss">
.plans {
	&__header {
		@extend %setting-section;
		padding: 0 0 40px;
		margin-bottom: 30px;
	}
	&__title {
		@extend %setting-title;
		margin-bottom: 24px;
	}
	&__section {
		@include flex-row-def(flex-start);
		flex-wrap: wrap;
	}
	&__text {
		@extend %setting-text;
		&--header {
			max-width: 570px;
		}
	}
}
.plan {
	box-shadow: 0 4px 4px 0 rgba(0,0,0,0.13);
	border-radius: 6px;
	background-color: $white;
	flex: 0 0 220px;
	padding: 0 0 20px;
	height: 340px;
	@include flex-col(space-between);
	margin: 0 32px 32px 0;
	position: relative;
	&__inner {
		width: 100%;
		text-align: center;
		padding: 18px 24px 20px;
		@include flex-col-def(center);
		&--head {
			padding: 28px 24px 0;
		}
		&--footer {
			padding: 0 24px 0;
		}
	}
	&__line {
		flex: 0 0 1px;
		background-color: $line-color;
		width: 100%;
	}
	&__name {
		font-size: $size-5;
		color: $text-active-color;
		font-weight: 500;
		margin-bottom: 16px;
	}
	&__price {
		color: $btn-color-buy;
		font-size: $size-12;
	}
	&__interval {
		color: $text-active-color;
		line-height: 20px;
		margin-bottom: 20px;
	}
	&__current {
		width: 100%;
		background-color: $btn-color-buy;
		border-radius: 6px 6px 0 0 ;
		text-align: center;
		position: absolute;
		top: 0;
	}
	&__current-text {
		line-height: 18px;
		color: $white;
		font-family: $second-font;
		font-size: $size-2;
	}
	&__expiry {
		font-family: $second-font;
		font-size: $size-1;
		color: $text-active-color;
		align-self: flex-start;
	}
	&__expiry-date {
		font-size: $size-3;
	}
	&__text {
		color: $semidark-grey;
		font-size: $size-1;
		line-height: 16px;
		&--button-cancel {
			color: $text-hover-color;
			background-color: transparent;
			font-weight: 500;
			margin-bottom: 20px;
		}
		&--description {
			margin-bottom: 8px;
		}
	}
	&__button {
		@extend %button;
		@extend %button-buy;
		flex-shrink: 0;
		text-transform: none;
		margin-bottom: 17px;
	}
}
</style>

