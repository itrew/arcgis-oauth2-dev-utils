<template>
  <fieldset>
    <legend>GET REFRESH TOKEN</legend>
    <div class='row'>
      <div class='col col-6 push-center'>
        <div class="form-item">
          <label class='checkbox'>
            <input type='checkbox' v-model='noExpiration'> No expiration
          </label>
        </div>
        <div class="form-item">
          <label class='small'>Token Lifespan:</label>
          <div class='append'>
            <input v-model='expiration' type='text' class='small text-center' :disabled='noExpiration'><span>minutes</span>
          </div>
          <div class='desc'>Minimum: 1 min. - Maximum: 129,600 mins. (90 days) - Default: 20,160 mins. (2 weeks)</div>
        </div>
        <div class="form-item">
          <authenticate-button
            label='Get Refresh Token'
            :url='authUrl'
            @authenticated='afterAuthentication'
          ></authenticate-button>
        </div>
      </div>
    </div>
    <hr/>
    <div class='row'>
      <div class='col col-6 push-center'>
        <div class="form-item">
          <label class='small'>Code:</label>
          <input ref='input' v-model='code' type='text' readonly disabled class='small'>
        </div>
        <div class="form-item">
          <label class='small'>Refresh Token:</label>
          <copy-input :value='refreshToken'></copy-input>
        </div>
        <div class='row gutters'>
          <div class='col col-8'>
            <div class="form-item">
              <label class='small'>Access Token:</label>
              <copy-input :value='accessToken'></copy-input>
              <div class='desc'>Expires on: {{ expirationDate }}</div>
            </div>
          </div>
          <div class='col col-2'>
            <div class="form-item">
              <label class='small'><br/></label>
              <a class='button outline small w100 text-center' target='_blank' :href='selfUrl' :class='{ disabled: !accessToken }'>
                <icon name='user' class='shift-down-3'></icon>
              </a>
            </div>
          </div>
          <div class='col col-2'>
            <div class="form-item">
              <label class='small'><br/></label>
              <button class='button outline small w100' @click='updateAccessToken' :disabled='!refreshToken'>
                <icon name='refresh' class='shift-down-3'></icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/refresh';
import 'vue-awesome/icons/user';
import CopyInput from './CopyInput';
import AuthenticateButton from './AuthenticateButton';

export default {
  name: 'get-refresh-token',
  components: { CopyInput, AuthenticateButton, Icon },
  props: ['domain', 'clientId'],
  data() {
    return {
      noExpiration: false,
      expiration: 20160,
      code: '',
      refreshToken: '',
      accessToken: '',
      expirationDate: '',
    };
  },
  computed: {
    authUrl: function authUrl() {
      const url = `https://${this.domain}/sharing/rest/oauth2/authorize`;
      const query = `client_id=${this.clientId}&response_type=code&redirect_uri=${window.location.origin}${window.location.pathname}authenticate&expiration=${this.noExpiration ? -1 : this.expiration}`;
      return `${url}?${query}`;
    },
    selfUrl: function selfUrl() {
      const url = `https://${this.domain}/sharing/rest/community/self`;
      const query = `f=pjson&token=${this.accessToken}`;
      return `${url}?${query}`;
    },
  },
  created() {},
  mounted() {},
  methods: {
    afterAuthentication(data) {
      this.code = data.parsed.code;
      const url = `https://${this.domain}/sharing/rest/oauth2/token`;
      const query = `client_id=${this.clientId}&grant_type=authorization_code&redirect_uri=${window.location.origin}${window.location.pathname}authenticate&code=${this.code}`;
      fetch(`${url}?${query}`)
        .then(response => response.json())
        .then((body) => {
          const returnTime = new Date();
          if (body.refresh_token) {
            this.refreshToken = body.refresh_token;
            this.accessToken = body.access_token;
            this.expirationDate = new Date(
              returnTime.setSeconds(
                returnTime.getSeconds() + parseInt(body.expires_in, 10)
              )
            ).toLocaleString();
          }
        });
    },
    updateAccessToken() {
      const url = `https://${this.domain}/sharing/rest/oauth2/token`;
      const query = `client_id=${this.clientId}&grant_type=refresh_token&refresh_token=${this.refreshToken}`;
      fetch(`${url}?${query}`)
        .then(response => response.json())
        .then((body) => {
          const returnTime = new Date();
          if (body.access_token) {
            this.accessToken = body.access_token;
            this.expirationDate = new Date(
              returnTime.setSeconds(
                returnTime.getSeconds() + parseInt(body.expires_in, 10)
              )
            ).toLocaleString();
          }
        });
    },
  },
};
</script>

<style lang='scss'>
@import '../assets/scss/_variables';

</style>
