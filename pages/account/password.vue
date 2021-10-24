<template>
    <div class="uk-flex">
        <AccountMenu></AccountMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">會員中心</a></li>
              <li><a href="/account/password">變更密碼</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <div>
                  <h2 class="uk-modal-title uk-margin-top">變更密碼</h2>
              </div>
              <div>
                  <div class="uk-margin uk-flex uk-flex-middle">
                      <label class="uk-text-small uk-width-1-4" for="old_password">舊密碼 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <input type="password" id="old_password" maxlength="50" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入舊密碼" v-model="old_password">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-middle">
                      <label class="uk-text-small uk-width-1-4" for="register_password">密碼 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <input type="password" id="register_password" maxlength="50" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入密碼" v-model="password">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-middle">
                      <label class="uk-text-small uk-width-1-4" for="register_return_password">確認密碼 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <input type="password" id="register_return_password" maxlength="50" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請確認密碼" v-model="return_password">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-middle">
                      <div class="uk-width-1-4">
                          <label class="uk-text-small" for="register_captcha">驗證碼</label>
                      </div>
                      <div class="uk-width-3-4 uk-flex uk-flex-middle">
                          <div class="uk-width-1-4" @click="refreshCode">
                              <Captcha :identifyCode="captcha.answers" :contentHeight="30" :contentWidth="120"></Captcha>
                          </div>
                          <div class="uk-width-3-4">
                              <input type="text" id="register_captcha" maxlength="5" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1" placeholder="請輸入驗證碼" v-model="input.captcha">
                          </div>
                      </div>
                  </div>
                  <div class="uk-flex uk-flex-middle">
                      <div class="uk-width-1-4"></div>
                      <div class="uk-width-3-4 uk-flex uk-flex-middle uk-text-danger">
                          (驗證碼看不清時,請重新點擊驗證碼圖片)
                      </div>
                  </div>
              </div>
              <div class="uk-text-right">
                  <button class="uk-button uk-button-small uk-button-primary uk-padding uk-padding-remove-vertical" type="button" @click="register">送出</button>
              </div>
          </div>

        </div>

        <div id="modal-confirm" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body">
                    <div class="uk-text-center uk-text-warning"><span uk-icon="icon: warning; ratio: 3.5"></span></div>
                    <div class="uk-text-center uk-margin-top"><h3>確定送出？</h3></div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="save">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import { filter, find } from 'lodash';
    import { init, loginAuth, passwordRule, randomNum, notification } from '~/plugins/app.js';
    import Captcha from '~/components/Captcha';
    import AccountMenu from '~/components/AccountMenu';

    export default {
        layout: 'default',
        components: { Captcha, AccountMenu },
        middleware: 'authenticated',
        data() {

            return {
                id: this.$store.state.member.id,
                old_password: '',
                password: '',
                return_password: '',
                input: {
                  captcha: '',
                },
                captcha: {
                  answers: '',
                },
            }
        },
        async fetch ({ $axios, store, params }) {
            await init(store);
        },
        mounted() {
            loginAuth(this.$store, true);

            this.refreshCode();
            this.$store.commit('disabledLoading');
        },
        methods: {
          refreshCode() {
            this.captcha.answers = '';
            this.makeCode(this.captcha.answers, 5);
          },
          makeCode(o, l) {
            for (let i = 0; i < l; i++) {
              this.captcha.answers += randomNum(0, 9);
            }
          },
          auth() {
            if (!this.old_password) {
              return {'status': false, 'message': '請輸入舊密碼'}
            }

            if (!this.password) {
              return {'status': false, 'message': '請輸入密碼'}
            }

            if (!passwordRule(this.password)) {
              return {'status': false, 'message': '密碼規則須為8碼以上數字+英文'}
            }

            if (this.password !== this.return_password) {
              return {'status': false, 'message': '密碼與確認欄位需相同'}
            }

            if (this.input.captcha !== this.captcha.answers) {
              return {'status': false, 'message': '驗證碼錯誤'}
            }

            return { 'status': true }
          },
          register() {
            UIkit.notification.closeAll();

            if (!this.auth().status) {
              UIkit.notification({
                message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> ' + this.auth().message + '',
                status: 'danger',
                timeout: 1000
              })

              return false;
            }

            UIkit.modal('#modal-confirm').show();
          },
          save() {
              this.$store.commit('enabledLoading');
              let data = { id: this.id, old_password: this.old_password, password: this.password };

              let config = {
                  headers: {
                    Authorization: 'Bearer ' + this.$store.state.member.token
                  }
              };

              this.$axios.post(process.env.API_URL + '/api/member/change-password', data, config).then(res => {
                  UIkit.modal('#modal-confirm').hide();
                  this.$store.commit('disabledLoading');
                  res.data.status ? notification(res.data.message, 'success', 2000) : notification(res.data.message, 'danger', 1000);
              });
          },
        },
    }
</script>

<style scoped lang="scss">

label {
  margin-bottom: 0;
  min-width: 90px;
}

.container {
  padding: 25px 4vmin 75px;
  width: calc(100% - 15vmin);
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  flex-basis: calc(100% - 200px);

  .form-content {
    max-width: 1000px;
    padding-left: 20vmin;
    padding-right: 20vmin;
  }
}

.uk-modal-dialog {
  width: 400px;
}

</style>
