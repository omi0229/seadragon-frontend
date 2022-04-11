<template>
    <div class="uk-flex">
        <DirectoryMenu></DirectoryMenu>
        <div class="container">
            <ul class="uk-breadcrumb">
                <li><a href="/">Home</a></li>
                <li><a href="/directory">線上購物</a></li>
                <li><a :href="'/directory/' + info.directories_id">{{ info.directories_name }}</a></li>
                <li><a :href="'/product-info/' + info.id">{{ info.product.title }}</a></li>
            </ul>
            <div>
                <div class="uk-flex uk-flex-wrap">
                    <div class="uk-width-1-1 uk-width-1-2@m img uk-padding-remove-vertical">
                        <img :src="info.img" class="web" />
                        <img :src="info.mobile_img" class="mobile" />
                        <div class="uk-flex uk-margin-small-top">
                            <!-- v-for -->
                            <div class="thumbnail uk-width-1-5 web" v-for="item in info.web_img_list">
                                <a data-fancybox :href="item.path">
                                    <img :src="item.path" />
                                </a>
                            </div>
                            <div class="mobile" uk-slider="autoplay: true;autoplay-interval: 5000">
                                <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
                                    <div class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m">
                                        <!-- v-for -->
                                        <div class="thumbnail" v-for="item in info.mobile_img_list">
                                            <a data-fancybox :href="item.path">
                                                <img :src="item.path" />
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-1-1 uk-width-1-2@m info">
                        <div class="uk-text-lead uk-text-bold title">{{ info.product.title }}</div>
                        <template v-if="info.product.sales_status !== 0">
                            <div class="uk-text-large uk-margin-small-bottom">
                                <template v-if="info.product.specification.length > 0">
                                    <span class="uk-text-muted">
                                      原價：<s>${{ price.original }} <span v-show="price.unit">/</span> {{ price.unit }}</s> </span>
                                    <span class="uk-text-danger uk-text-bold uk-margin-left" v-if="info.product.specification.length > 0"> ${{ price.selling }} <span v-show="price.unit">/</span> {{ price.unit }}</span>
                                </template>
                            </div>
                            <div class="uk-margin-bottom uk-flex uk-flex-middle">
                                <div class="uk-width-1-5 ">規格：</div>
                                <div class="uk-width-4-5">
                                    <select class="uk-select" v-model="value.specification">
                                        <option value="">請選擇規格</option>
                                        <!-- v-for -->
                                        <option :value="item.id" v-for="item in info.product.specification">
                                            {{item.name}} - 原價：{{item.original_price}} - 售價：{{item.selling_price}} - 庫存：<span class="uk-text-danger">{{item.inventory > 0 ? '有庫存' : '無庫存'}}</span>
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="uk-margin-bottom uk-flex uk-flex-middle">
                                <div class="uk-width-1-5 ">數量：</div>
                                <div class="uk-width-4-5 uk-inline">
                                    <a class="uk-form-icon" uk-icon="icon: minus; ratio: 0.7" @click.stop.prevent="addCount(-1)"></a>
                                    <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: plus; ratio: 0.7" @click.stop.prevent="addCount(1)"></a>
                                    <input class="uk-input" type="text" maxlength="4" placeholder="請輸入數量" v-model.number="value.count">
                                </div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-margin-bottom" v-if="haveInventory">
                                <button class="uk-button uk-button-secondary uk-button-large uk-border-rounded add-cart-button" @click="addCart">
                                    <span class="uk-margin-small-right" uk-icon="icon: cart; ratio: 2"></span> 加入購物車
                                </button>
                            </div>
                        </template>
                        <div class="description" v-html="info.product.description_html"></div>
                    </div>
                </div>
                <div class="content-title uk-margin-large-top uk-text-large">產品介紹</div>
                <hr/>
                <div class="content" v-html="info.product.content"></div>
                <template v-if="relation_product.length > 0">
                    <div class="content-title uk-margin-large-top uk-text-large">相關產品</div>
                    <hr/>
                    <div uk-slider="autoplay: true;autoplay-interval: 5000">
                        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
                            <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-3@s uk-child-width-1-4@m">
                                <!-- v-for -->
                                <li class="carousel" v-for="item in relation_product">
                                    <div class="uk-card cursor" @click="toUrl('/product-info/', item.id)">
                                        <div class="uk-card-media-top">
                                            <img :src="item.web_img_path" alt="" class="web">
                                            <img :src="item.mobile_img_path" alt="" class="mobile">
                                        </div>
                                        <div class="uk-padding-small">
                                            {{item.product.title}}
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
            </div>
        </div>
    </div>
</template>

