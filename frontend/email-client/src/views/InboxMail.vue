<template>
  <div class="mail">
    <h1>{{message.Subject}}</h1>
    <div v-html="message.Body">
      {{ message.Body }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('inboxmessage');

export default {
  name: 'InboxMail',
  computed: {
    ...mapGetters([
      'isLoading',
      'message',
      'errorMsg',
    ]),
  },
  methods: {
    ...mapActions([
      'GetMessage',
    ]),
  },
  mounted() {
    console.log(this.$route.params.id);
    this.GetMessage({ msgId: this.$route.params.id });
  },
};
</script>
