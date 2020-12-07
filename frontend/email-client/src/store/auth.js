import axios from 'axios';
import router from '../router';

const authState = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    email: null,
    password: null,
    errorMsg: null,
    isLoading: false,
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    email: state => {
      return state.email;
    },
    password: state => {
      return state.password;
    },
    errorMsg: state => {
      return state.errorMsg;
    },
  },
  mutations: {
    SetLoggedIn(state, { email, password, isLoggedIn = true }) {
      state.email = email;
      state.password = password;
      state.isLoggedIn = isLoggedIn;
    },
    SetErrorMsg(state, errorMsg) {
      state.errorMsg = errorMsg;
    },
    SetIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    CheckPreviousLogin(context) {
      // checking for previous login
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');

      if (email && password) {
        context.commit('SetLoggedIn', { email, password });
        router.replace('mail');
        return;
      }
      // failed -> require user to login
      router.replace('login');
    },

    async Login(context, { email, password }) {
      context.commit('SetIsLoading', true);
      // send login request
      try {
        const res = await axios.post('http://localhost:8000/login', {
          username: email,
          password,
        });

        context.commit('SetIsLoading', false);
        // check if login success
        if (res.status === 200) {
          context.commit('SetLoggedIn', { email, password });
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          router.replace('mail');
          return;
        }

        context.commit('SetErrorMsg', 'Wrong email or password!');
      } catch {
        context.commit('SetErrorMsg', 'Wrong email or password!');
      }
    },

    Logout(context) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      context.commit('SetLoggedIn', {
        isLoggedIn: false,
        email: null,
        password: null,
      });
      context.commit('SetErrorMsg', '');
      context.commit('SetIsLoading', false);
      router.replace('/');
    },

  },
  modules: {
  },
};

export default authState;
