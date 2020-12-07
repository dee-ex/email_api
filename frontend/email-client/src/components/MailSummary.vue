<template>
  <div class="mail-summary">
    <router-link :to="{ name: path, params: { id: messageId } }">
      <div>
        <div class="mail-title">
          <div class="mail-subject">{{ subject || '[No subject]' }}</div>
          <!-- <div class="mail-date-split">-</div> -->
          <div class="mail-date">{{ formatedDate }}</div>
        </div>
        <div class="mail-from">
          <div>From: </div>
          <div>{{from.PersonalName }}</div>
          <div>({{ from.MailboxName }}@{{from.HostName}})</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'MailSummary',
  computed: {
    messageIdNormalied() {
      return this.messageId.replace(/(^<|>$)/ig, '');
    },
    formatedDate() {
      return dayjs(this.date).format('MMM DD');
    },
  },
  props: {
    subject: String,
    from: Object,
    messageId: String,
    date: String,
    path: String,
  },
};
</script>

<style>
  .mail-summary {
    border-bottom: 1px solid #ccc;
    padding: 15px 25px;
    text-align: left;
  }

  .mail-summary:hover {
    box-shadow: 1px 1px 5px 1px #888;
    transition: box-shadow 0.25s ease-in-out;
  }

  .mail-title {
    display: flex;
    justify-content: space-between;
  }

  .mail-date-split {
    margin-left: 5px;
    margin-right: 5px;
  }

  .mail-subject, .mail-date {
    font-weight: bold;
  }

  .mail-from {
    display: flex;
  }

  .mail-from div:nth-child(1) {
    margin-right: 5px;
  }

  .mail-from div:nth-child(2) {
    margin-right: 5px;
  }

  .mail-summary a {
    text-decoration: unset;
    color: unset;
  }

  .mail-summary a:visited {
    color: unset;
  }
</style>
