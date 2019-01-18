// import http from 'axios'
import apiCall from '@/api/api'

const state = {
  token: localStorage.getItem('user-token') || '',
	authStatus: '',
	userStatus: '',
  profile: { 
    name: 'Michael Jackson',
    ico: require("@/assets/images/ava.png") 
  },
  messages: {
    activationEmail: false, 
    confirmEmail: false,
    newPassword: false
  }
}

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
    for (const key in state.messages) {
      state.messages[key] = false;
    }
  },
  changeMessage(state, name) {
    for (const key in state.messages) {
      state.messages[key] = false;
    }
    state.messages[name] = true;
  }
}

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.authStatus,
	getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
  someMessage: state => {
    let object = state.messages,
        status = false;
    for (const key in object) {
      if(object[key]) status = true;
    }
    return status;
  }
}

const actions = {
	AUTH_REQUEST: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => { 
      commit("AUTH_REQUEST")
      apiCall({url: 'auth', data: user, method: 'POST'})
        .then(resp => {
          const token = resp.token;
          localStorage.setItem('user-token', token);
          commit("AUTH_SUCCESS", token);
          dispatch("USER_REQUEST");
          resolve(resp);
        })
      .catch(err => {
        commit("AUTH_ERROR", err);
        localStorage.removeItem('user-token');
        reject(err);
      })
    })
	},
	AUTH_LOGOUT: ({commit}) => {
    return new Promise((resolve) => {
      commit("AUTH_LOGOUT");
      localStorage.removeItem('user-token');
      resolve();
    })
	},
	USER_REQUEST: ({commit, dispatch}) => {
    commit("USER_REQUEST");
    apiCall({url: 'user/me'})
      .then(resp => {
        commit("USER_SUCCESS", resp);
      })
      .catch(() => {
        commit("USER_ERROR");
        dispatch("AUTH_LOGOUT");
      })
  }
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
  mutations
}