<template>

    <div class="uk-padding-large uk-padding-remove-horizontal uk-padding-remove-top">
        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: push; autoplay: true; ratio: 16:7" v-show="list.length > 0">
            <ul class="uk-slideshow-items">
                <li v-for="item in list">
                    <template v-if="item.href">
                        <a :href="item.href" :target="item.target === 1 ? '_blank' : '_top'" class="uk-text-decoration-none web">
                            <img :src="item.web_img_path" alt="" uk-cover>
                        </a>
                        <a :href="item.href" :target="item.target === 1 ? '_blank' : '_top'" class="uk-text-decoration-none mobile">
                            <img :src="item.mobile_img_path" alt="" uk-cover>
                        </a>
                    </template>
                    <template v-else>
                        <img :src="item.web_img_path" alt="" class="web" uk-cover>
                        <img :src="item.mobile_img_path" alt="" class="mobile" uk-cover>
                    </template>
                </li>
            </ul>
            <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
            <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
        </div>

        <template v-if="carousel_list.length > 0">
            <div class="uk-text-center uk-margin-large-top uk-margin-small-bottom uk-text-bolder size-26">最新消息</div>
            <div uk-slider="autoplay: true;autoplay-interval: 5000">
                <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
                    <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-3@s uk-child-width-1-4@m">
                        <!-- v-for -->
                        <li class="carousel" v-for="item in carousel_list">
                            <div class="uk-card cursor" @click="toUrl('/news-info/', item.id)">
                                <div class="uk-card-media-top">
                                    <img :src="item.web_img_path" alt="" class="web">
                                    <img :src="item.mobile_img_path" alt="" class="mobile">
                                </div>
                                <div class="uk-padding-small">
                                    {{item.title}}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
                </div>
                <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
        </template>

        <template v-if="put_on_list.length > 0">
            <div class="uk-text-center uk-margin-large-top uk-margin-small-bottom uk-text-bolder size-26">線上購物</div>
            <template v-for="item in put_on_list">
                <div :id="'put_ons_start_' + item.id" class="put_ons" v-if="item.put_ons.length > 0">
                    <div class="uk-text-center size-20">{{item.name}}</div>
                    <div class="uk-margin-top uk-flex uk-flex-wrap">
                        <!-- v-for -->
                        <div class="uk-width-1-2 uk-width-1-4@m content" v-for="p_item in item.put_ons">
                            <div class="content-image">
                                <a :href="'/product-info/' + p_item.id" class="uk-link-reset product-style web">
                                    <img :src="p_item.img">
                                    <div>加入購物車</div>
                                </a>
                                <a :href="'/product-info/' + p_item.id" class="uk-link-heading mobile"> <img :src="p_item.mobile_img"> </a>
                            </div>
                            <div class="uk-text-center size-20 content-title">
                                <a :href="'/product-info/' + p_item.id" class="uk-link-heading"> {{p_item.product.title}} </a>
                            </div>
                            <div class="uk-text-center uk-text-danger uk-text-bold size-20">
                                <span v-if="p_item.product_specification.data.length > 0">
                                    ${{ p_item.product_specification.data[0].selling_price }}
                                    <span v-show="p_item.product_specification.data[0].unit">/</span>
                                    {{ p_item.product_specification.data[0].unit }}
                                </span>
                            </div>
                            <div class="mobile content-link">
                                <a :href="'/product-info/' + p_item.id" class="uk-text-center uk-text-decoration-none">加入購物車</a>
                            </div>
                        </div>
                    </div>
                    <Pagination :id="'put_ons_end_' + item.id" ref="pagination" :directory_id="item.id" :all_count="item.all_count" :page_count="item.page_count" :page_item_count="item.page_item_count" @get-data="getData"></Pagination>
                </div>
            </template>
        </template>

        <div id="modal-success" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body">
                    <div class="uk-text-center uk-text-success"><span uk-icon="icon: check; ratio: 3.5"></span></div>
                    <div class="uk-text-center uk-margin-top"><h3>{{ message }}</h3></div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-small uk-button-primary uk-modal-close" type="button">確定</button>
                </div>
            </div>
        </div>

        <div id="modal-coupon" class="uk-flex-top" uk-modal="bg-close: false">
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div v-if="coupon.status">
                    <h4 class="uk-text-bold">您有一張優惠劵可以領取！</h4>
                    <div class="uk-background-primary coupon">
                        <div class="uk-flex uk-flex-middle coupon-body">
                            <div class="coupon-discount">
                                $ {{ coupon.discount }}
                            </div>
                            <div>
                                <div class="uk-text-large">{{ coupon.title }}</div>
                                <div class="uk-text-small uk-margin-small-top">
                                    <div class="size-12">使用條件：訂單滿{{ coupon.full_amount.toLocaleString() }}可使用</div>
                                    <div class="size-12">有效期間：{{ coupon.start_date.substr(0, 10) }} - {{ coupon.end_date.substr(0, 10) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-text-right uk-margin-small-top">
                        <button class="btn btn-sm btn-info" @click="getCoupon">點我領取</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import { find } from 'lodash';
    import { loginAuth, modalMessage, notification } from '~/plugins/app.js';
    import Pagination from '~/components/Pagination';

    export default {
        layout: 'default',
        components: {Pagination},
        data() {
            return {
                list: [],
                carousel_list: [],
                put_on_list: [],
                message: '',
                coupon: {
                    status: false,
                    id: null,
                    title: null,
                    full_amount: null,
                    discount: null,
                    start_date: null,
                    end_date: null,
                },
            }
        },
        async asyncData({$axios, store, route}) {
            let list = [];
            await $axios.get(process.env.API_URL + '/api/banners/list').then(res => {
                list = res.data;
            });

            let carousel_list = [];
            await $axios.get(process.env.API_URL + '/api/news').then(res => {
                carousel_list = res.data.list;
            });

            let put_on_list = [];
            await $axios.get(process.env.API_URL + '/api/directory/list/all').then(res => {
                put_on_list = res.data;
            });

            return {
                list: list,
                carousel_list: carousel_list,
                put_on_list: put_on_list,
            };
        },
        async mounted() {
          loginAuth(this.$store);

          // 領取優惠劵API
          let get_coupon_url = process.env.API_URL + '/api/coupon/get/' + localStorage.getItem('cart_id');
          if (this.$store.state.member.id) {
              get_coupon_url += '/' + this.$store.state.member.id;
          }
          await this.$axios.get(get_coupon_url).then(res => {
              if (res.data.status) {
                  this.coupon.status = true;
                  this.coupon.id = res.data.data.id;
                  this.coupon.title = res.data.data.title;
                  this.coupon.full_amount = res.data.data.full_amount;
                  this.coupon.discount = res.data.data.discount;
                  this.coupon.start_date = res.data.data.start_date;
                  this.coupon.end_date = res.data.data.end_date;
                  UIkit.modal('#modal-coupon').show();
              }
          });

          this.$store.commit('disabledLoading');

          if (this.$store.state.member.id) {
            let config = {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.member.token
              }
            };
            await this.getNotification(this.$store.state.member.id, config).then(res => {
              if (res.data.data.length > 0) {
                sessionStorage.setItem('success_modal', 'order_success');
              }
            });
          }

          modalMessage().then(message => {
            this.message = message;
            if (this.message) {
              UIkit.modal('#modal-success').show();
            }
          })
        },
        methods: {
          getNotification(member_id, config) {
            return new Promise(resolve => {
                this.$axios.get(process.env.API_URL + '/api/member/notification/' + member_id, config).then(res => {
                    resolve(res);
                });
            })
          },
          getData(page, directory_id) {
                this.$store.commit('enabledLoading');
                this.$axios.get(process.env.API_URL + '/api/product/' + directory_id + '/' + page).then(res => {
                    let obj = find(this.put_on_list, ['id', directory_id]);
                    obj.put_ons = res.data.list;
                    obj.all_count = res.data.all_count;
                    obj.page_count = res.data.page_count;
                    obj.page_item_count = res.data.page_item_count;
                    this.$store.commit('disabledLoading');
                    UIkit.scroll('#put_ons_end_' + directory_id).scrollTo('#put_ons_start_' + directory_id);
                });
            },
          toUrl(url, id) {
              location.href = url + id;
          },
          getCoupon() {
              sessionStorage.setItem('coupon', this.coupon.id);
              if (!(this.$store.state.member.id && this.$store.state.member.token)) {
                  notification('請登入會員', 'warning');
                  UIkit.modal('#modal-login').show();
              } else {
                  location.href = '/account/coupon';
              }
          },
        },
    }
</script>

<style scoped lang="scss">

.put_ons {
  margin-top: 50px;

  .content {
    padding: 30px;
    box-sizing: border-box;

    @media (max-width: 960px) {
      &:nth-child(odd){
         padding: 20px 3px 10px 10px;
      }

      &:nth-child(even){
         padding: 20px 10px 10px 3px;
      }
    }

    .content-image {
      position: relative;
      z-index: 0;
    }

    .content-title {
      padding-top: 5px;
      position: relative;
      background: #fff;
      max-height: 66.4px;
      z-index: 1;

      a {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .content-link {
      padding: 15px 20px 0;
      box-sizing: border-box;

      > a {
        display: block;
        font-weight: 600;
        font-size: 14px;
        font-family: 'Montserrat', 'Noto Sans TC', 'Noto Sans SC', 'Mitr', 'Athiti', sans-serif;
        color: #fff;
        background-color: #338fb8;
        padding: 12px;
      }
    }

  }
}

.carousel, .put_ons {

  font-size: 20px;
  color: #000;

  > div {
    padding: 15px;
    @media (max-width: 960px) {
      padding: 0;
    }
  }

  img {
    @include product-image;
  }
}

.uk-modal-dialog {
  width: 400px;
}

.coupon {
  padding: 10px;
  border-radius: 10px;

  .coupon-body {
    padding: 10px 10px 10px 0;
    border-radius: 10px;
    border: 2px solid #fff;
    color: #fff;

    .coupon-discount {
      text-align: center;
      flex-basis: 100px;
      font-size: 30px;
    }
  }
}

</style>
