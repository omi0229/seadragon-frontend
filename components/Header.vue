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
                    <a href="#modal-register" class="uk-flex uk-link-reset" uk-toggle>
                        <span uk-icon="icon: sign-in"></span>登入
                    </a>
                </div>
                <div class="uk-margin-small-right">
                    <a href="#modal-register" class="uk-flex uk-link-reset" @click="showRegister" uk-toggle>
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

        <!-- This is the modal -->
        <div id="modal-register" uk-modal="bg-close: false">
            <div class="uk-modal-dialog uk-modal-body">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h2 class="uk-modal-title">會員註冊</h2>
                <div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_phone">行動電話 <span class="uk-text-bold uk-text-danger">*</span></label>
                        <input type="text" id="register_phone" maxlength="10" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入行動電話" v-model="form.cellphone">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_password">密碼 <span class="uk-text-bold uk-text-danger">*</span></label>
                        <input type="password" id="register_password" maxlength="50" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入密碼" v-model="form.password">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_return_password">確認密碼 <span class="uk-text-bold uk-text-danger">*</span></label>
                        <input type="password" id="register_return_password" maxlength="50" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請確認密碼" v-model="form.return_password">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_name">姓名 <span class="uk-text-bold uk-text-danger">*</span></label>
                        <input type="text" id="register_name" maxlength="20" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入姓名" v-model="form.name">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_email">電子信箱</label>
                        <input type="text" id="register_email" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入電子信箱" v-model="form.email">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_telephone">市內電話</label>
                        <input type="text" id="register_telephone" maxlength="20" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入市內電話" v-model="form.telephone">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <label class="uk-text-small uk-width-1-4" for="register_address">通訊地址</label>
                        <input type="text" id="register_address" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入通訊地址" v-model="form.address">
                    </div>
                    <div class="uk-margin uk-flex uk-flex-middle">
                        <div class="uk-width-1-4">
                            <label class="uk-text-small" for="register_captcha">驗證碼</label>
                        </div>
                        <div class="uk-width-1-4">
                            <img :src="captcha.image" class="uk-width-1-1" style="height: 30px; padding-right: 10px; box-sizing: border-box;" title="點選圖片重新獲取驗證碼" v-show="captcha.show" @click="showRegister">
                        </div>
                        <div class="uk-width-1-2">
                            <input type="text"  id="register_captcha" maxlength="5" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1" placeholder="請輸入驗證碼" v-model="form.captcha">
                        </div>
                    </div>
                </div>
                <p class="uk-text-right">
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="register">註冊</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
  import { getCartCount } from '~/plugins/app.js';

  export default {
    data() {
      return {
        form: {
          cellphone: '',
          password: '',
          return_password: '',
          name: '',
          email: '',
          telephone: '',
          address: '',
          captcha: '',
        },
        captcha: {
          show: false,
          image: '',
          answers: '',
        }
      }
    },
    mounted() {
      if (!localStorage.getItem('cart_id')) {
        this.$axios(process.env.API_URL + '/api/cart/getCartId').then(res => {
          localStorage.setItem('cart_id', res.data);
        });
      }

      getCartCount(this.$store, localStorage.getItem('cart_id'));
    },
    methods: {
      showCart() {

      },
      showRegister() {
        this.captcha.show = false;
        this.captcha.image = this.captcha.answers = '';
        this.$axios.get(process.env.API_URL + '/api/auth/get-captcha').then(res => {
          this.captcha.show = true;
          this.captcha.image = res.data.image;
          this.captcha.answers = res.data.answers;
        });
      },
      register() {
        console.log(this.form);
        this.input.captcha === this.captcha.answers ? alert('驗證碼正確') : alert('驗證碼錯誤');
      },
    }
  }
</script>

<style scoped lang="scss">

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
