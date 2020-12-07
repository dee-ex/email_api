<template>
  <div class="mail">
    <h1>Mail</h1>
    <ComposeBtn />
    <router-link to="/inbox">Back</router-link>
    <div>
      :)
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ComposeBtn from '../components/ComposeBtn.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('message');

export default {
  name: 'Mail',
  components: {
    ComposeBtn,
  },
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
