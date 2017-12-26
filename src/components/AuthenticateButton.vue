<template>
  <button @click='authenticate' class='button w100 small'>
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'authenticate-button',
  components: {},
  props: ['label', 'url'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    authenticate() {
      window.addEventListener('message', this.handleAuthenticatedMessage);
      this.popup = window.open(this.url, 'auth', 'scrollbars=no,width=500,height=675');
      this.interval = window.setInterval(() => {
        if (this.popup.closed) {
          window.removeEventListener('message', this.handleAuthenticatedMessage);
          window.clearInterval(this.interval);
        }
      }, 100);
    },
    handleAuthenticatedMessage(message) {
      if (message.data.returnTime) {
        this.$emit('authenticated', message.data);
      }
    },
  },
};
</script>

<style lang='scss'>
@import '../assets/scss/_variables';

</style>
