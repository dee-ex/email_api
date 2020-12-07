<template>
  <div id="mailbox">
    <h1>Mailbox</h1>
    <ComposeBtn />
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

const { mapActions, mapGetters } = createNamespacedHelpers('inbox');

export default {
  name: 'MailBox',
  components: {
    ComposeBtn,
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
</style>