<script>
"use strict";
    import { find } from 'lodash';
    import moment from 'moment';
    import { getCartCount, getMenu } from '~/plugins/app.js';
    import DirectoryMenu from '~/components/DirectoryMenu';
    import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
    import "@fancyapps/ui/dist/fancybox.css";

    export default {
        components: {DirectoryMenu},
        layout: 'default',
        data() {
            return {
                info: null,
                value: {
                    specification: '',
                    count: 1,
                },
                price: null,
                relation_product: [],
            }
        },
        async asyncData({app, $axios, store, route, redirect}) {
            let id = route.params.id;
            if (!id) {
                redirect('/directory');
            }

            await getMenu('directory').then(res => {
                store.dispatch('setDirectoryList', res.data);
            })

            return $axios.get(process.env.API_URL + '/api/product-info/' + id).then(async res => {

                if (!res.data) {
                    redirect('/directory');
                    return false;
                }

                app.head.title = '線上購物：' + res.data.product.title;
                app.head.meta = [{
                    charset: 'utf-8'
                }, {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                }, {
                    name: 'keywords',
                    content: res.data.product.keywords,
                }, {
                    hid: 'description',
                    name: 'description',
                    content: res.data.product.keywords,
                },
                  {property: 'og:title', content: res.data.product.title},
                  {property: 'og:description', content: res.data.product.keywords},
                  {property: 'og:site_name', content: res.data.product.title},
                  {property: 'og:image', content: res.data.img || ''},
                  {property: 'og:url', content: process.env.BASE_URL + route.fullPath},
                  {property: 'og:locale', content: 'zh_TW'}];

                let price = {
                    original: 0,
                    selling: 0,
                    unit: null,
                };

                if (res.data.product.specification.length > 0) {
                    price.original = res.data.product.specification[0].original_price;
                    price.selling = res.data.product.specification[0].selling_price;
                    price.unit = res.data.product.specification[0].unit;
                }

                let relation_product = [];
                await $axios.get(process.env.API_URL + '/api/put-on-random/' + res.data.directories_id + '/4?put_ons_id=' + id).then(random => {
                    relation_product = random.data;
                })

                return {
                    info: res.data,
                    price,
                    relation_product,
                };
            })
        },
        watch: {
            'value.specification'(new_data, old_data) {
                if (this.info.product.specification.length > 0) {
                    if(new_data) {
                      let specification = find(this.info.product.specification, ['id', new_data]);
                      this.price.original = specification.original_price;
                      this.price.selling = specification.selling_price;
                      this.price.unit = specification.unit;
                    } else {
                      this.price.original = this.info.product.specification[0].original_price;
                      this.price.selling = this.info.product.specification[0].selling_price;
                      this.price.unit = this.info.product.specification[0].unit;
                    }
                }
            },
        },
        computed: {
            dateFormat() {
                return datetime => {
                    return moment(datetime).format('Y/MM/DD');
                }
            },
            haveInventory() {
                let auth = false;
                this.info.product.specification.some(v => {
                    if(v.inventory > 0) {
                        auth = true;
                        return true;
                    }
                });

                return auth;
            },
        },
        mounted() {
            this.$store.commit('disabledLoading');
        },
        methods: {
            addCount(num) {
                if ((num > 0 || (num < 0 && this.value.count > 1)) && this.value.count < 9999) {
                    this.value.count += num;
                }
            },
            addCart() {
                UIkit.notification.closeAll()

                if (!this.value.specification) {
                    UIkit.notification({message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> 請選擇規格！', status: 'danger', timeout: 500})
                    return false;
                }

                if (!this.value.count) {
                    UIkit.notification({message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> 請選擇數量！', status: 'danger', timeout: 500})
                    return false;
                }

                if (this.value.count < 0 || isNaN(this.value.count)) {
                    UIkit.notification({message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> 數量格式錯誤！', status: 'danger', timeout: 500})
                    return false;
                }

                let info = find(this.info.product.specification, ['id', this.value.specification]);
                if (!info) {
                    UIkit.notification({message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> 無此商品！', status: 'danger', timeout: 500})
                    return false;
                }

                if(info.inventory <= 0) {
                    UIkit.notification({message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> 此規格已無庫存！', status: 'danger', timeout: 500})
                    return false;
                }

                this.$store.commit('enabledLoading');
                if (localStorage.getItem('cart_id')) {
                    let data = {
                        'cart_id': localStorage.getItem('cart_id'),
                        'specifications_id': this.value.specification,
                        'count': this.value.count,
                    };
                    this.$axios.post(process.env.API_URL + '/api/cart/add-cart', data).then(res => {
                        getCartCount(this.$store, localStorage.getItem('cart_id'));
                        UIkit.notification({message: '<span uk-icon=\'icon: check;ratio: 1.5\'></span> 成功加入購物車！', status: 'success', timeout: 1000})
                        this.$store.commit('disabledLoading');
                    });
                }
            },
            toUrl(url, id) {
                location.href = url + id;
            },
        }
    }
</script>

<style scoped lang="scss">

.container {
  padding: 25px 0;

  @media (min-width: 1200px) {
    max-width: 70%;
  }

  @media (max-width: 960px) {
    padding: 25px 15px;
  }

  .img {
    padding: 15px;

    @media (max-width: 960px) {
      padding: 0;
    }
  }

  .info {
    padding: 0 15px;

    @media (max-width: 960px) {
      padding: 0;
    }
  }

  .title {
    margin-bottom: 40px;

    @media (max-width: 960px) {
      margin-bottom: 0;
    }
  }

  .add-cart-button {
    display: flex;
    align-items: center;

    @media (max-width: 960px) {
      margin: 0 auto;
      padding: 2% 20%;
      font-size: 20px;
    }
  }

  .description {
    word-break: break-all;
  }

  .content-title {
    padding: 0 15px;

    @media (max-width: 960px) {
      padding: 0;
    }
  }

  .content {
    padding: 15px;
    word-break: break-all;

    @media (max-width: 960px) {
      padding: 0;
    }
  }

  img {
    @include product-image;
  }

  .thumbnail {
    img {
      @include product-image;
    }
  }

  .uk-slider {
    @media (max-width: 960px) {
      width: 100%;
    }

    img {
      @media (max-width: 960px) {
        @include product-image;
      }
    }
  }

  .carousel {
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
}

</style>
