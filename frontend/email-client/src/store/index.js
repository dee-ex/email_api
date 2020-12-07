import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import message from './message';
import inbox from './inbox';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    message,
    inbox,
  },
});
