<template>
    <div class="uk-flex">
        <DirectoryMenu></DirectoryMenu>
        <div class="container">
            <ul class="uk-breadcrumb">
                <li><a href="/">Home</a></li>
                <li><a href="/directory">線上購物</a></li>
                <li><a :href="'/directory/' + info.id">{{ info.name }}</a></li>
            </ul>
            <div class="uk-text-right">
                <div class="uk-inline uk-margin-right">
                    <button class="uk-button uk-button-link uk-text-bold" type="button">{{sortName}} <span uk-icon="icon: chevron-down; ratio: 0.8"></span> </button>
                    <div uk-dropdown="pos: bottom-right">
                        <ul class="uk-nav uk-dropdown-nav">
                            <!-- v-for -->
                            <li :class="{'uk-active': value.sort === item.sort}" v-for="item in select.sort" @click="sortMethod(item.sort)">
                                <a href="javascript:void(0);">{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="uk-inline">
                    <button class="uk-button uk-button-link uk-text-bold" type="button">{{pageCountName}} <span uk-icon="icon: chevron-down; ratio: 0.8"></span> </button>
                    <div uk-dropdown="pos: bottom-right">
                        <ul class="uk-nav uk-dropdown-nav">
                            <!-- v-for -->
                            <li :class="{'uk-active': value.page_item_count === item.count}" v-for="item in select.page_item_count" @click="pageCountMethod(item.count)">
                                <a href="javascript:void(0);">{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="uk-flex uk-flex-wrap">
                <!-- v-for -->
                <div class="uk-width-1-3 uk-margin-small-top" v-for="item in list">
                    <div class="uk-card uk-card-body item-img">
                        <a :href="'/product-info/' + item.id" class="uk-text-decoration-none">
                            <img :src="item.img" />
                        </a>
                        <div class="uk-text-center uk-margin-small uk-text-emphasis uk-text-large">
                            <a :href="'/product-info/' + item.id" class="uk-link-heading uk-text-decoration-none">{{item.product.title}}</a>
                        </div>
                        <div class="uk-text-center uk-text-danger uk-text-bold uk-text-large">
                            <!-- v-if -->
                            <span v-if="item.product.sales_status !== 0 && item.product_specification.data.length > 0">
                                ${{ item.product_specification.data[0].selling_price }}
                                <span v-show="item.product_specification.data[0].unit">/</span>
                                {{ item.product_specification.data[0].unit }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination ref="pagination" :all_count="all_count" :page_count="page_count" :page_item_count="page_item_count" @get-data="getData"></Pagination>
        </div>
    </div>
</template>

<script>
    import { head, find } from 'lodash';
    import Pagination from "../../../components/Pagination";
    import DirectoryMenu from '~/components/DirectoryMenu';

    export default {
        components: {Pagination, DirectoryMenu},
        layout: 'default',
        data() {
            return {
                directories_id: '',
                list: [],
                info: {
                  id: null,
                  name: '',
                },
                page: 1,
                all_count: 0,
                page_count: 0,
                page_item_count: 10,
                origin_api: '',
                value: {
                    sort: 'none',
                    page_item_count: 24,
                },
                select: {
                  sort: [
                    { sort: 'none', name: '商品排序' },
                    { sort: 'put_on_new', name: '上架時間: 由新到舊' },
                    { sort: 'put_on_old', name: '上架時間: 由舊到新' },
                    { sort: 'price_high', name: '價格: 由高至低' },
                    { sort: 'price_low', name: '價格: 由低至高' },
                    { sort: 'sales_high', name: '銷量: 由高至低' },
                  ],
                  page_item_count: [
                    { count: 24, name: '每頁顯示24個' },
                    { count: 48, name: '每頁顯示48個' },
                    { count: 72, name: '每頁顯示72個' },
                  ]
                }
            }
        },
        async fetch ({ $axios, store, params }) {
            await $axios.get(process.env.API_URL + '/api/directory/menu').then(res => {
                store.dispatch('setDirectoryList', res.data);
            });
        },
        asyncData({$axios, store, route}) {
            let directories_id = route.params.directories_id;
            if(!directories_id) {
                let directory = head(store.state.directory_list);
                directories_id = directory ? directory.id : '';
            }

            let origin_api = process.env.API_URL + '/api/product/' + directories_id;
            let api = route.params.page ? origin_api + '/' + route.params.page : origin_api;

            return $axios.get(api).then(res => {
                return {
                    directories_id: directories_id,
                    list: res.data.list,
                    all_count: res.data.all_count,
                    page_count: res.data.page_count,
                    page_item_count: Number(res.data.page_item_count),
                    origin_api: origin_api,
                };
            })
        },
        computed: {
            sortName() {
                let info = find(this.select.sort, ['sort', this.value.sort]);
                return info.name;
            },
            pageCountName() {
                let info = find(this.select.page_item_count, ['count', this.value.page_item_count]);
                return info.name;
            },
        },
        mounted() {
            if (this.$route.params.page) {
                this.$refs.pagination.setPage(Number(this.$route.params.page));
            }

            let type = find(this.$store.state.directory_list, ['id', this.directories_id]);
            if (type) {
                this.info.id = type.id ? type.id : null;
                this.info.name = type.name ? type.name : null;
                this.$store.commit('disabledLoading');
            } else {
                location.href = '/';
            }
        },
        methods: {
            getData(page) {
                this.page = page;
                history.pushState(null, null, '/directory/' + this.directories_id + '/' + this.page);
                this.__getData().then(() => {

                    UIkit.scroll('#footer').scrollTo('#header');
                })
            },
            sortMethod(sort) {
                history.pushState(null, null, '/directory/' + this.directories_id + '/1');
                this.value.sort = sort;
                this.__getData('method');
            },
            pageCountMethod(count) {
                history.pushState(null, null, '/directory/' + this.directories_id + '/1');
                this.value.page_item_count = count;
                this.__getData('method');
            },
            __getData(type = null) {
                return new Promise(resolve => {
                    let url = type === 'method' ? this.origin_api + '/1' : this.origin_api + '/' + this.page;
                    if (this.value.sort || this.value.page_item_count) {
                        url += '?';
                    }

                    this.value.sort ? url += 'sort=' + this.value.sort : url += '';

                    if (this.value.page_item_count) {
                        this.value.sort ? url += '&' : url += '';
                        url += 'page_item_count=' + this.value.page_item_count;
                    }

                    this.$store.commit('enabledLoading');
                    this.$axios.get(url).then(res => {
                        this.list = res.data.list;
                        this.all_count = res.data.all_count;
                        this.page_count = res.data.page_count;
                        this.page_item_count = res.data.page_item_count;

                        if (type === 'method') {
                            this.$refs.pagination.setPage(1);
                        }

                        this.$store.commit('disabledLoading');
                        resolve();
                    });
                });
            },
        }
    }
</script>

<style scoped lang="scss">

    .container {
        padding: 25px 4vmin;
    }


    .item-img {
        img {
            height: 30vmin;
            width: 100%;
            object-fit: cover;
        }
    }

    .uk-card-body {
        padding: 20px;
    }

    .uk-button-link {
        font-size: 16px;
    }

    .uk-button-link:hover {
        color: #1e87f0;
    }

</style>
