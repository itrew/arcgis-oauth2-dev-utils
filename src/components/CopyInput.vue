<template>
  <div class='append'>
    <input ref='input' v-model='value' type='text' readonly class='small'>
    <div class='button outline small' @click='copyToClipboard'>
      <icon name='clipboard' class='shift-down-3'></icon>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/clipboard';

export default {
  name: 'copy-input',
  components: { Icon },
  props: ['value'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    copyToClipboard() {
      this.$refs.input.select();
      document.execCommand('copy');
    },
  },
};
</script>

<style lang='scss'>
@import '../assets/scss/_variables';

</style>
