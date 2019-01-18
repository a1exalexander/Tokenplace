<template>
<main class="support">
	<transition
		name="custom-classes-transition"
		enter-active-class="animated dur04 fadeIn"
		leave-active-class="animated dur06 fadeOut">
	<new-support @cancel='newSupportPopup = false' v-if='newSupportPopup'/>
	</transition>
	<section class="support__box">
		<section class="support__header">
			<h1 class="support__title">Support</h1>
			<button class="support__button-empty">
				<p 
					class="support__button-empty-text"
					@click='newSupportPopup = true'>Send new request to support
				</p>
				<div class="support__send-img-wrapper">
					<icon-send class="support__send-img"/>
				</div>
			</button>
		</section>
		<ul class="support__row">
			<li class="support__cell support__cell--head">theme</li>
			<li 
				class="support__cell support__cell--head support__cell--right support__cell--date"
				@click="$sortDates('lastDate')">last massage date
				<icon-angle-down 
					class="support__head-img"
					:class='{"sort-image-active": statusSort.lastDate.direction, "sort-active-arrow": statusSort.lastDate.active}'/>
			</li>
			<li class="support__cell support__cell--head support__cell--status">status</li>
		</ul>
		<section class="support__element" v-for='(item, index) in support' :key='item.id'>
			<ul class="support__row">
				<li class="support__cell">{{ item.theme }}</li>
				<li class="support__cell support__cell--right support__cell--date">{{ item.lastDate }}</li>
				<li 
					class="support__cell support__cell--status"
					:class='statusMessageClass[item.status]'>{{ statusMessageText[item.status] }}
				</li>
				<li class="support__cell support__cell--right support__cell--details">
					<button 
						class="support__button-empty"
						@click='toggleBox(index)'>
						<p class="support__button-empty-text">Details</p>
						<icon-angle-down 
							class="support__button-empty-img"
							:class='{"sort-image-active": item.box}'/>
					</button>
				</li>
			</ul>
			<transition
				name="custom-classes-transition"
				enter-active-class="animated dur08 fadeIn"
				leave-active-class="animated dur01 fadeOut">
			<section class="support__message-box" v-if='item.box'>
				<button 
					class="support__button-close"
					@click='item.box = false'>
					<icon-close class="support__close-img"/>
				</button>
				<article 
					class="support__message-row" 
					:class="{'support__message-row--incoming': message.incoming}"
					v-for='(message, index) in item.messages' 
					:key='index'>
					<p 
						class="support__message-time"
						:class="{'support__message-time--incoming': message.incoming}">{{ message.time }}
					</p>
					<section 
						class="support__message"
						:class="{'support__message--incoming': message.incoming}">
						<p 
							class="support__message-text"
							:class="{'support__message-text--incoming': message.incoming}">{{ message.text }}
						</p>
					</section>
				</article>
				<form class="support__form">
					<input 
						type="text" 
						class="support__input"
						placeholder="Enter your message..."
						v-model='inputMessage'>
					<button 
						class="support__button"
						@click.prevent='send(index, inputMessage)'>Send</button>
				</form>
			</section>
			</transition>
		</section>
	</section>
