<template>
  <div class='loader-container'>
    <div class='loader'>
      <span class='loader-outer'>
        <span class='loader-inner'>
        </span>
      </span>
      <span class='loader-label'>
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',
  components: {},
  props: ['message'],
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
}
</script>

<style lang='scss'>
@import '../assets/scss/_variables';

.loader-container{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader{
  text-align: center;
}
.loader-outer {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 4px solid $dark-gray;
  animation: loader 2s infinite ease;
}
.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: $dark-gray;
  animation: loader-inner 2s infinite ease-in;
}
.loader-label{
  margin-left: 7px;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
</style>
