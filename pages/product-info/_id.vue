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
                <div class="uk-flex">
                    <div class="uk-width-1-2 uk-padding-small uk-padding-remove-vertical">
                        <img :src="info.img" />
                        <div class="uk-flex uk-child-width-1-5 uk-margin-small-top">
                            <!-- v-for -->
                            <div class="thumbnail" v-for="item in info.web_img_list">
                                <a data-fancybox :href="item.path">
                                    <img :src="item.path" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-1-2 uk-padding-small uk-padding-remove-vertical">
                        <div class="uk-text-lead uk-text-bold uk-margin-large-bottom">{{ info.product.title }}</div>
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
                                <button class="uk-button uk-button-secondary uk-button-large uk-border-rounded uk-flex uk-flex-middle" @click="addCart">
                                    <span class="uk-margin-small-right" uk-icon="icon: cart; ratio: 2"></span> 加入購物車
                                </button>
                            </div>
                        </template>
                        <div v-html="info.product.description_html"></div>
                    </div>
                </div>
                <div class="padding-x-15px uk-margin-large-top uk-text-large">產品內文</div>
                <hr/>
                <div class="uk-padding-small" v-html="info.product.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";
    import { find } from 'lodash';
    import moment from 'moment';
    import { init, getCartCount } from '~/plugins/app.js';
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
            }
        },
        async fetch({$axios, store, params}) {
            await init(store);
        },
        asyncData({app, $axios, route, redirect}) {
            let id = route.params.id;
            if (!id) {
                redirect('/directory');
            }

            return $axios.get(process.env.API_URL + '/api/product-info/' + id).then(res => {
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
                }];

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

                return {
                    info: res.data,
                    price,
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
        }
    }
</script>

<style scoped lang="scss">

    .container {
        padding: 25px 0;

      img {
        height: 60vmin;
        width: 100%;
        object-fit: cover;
      }

      .thumbnail {
        img {
          height: 80px;
        }
      }

    }

</style>
