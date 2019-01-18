<template>
<div class="trading-form">
	<div class="trading-form__card trading-form__card--buy">
		<p class="trading-form__heading">
			Balance available: 
			<span class="trading-form__heading-value">995</span>
		</p>
		<label for="" class="trading-form__label">
			<p class="trading-form__input-name">price</p>
			<input type="text" class="trading-form__input" placeholder="usd">
		</label>
		<p class="trading-form__feature">
			best price
			<span class="trading-form__feature-value">3783.2341290</span>
		</p>
		<label for="" class="trading-form__label">
			<p class="trading-form__input-name">amount</p>
			<input type="text" class="trading-form-order__input" placeholder="btc">
		</label>
		<p class="trading-form__feature">	
			<span class="trading-form__feature-value">5% 20% 50% 75% 100%</span>
		</p>
		<label for="" class="trading-form__label">
			<p class="trading-form__input-name">total</p>
			<input type="text" class="trading-form__input" placeholder="usd">
		</label>
		<button class="trading-form__button">buy btc</button>
	</div>
	<div class="trading-form__card">
		<p class="trading-form__heading">Balance available:
			<span class="trading-form__heading-value trading-form__heading-value--btc">
				3
			</span> 
		</p>
		<label for="" class="trading-form__label">
			<p class="trading-form__input-name">
				price
			</p>
			<input type="text" class="trading-form__input" placeholder="usd">
		</label>
		<p class="trading-form__feature">best price
			<span class="trading-form__feature-value">3783.2341290</span>
		</p>
		<label for="" class="trading-form__label">
			<p class="trading-form__input-name">amount</p>
			<input type="text" class="trading-form__input" placeholder="btc">
		</label>
		<p class="trading-form__feature">	
			<span class="trading-form__feature-value">5% 20% 50% 75% 100%</span>
		</p>
		<label for="" class="trading-form__label">
			<p class="trading-form__input-name">total</p>
			<input type="text" class="trading-form__input" placeholder="usd">
		</label>
		<button class="trading-form__button trading-form__button--sell">sell btc
		</button>
	</div>
</div>
</template>
<script>
export default {
	name: "TradingMarketForm"
}
</script>
