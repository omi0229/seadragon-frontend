<template>
    <div id="header">
        <div class="top uk-flex uk-flex-between">
            <div class="top-left uk-flex-1 uk-padding-small uk-flex uk-height-1-1 header-padding">
                <img src="/images/icon/facebook.png" class="uk-border-circle uk-margin-small-right"/>
                <img src="/images/icon/ig.png" class="uk-border-circle uk-margin-small-right"/>
                <img src="/images/icon/line.png" class="uk-border-circle"/>
            </div>
            <a href="/"><img src="/S__111558660.jpg"/></a>
            <div class="uk-flex-1 uk-flex uk-flex-right uk-height-1-1 header-padding">
                <div class="uk-margin-small-right">
                    <a href="#modal-login" class="uk-flex uk-link-reset" uk-toggle>
                        <span uk-icon="icon: sign-in"></span>登入
                    </a>
                </div>
                <div class="uk-margin-small-right">
                    <a href="/register" class="uk-flex uk-link-reset">
                        <span uk-icon="icon: user"></span>註冊
                    </a>
                </div>
                <div class="cursor uk-flex" @click="showCart">
                    <span uk-icon="icon: cart; ratio: 1" :class="{ 'cart-icon-margin': $store.state.cart_count <= 0 }"></span><span class="uk-badge" v-show="$store.state.cart_count > 0">{{ $store.state.cart_count }}</span>購物車
                </div>
            </div>
        </div>
        <div class="nav" uk-navbar>
            <div class="nav-item">
                <a href="#">最新消息</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <!-- v-for -->
                        <li v-for="item in $store.state.news_types_list">
                            <a :href="'/news/' + item.id">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">烹飪教學</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <!-- v-for -->
                        <li v-for="item in $store.state.cooking_types_list">
                            <a :href="'/cooking/' + item.id">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">線上購物</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <!-- v-for -->
                        <li v-for="item in $store.state.directory_list">
                            <a :href="'/directory/' + item.id">{{item.name}}</a>
                        </li>
                    </ul>
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
                        <input id="password" type="password" maxlength="50" class="uk-input uk-width-3-4" placeholder="請輸入密碼" v-model="login.cellphone" />
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <div class="uk-width-1-4">
                            <label class="uk-text-small" for="captcha">驗證碼</label>
                        </div>
                        <div class="uk-width-3-4 uk-flex uk-flex-middle">
                            <div class="uk-width-1-4" @click="refreshCode">
                                <Captcha :identifyCode="captcha.answers" :contentHeight="30" :contentWidth="120"></Captcha>
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
                    <button class="uk-button uk-button-small uk-button-danger" type="button">忘記密碼</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="register">會員註冊</button>
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button">登入</button>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
  import { getCartCount } from '~/plugins/app.js';
  import Captcha from '~/components/Captcha';

  export default {
    components: { Captcha },
    data() {
      return {
        login: {
          cellphone: '',
          phone: '',
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
      showCart() {

      },
      register() {
        location.href = '/register';
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode() {
        this.captcha.answers = '';
        this.makeCode(this.captcha.answers, 5);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.captcha.answers += this.randomNum(0, 9);
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
            background-color: rgb(238, 238, 238);
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 2.5vmin;

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

</style>
