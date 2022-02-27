<template>
    <div id="header" class="uk-position-relative">
        <div class="web">
            <div class="top uk-flex uk-flex-between">
                <div class="top-left uk-flex-1 uk-padding-small uk-flex uk-height-1-1 header-padding">
                    <a :href="$store.state.config.link_youtube ? $store.state.config.link_youtube : 'javascript:void(0)'" :target="$store.state.config.link_youtube ? '_blank' : '_self'" class="uk-link-reset">
                        <img src="/images/icon/t-youtube.png" class="uk-border-circle uk-margin-small-right"/>
                    </a>
                    <a :href="$store.state.config.link_facebook ? $store.state.config.link_facebook : 'javascript:void(0)'" :target="$store.state.config.link_facebook ? '_blank' : '_self'" class="uk-link-reset">
                        <img src="/images/icon/facebook.png" class="uk-border-circle uk-margin-small-right"/>
                    </a>
                    <a :href="$store.state.config.link_instagram ? $store.state.config.link_instagram : 'javascript:void(0)'" :target="$store.state.config.link_instagram ? '_blank' : '_self'" class="uk-link-reset">
                        <img src="/images/icon/ig.png" class="uk-border-circle uk-margin-small-right"/>
                    </a>
                    <a :href="$store.state.config.link_line ? $store.state.config.link_line : 'javascript:void(0)'" :target="$store.state.config.link_line ? '_blank' : '_self'" class="uk-link-reset">
                        <img src="/images/icon/line.png" class="uk-border-circle uk-margin-small-right"/>
                    </a>
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
        </div>
        <div class="mobile">
            <div class="mobile-top-block"></div>
            <div class="mobile-top-block mobile-top-fixed">
                <div class="uk-flex uk-flex-middle uk-flex-between">
                    <div class="uk-text-left uk-width-1-5" uk-toggle="target: #offcanvas-overlay">
                        <span uk-icon="icon: menu; ratio: 1.2"></span>
                    </div>
                    <div class="uk-text-center uk-width-3-5"><a href="/"><img src="/S__111558660.jpg" class="logo" /></a></div>
                    <div class="uk-text-right  uk-width-1-5 uk-position-relative">
                        <span uk-icon="icon: cart; ratio: 1.2" class="cursor" :class="{ 'cart-icon-margin': $store.state.cart_count <= 0 }" @click="showCart"></span>
                        <span class="uk-badge uk-position-absolute" v-show="$store.state.cart_count > 0">{{ $store.state.cart_count }}</span>
                    </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search ..." maxlength="40" @keyup.enter="search" v-model="keywords">
                        <div class="input-group-append cursor" @click="search">
                            <span class="input-group-text bg-secondary text-white">
                                <span uk-icon="search"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="offcanvas-overlay" uk-offcanvas="overlay: true">
                <div class="uk-offcanvas-bar">
                    <div class="top">
                        <div class="top-left uk-flex-1 uk-padding-small uk-flex header-padding">
                            <a :href="$store.state.config.link_youtube ? $store.state.config.link_youtube : 'javascript:void(0)'" :target="$store.state.config.link_youtube ? '_blank' : '_self'" class="uk-link-reset">
                                <img src="/images/icon/t-youtube.png" class="uk-border-circle uk-margin-small-right"/>
                            </a>
                            <a :href="$store.state.config.link_facebook ? $store.state.config.link_facebook : 'javascript:void(0)'" :target="$store.state.config.link_facebook ? '_blank' : '_self'" class="uk-link-reset">
                                <img src="/images/icon/facebook.png" class="uk-border-circle uk-margin-small-right"/>
                            </a>
                            <a :href="$store.state.config.link_instagram ? $store.state.config.link_instagram : 'javascript:void(0)'" :target="$store.state.config.link_instagram ? '_blank' : '_self'" class="uk-link-reset">
                                <img src="/images/icon/ig.png" class="uk-border-circle uk-margin-small-right"/>
                            </a>
                            <a :href="$store.state.config.link_line ? $store.state.config.link_line : 'javascript:void(0)'" :target="$store.state.config.link_line ? '_blank' : '_self'" class="uk-link-reset">
                                <img src="/images/icon/line.png" class="uk-border-circle uk-margin-small-right"/>
                            </a>
                        </div>
                        <div>
                            <button class="uk-offcanvas-close" type="button" uk-close></button>
                        </div>
                    </div>
                    <div class="uk-text-bold uk-text-large">
                        <template v-if="$store.state.member.id">
                            <div class="item">
                                <button class="uk-button uk-button-text" type="button" @click="openLogout">登出</button>
                            </div>
                            <div class="item">
                                <button class="uk-button uk-button-text arrow" type="button" uk-toggle="target: #toggle-member; animation: uk-animation-fade">會員中心</button>
                                <div id="toggle-member" class="uk-padding-small offcanvas-toggle" hidden>
                                    <div> <a href="/account/basic" class="uk-link-heading">基本資料</a> </div>
                                    <div> <a href="/account/password" class="uk-link-heading">變更密碼</a> </div>
                                    <div> <a href="/account/record" class="uk-link-heading">訂單紀錄</a> </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="item">
                                <button class="uk-button uk-button-text" type="button" @click="openLogin">會員登入</button>
                            </div>
                            <div class="item">
                                <a href="/register" class="uk-link-heading">會員註冊</a>
                            </div>
                        </template>
                        <div class="item">
                            <button class="uk-button uk-button-text arrow" type="button" uk-toggle="target: #toggle-news; animation: uk-animation-fade" @click="menu('news')">最新消息</button>
                            <div id="toggle-news" class="uk-padding-small offcanvas-toggle" hidden>
                                <!-- v-for -->
                                <div v-for="item in $store.state.news_types_list">
                                    <a :href="'/news/' + item.id" class="uk-link-heading">{{ item.name }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <button class="uk-button uk-button-text arrow" type="button" uk-toggle="target: #toggle-cooking; animation: uk-animation-fade" @click="menu('cooking')">烹飪教學</button>
                            <div id="toggle-cooking" class="uk-padding-small offcanvas-toggle" hidden>
                                <!-- v-for -->
                                <div v-for="item in $store.state.cooking_types_list">
                                    <a :href="'/cooking/' + item.id" class="uk-link-heading">{{ item.name }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <a href="/about" class="uk-link-heading">關於海龍王</a>
                        </div>
                        <div class="item">
                            <button class="uk-button uk-button-text arrow" type="button" uk-toggle="target: #toggle-directory; animation: uk-animation-fade" @click="menu('directory')">線上購物</button>
                            <div id="toggle-directory" class="uk-padding-small offcanvas-toggle" hidden>
                                <!-- v-for -->
                                <div v-for="item in $store.state.directory_list">
                                    <a :href="'/directory/' + item.id" class="uk-link-heading">{{ item.name }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <a href="/shopping-explanation" class="uk-link-heading">購物說明</a>
                        </div>
                        <div class="input-group item">
                            <input type="text" class="form-control" placeholder="Search ..." maxlength="40" @keyup.enter="search" v-model="keywords">
                            <div class="input-group-append cursor" @click="search">
                                <span class="input-group-text bg-secondary text-white">
                                    <span uk-icon="search"></span>
                                </span>
                            </div>
                        </div>
                    </div>
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
                    <input type="text" class="form-control" placeholder="Search ..." maxlength="40" @keyup.enter="search" v-model="keywords">
                    <div class="input-group-append cursor" @click="search">
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
                      <div class="uk-flex uk-flex-wrap uk-flex-middle">
                          <label for="cellphone" class="uk-width-1-1 uk-width-1-4@m">帳號 (手機號碼)</label>
                          <input id="cellphone" type="text" maxlength="10" class="uk-input uk-width-1-1 uk-width-3-4@m" placeholder="請輸入您註冊的手機號碼" v-model="login.cellphone" />
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <label for="password" class="uk-width-1-1 uk-width-1-4@m">密碼</label>
                          <input id="password" type="password" maxlength="50" class="uk-input uk-width-1-1 uk-width-3-4@m" placeholder="請輸入密碼" v-model="login.password" />
                      </div>
                      <div class="uk-margin uk-flex uk-flex-wrap uk-flex-middle">
                          <div class="uk-width-1-1 uk-width-1-4@m">
                              <label for="captcha">驗證碼</label>
                          </div>
                          <div class="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-middle">
                              <div class="uk-width-1-4" @click="refreshCode">
                                  <Captcha elementId="login-graphic-captcha" :identifyCode="captcha.answers" :contentHeight="30" :contentWidth="120"></Captcha>
                              </div>
                              <div class="uk-width-3-4 uk-padding-small uk-padding-remove-vertical uk-padding-remove-right">
                                  <input type="text" id="captcha" maxlength="5" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1" placeholder="請輸入驗證碼" v-model="input.captcha">
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
                  <p class="uk-text-right web">
                      <button class="uk-button uk-button-small uk-button-danger" type="button" @click="forget">忘記密碼</button>
                      <button class="uk-button uk-button-small uk-button-primary" type="button" @click="register">會員註冊</button>
                      <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                      <button class="uk-button uk-button-small uk-button-primary" type="button" @click="memberLogin">登入</button>
                  </p>
                  <div class="mobile mobile-margin">
                      <div class="uk-text-right">
                          <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                          <button class="uk-button uk-button-small uk-button-primary" type="button" @click="memberLogin">登入</button>
                      </div>
                      <div class="uk-text-right uk-margin-top">
                          <button class="uk-button uk-button-small uk-button-danger" type="button" @click="forget">忘記密碼</button>
                          <button class="uk-button uk-button-small uk-button-primary" type="button" @click="register">會員註冊</button>
                      </div>
                  </div>
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
  import moment from 'moment';
  import Cookies from 'js-cookie';
  import { getCartCount, randomNum, notification, loginAuth, getMenu } from '~/plugins/app.js';
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
        keywords: '',
      }
    },
    mounted() {
      this.refreshCode();

      if (!localStorage.getItem('cart_id')) {
        this.$axios.get(process.env.API_URL + '/api/cart/get-cart-id').then(res => {
          localStorage.setItem('cart_id', res.data);
        });
      }

      getCartCount(this.$store, localStorage.getItem('cart_id'));

      if (sessionStorage.getItem('keywords')) {
        this.keywords = sessionStorage.getItem('keywords');
      }
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
      openLogin() {
          UIkit.modal('#modal-login').show();
      },
      openLogout() {
          UIkit.modal('#modal-logout').show();
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

              // 領取優惠劵後的轉向
              if (sessionStorage.getItem('coupon')) {
                location.href = '/account/coupon';
                return true;
              }

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
      search() {
        if (!this.keywords) {
          notification('請輸入關鍵字', 'danger');
          return false;
        }

        sessionStorage.setItem('keywords', this.keywords);
        location.href = '/search/' + this.keywords;
      },
      menu(type) {
        let list = localStorage.getItem(type + '_list');

        let time = localStorage.getItem(type + '_time');
        let now, cache;
        if (time) {
          now = moment().valueOf();
          cache = moment(Number(time)).add(15, 'minutes').valueOf();
        }

        if (!list || !time || (time && now > cache)) {
          getMenu(type).then(res => {
            this.setMenu(type, res.data, true);
          })
        } else {
          this.setMenu(type, JSON.parse(list));
        }
      },
      setMenu(type, data, memory = false) {
        if (memory) {
          localStorage.setItem(type + '_list', JSON.stringify(data));
          localStorage.setItem(type + '_time', moment().valueOf());
        }

        switch (type) {
          case 'news':
            this.$store.dispatch('setNewsTypesList', data);
            break;
          case 'cooking':
            this.$store.dispatch('setCookingTypesList', data);
            break;
          case 'directory':
            this.$store.dispatch('setDirectoryList', data);
            break;
        }
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

        @media (max-width: 960px) {
            margin-bottom: 5px;
        }

        .mobile-margin {
          margin: 20px 0;
        }
    }

    #header {
        z-index: 100;

        .top {
            height: 25vmin;
            text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 960px) {
                height: auto;
            }

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
            flex-wrap: nowrap;

            > div:last-child {
                width: 450px;
            }

            .nav-item {
                padding: 0 35px;
                white-space: nowrap;

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

            @media (max-width: 960px) {
                display: none;
            }
        }

        .uk-navbar-dropdown {
            padding: 5px 10px !important;
        }

        .uk-badge {
            margin-top: 3px;
            background: red !important;

            @media (max-width: 960px) {
                right: -6px;
                top: -6px;
            }
        }

        .header-padding {
            padding: 1.5vmin;
        }

        .cart-icon-margin {
            margin-right: 1.2vmin;
        }

        .mobile-top-block {
            height: 120px;

            > div:first-child {
                height: 70px;
            }
        }

        .mobile-top-fixed {
            z-index: 1;
            background-color: #ffffff;
            position: fixed;
            top: 0;
            width: 100%;
            padding: 0 10px;
        }

        .logo {
            @media (max-width: 960px) {
                height: 50px;
            }
        }

        #offcanvas-overlay {
            background-color: rgb(0, 0, 0, 0);

            .offcanvas-toggle {
                font-size: 20px;
                color: #161b61;
            }

            &::before {
                background: rgba(0, 0, 0, 0);
            }
        }

        .uk-offcanvas-bar {
            background: #eeeeee;
            color: #333;
            padding: 5px 10px 5px 5px;

            .uk-close {
                color: #333;
            }

            a {
                color: #333;
            }

            .item {
                margin: 30px 20px;

                > div {
                    a {
                        font-size: 20px;
                        font-weight: bold;
                        color: #161b61;
                    }
                }

                > div > div + div {
                    margin-top: 5px;
                }
            }

            .uk-button-text {
                color: #333;
                font-size: 24px;
            }

            .uk-button-text.arrow::after {
                display: inline-block;
                margin-left: 0.5em;
                vertical-align: 0.255em;
                content: "";
                border-top: 0.3em solid;
                border-right: 0.3em solid transparent;
                border-bottom: 0;
                border-left: 0.3em solid transparent;
            }

            .input-group {
                @media (max-width: 960px) {
                  width: initial;
                }
            }
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
