<template>
  <div id="inbox">
    <h1>Inbox</h1>
    <MailSummary
      v-for="mail in this.messages"
      v-bind:key="mail.MessageId"
      :subject="mail.Subject"
      :date="mail.Date"
      :messageId="mail.MessageId"
      :from="mail.From[0]"
      path="inbox-mail-detail"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MailSummary from '../components/MailSummary.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('inbox');

export default {
  name: 'Inbox',
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
