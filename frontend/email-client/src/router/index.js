import Vue from 'vue';
import VueRouter from 'vue-router';
import Loading from '../views/Loading.vue';
import Login from '../views/Login.vue';
import Inbox from '../views/Inbox.vue';
import SentBox from '../views/SentBox.vue';
import InboxMail from '../views/InboxMail.vue';
import SentMail from '../views/SentMail.vue';
import Compose from '../views/Compose.vue';
import MailBox from '../views/MailBox.vue';

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
    path: '/mail',
    name: 'Mail',
    component: MailBox,
    children: [
      {
        path: 'inbox',
        component: Inbox,
      },
      {
        path: 'sent',
        component: SentBox,
      },
      {
        path: 'compose',
        component: Compose,
      },
      {
        path: 'inbox/:id',
        component: InboxMail,
        name: 'inbox-mail-detail',
      },
      {
        path: 'sent/:id',
        component: SentMail,
        name: 'sent-mail-detail',
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
