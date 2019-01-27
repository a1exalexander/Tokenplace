import moment from 'moment-timezone';
import Sort from './utilits/sort';

const state = {
  openOrders: [],
  balance: [],
  positions: [],
  tradeHistory: [],
  pricingAlerts: [],
  orderBook: [],
  pairs: [],
  favorites: [],
  recentTrades: [],
  mainGraph: '',
  totalBalance: 0,
};

const mutations = {
  cleanAll(state) {
    for (const item in state) {
      const type = {}.toString.call(state[item]).slice(8, -1);
      if (type == 'Array') state[item] = [];
    }
  },
  pushData(state, [name, data]) {
    state[name].push(data);
  },
  deleteFavorite(state, index) {
    state.favorites.splice(index, 1);
  },
  delPairStar(state, index) {
    state.pairs[index].star = false;
  },
  setPairStar(state, index) {
    state.pairs[index].star = true;
  },
  setGraph(state, name) {
    state.mainGraph = name;
  },
  sort(state, [arr, type]) {
    if (state[arr].length) {
      const array = new Sort(state[arr]);
      const isNumber = array.isNumeric(type);
      if (isNumber) {
        array.sortNumbers(type);
      } else {
        array.sortStrings(type);
      }
    }
  },
  sortDates(state, [arr, type]) {
    if (state[arr].length) {
      const array = new Sort(state[arr]);
      array.sortDates(type);
    }
  },
  deleteItem(state, [array, index]) {
    state[array].splice(index, 1);
  },
};

const actions = {
  sortOpenOrders({ commit }, type) {
    commit('sort', ['openOrders', type]);
  },
  sortOpenOrdersDates({ commit }, type) {
    commit('sortDates', ['openOrders', type]);
  },
  sortBalance({ commit }, type) {
    commit('sort', ['balance', type]);
  },
  sortPositions({ commit }, type) {
    commit('sort', ['positions', type]);
  },
  sortPositionsDates({ commit }, type) {
    commit('sortDates', ['positions', type]);
  },
  sortTradeHistory({ commit }, type) {
    commit('sort', ['tradeHistory', type]);
  },
  sortTradeHistoryDates({ commit }, type) {
    commit('sortDates', ['tradeHistory', type]);
  },
  sortPairs({ commit }, type) {
    commit('sort', ['pairs', type]);
  },
  sortFavorites({ commit }, type) {
    commit('sort', ['favorites', type]);
  },
  downloadOpenOrders({ commit }) {
    for (let i = 0; i < 10; i++) {
      commit('pushData', ['openOrders', {
        pair: 'BTH / BTC',
        type: '',
        exchange: 'POLONIEX',
        amount: `2.7${i}`,
        price: `${i}55.4`,
        date: moment().add(i, 'day').format('DD.MM.YYYY'),
      }]);
    }
  },
  downloadBalance({ commit }) {
    const data = {
      currency: '',
      total: '',
      rate: '',
    };
    for (let i = 0; i < 40; i++) {
      commit('pushData', ['balance', data]);
    }
  },
  downloadPositions({ commit }) {
    for (let i = 0; i < 10; i++) {
      commit('pushData', ['positions', {
        pair: 'BTH / BTC',
        type: '',
        exchange: 'POLONIEX',
        amount: `2.7${i}`,
        price: `${i}55.4`,
        date: moment().add(i, 'day').format('DD.MM.YYYY'),
        profit: '',
      }]);
    }
  },
  downloadTradeHistory({ commit }) {
    const data = {
      pair: 'BTH / BTC',
      type: '',
      exchange: 'POLONIEX',
      amount: '2.735',
      price: '5255.4',
      date: '03.12.2018',
      status: '',
      profit: '',
    };
    for (let i = 0; i < 10; i++) {
      commit('pushData', ['tradeHistory', data]);
    }
  },
  downloadPricingAlerts({ commit }) {
    const data = {
      name: '',
    };
    for (let i = 0; i < 20; i++) {
      commit('pushData', ['pricingAlerts', data]);
    }
  },
  downloadPairs({ commit }) {
    // TODO: test array
    const data = [
      {
        pair: 'BTH / BTC',
        price: '2.723',
        hours: '+1.13',
        star: false,
        id: 1,
      },
      {
        pair: 'UFC / BBC',
        price: '2.713',
        hours: '+1.42',
        star: false,
        id: 2,
      },
      {
        pair: 'SSD / KFC',
        price: '2.744',
        hours: '+1.04',
        star: false,
        id: 3,
      },
      {
        pair: 'PSP / LSD',
        price: '2.722',
        hours: '+1.32',
        star: false,
        id: 4,
      },
    ];
    data.forEach((element) => {
      commit('pushData', ['pairs', element]);
    });
  },
  downloadOrderBook({ commit }) {
    for (let i = 0; i < 20; i++) {
      commit('pushData', ['orderBook', {
        price: '4841.9',
        amount: '2.735',
        total: '14044.7',
      }]);
    }
  },
  downloadRecentTrades({ commit }) {
    for (let i = 0; i < 20; i++) {
      let data = {};
      if (Math.floor(i % 2)) {
        data = {
          time: '23:26',
          type: 'buy',
          price: '0.00496364',
          volume: '2.47496364',
        };
      } else {
        data = {
          time: '23:26',
          type: 'sell',
          price: '0.00496364',
          volume: '2.47496364',
        };
      }
      commit('pushData', ['recentTrades', data]);
    }
  },
  downloadAll({ dispatch, commit }) {
    commit('cleanAll');
    dispatch('downloadOpenOrders');
    dispatch('downloadBalance');
    dispatch('downloadPositions');
    dispatch('downloadTradeHistory');
    dispatch('downloadPricingAlerts');
    dispatch('downloadPairs');
    dispatch('downloadRecentTrades');
    dispatch('downloadOrderBook');
  },
  toggleFavorite({ state, commit }, id) {
    const element = state.pairs.find(item => item.id == id);
    const elementIndex = state.pairs.indexOf(element);
    if (!element.star) {
      element.star = true;
      commit('setPairStar', elementIndex);
      commit('pushData', ['favorites', element]);
    } else {
      const data = element;
      data.star = false;
      commit('delPairStar', elementIndex);
      state.favorites.forEach((element, index) => {
        if (element.id == id) commit('deleteFavorite', index);
      });
    }
  },
  deleteFavorite({ state, commit }, id) {
    state.favorites.forEach((item, index) => {
      if (item.id == id) {
        state.pairs.forEach((item, index) => {
          if (item.id == id) {
            commit('delPairStar', index);
          }
        });
        commit('deleteFavorite', index);
      }
    });
  },
  deleteOrderItem({ commit }, index) {
    commit('deleteItem', ['openOrders', index]);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
