import Sort from "./utilits/sort";
import moment from 'moment-timezone';

const state = {
	support: []
}

const mutations = {
	cleanSupport(state) {
		state.support = [];
	},
	pushSupport(state, data) {
		state.support.push(data) 
	},
	toggleBox(state, index) {
		let object = state.support;
		for (let item of object) {
			if(object.indexOf(item) == index) {
				item.box = !item.box;
			} else {
				item.box = false;
			}
		}
	},
	newMessage(state, [index, text]) {
		state.support[index].messages.push({
			incoming: false,
			time: moment().format('LT'),
			text: text
		})
		state.support[index].lastDate = moment().format('DD.MM.YYYY')
	},
	sortDates(state) {
		if(state.support.length) {
			let array = new Sort(state.support);
				array.sortDates('lastDate');
		}
	}
}

const getters = {
	
}

const actions = {
	downloadSupport({ commit }) {
		for(let i = 0; i < 5; i++) {
			commit('pushSupport', {
				theme: `Message theme ${i}`,
				lastDate: moment().format('DD.MM.YYYY'),
				status: 'response',
				box: false,
				messages: [
					{
						incoming: false,
						time: moment().format('LT'),
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.'
					},
					{
						incoming: true,
						time: moment().format('LT'),
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna?'
					}
				],
				id: i
			})
		}
	},
	downloadAll({ dispatch, commit }) {
		commit('cleanSupport');
		dispatch('downloadSupport');
	},
	newSupport({ commit, state }, [theme, message]) {
		let index = state.support.length;
		let data = {
			theme: theme,
			lastDate: moment().format('DD.MM.YYYY'),
			status: 'sent',
			box: false,
			messages: [
				{
					incoming: false,
					time: moment().format('LT'),
					text: message
				}
			],
			id: index
		}
		commit('pushSupport', data);
	}
}

export default {
	namespaced: true,
  state,
	actions,
	getters,
  mutations
}