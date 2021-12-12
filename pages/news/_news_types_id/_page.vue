<template>
    <div class="uk-flex">
        <NewsMenu></NewsMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="/news">最新消息</a></li>
              <li><a :href="'/news/' + info.id">{{ info.name }}</a></li>
          </ul>
          <div>
              <!-- v-for -->
              <div class="uk-flex uk-flex-wrap uk-margin-large-bottom" v-for="item in list">
                  <div class="uk-width-1-1 uk-width-2-5@m news-img uk-text-center">
                      <a :href="'/news-info/' + item.id" :target="item.target === 1 ? '_blank' : '_top'" class="uk-text-decoration-none web">
                          <img :src="item.web_img_path" />
                      </a>
                      <a :href="'/news-info/' + item.id" :target="item.target === 1 ? '_blank' : '_top'" class="uk-text-decoration-none mobile">
                          <img :src="item.mobile_img_path" />
                      </a>
                  </div>
                  <div class="uk-width-1-1 uk-width-3-5@m uk-padding uk-padding-remove-vertical">
                      <div class="uk-text-muted date">
                          {{ dateFormat(item.start_date) }}
                      </div>
                      <div class="uk-text-emphasis uk-text-lead">
                          <a :href="'/news-info/' + item.id" :target="item.target === 1 ? '_blank' : '_top'" class="uk-link-heading uk-text-decoration-none"> {{item.title}} </a>
                      </div>
                  </div>
              </div>
              <Pagination ref="pagination" :all_count="all_count" :page_count="page_count" :page_item_count="page_item_count" @get-data="getData"></Pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import { head, find } from 'lodash';
    import moment from 'moment';
    import Pagination from '../../../components/Pagination';
    import { init, domInit } from '~/plugins/app.js';
    import NewsMenu from '~/components/NewsMenu';

    export default {
        components: {Pagination, NewsMenu},
        layout: 'default',
        data() {
            return {
                news_types_id: '',
                list: [],
                info: {
                  id: null,
                  name: '',
                },
                all_count: 0,
                page_count: 0,
                page_item_count: 10,
            }
        },
        async asyncData({$axios, store, route}) {
            let news_types_id = route.params.news_types_id;
            if(!news_types_id) {
                let news_type = head(store.state.news_types_list);
                news_types_id = news_type ? news_type.id : '';
            }

            let api = process.env.API_URL + '/api/news/' + news_types_id;

            api += route.params.page ? '/' + route.params.page : '';

            return $axios.get(api).then(res => {
                return {
                    news_types_id: news_types_id,
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

            let type = find(this.$store.state.news_types_list, ['id', this.news_types_id]);
            if (type) {
                this.info.id = type.id ? type.id : null;
                this.info.name = type.name ? type.name : null;
            }

            this.$store.commit('disabledLoading');
        },
        methods: {
            getData(page) {
                this.$store.commit('enabledLoading');
                history.pushState(null, null, '/news/' + this.news_types_id + '/' + page);
                this.$axios.get(process.env.API_URL + '/api/news/' + this.news_types_id + '/' + page).then(res => {
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

        .date {
            margin: 20px 0;
            @media (max-width: 960px) {
                margin: 10px 0 0;
            }
        }
    }

    $img-height: 270px;

    .news-img {
        height: $img-height;

        img {
            height: $img-height;
            object-fit: cover;
        }
    }

</style>