</main>
</template>
<script>
import IconAngleDown from "@/components/icons/IconAngleDown.vue"
import IconClose from "@/components/icons/IconClose.vue"
import IconSend from "@/components/icons/IconSend.vue"
import NewSupport from "@/components/support/NewSupport.vue"
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	name: "Support",
	components: {
		IconAngleDown,
		IconClose,
		IconSend,
		NewSupport
	},
	data () {
		return {
			buttonLoading: false,
			inputMessage: '',
			newSupportPopup: false,
			statusSort: {
				lastDate: {
					directions: false,
					active: false
				}
			},
			statusMessageClass: {
				sent: "support__cell--sent",
				resolved: "support__cell--resolved",
				response: "support__cell--response"
			},
			statusMessageText: {
				sent: "Sent",
				resolved: "Resolved",
				response: "Support response"
			}
		}
	},
	methods: {
		...mapActions('support', [
			'downloadAll'
		]),
		...mapMutations('support', [
			'toggleBox',
			'newMessage',
			'sortDates'
		]),
		send(index, inputMessage) {
			this.newMessage([index, inputMessage]);
			this.inputMessage = '';
		},
		closeNewSupportPopup() {
			this.closeNewSupportPopup = false;
		},
		$sortDates(type) {
			this.cleanStatusSort(type);
			this.statusSort[type].active = true;
			this.statusSort[type].direction = !this.statusSort[type].direction;
			this.sortDates(type);
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
	computed: {
		...mapState('support', [
			'support'
		])
	},
	beforeMount() {
		this.downloadAll();
	}
}
</script>
<style lang="scss">
.support {
	padding: 64px 0 16px;
	@include flex-col-def(center);
	&__box {
		width: 53%;
		min-width: 760px;
		@extend %box;
		padding: 30px 0;
	}
	&__header {
		@include flex-row(space-between);
		padding: 0 32px 27px;
	}
	&__button-empty {
		background-color: transparent;
		@include flex-row(space-between);
	}
	&__button-empty-text {
		@extend %link;
	}
	&__button {
		@extend %button;
		@extend %button-buy;
		text-transform: capitalize;
		font-size: $size-3;
	}
	&__row {
		padding: 16px 64px 0 32px;
		list-style: none;
		display: grid;
		grid-template-columns: 2fr 3fr 3fr 1fr;
		justify-items: start;
		justify-content: space-between;	
		grid-column-gap: 10px;
		&--head {
			padding: 0 64px 16px 32px;
		}
	}
	&__element {
		border-bottom: 1px solid $line-color;
		padding-bottom: 16px;
	}
	&__head-img {
		@extend %table-head-img;
	}
	&__button-empty-img {
		@extend %blue-img;
		margin-left: 8px;
	}
	&__send-img-wrapper {
		background-color: $text-hover-color;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		margin-left: 10px;
		@include flex-row(center);
	}
	&__send-img {
		margin-left: 2px;
		width: 10px;
		height: 10px;
		fill: $white;
	}
	&__cell {
		color: $text-active-color;
		font-size: $size-3;
		font-weight: 600;
		white-space: nowrap;
		&--head {
			color: $middle-grey;
			font-size: $size-3;
			text-transform: uppercase;
			cursor: pointer;
		}
		&--right {
			justify-self: end;
		}
		&--status {
			padding-left: 30px;
		}
		&--date {
			padding-right: 40px;
		}
		&--sent {
			color: $semidark-grey;
		}
		&--resolved {
			color: $text-percent-color;
		}
		&--response {
			color: $response-color;
		}
	}
	&__message-box {
		background-color: $bg-color;
		margin: 8px 16px 0;
		border-radius: 6px;
		padding: 24px;
		position: relative;
	}
	&__button-close {
		background-color: transparent;
		padding: 4px;
		position: absolute;
		top: 16px;
		right: 16px;
	}
	&__close-img {
		width: 10px;
		height: 10px;
		fill: $middle-grey;
	}
	&__form {
		@include flex-row(space-between);
	}
	&__input {
		@extend %input;
		margin-right: 16px;
		flex: 1 1 100%;
	}
	&__message-row {
		display: flex;
		align-items: flex-start;
		flex-wrap: nowrap;
		margin-bottom: 16px;
		padding-right: 24px;
		justify-content: flex-end;
		&--incoming {
			justify-content: flex-start;
		}
	}
	&__message-time {
		color: $button-disable-color;
		font-size: $size-2;
		text-transform: uppercase;
		white-space: nowrap;
		margin:  0 16px 0 0;
		&--incoming {
			order: 1;
			margin: 0 0 0 16px;
		}
	}
	&__message {
		flex: 0 0 50%;
		min-width: 360px;
		padding: 10px 16px;
		border-radius: 20px 20px 0 20px;
		background-color: $message-color;
		&--incoming {
			order: -1;
			border-radius: 0 20px 20px 20px;
			background-color: $line-color;
		}
	}
	
	&__message-text {
		font-family: $second-font;
		font-size: $size-2;
		line-height: 1rem;
		font-weight: 600;
		color: $white;
		&--incoming {
			color: $text-active-color;
		}
	}
}
</style>

