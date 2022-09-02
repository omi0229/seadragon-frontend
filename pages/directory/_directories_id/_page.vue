<template>
    <div class="uk-flex">
        <DirectoryMenu></DirectoryMenu>
        <div class="container">
            <ul class="uk-breadcrumb">
                <li><a href="/">Home</a></li>
                <li><a href="/directory">線上購物</a></li>
                <li><a :href="'/directory/' + info.id">{{ info.name }}</a></li>
            </ul>

            <div class="mobile uk-text-bold uk-text-center uk-margin-small-bottom">
                <button class="uk-button uk-button-link uk-text-bold" type="button">{{ directoriesView }} <span uk-icon="icon: chevron-down; ratio: 0.8"></span> </button>
                <div uk-dropdown="pos: bottom">
                    <ul class="uk-nav uk-dropdown-nav">
                        <!-- v-for -->
                        <li :class="{'uk-active': directories_id === item.id}" v-for="item in $store.state.directory_list">
                            <a class="uk-text-small" :href="'/directory/' + item.id">{{ item.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mobile uk-margin-bottom">
                <div class="uk-text-center uk-margin-small-bottom">
                    <button class="uk-button uk-button-link uk-text-bold" type="button">{{sortName}} <span uk-icon="icon: chevron-down; ratio: 0.8"></span> </button>
                    <div id="sort" uk-dropdown="pos: bottom">
                        <ul class="uk-nav uk-dropdown-nav">
                            <!-- v-for -->
                            <li :class="{'uk-active': value.sort === item.sort}" v-for="item in select.sort" @click="sortMethod(item.sort)">
                                <a class="uk-text-small" href="javascript:void(0);">{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="uk-text-center">
                    <button class="uk-button uk-button-link uk-text-bold" type="button">{{pageCountName}} <span uk-icon="icon: chevron-down; ratio: 0.8"></span> </button>
                    <div id="page_item_count" uk-dropdown="pos: bottom">
                        <ul class="uk-nav uk-dropdown-nav">
                            <!-- v-for -->
                            <li :class="{'uk-active': value.page_item_count === item.count}" v-for="item in select.page_item_count" @click="pageCountMethod(item.count)">
                                <a class="uk-text-small" href="javascript:void(0);">{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="uk-text-right web">
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
            <div id="product_list" class="uk-flex uk-flex-wrap">
                <!-- v-for -->
                <div class="uk-width-1-2 uk-width-1-3@m uk-margin-small-top content" v-for="item in list">
                    <div class="uk-card uk-card-body content-image item">
                        <a :href="'/product-info/' + item.id" class="uk-text-decoration-none product-style web">
                            <img :src="item.img" />
                            <div>加入購物車</div>
                        </a>
                        <a :href="'/product-info/' + item.id" class="uk-text-decoration-none mobile">
                            <img :src="item.mobile_img" />
                        </a>
                        <div class="uk-text-center padding content-title uk-text-emphasis">
                            <a :href="'/product-info/' + item.id" class="uk-link-heading uk-text-decoration-none">{{item.product.title}}</a>
                        </div>
                        <div class="uk-text-center uk-text-danger uk-text-bold">
                            <!-- v-if -->
                            <span v-if="item.product.sales_status !== 0 && item.product_specification.data.length > 0">
                                ${{ item.product_specification.data[0].selling_price }}
                                <span v-show="item.product_specification.data[0].unit">/</span>
                                {{ item.product_specification.data[0].unit }}
                            </span>
                        </div>
                        <div class="mobile content-link">
                            <a :href="'/product-info/' + item.id" class="uk-text-center uk-text-decoration-none">加入購物車</a>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination ref="pagination" :all_count="all_count" :page_count="page_count" :page_item_count="page_item_count" @get-data="getData"></Pagination>
        </div>

        <!-- Google Analyist -->
        <Ga />
    </div>
</template>

<script>
    import { head, find } from 'lodash';
    import Pagination from "../../../components/Pagination";
    import DirectoryMenu from '~/components/DirectoryMenu';
    import { getMenu } from '~/plugins/app';

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
        async asyncData({$axios, store, route, redirect}) {
            let directories_id = route.params.directories_id;
            if(!directories_id) {
                let directory = head(store.state.directory_list);
                directories_id = directory ? directory.id : '';
            }

            await getMenu('directory').then(res => {
                store.dispatch('setDirectoryList', res.data);
            })

            let type = find(store.state.directory_list, ['id', directories_id]);
            if (!type) {
                redirect('/');
                return false;
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
            directoriesView() {
                let info = find(this.$store.state.directory_list, ['id', this.directories_id]);
                return info ? info.name : '';
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
                    UIkit.dropdown('#sort').hide();
                    UIkit.dropdown('#page_item_count').hide();

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
        max-width: 100%;
        width: 100%;
        padding: 25px 4vmin;

        .content {
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
                margin-bottom: 10px;

                @media (max-width: 960px) {
                    margin-bottom: 0;
                }

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

        .directory {
            font-size: 14px;
            padding: 0 10px;
            margin: 5px 0;
            max-width: 50%;

            &:not(:last-child) {
                border-right: 1px solid #666;
            }
        }
    }

    .item {
        font-size: 1.5rem;
        line-height: 1.5;
        margin: 10px 0;

        @media (max-width: 960px) {
            font-size: 18px;
        }

        img {
          @include product-image;
        }

        .padding {
            padding: 10px 0;
            @media (max-width: 960px) {
                padding: 0;
            }

            a {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }

    $mobile_padding: 2px;

    #product_list {
        @media (max-width: 960px) {
            margin-bottom: 30px;

            > div:nth-child(odd) {
                padding-right: $mobile_padding;
            }

            > div:nth-child(even) {
                padding-left: $mobile_padding;
            }
        }
    }

    .uk-card-body {
        padding: 20px;
        @media (max-width: 960px) {
            padding: 0;
        }
    }

    .uk-button-link {
        font-size: 16px;
        @media (max-width: 960px) {
            font-size: .875rem;
        }
    }

    .uk-button-link:hover {
        color: #1e87f0;
    }

</style>
