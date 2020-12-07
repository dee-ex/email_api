<template>
  <div id="mailbox">
    <h1>Mailbox</h1>
    <div class="mail-btn-group">
      <ComposeBtn />
      <LogoutBtn />
    </div>
    <div class="nav">
      <router-link to="/mail/inbox">Inbox</router-link>
      <span>|</span>
      <router-link to="/mail/sent">Sent</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ComposeBtn from '../components/ComposeBtn.vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('inbox');

export default {
  name: 'MailBox',
  components: {
    ComposeBtn,
    LogoutBtn,
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'messages',
      'errorMsg',
    ]),
  },
  methods: {
    ...mapActions([
      'GetMessages',
    ]),
  },
  mounted() {
    this.GetMessages();
  },
};
</script>

<style scoped>
  .nav span {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
  }

  .mail-btn-group {
    display: flex;
    justify-content: center;
  }
</style>
