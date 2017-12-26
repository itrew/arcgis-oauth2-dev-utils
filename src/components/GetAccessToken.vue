<template>
  <fieldset>
    <legend>GET ACCESS TOKEN</legend>
    <div class='row'>
      <div class='col col-6 push-center'>
        <div class="form-item">
          <label class='small'>Token Lifespan:</label>
          <div class='append'>
            <input v-model='expiration' type='text' class='small text-center'><span>minutes</span>
          </div>
          <div class='desc'>Minimum: 1 min. - Maximum: 20,160 mins. (2 weeks) - Default: 120 mins.</div>
        </div>
        <div class="form-item">
          <authenticate-button
            label='Get Access Token'
            :url='authUrl'
            @authenticated='afterAuthentication'
          ></authenticate-button>
        </div>
      </div>
    </div>
    <hr/>
    <div class='row'>
      <div class='col col-6 push-center'>
        <div class='row gutters'>
          <div class='col col-10'>
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
  name: 'get-access-token',
  components: { CopyInput, AuthenticateButton, Icon },
  props: ['domain', 'clientId'],
  data() {
    return {
      expiration: 120,
      accessToken: '',
      expirationDate: '',
    };
  },
  computed: {
    authUrl: function authUrl() {
      const url = `https://${this.domain}/sharing/rest/oauth2/authorize`;
      const query = `client_id=${this.clientId}&response_type=token&redirect_uri=${window.location.origin}${window.location.pathname}authenticate&expiration=${this.expiration}`;
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
      this.accessToken = data.parsed.access_token;
      this.expirationDate = new Date(
        data.returnTime.setSeconds(
          data.returnTime.getSeconds() + parseInt(data.parsed.expires_in, 10)
        )
      ).toLocaleString();
    },
  },
};
</script>

<style lang='scss'>
@import '../assets/scss/_variables';

</style>
