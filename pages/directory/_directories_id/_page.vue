<template>

    <div class="container">
      <ul class="uk-breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/product">線上購物</a></li>
      </ul>

          <ul class="uk-subnav uk-subnav-divider" uk-margin>
              <li :class="item.id === directories_id ? 'uk-active' : ''" v-for="item in $store.state.directory_list">
                  <a :href="'/directory/' + item.id" >{{item.name}}</a>
              </li>
          </ul>

          <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s" uk-grid>
              <!-- v-for -->
              <div v-for="item in list">
                  <div class="uk-card uk-card-default uk-card-body">
                      <a :href="'/product-info/' + item.id" class="uk-text-decoration-none">
                          <img :src="item.product.web_img_path" style="height: 30vmin; width: 100%; object-fit: cover;" />
                      </a>
                      <div class="uk-margin-small uk-text-emphasis uk-text-large">
                          <a :href="'/product-info/' + item.id" class="uk-link-heading uk-text-decoration-none">{{item.product.title}}</a>
                      </div>
                  </div>
              </div>
          </div>
          <Pagination ref="pagination" :all_count="all_count" :page_count="page_count" :page_item_count="page_item_count" @get-data="getData"></Pagination>
    </div>

</template>

<script>
    import { head } from 'lodash';
    import moment from 'moment';
    import Pagination from "../../../components/Pagination";
    import { init } from '~/plugins/app.js';

    export default {
        components: {Pagination},
        layout: 'default',
        data() {
            return {
                directories_id: '',
                list: [],
                all_count: 0,
                page_count: 0,
                page_item_count: 10,
                origin_api: '',
            }
        },
        async fetch ({ $axios, store, params }) {
            await init($axios, store);
        },
        asyncData({$axios, store, route}) {
            let directories_id = route.params.directories_id;
            if(!directories_id) {
                let directory = head(store.state.directory_list);
                directories_id = directory ? directory.id : '';
            }

            let origin_api = process.env.apiUrl + '/api/product/' + directories_id;
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

    $img-height: 270px;

    .news-img {
        height: $img-height;

        img {
            height: $img-height;
            object-fit: cover;
        }
    }

    .uk-card-body {
        padding: 20px;
    }

</style>
