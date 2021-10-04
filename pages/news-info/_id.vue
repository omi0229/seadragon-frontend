<template>

    <div class="container">
        <ul class="uk-breadcrumb">
            <li><a href="/">Home</a></li>
            <li><a href="/news">最新消息</a></li>
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

</template>

<script>
    import {head, join} from 'lodash';
    import moment from 'moment';
    import { init } from '~/plugins/app.js';

    export default {
        layout: 'default',
        data() {
            return {
                item: null,
            }
        },
        async fetch({$axios, store, params}) {
            await init($axios, store);
        },
        asyncData({app, $axios, store, route, redirect}) {
            let id = route.params.id;
            if (!id) {
                redirect('/news');
            }

            return $axios.get(process.env.apiUrl + '/api/news-info/' + id).then(res => {
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
