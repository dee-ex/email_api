<template>
  <div id="login">
    <div class="main-login-form">
      <h1>Login</h1>
      <div class="login-form">
        <div class="inp-form">
          <label for="email-inp">Email</label>
          <input name="email" id="email-inp" type="email" v-model="email" />
        </div>
        <div class="inp-form">
          <label for="password-inp">Password</label>
          <input name="password" id="password-inp" type="password" v-model="password" />
        </div>
        <div class="login-error-msg" v-if="errorMsg">
          {{ errorMsg }}
        </div>
      </div>
      <div class="login-btn">
        <button @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'Login',
  data() {
    return {
      email: 'vominhtrithcsdhtp1@gmail.com',
      password: 'aA123456789aA',
    };
  },
  computed: {
    ...mapGetters(['errorMsg', 'isLoading']),
  },
  methods: {
    ...mapActions(['Login']),
    login() {
      const { email, password } = this;
      this.Login({ email, password });
    },
  },
};
</script>

<style>
  .login-btn {
    width: 33%;
  }
  .login-btn button {
    text-decoration: unset;
    padding: 10px 15px;
    border: 1px solid #455a6e;
    background: #fff;
    color: #455a6e;
    transition: 0.3s ease-in-out;
    width: 100%;
    font-size: 1rem;
  }

  .login-btn button:hover {
    background:#455a6e;
    color: #fff;
    box-shadow: 1px 1px 3px 1px #cccccc;
  }

  .login-form {
    width: 33%;
  }

  .inp-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }

  .inp-form label {
    flex: 1;
    text-align: left;
  }

  .inp-form input {
    height: 25px;
    flex: 2;
    border:unset;
    border-bottom: 1px solid #455a6e;
    outline: unset;
    font-size: 1rem;
  }

  #login {
    width: 100%;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  #login h1 {
    margin: unset;
  }

  .main-login-form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
    max-height: 480px;
  }

  .login-error-msg {
    color: crimson;
    font-style: italic;
    font-size: 1rem;
  }

</style>
