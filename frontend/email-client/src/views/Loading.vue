<template>
  <div class="home">
    Loading...
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'Loading',
  methods: {
    ...mapActions(['CheckPreviousLogin']),
  },
  mounted() {
    this.CheckPreviousLogin();
  },
};
</script>
