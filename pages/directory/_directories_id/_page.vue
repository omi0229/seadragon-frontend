<template>
    <div class="uk-flex">
        <DirectoryMenu></DirectoryMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="/directory">線上購物</a></li>
              <li><a :href="'/directory/' + info.id">{{ info.name }}</a></li>
          </ul>
              <div class="uk-flex uk-flex-wrap">
                  <!-- v-for -->
                  <div class="uk-width-1-3 uk-margin-small-top" v-for="item in list">
                      <div class="uk-card uk-card-default uk-card-body item-img">
                          <a :href="'/product-info/' + item.id" class="uk-text-decoration-none">
                              <img :src="item.img" />
                          </a>
                          <div class="uk-text-center uk-margin-small uk-text-emphasis uk-text-large">
                              <a :href="'/product-info/' + item.id" class="uk-link-heading uk-text-decoration-none">{{item.product.title}}</a>
                          </div>
                          <div class="uk-text-center uk-text-danger uk-text-bold uk-text-large">
                              <span v-if="item.product_specification.data.length > 0"> ${{ item.product_specification.data[0].selling_price }} / {{ item.product_specification.data[0].unit }}</span>
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
    import moment from 'moment';
    import Pagination from "../../../components/Pagination";
    import { init } from '~/plugins/app.js';
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
                all_count: 0,
                page_count: 0,
                page_item_count: 10,
                origin_api: '',
            }
        },
        async fetch ({ $axios, store, params }) {
            await init(store);
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
            dateFormat() {
                return datetime => {
                    return moment(datetime).format('Y/MM/DD');
                }
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
            }

            this.$store.commit('disabledLoading');
        },
        methods: {
            getData(page) {
                this.$store.commit('enabledLoading');
                history.pushState(null, null, '/directory/' + this.directories_id + '/' + page);
                this.$axios.get(this.origin_api + '/' + page).then(res => {
                    this.$store.commit('disabledLoading');
                    this.list = res.data.list;
                    this.all_count = res.data.all_count;
                    this.page_count = res.data.page_count;
                    UIkit.scroll('#footer').scrollTo('#header');
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

</style>
