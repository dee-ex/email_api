<template>
  <div id="sentbox">
    <h1>Sent</h1>
    <MailSummary
      v-for="mail in this.messages"
      v-bind:key="mail.MessageId"
      :subject="mail.Subject"
      :date="mail.Date"
      :messageId="mail.MessageId"
      :from="mail.From[0]"
      path="sent-mail-detail"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MailSummary from '../components/MailSummary.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('sentbox');

export default {
  name: 'SentBox',
  components: {
    MailSummary,
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
  #inbox {
    margin-top: 15px;
  }
</style>
