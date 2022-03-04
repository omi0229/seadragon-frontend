<template>
    <div class="uk-flex">
        <CookingMenu></CookingMenu>
        <div class="container">
        <ul class="uk-breadcrumb">
            <li><a href="/">Home</a></li>
            <li><a href="/cooking">烹飪教學</a></li>
            <li><a :href="'/cooking/' + info.id">{{ info.name }}</a></li>
        </ul>
        <!-- v-if -->
        <div v-if="list.length > 0">
            <div class="uk-flex uk-flex-wrap">
                <!-- v-for -->
                <div class="uk-width-1-1 uk-width-1-3@m uk-margin-small-top" v-for="item in list">
                    <div class="uk-card uk-card-body item-img">
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
                            <div :id="'modal-media-youtube-' + item.youtube_id" class="uk-flex-top uk-modal" uk-modal>
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
        <div class="uk-margin-auto not-find" v-else>
            此分類目前無教學!!
        </div>
    </div>
    </div>
</template>

<script>
    import { head, find } from 'lodash';
    import moment from 'moment';
    import Pagination from '../../../components/Pagination';
    import CookingMenu from '~/components/CookingMenu';
    import { getMenu } from '~/plugins/app.js';

    export default {
        components: {Pagination, CookingMenu},
        layout: 'default',
        data() {
            return {
                cooking_types_id: '',
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
        async asyncData({$axios, store, route, redirect}) {
            let cooking_types_id = route.params.cooking_types_id;
            if(!cooking_types_id) {
                let cooking_type = head(store.state.cooking_types_list);
                cooking_types_id = cooking_type ? cooking_type.id : '';
            }

            await getMenu('cooking').then(res => {
                store.dispatch('setCookingTypesList', res.data);
            })

            let type = find(store.state.cooking_types_list, ['id', cooking_types_id]);
            if (!type) {
                redirect('/');
                return false;
            }

            let api = process.env.API_URL + '/api/cooking/' + cooking_types_id;

            api += route.params.page ? '/' + route.params.page : '';

            return $axios.get(api).then(res => {

                if (!res.data) {
                    redirect('/');
                    return false;
                } else {
                  return {
                      cooking_types_id: cooking_types_id,
                      list: res.data.list,
                      all_count: res.data.all_count,
                      page_count: res.data.page_count,
                      page_item_count: Number(res.data.page_item_count),
                  };
                }
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

            let type = find(this.$store.state.cooking_types_list, ['id', this.cooking_types_id]);
            if (type) {
                this.info.id = type.id ? type.id : null;
                this.info.name = type.name ? type.name : null;
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

    body > div > div > iframe {
        aspect-ratio: 2 / 1;
        width: 168vmin;

        @media (max-width: 960px) {
            width: 150vmin;
        }
    }

    .item-img {
        img {
            height: 30vmin;
            width: 100%;
            object-fit: cover;

            @media (max-width: 960px) {
                height: initial;
            }
        }
    }

</style>
