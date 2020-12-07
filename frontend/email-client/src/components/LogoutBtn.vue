<template>
  <div class="logout-btn">
    <a @click="logout">Logout</a>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'LogoutBtn',
  methods: {
    ...mapActions(['Logout']),

    logout() {
      this.Logout();
    },
  },
};
</script>

<style scoped>
  .logout-btn {
    margin-bottom: 25px;
  }

  .logout-btn a {
    text-decoration: unset;
    padding: 10px 15px;
    border: 1px solid #455a6e;
    background: #fff;
    color: #455a6e;
    transition: 0.3s ease-in-out;
    font-size: 1rem;
    width: 100%;
  }

  .logout-btn a:hover {
    background:#455a6e;
    color: #fff;
    box-shadow: 1px 1px 3px 1px #cccccc;
  }
</style>
