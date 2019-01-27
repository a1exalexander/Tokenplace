import moment from 'moment-timezone';
import Sort from './utilits/sort';

const state = {
  timeZone: moment.tz.guess(),
  language: 'English',
  currency: 'USD',
  referral: {
    link: 'https://tokenplace.com/?ref=e512569',
    history: [],
  },
  plans: [],
  verification: {
    successUploud: false,
    successVerify: false,
  },
  twoStepVerification: false,
};

moment.tz.setDefault(state.defaultTimeZone);

const mutations = {
  setDefaultZone(state, item) {
    state.timeZone = item;
    moment.tz.setDefault(item);
  },
  setDefaultLanguage(state, item) {
    state.language = item;
  },
  setDefaultCurrency(state, item) {
    state.currency = item;
  },
  cleanReferralHistory(state) {
    state.referral.history = [];
  },
  pushReferralHistory(state, data) {
    state.referral.history.push(data);
  },
  cleanPlans(state) {
    state.plans = [];
  },
  pushPlans(state, data) {
    state.plans.push(data);
  },
  setPlan(state, index) {
    state.plans = state.plans.map((item) => {
      if (item.id == index) {
        item.status = true;
        item.expiry = moment().format('DD.MM.YYYY');
      } else {
        item.status = false;
        item.expiry = '';
      }
      return item;
    });
  },
  cancelPlan(state, index) {
    const item = state.plans[index];
    item.status = false;
    item.expiry = '';
  },
  sortReferralHistory(state, type) {
    const array = state.referral.history;
    if (array.length) {
      const history = new Sort(array);
      const status = history.isNumeric(type);
      if (status) {
        history.sortNumbers(type);
      } else {
        history.sortStrings(type);
      }
    }
  },
  sortReferralHistoryDates(state, type) {
    const array = state.referral.history;
    if (array.length) {
      const history = new Sort(array);
      history.sortDates(type);
    }
  },
  setUploadImage(state) {
    state.verification.successUploud = true;
  },
  setSuccessVerify(state) {
    state.verification.successVerify = true;
  },
  enableTwoStepVerification(state) {
    state.twoStepVerification = true;
  },
  disableTwoStepVerification(state) {
    state.twoStepVerification = false;
  },
};
const getters = {
  defaultTimeZone: (state) => {
    const zone = state.timeZone;
    return `(GMT${moment().tz(zone).format('Z')}) ${zone}`;
  },
};

const actions = {
  getReferralHistory({ commit }) {
    commit('cleanReferralHistory');
    for (let i = 0; i < 20; i++) {
      commit('pushReferralHistory', {
        email: `elisgudzenko${i}@gmail.com`,
        date: moment().add(i, 'day').format('DD.MM.YYYY'),
      });
    }
  },
  getPlans({ commit }) {
    commit('cleanPlans');
    for (let i = 0; i < 3; i++) {
      commit('pushPlans', {
        name: 'Plan name',
        price: '49.99',
        interval: 'per month',
        about_1: 'Lorem ipsum dolor',
        about_2: 'Lorem ipsum dolor sit amet',
        about_3: 'Lorem ipsum dolor sit amet orem ipsum dolor sit amet',
        description: 'You’ll be charged $ 49.99 every month until you cancel your subscription. Previous charges won’t be refunded when you cancel unless it’s legally required. Your payment data is encrypted and secure. All amounts shown are in USD.',
        expiry: '',
        status: false,
        id: i,
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
