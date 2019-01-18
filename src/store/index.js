import Vue from 'vue'
import Vuex from 'vuex'
import exchangesApi from './modules/exchangesApi'
import dashboard from './modules/dashboard'
import trading from './modules/trading'
import portfolio from './modules/portfolio'
import settings from './modules/settings'
import login from './modules/login'
import support from './modules/support'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		exchangesApi,
		dashboard,
		trading,
		portfolio,
		settings,
		login,
		support
	}
})
