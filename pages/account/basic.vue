<template>
    <div class="uk-flex">
        <AccountMenu></AccountMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">會員中心</a></li>
              <li><a href="/account/basic">基本資料修改</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <div>
                  <h2 class="uk-modal-title uk-margin-top">基本資料修改</h2>
              </div>
              <div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <label class="uk-text-small uk-width-1-1 uk-width-1-4@m">行動電話 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <div class="uk-width-1-1 uk-width-3-4@m"> {{ cellphone }} </div>
                  </div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <label class="uk-text-small uk-width-1-1 uk-width-1-4@m" for="register_name">姓名 <span class="uk-text-bold uk-text-danger">*</span></label>
                      <input type="text" id="register_name" maxlength="20" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1 uk-width-3-4@m" placeholder="請輸入姓名" v-model="form.name">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <label class="uk-text-small uk-width-1-1 uk-width-1-4@m" for="register_email">電子信箱</label>
                      <input type="text" id="register_email" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1 uk-width-3-4@m" placeholder="請輸入電子信箱" v-model="form.email">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <label class="uk-text-small uk-width-1-1 uk-width-1-4@m" for="register_telephone">市內電話</label>
                      <input type="text" id="register_telephone" maxlength="20" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1 uk-width-3-4@m" placeholder="請輸入市內電話" v-model="form.telephone">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <label class="uk-text-small uk-width-1-1 uk-width-1-4@m" for="register_address">郵遞區號</label>
                      <div class="uk-width-1-3 uk-width-1-4@m uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                          <select class="uk-select uk-form-small" v-model="form.country" @change="selectCountry">
                              <option value="">請選擇城市</option>
                              <!-- v-for -->
                              <option :value="item.id" v-for="item in select.counties">{{ item.name }}</option>
                          </select>
                      </div>
                      <div class="uk-width-1-3 uk-width-1-4@m uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                          <select class="uk-select uk-form-small" v-model="form.city" @change="selectCity">
                              <option value="">請選擇地區</option>
                              <!-- v-for -->
                              <option :value="item.city" v-for="item in select.cities">{{ item.city }}</option>
                          </select>
                      </div>
                      <div class="uk-width-1-3 uk-width-1-4@m ">
                          <input class="uk-input uk-form-small" type="text" placeholder="郵遞區號" v-model="form.zipcode" disabled>
                      </div>
                  </div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <label class="uk-text-small uk-width-1-1 uk-width-1-4@m" for="register_address">通訊地址</label>
                      <input type="text" id="register_address" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1 uk-width-3-4@m" placeholder="請輸入通訊地址" v-model="form.address">
                  </div>
                  <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                      <div class="uk-width-1-1 uk-width-1-4@m">
                          <label class="uk-text-small" for="register_captcha">驗證碼</label>
                      </div>
                      <div class="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-middle">
                          <div class="uk-width-1-4" @click="refreshCode">
                              <Captcha :identifyCode="captcha.answers" :contentHeight="30" :contentWidth="120"></Captcha>
                          </div>
                          <div class="uk-width-3-4">
                              <input type="text" id="register_captcha" maxlength="5" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1" placeholder="請輸入驗證碼" v-model="input.captcha">
                          </div>
                      </div>
                  </div>
                  <div class="uk-flex uk-flex-wrap uk-flex-middle">
                      <div class="uk-width-1-1 uk-width-1-4@m"></div>
                      <div class="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-middle uk-text-danger">
                          (驗證碼看不清時,請重新點擊驗證碼圖片)
                      </div>
                  </div>
              </div>
              <div class="uk-text-right submit-button">
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
    import { loginAuth, emailRule, randomNum, notification } from '~/plugins/app.js';
    import twzipcode from 'twzipcode-data'
    import Captcha from '~/components/Captcha';
    import AccountMenu from '~/components/AccountMenu';

    export default {
        layout: 'default',
        components: { Captcha, AccountMenu },
        middleware: 'authenticated',
        data() {

            let origin_zipcode = twzipcode();

            return {
                id: this.$store.state.member.id,
                cellphone: this.$store.state.member.cellphone,
                form: {
                  name: this.$store.state.member.name,
                  email: this.$store.state.member.email,
                  telephone: this.$store.state.member.telephone,
                  country: this.$store.state.member.country,
                  city: this.$store.state.member.city,
                  zipcode: this.$store.state.member.zipcode,
                  address: this.$store.state.member.address,
                },
                input: {
                  captcha: '',
                },
                select: {
                  counties: [],
                  cities: [],
                },
                captcha: {
                  answers: '',
                },
                origin_zipcode,
            }
        },
        async asyncData({$axios, store, route}) {
            return {

            };
        },
        mounted() {
            loginAuth(this.$store, true);

            this.refreshCode();
            this.select.counties = this.origin_zipcode.counties;
            this.selectCountry();
            this.form.city = this.$store.state.member.city;
            this.form.zipcode = this.$store.state.member.zipcode;

            this.$store.commit('disabledLoading');
        },
        methods: {
          selectCountry() {
            this.form.city = '';
            this.form.zipcode = '';
            this.select.cities = filter(this.origin_zipcode.zipcodes, v => { return v.county === this.form.country });
          },
          selectCity() {
            this.form.zipcode = '';
            if (this.form.city) {
              this.form.zipcode = find(this.select.cities, ['city', this.form.city]).zipcode;
            }
          },
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
            if (!this.form.name) {
              return {'status': false, 'message': '請輸入姓名'}
            }

            if (this.form.email && !emailRule(this.form.email)) {
              return {'status': false, 'message': '電子信箱格式錯誤'}
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

              let data = { id: this.id, form: this.form };

              let config = {
                  headers: {
                    Authorization: 'Bearer ' + this.$store.state.member.token
                  }
              };

              this.$axios.post(process.env.API_URL + '/api/member/update', data, config).then(res => {
                  UIkit.modal('#modal-confirm').hide();
                  this.$store.commit('disabledLoading');
                  let user = {
                    id: this.$store.state.member.id,
                    cellphone: this.$store.state.member.cellphone,
                    name: this.form.name,
                    email: this.form.email,
                    telephone: this.form.telephone,
                    zipcode: this.form.zipcode,
                    country: this.form.country,
                    city: this.form.city,
                    address: this.form.address,
                    access_token: this.$store.state.member.token,
                  }

                  Cookies.set('user', JSON.stringify(user));
                  this.$store.commit('setLoginMember', user);

                  res.data.status ? notification(res.data.message, 'success', 2000) : notification(res.data.message, 'danger', 1000);
              });
          },
        },
    }
</script>

<style scoped lang="scss">

@import '~@/assets/scss/form.scss';

</style>
