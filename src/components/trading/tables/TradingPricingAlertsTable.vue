<template>
<table class="pricing-alerts-table">
</table>
</template>
<script>
import { mapState } from 'vuex'

export default {
	name: 'TradingPricingAlertsTable',
	computed: {
		...mapState("trading", {
			items: state => state.pricingAlerts
    })
	}
}
</script>
