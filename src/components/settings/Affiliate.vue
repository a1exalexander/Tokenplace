<template>
<main class="affiliate">
	<section class="affiliate__header">
		<h1 class="affiliate__title">Affiliate programm</h1>
		<p class="affiliate__text">Share the experience of trading done right with the Bitsgap Referral Affiliate Program.<br>If you like using Bitsgap, please help us to grow. Invite your friends.<br>Your support is the best sign that we are doing a right thing.
		</p>
	</section>
	<section class="affiliate__section">
			<p class="affiliate__caption">YOUR PERSONAL REFERRAL LINK</p>
			<div class="affiliate__row affiliate__row--margin">
				<input type="url" 
					class="affiliate__personal-link" 
					:class='{"input-error": copyUnsuccessful, "input-accepted": copySuccessful}'
					:value="link" 
					readonly>
				<input 
					type="hidden" 
					id='referral-link' 
					:value="link" 
					readonly>
				<button 
					class="affiliate__button" 
					@click='copy'>Copy
				</button>
			</div>
			<div class="affiliate__row">
				<a href="#" 
					class="affiliate__social">
					<icon-twitter class="affiliate__social-ico"/>
				</a>
				<a href="#" 
					class="affiliate__social affiliate__social--margin">
					<icon-facebook class="affiliate__social-ico"/>
				</a>
				<a href="#" 
					class="affiliate__social">
					<icon-linked-in class="affiliate__social-ico"/>
				</a>
			</div>
	</section>
	<section class="affiliate__section affiliate__section--referral">
		<p class="affiliate__caption">REFERRAL HISTORY</p>
		<div class="referral">
			<div class="referral__row referral__row--heading">
				<p class="referral__text referral__text--heading referral__text--right">Sign-ups:
					<span class="referral__text referral__text--bold">13</span>
				</p>
			</div>
			<div class="referral__row referral__row--head">
				<button 
					class="referral__text referral__text--head"
					@click="sort('email')">EMAIL
					<icon-angle-down 
						class="referral__ico"
						:class='{"sort-image-active": status.email.direction, "sort-active-arrow": status.email.active}'/>
				</button>
				<button 
					class="referral__text referral__text--head referral__text--right"
					@click="sortDates('date')">DATE
					<icon-angle-down 
						class="referral__ico"
						:class='{"sort-image-active": status.date.direction, "sort-active-arrow": status.date.active}'/>
				</button>
			</div>
			<div class="referral__list">
				<div class="referral__row" v-for='(item, index) in referralHistory' :key='index'>
					<p class="referral__text">{{ item.email }}</p>
					<p class="referral__text referral__text--right">{{ item.date }}</p>
				</div>
			</div>
		</div>
	</section>
</main>
</template>
<script>
import IconAngleDown from '@/components/icons/IconAngleDown.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
	name: "Affiliate",
	components: {
		IconAngleDown,
		IconFacebook,
		IconLinkedIn,
		IconTwitter
	},
	data () {
		return {
			errors: [],
			copySuccessful: false,
			copyUnsuccessful: false,
			status: {
				email: {
					active: false,
					direction: false
				},
				date: {
					active: false,
					direction: false
				}
			}
		}
	},
	methods: {
		...mapActions("settings", [
			"getReferralHistory"
		]),
		...mapMutations("settings", [
			'sortReferralHistory',
			'sortReferralHistoryDates'
		]),
		copy() {
			let link = document.querySelector('#referral-link');
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
		sort(type) {
			this.cleanStatus(type);
			this.status[type].active = true;
			this.status[type].direction = !this.status[type].direction;
			this.sortReferralHistory(type);
		},
		sortDates(type) {
			this.cleanStatus(type);
			this.status[type].active = true;
			this.status[type].direction = !this.status[type].direction;
			this.sortReferralHistoryDates(type);
		},
		cleanStatus(type) {
			let object = this.status;
			for (const key in object) {
				if(key !== type) {
					for (const item in object[key]) {
						object[key][item] = false;
					}
				}
			}
		}
	},
	computed: {
		...mapState("settings", {
			referralHistory: state => state.referral.history,
			link: state => state.referral.link
		})
	},
	beforeMount() {
		this.getReferralHistory();
	}
}
</script>
<style lang="scss">
.affiliate {
	&__header {
		@extend %setting-section;
		padding: 0 0 40px;
	}
	&__section {
		@extend %setting-section;
		&--referral {
			border: none;
		}
	}
	&__title {
		@extend %setting-title;
		margin-bottom: 24px;
	}
	&__row {
		@include flex-row-def(center);
		&--margin {
			margin-bottom: 24px;
		}
	}
	&__text {
		@extend %setting-text;
	}
	&__button {
		@extend %button;
		@extend %button-buy;
		text-transform: none;
	}
	&__personal-link {
		@extend %input;
		color: $light-grey;
		width: 18%;
		min-width: 260px;
		margin-right: 12px;
	}
	&__caption {
		@extend %setting-caption;
	}
	&__social {
		width: 28px;
		height: 28px;
		border: 1px solid $text-hover-color;
		border-radius: 4px;
		@include flex-row(center);
		&--margin {
			margin: 0 16px;
		}
	}
	&__social-ico {
		fill: $text-hover-color;
		width: 14px;
		height: 14px;
	}
}

.referral {
	min-width: 440px;
	width: 30%;
	border-radius: 2px;
	background-color: $bg-color;
	padding: 0 0 16px 0;
	&__list {
		max-height: 140px;
		overflow-y: auto;
	}
	&__row {
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-column-gap: 24px;
		justify-items: start;
		justify-content: space-between;
		padding: 0 36px 0 28px;
		margin-bottom: 16px;
		&--head {
			margin-bottom: 18px;
			padding: 0 40px 0 28px;
		}
		&--heading {
			@include flex-row-def(center);
			background-color: $form-bg-color;
			padding: 16px 32px 16px 28px;
			margin-bottom: 16px;
		}
	}
	&__ico {
		@extend %ico;
		fill: $semidark-grey;
		margin-left: 4px;
	}
	&__text {
		text-align: left;
		white-space: nowrap;
		font-family: $second-font;
		font-size: $size-2;
		color: $semidark-grey;
		font-weight: 600;
		&--head {
			font-family: $base-font;
			text-transform: uppercase;
			@include flex-row(flex-start);
			background-color: transparent;
		}
		&--heading {
			color: $middle-grey;
		}
		&--right {
			justify-self: end;
			text-align: right;
		}
		&--bold {
			color: $semidark-grey;
			font-size: $size-3;
		}
	}
}
</style>
