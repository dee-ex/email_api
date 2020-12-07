import axios from 'axios';
import dayjs from 'dayjs';

const sentboxState = {
  namespaced: true,
  state: {
    isLoading: false,
    messages: [],
    errorMsg: null,
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    messages: state => {
      return state.messages;
    },
    errorMsg: state => {
      return state.errorMsg;
    },
  },
  mutations: {
    SetMessages(state, messages) {
      messages.sort((a, b) => dayjs(b.Date).diff(a.Date));
      state.messages = messages;
    },
    SetErrorMsg(state, errorMsg) {
      state.errorMsg = errorMsg;
    },
    SetIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async GetMessages(context) {
      const { rootGetters } = context;
      const email = rootGetters['auth/email'];
      const password = rootGetters['auth/password'];

      context.commit('SetIsLoading', true);
      const res = await axios.post('http://localhost:8000/mailbox/sent', {
        username: email,
        password,
      });

      context.commit('SetIsLoading', false);
      // check if login success
      if (res.status === 200) {
        context.commit('SetMessages', res.data);
        return;
      }

      context.commit('SetErrorMsg', 'Unable to get email detail!');
    },
  },
  modules: {
  },
};

export default sentboxState;
