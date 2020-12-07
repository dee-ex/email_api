<template>
  <div class="compose">
    <div class="compose-header">
      <h1>Compose Mail</h1>
    </div>
    <div class="compose-error-msg" v-if="sendingErrorMsg">
      {{ sendingErrorMsg }}
    </div>
    <div class="compose-form">
      <input v-model="to" type="email" id="to-inp" name="to" placeholder="To" />
      <input v-model="subject" type="text" id="subject-inp" name="subject" placeholder="Subject" />
      <textarea v-model="content" id="content-inp" name="content" placeholder="Content" rows="20" />
      <div class="send-btn">
        <button @click="sendEmail">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('inbox');

export default {
  name: 'Compose',
  data() {
    return {
      subject: '',
      to: '',
      content: '',
    };
  },
  computed: {
    ...mapGetters(['sendingErrorMsg']),
  },
  methods: {
    ...mapActions(['SendMessage']),
    sendEmail() {
      const { subject, to, content: body } = this;
      this.SendMessage({ subject, to, body });
    },
  },
};
</script>

<style scoped>
  .compose {
    width: 100%;
    height: 95vh;
  }

  .compose-header {
    margin-bottom: 50px;
  }

  .send-btn {
    height: 100%;
  }

  .send-btn button {
    text-decoration: unset;
    padding: 10px 15px;
    margin: unset;
    outline: unset;
    border: unset;
    background: #fff;
    color: #455a6e;
    transition: 0.3s ease-in-out;
    font-size: 1rem;
    width: 100%;
    height: 100%;
  }

  .send-btn button:hover {
    background:#455a6e;
    color: #fff;
  }

  .compose-form {
    width: 100%;
    border: 1px solid #455a6e;
    display: flex;
    flex-direction: column;
  }

  .compose-form input, .compose-form textarea {
    width: 100%;
    border: unset;
    outline: unset;
    font-size: 1rem;
    padding: unset;
    border-bottom: 1px solid #455a6e;
    font-family: unset;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
  }

  .compose-form textarea {
    margin: unset;
  }

  .compose-form input {
    height: 45px;
  }

  .compose-error-msg {
    color: crimson;
    font-style: italic;
    font-size: 1rem;
  }
</style>
