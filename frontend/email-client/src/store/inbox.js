import axios from 'axios';
import dayjs from 'dayjs';
import router from '../router';

const inboxState = {
  namespaced: true,
  state: {
    isLoading: false,
    messages: [],
    errorMsg: null,

    isSending: false,
    sendingErrorMsg: null,
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
    isSending: state => {
      return state.isSending;
    },
    sendingErrorMsg: state => {
      return state.sendingErrorMsg;
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
    SetSendingErrorMsg(state, errorMsg) {
      state.sendingErrorMsg = errorMsg;
    },
    SetIsSending(state, isSending) {
      state.isSending = isSending;
    },
  },
  actions: {
    async GetMessages(context) {
      const { rootGetters } = context;
      const email = rootGetters['auth/email'];
      const password = rootGetters['auth/password'];

      context.commit('SetIsLoading', true);
      const res = await axios.post('http://localhost:8000/mailbox/inbox', {
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

    async SendMessage(context, emailContent) {
      const { rootGetters } = context;
      const from = rootGetters['auth/email'];
      const password = rootGetters['auth/password'];

      context.commit('SetIsSending', true);
      try {
        const res = await axios.post('http://localhost:8000/send', {
          from,
          password,
          ...emailContent,
        });
        context.commit('SetIsSending', false);
        // check if login success
        if (res.status === 200) {
          context.dispatch('GetMessages');
          router.push('/mail/sent');
          return;
        }

        context.commit('SetSendingErrorMsg', 'Unable to send email!');
      } catch {
        context.commit('SetSendingErrorMsg', 'Unable to send email!');
      }
    },
  },
  modules: {
  },
};

export default inboxState;
