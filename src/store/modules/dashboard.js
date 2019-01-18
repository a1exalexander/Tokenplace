import moment from 'moment-timezone';
import Sort from "./utilits/sort";

const state = {
  holdings: [],
	recentTrades: [],
	wishList: [],
	wishListCoins: [],
	balance: "0,00",
	lastActivity: ''
}

const mutations = {
	cleanAll(state) {
		state.holdings = [];
		state.recentTrades = [];
		state.wishList = [];
		state.wishListCoins = [];
	},
	pushData(state, [name, data]) {
		state[name].push(data);
	},
	setBalance(state, n) {
		state.balance = n;
	},
	sort(state, [arr, type]) {
		if(state[arr].length) {
			let array = new Sort(state[arr]);
			let status = array.isNumeric(type);
			if(status) {
				array.sortNumbers(type);
			} else {
				array.sortStrings(type);
			}
		}
	},
	setLastActivity(state) {
		state.lastActivity = moment();
	},
	deleteCoin(state, index) {
		state.wishList.splice(index, 1);	
	}
}

const actions = {
	sortHoldings({ commit }, type) {
		commit('sort', ['holdings', type])
	},
	sortWishList({ commit }, type) {
		commit('sort', ['wishList', type])
	},
	downloadHoldings({ commit }) {
		for(let i = 0; i < 40; i++) {
			commit('pushData', ['holdings', {
				coin: "BTC",
				amount: 13 + i,
				price: `3 5${i},${i}`,
				day: `-0.${i}`,
				week: `-0.${i + 9}`,
				month: `-${i + 0.2}`,
				value: `2${i} 283,${i}`,
				percent: `10.${i}`
			}]);
		}
	},
	downloadRecentTrades({ commit }) {
		let data = {
			time: "9:20",
			exchange: "LIVECOIN",
			type: "",
			currency: "USD",
			price: 385,
			amount: 18,
			value: "",
			valueUSD: "12 000"
		}
		for(let i = 0; i < 40; i++) {
			commit('pushData', ['recentTrades', data]);
		}
	},
	downloadWishList({ commit }) {
		for(let i = 0; i < 5; i++) {
			commit('pushData', ['wishList', {
				coin: "BTC_EUR",
				exchange: "LIVECOIN",
				price: `3${i}5,${i}`,
				day: `-4.${i}`,
				week: `-0.${i + 9}`,
				month: `-${i + 0.2}`
			}]);
		}
	},
	downloadWishListCoins({ commit }) {
		let data = [
			'ETH_EUR',
			'BTC_EUR',
			"SSD_HDD",
			"KFC_UFC",
			"PSP_LSD",
			"VHS_SSH"
		]
		data.forEach(element => {
			commit('pushData', ['wishListCoins', element]);
		});
	},
	downloadAll({ dispatch, commit, rootState }) {
		commit('cleanAll');
		const checkApi = rootState.exchangesApi.myApi.length;
		if (checkApi) {
			dispatch('downloadHoldings');
			dispatch('downloadRecentTrades');
			dispatch('downloadWishList');
			dispatch('downloadWishListCoins');
			commit('setBalance', '140 672,16')
		} else {
			commit('cleanAll');
			commit('setBalance', "0,00")
		}
	}
}

export default {
	namespaced: true,
	state,
	actions,
  mutations
}