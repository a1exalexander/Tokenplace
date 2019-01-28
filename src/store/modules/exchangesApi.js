/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

// apiBox array must be cleaned before connection to backend
const state = {
  myApi: [],
  apiBox: [
    {
      id: '1',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Bibox',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '2',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Binance',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '3',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Bit-Z',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '4',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Bitfinex',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '5',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Poloniex',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '6',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Bibox',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '7',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Binance',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '8',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Bit-Z',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '9',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Bitfinex',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
    {
      id: '10',
      ico: require('@/assets/images/poloniex.png'),
      name: 'Poloniex',
      api: '',
      key: '',
      balance: '0.18',
      status: false,
    },
  ],
};

const mutations = {
  pushApi(state, index) {
    state.myApi.push(state.apiBox[index]);
    state.apiBox.splice(index, 1);
  },
  deleteApi(state, index) {
    state.myApi[index].api = '';
    state.myApi[index].key = '';
    state.apiBox.push(state.myApi[index]);
    state.myApi.splice(index, 1);
  },
};

const getters = {
  getApiNames: (state) => {
    const data = [];
    state.apiBox.forEach((item) => {
      if (data.every(el => el !== item.name)) data.push(item.name);
    });
    return data;
  },
  getApiNamesIcons: (state) => {
    const data = [];
    if (state.myApi.length) {
      state.myApi.forEach((item) => {
        if (data.every(el => el !== item.name)) data.push({ name: item.name, ico: item.ico });
      });
    }
    return data;
  },
};

const actions = {
  addApi({ commit }, index) {
    commit('pushApi', index);
  },
  deleteApi({ commit }, index) {
    commit('deleteApi', index);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
