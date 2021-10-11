<template>

    <div class="container">
      <ul class="uk-breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/cooking">烹飪教學</a></li>
      </ul>

      <div>

          <ul class="uk-subnav uk-subnav-divider" uk-margin>
              <li :class="item.id === cooking_types_id ? 'uk-active' : ''" v-for="item in $store.state.cooking_types_list">
                  <a :href="'/cooking/' + item.id" >{{item.name}}</a>
              </li>
          </ul>

          <div class="uk-flex uk-flex-wrap">
              <!-- v-for -->
              <div class="uk-width-1-3 uk-margin-small-top" v-for="item in list">
                  <div class="uk-card uk-card-default uk-card-body item-img">
                      <template v-if="item.target === 1">
                          <a :href="'https://www.youtube.com/watch?v=' + item.youtube_id" target="_blank" class="uk-text-decoration-none">
                              <img :src="'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg'" />
                          </a>
                          <div class="uk-margin-small uk-text-emphasis uk-text-large">
                              <a :href="'https://www.youtube.com/watch?v=' + item.youtube_id" target="_blank" class="uk-link-heading uk-text-decoration-none">{{item.title}}</a>
                          </div>
                      </template>
                      <template v-else>
                          <a :href="'#modal-media-youtube-' + item.youtube_id" class="uk-text-decoration-none" uk-toggle>
                              <img :src="'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg'" />
                          </a>
                          <div class="uk-margin-small-top uk-text-emphasis uk-text-large">
                              <a :href="'#modal-media-youtube-' + item.youtube_id" class="uk-link-heading uk-text-decoration-none" uk-toggle>{{item.title}}</a>
                          </div>
                          <div :id="'modal-media-youtube-' + item.youtube_id" class="uk-flex-top" uk-modal>
                              <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
                                  <button class="uk-modal-close-outside" type="button" uk-close></button>
                                  <iframe :src="item.youtube_url" uk-video uk-responsive></iframe>
                              </div>
                          </div>
                      </template>
                  </div>
              </div>
          </div>

          <Pagination ref="pagination" :all_count="all_count" :page_count="page_count" :page_item_count="page_item_count" @get-data="getData"></Pagination>
      </div>
    </div>

</template>

<script>
    import { head } from 'lodash';
    import moment from 'moment';
    import Pagination from '../../../components/Pagination';
    import { init } from '~/plugins/app.js';

    export default {
        components: {Pagination},
        layout: 'default',
        data() {
            return {
                cooking_types_id: '',
                list: [],
                all_count: 0,
                page_count: 0,
                page_item_count: 10,
            }
        },
        async fetch ({ $axios, store, params }) {
            await init($axios, store);
        },
        asyncData({$axios, store, route}) {
            let cooking_types_id = route.params.cooking_types_id;
            if(!cooking_types_id) {
                let cooking_type = head(store.state.cooking_types_list);
                cooking_types_id = cooking_type ? cooking_type.id : '';
            }

            let api = process.env.API_URL + '/api/cooking/' + cooking_types_id;

            api += route.params.page ? '/' + route.params.page : '';

            return $axios.get(api).then(res => {
                return {
                    cooking_types_id: cooking_types_id,
                    list: res.data.list,
                    all_count: res.data.all_count,
                    page_count: res.data.page_count,
                    page_item_count: Number(res.data.page_item_count),
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
                history.pushState(null, null, '/cooking/' + this.cooking_types_id + '/' + page);
                this.$axios.get(process.env.API_URL + '/api/cooking/' + this.cooking_types_id + '/' + page).then(res => {
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

    iframe {
      width: 85vw;
      height: 85vh;
    }

    .item-img {
        img {
            height: 30vmin;
            width: 100%;
            object-fit: cover;
        }
    }

</style>
