import Vue from 'vue';
import VueRouter from 'vue-router';
import Loading from '../views/Loading.vue';
import Login from '../views/Login.vue';
import Inbox from '../views/Inbox.vue';
import Mail from '../views/Mail.vue';
import Compose from '../views/Compose.vue';
import MailList from '../views/MailList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: Loading,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresLogin: 1 }, // block access once logged in
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: Inbox,
    children: [
      {
        path: '',
        component: MailList,
      },
      {
        path: 'compose',
        component: Compose,
      },
      {
        path: ':id',
        component: Mail,
        name: 'mail-detail',
      },
    ],
    meta: { requiresLogin: 2 }, // block access if not logged in
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
