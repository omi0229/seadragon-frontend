<template>
    <div class="uk-flex">
        <RegisterMenu></RegisterMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">會員中心</a></li>
              <li><a href="/forget">忘記密碼</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <div>
                  <h2 class="uk-modal-title uk-margin-top">忘記密碼</h2>
              </div>
            　<div>
                  <h4 class="uk-text-danger uk-text-bold">請輸入行動電話、姓名及驗證碼，送出資料後將發送簡訊至手機。</h4>
              </div>
              <div>
                  <div class="uk-margin uk-flex uk-flex-middle">
                      <label class="uk-text-small uk-width-1-4" for="register_phone">行動電話 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <input type="text" id="register_phone" maxlength="10" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入行動電話 ( 帳號 )" v-model="form.cellphone">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-middle">
                      <label class="uk-text-small uk-width-1-4" for="register_name">姓名 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <input type="text" id="register_name" maxlength="20" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入姓名" v-model="form.name">
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
                  <button class="uk-button uk-button-small uk-button-primary uk-padding uk-padding-remove-vertical" type="button" @click="confirm" :disabled="seconds > 0">送出 <span v-show="seconds > 0">({{seconds}})</span></button>
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
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="send">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { init, randomNum, notification} from '~/plugins/app.js';
    import Captcha from '~/components/Captcha';
    import RegisterMenu from '~/components/RegisterMenu';

    export default {
        layout: 'default',
        components: { Captcha, RegisterMenu },
        data() {

            return {
                form: {
                  cellphone: '',
                  name: '',
                },
                input: {
                  captcha: '',
                },
                captcha: {
                  answers: '',
                },
                seconds: 0,
            }
        },
        async asyncData({$axios, store, route}) {
            return {

            };
        },
        async fetch ({ $axios, store, params }) {
            await init(store);
        },
        mounted() {
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
            if (!this.form.cellphone) {
              return {'status': false, 'message': '請輸入行動電話'}
            }

            if (this.form.cellphone.length !== 10) {
              return {'status': false, 'message': '行動電話長度須為10碼'}
            }

            if (this.form.cellphone.substr(0, 2) !== '09') {
              return {'status': false, 'message': '行動電話格式錯誤'}
            }

            if (!this.form.name) {
              return {'status': false, 'message': '請輸入姓名'}
            }

            if (this.input.captcha !== this.captcha.answers) {
              return {'status': false, 'message': '驗證碼錯誤'}
            }

            return { 'status': true }
          },
          confirm() {
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
          send() {
              UIkit.modal('#modal-confirm').hide();
              this.$store.commit('enabledLoading');
              this.$axios.post(process.env.API_URL + '/api/member/forget', this.form).then(res => {
                  this.seconds = res.data.data ? res.data.data : 0;
                  let timer = setInterval(() => {
                    this.seconds -= 1;
                    if (this.seconds <= 0) {
                      clearInterval(timer);
                      this.refreshCode();
                      this.seconds = 0;
                    }
                  }, 1000)

                  this.$store.commit('disabledLoading');
                  res.data.status ? notification(res.data.message, 'success') : notification(res.data.message, 'danger')
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
