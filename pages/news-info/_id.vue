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
                <div class="uk-text-lead uk-text-bold"> {{ item.title }}</div>
                <div class="uk-text-small uk-text-muted"> 發布時間：{{ dateFormat(item.start_date) }}</div>
                <hr/>
                <div>
                    <img :src="item.web_img_path" />
                </div>
                <div v-html="item.description"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { find } from 'lodash';
    import moment from 'moment';
    import { init } from '~/plugins/app.js';
    import NewsMenu from '~/components/NewsMenu';

    export default {
        components: { NewsMenu },
        layout: 'default',
        data() {
            return {
                item: null,
                info: {
                  id: null,
                  name: '',
                },
            }
        },
        async fetch({$axios, store, params}) {
            await init(store);
        },
        asyncData({app, $axios, store, route, redirect}) {
            let id = route.params.id;
            if (!id) {
                redirect('/news');
            }

            return $axios.get(process.env.API_URL + '/api/news-info/' + id).then(res => {
                app.head.title = '最新消息：' + res.data.title;
                app.head.meta = [{
                    charset: 'utf-8'
                }, {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                }, {
                    name: 'keywords',
                    content: res.data.keywords,
                }, {
                    hid: 'description',
                    name: 'description',
                    content: res.data.keywords,
                }];

                return {
                    item: res.data,
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
            let type = find(this.$store.state.news_types_list, ['id', this.item.news_types_id]);
            if (type) {
                this.info.id = type.id ? type.id : null;
                this.info.name = type.name ? type.name : null;
            }

            this.$store.commit('disabledLoading');
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">

    .container {
        padding: 25px 4vmin;
    }

    img {
        height: 100%;
        width: auto;
    }

</style>
