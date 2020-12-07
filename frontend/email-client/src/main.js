import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let first = false;

router.beforeEach((to, from, next) => {
  // always redirect to root. so that the app can check the credential
  if (!first) {
    first = true;
    next('/');
    return;
  }

  // prevent user to access login once logged in
  if (to.matched.some(record => record.meta.requiresLogin === 1) && store.state.auth.isLoggedIn) {
    next('/mail');
    return;
  }

  // prevent user to access home without logging in
  if (to.matched.some(record => record.meta.requiresLogin === 2) && !store.state.auth.isLoggedIn) {
    next('/login');
    return;
  }

  // do nothing
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
