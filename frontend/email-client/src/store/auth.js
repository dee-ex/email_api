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
    SetLoggedIn(state, { email, password }) {
      state.email = email;
      state.password = password;
      state.isLoggedIn = true;
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
        router.replace('inbox');
        return;
      }
      // failed -> require user to login
      router.replace('login');
    },

    async Login(context, { email, password }) {
      context.commit('SetIsLoading', true);
      // send login request
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
        router.replace('inbox');
        return;
      }

      context.commit('SetErrorMsg', 'Wrong email or password!');
    },

  },
  modules: {
  },
};

export default authState;
