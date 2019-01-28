// TODO: apiCall must be deleted before conection to backend

/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

import apiCall from '@/api/api';

const state = {
  token: localStorage.getItem('user-token') || '',
  authStatus: '',
  userStatus: '',
  profile: {
    name: 'Michael Jackson',
    ico: require('@/assets/images/ava.png'),
  },
  messages: {
    activationEmail: false,
    confirmEmail: false,
    newPassword: false,
  },
};

const mutations = {
  AUTH_REQUEST: (state) => {
    state.authStatus = 'loading';
  },
  AUTH_SUCCESS: (state, token) => {
    state.authStatus = 'success';
    state.token = token;
  },
  AUTH_ERROR: (state) => {
    state.authStatus = 'error';
  },
  USER_REQUEST: (state) => {
    state.userStatus = 'loading';
  },
  USER_SUCCESS: (state, resp) => {
    state.userStatus = 'success';
    state.profile = resp;
  },
  USER_ERROR: (state) => {
    state.userStatus = 'error';
  },
  AUTH_LOGOUT: (state) => {
    state.token = '';
  },
  cleanMessages(state) {
    Object.keys(state.messages).forEach((key) => {
      state.messages[key] = false;
    })
  },
  changeMessage(state, name) {
    Object.keys(state.messages).forEach((key) => {
      state.messages[key] = false;
    })
    state.messages[name] = true;
  },
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.authStatus,
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
  someMessage: (state) => {
    const object = state.messages;
    let status = false;
    Object.values(object).forEach((value) => {
      if (value) status = true;
    })
    return status;
  },
};

// TODO: All of for..in iterations and new Promis functions must be replaced by Http requests
const actions = {
  AUTH_REQUEST: ({ commit, dispatch }, user) => {
    new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      apiCall({ url: 'auth', data: user, method: 'POST' })
        .then(({ token }) => {
          localStorage.setItem('user-token', token);
          commit('AUTH_SUCCESS', token);
          dispatch('USER_REQUEST');
          resolve(resp);
        })
        .catch((err) => {
          commit('AUTH_ERROR', err);
          localStorage.removeItem('user-token');
          reject(err);
        });
    });
  },
  AUTH_LOGOUT: ({ commit }) => {
    new Promise((resolve) => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('user-token');
      resolve();
    });
  },
  USER_REQUEST: ({ commit, dispatch }) => {
    commit('USER_REQUEST');
    apiCall({ url: 'user/me' })
      .then((resp) => {
        commit('USER_SUCCESS', resp);
      })
      .catch(() => {
        commit('USER_ERROR');
        dispatch('AUTH_LOGOUT');
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
