<template>
  <div id="mail-list">
    <h1>Inbox</h1>
    <ComposeBtn />
    <MailSummary
      v-for="mail in this.messages"
      v-bind:key="mail.MessageId"
      :subject="mail.Subject"
      :date="mail.Date"
      :messageId="mail.MessageId"
      :from="mail.From[0]"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MailSummary from '../components/MailSummary.vue';
import ComposeBtn from '../components/ComposeBtn.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('inbox');

export default {
  name: 'MailList',
  components: {
    MailSummary,
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

<style>
  #mail-list {
    margin-top: 15px;
  }
</style>
