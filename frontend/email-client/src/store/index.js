import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import inboxmessage from './inbox-message';
import sentmessage from './sent-message';
import inbox from './inbox';
import sentbox from './sentbox';

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
    inboxmessage,
    sentmessage,
    inbox,
    sentbox,
  },
});
