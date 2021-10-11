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
    </div>
</template>

<script>
  export default {
    mounted() {
      if (!localStorage.getItem('cart_id')) {
        this.$axios(process.env.API_URL + '/api/cart/getCartId').then(res => {
          localStorage.setItem('cart_id', res.data);
        });
      }

      this.$axios.post(process.env.API_URL + '/api/cart/getCartCount', {cart_id: localStorage.getItem('cart_id')}).then(res => {
        this.$store.commit('setCartCount', res.data);
      });
    },
    methods: {
      showCart() {

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

</style>
