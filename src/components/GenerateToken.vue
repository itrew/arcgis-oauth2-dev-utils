<template>
  <fieldset>
    <legend>GENERATE TOKEN</legend>
    <p class='desc'>
      Tokens generated with this utility are not tied to the client id as they use the old /generateToken endpoint.
    </p>
    <div class='row'>
      <div class='col col-6 push-center'>
        <form class="form" @submit.prevent="generateToken()">
          <div class="form-item">
            <label class='small'>Username:</label>
            <input v-model='username' type='text' class='small text-center'>
          </div>
          <div class="form-item">
            <label class='small'>Password:</label>
            <input v-model='password' type='password' class='small text-center'>
          </div>
          <div class="form-item">
            <label class='small'>Token Lifespan:</label>
            <div class='append'>
              <input v-model='expiration' type='text' class='small text-center'><span>minutes</span>
            </div>
            <div class='desc'>Minimum: 1 min. - Maximum: 21,600 mins. (15 days) - Default: 60 mins.</div>
          </div>
          <div class="form-item">
            <label class='small'>Referer:</label>
            <input v-model='referer' type='text' class='small text-center'>
          </div>
          <div class="form-item">
            <button class='button w100 small'>
              Generate Token
            </button>
          </div>
        </form>
      </div>
    </div>
    <hr/>
    <div class='row'>
      <div class='col col-6 push-center'>
        <div class='row gutters'>
          <div class='col col-10'>
            <div class="form-item">
              <label class='small'>Token:</label>
              <copy-input :value='token'></copy-input>
              <div class='desc'>Expires on: {{ expirationDate }}</div>
            </div>
          </div>
          <div class='col col-2'>
            <div class="form-item">
              <label class='small'><br/></label>
              <a class='button outline small w100 text-center' target='_blank' :href='selfUrl' :class='{ disabled: !token }'>
                <icon name='user' class='shift-down-3'></icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/user';
import CopyInput from './CopyInput';
import AuthenticateButton from './AuthenticateButton';

export default {
  name: 'generate-token',
  components: { CopyInput, AuthenticateButton, Icon },
  props: ['domain'],
  data() {
    return {
      username: '',
      password: '',
      expiration: 60,
      referer: '',
      token: '',
      expirationDate: '',
    };
  },
  computed: {
    selfUrl: function selfUrl() {
      const url = `https://${this.domain}/sharing/rest/community/self`;
      const query = `f=pjson&token=${this.token}`;
      return `${url}?${query}`;
    },
  },
  created() {
    this.referer = `${window.location.origin}${window.location.pathname}`;
  },
  mounted() {},
  methods: {
    generateToken() {
      const url = `https://${this.domain}/sharing/rest/generateToken`;
      const form = new FormData();
      const data = {
        username: this.username,
        password: this.password,
        expiration: this.expiration,
        f: 'json',
        referer: this.referer,
      };
      Object.keys(data).forEach(k => form.append(k, data[k]));
      fetch(url, {
        method: 'post',
        body: form,
      })
        .then(response => response.json())
        .then((body) => {
          if (body.token) {
            this.token = body.token;
            this.expirationDate = new Date(body.expires).toLocaleString();
          }
        });
    },
  },
};
</script>

<style lang='scss'>
@import '../assets/scss/_variables';

</style>
