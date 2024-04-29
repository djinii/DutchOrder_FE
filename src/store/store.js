import Vuex from 'vuex'
import cartStore from './modules/DJ_cartStore'
import ordStore from './modules/DJ_ordStore'
import authStore from './modules/JH_authStore'

const store = new Vuex.Store({
  modules: {
    cartStore : cartStore,
    ordStore : ordStore,
    authStore : authStore
  }
})
export default store