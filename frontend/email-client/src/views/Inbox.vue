<template>
  <div id="inbox">
    <router-view></router-view>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('inbox');

export default {
  name: 'Inbox',
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
