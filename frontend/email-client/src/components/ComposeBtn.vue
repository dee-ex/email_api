<template>
  <div class="compose-btn">
    <router-link to="/mail/compose">Compose</router-link>
  </div>
</template>

<script>
export default {
  name: 'ComposeBtn',
};
</script>

<style scoped>
  .compose-btn {
    margin-bottom: 25px;
  }

  .compose-btn a {
    text-decoration: unset;
    padding: 10px 15px;
    border: 1px solid #455a6e;
    background: #fff;
    color: #455a6e;
    transition: 0.3s ease-in-out;
    width: 100%;
    font-size: 1rem;
  }

  .compose-btn a:hover {
    background:#455a6e;
    color: #fff;
    box-shadow: 1px 1px 3px 1px #cccccc;
  }
</style>
