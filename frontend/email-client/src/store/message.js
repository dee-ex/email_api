import axios from 'axios';

const messageState = {
  namespaced: true,
  state: {
    isLoading: false,
    message: null,
    errorMsg: null,
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    message: state => {
      return state.message;
    },
    errorMsg: state => {
      return state.errorMsg;
    },
  },
  mutations: {
    SetMessage(state, message) {
      state.message = message;
    },
    SetErrorMsg(state, errorMsg) {
      state.errorMsg = errorMsg;
    },
    SetIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async GetMessage(context, { msgId }) {
      const { rootGetters } = context;
      const email = rootGetters['auth/email'];
      const password = rootGetters['auth/password'];

      context.commit('SetIsLoading', true);
      const res = await axios.post(`http://localhost:8000/mailbox/inbox/${msgId}`, {
        username: email,
        password,
      });

      context.commit('SetIsLoading', false);
      // check if login success
      if (res.status === 200) {
        context.commit('SetMessage', res.data);
        return;
      }

      context.commit('SetErrorMsg', 'Unable to get email detail!');
    },

  },
  modules: {
  },
};

export default messageState;
