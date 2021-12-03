<template>
    <div id="header">
        <div class="top uk-flex uk-flex-between">
            <div class="top-left uk-flex-1 uk-padding-small uk-flex uk-height-1-1 header-padding">
                <img src="/images/icon/t-youtube.png" class="uk-border-circle uk-margin-small-right"/>
                <img src="/images/icon/facebook.png" class="uk-border-circle uk-margin-small-right"/>
                <img src="/images/icon/ig.png" class="uk-border-circle uk-margin-small-right"/>
                <img src="/images/icon/line.png" class="uk-border-circle"/>
            </div>
            <a href="/"><img src="/S__111558660.jpg"/></a>
            <div class="uk-flex-1 uk-flex uk-flex-right uk-height-1-1 header-padding">
                <template v-if="$store.state.member.id">
                  <div class="uk-margin-small-right">
                    <a href="/" class="uk-flex uk-flex-middle uk-link-reset">
                        您好！<span class="uk-text-primary uk-text-bold">{{$store.state.member.name}}</span>
                    </a>
                  </div>
                  <div class="uk-margin-small-right">
                    <a href="/account/basic" class="uk-flex uk-link-reset">
                        <span uk-icon="icon: user"></span>會員中心
                    </a>
                  </div>
                  <div class="uk-margin-small-right">
                    <a href="#modal-logout" class="uk-flex uk-link-reset" uk-toggle>
                      <span uk-icon="icon: sign-out"></span>登出
                    </a>
                  </div>
                </template>
                <template v-else>
                  <div class="uk-margin-small-right">
                    <a href="#modal-login" class="uk-flex uk-link-reset" @click="generalLogin" uk-toggle>
                      <span uk-icon="icon: sign-in"></span>登入
                    </a>
                  </div>
                  <div class="uk-margin-small-right">
                    <a href="/register" class="uk-flex uk-link-reset">
                      <span uk-icon="icon: user"></span>註冊
                    </a>
                  </div>
                </template>
                <div class="cursor uk-flex" @click="showCart">
                    <span uk-icon="icon: cart; ratio: 1" :class="{ 'cart-icon-margin': $store.state.cart_count <= 0 }"></span><span class="uk-badge" v-show="$store.state.cart_count > 0">{{ $store.state.cart_count }}</span>購物車
                </div>
            </div>
        </div>
        <div class="nav" uk-navbar>
            <div class="nav-item">
                <a href="/about">關於海龍王</a>
            </div>
            <div class="nav-item">
                <a href="/news">最新消息</a>
            </div>
            <div class="nav-item">
                <a href="/cooking">烹飪教學</a>
            </div>
            <div class="nav-item">
                <a href="/directory">線上購物</a>
            </div>
            <div class="nav-item">
                <a href="/shopping-explanation">購物說明</a>
            </div>
            <div class="uk-padding-small uk-padding-remove-vertical uk-margin-auto-left">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search ...">
                    <div class="input-group-append">
                        <span class="input-group-text bg-secondary text-white">
                            <span uk-icon="search"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-login" uk-modal="bg-close: false">
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title uk-text-center">會員登入</h2>
                <div>
                    <div class="uk-flex uk-flex-middle">
                        <label for="cellphone" class="uk-width-1-4">帳號 (手機號碼)</label>
                        <input id="cellphone" type="text" maxlength="10" class="uk-input uk-width-3-4" placeholder="請輸入您註冊的手機號碼" v-model="login.cellphone" />
                    </div>
                    <div class="uk-flex uk-flex-middle uk-margin-top">
                        <label for="password" class="uk-width-1-4">密碼</label>
                        <input id="password" type="password" maxlength="50" class="uk-input uk-width-3-4" placeholder="請輸入密碼" v-model="login.password" />
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <div class="uk-width-1-4">
                            <label class="uk-text-small" for="captcha">驗證碼</label>
                        </div>
                        <div class="uk-width-3-4 uk-flex uk-flex-middle">
                            <div class="uk-width-1-4" @click="refreshCode">
                                <Captcha elementId="login-graphic-captcha" :identifyCode="captcha.answers" :contentHeight="30" :contentWidth="120"></Captcha>
                            </div>
                            <div class="uk-width-3-4 uk-padding-small uk-padding-remove-vertical uk-padding-remove-right">
                                <input type="text" id="captcha" maxlength="5" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1" placeholder="請輸入驗證碼" v-model="input.captcha">
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
                <p class="uk-text-right">
                    <button class="uk-button uk-button-small uk-button-danger" type="button" @click="forget">忘記密碼</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="register">會員註冊</button>
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="memberLogin">登入</button>
                </p>
            </div>
        </div>

        <div id="modal-logout" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body">
                    <div class="uk-text-center uk-text-warning"><span uk-icon="icon: question; ratio: 3.5"></span></div>
                    <div class="uk-text-center uk-margin-top"><h3>確定登出？</h3></div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary uk-modal-close" type="button" @click="memberLogout">確定</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { getCartCount, randomNum, notification, loginAuth } from '~/plugins/app.js';
  import Captcha from '~/components/Captcha';

  export default {
    components: { Captcha },
    data() {
      return {
        login: {
          cellphone: '',
          password: '',
        },
        input: {
          captcha: '',
        },
        captcha: {
          answers: '',
        },
      }
    },
    mounted() {
      this.refreshCode();

      if (!localStorage.getItem('cart_id')) {
        this.$axios(process.env.API_URL + '/api/cart/get-cart-id').then(res => {
          localStorage.setItem('cart_id', res.data);
        });
      }

      getCartCount(this.$store, localStorage.getItem('cart_id'));
    },
    methods: {
      generalLogin() {
        if (sessionStorage.getItem('to_url')) {
          sessionStorage.removeItem('to_url')
        }
      },
      showCart() {
        if (!(this.$store.state.member.id && this.$store.state.member.token)) {
          notification('請登入會員', 'warning');
          sessionStorage.setItem('to_url', 'shopping-cart')
          UIkit.modal('#modal-login').show();
        } else {
          location.href = '/shopping-cart';
        }
      },
      forget() {
        location.href = '/forget';
      },
      register() {
        location.href = '/register';
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
      memberLogin() {
        if (!this.login.cellphone) {
          notification('帳號不得為空', 'danger');
          return false;
        }

        if (!this.login.password) {
          notification('密碼不得為空', 'danger');
          return false;
        }

        if (this.input.captcha !== this.captcha.answers) {
          notification('驗證碼錯誤', 'danger');
          return false;
        }

        this.$store.commit('enabledLoading');

        this.$axios.post(process.env.API_URL + '/api/auth/login', this.login).then(res => {
          if (res.data.status) {
            UIkit.modal('#modal-login').hide();
            this.login.cellphone = this.login.password = '';
            setTimeout(() => {

              let expired_time = new Date().getTime() + 86400000;

              this.$store.commit('setLoginMember', res.data.data);
              this.$store.commit('setExpiredTime', expired_time);

              Cookies.set('user', JSON.stringify(res.data.data));
              Cookies.set('user_expired_time', expired_time);

              let timer = setInterval(() => {
                if (new Date().getTime() > expired_time) {
                  this.$store.commit('clearExpiredTime');
                  this.$store.commit('clearLoginMember');
                  clearInterval(timer);
                }
              }, 1000);

              if (sessionStorage.getItem('to_url')) {
                location.href = '/' + sessionStorage.getItem('to_url');
                return true;
              }

              if (location.pathname === '/register' || location.pathname === '/forget') {
                sessionStorage.setItem('success_modal', 'login_success');
                location.href = '/';
              } else {
                this.$store.commit('disabledLoading');
                notification('登入成功', 'success', 2000);
              }
            }, 2000)
          } else {
            notification(res.data.message, 'danger');
            this.$store.commit('disabledLoading');
          }
        });

        return true;
      },
      memberLogout() {
        this.$store.commit('enabledLoading');
        UIkit.modal('#modal-logout').hide();

        Cookies.remove('user');
        Cookies.remove('user_expired_time');

        setTimeout(() => {
          this.$store.commit('clearLoginMember');
          window.location.reload();
        }, 2000)
      },
    }
  }
</script>

<style scoped lang="scss">

    #modal-login {
        label {
            margin-bottom: 0;
            min-width: 90px;
        }
    }

    #header {

        .top {
            height: 25vmin;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

            $size: 40px;

            .top-left {
              img {
                width: $size;
                height: $size;
              }
            }
        }

        a {
          img {
            height: 22vmin;
          }
        }

        .nav {
            height: 8vmin;
            min-height: 58px;
            background-color: rgb(238, 238, 238);
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 20px;

            > div:last-child {
                width: 450px;
            }

            .nav-item {
                padding: 0 35px;

                ul {
                  max-height: 308px;
                  overflow-y: auto;
                }

                a {
                    color: #000;
                    text-decoration: none;
                }

                a:hover {
                    color: rgb(255, 221, 0);
                }
            }

        }

        .uk-navbar-dropdown {
            padding: 5px 10px !important;
        }

        .uk-badge {
            margin-top: 3px;
            background: red !important;
        }

        .header-padding {
            padding: 1.5vmin;
        }

        .cart-icon-margin {
            margin-right: 1.2vmin;
        }

    }

    #modal-register {
      label {
        margin-bottom: 0 !important;
      }
    }

    #modal-logout .uk-modal-dialog {
      width: 400px;
    }

</style>
