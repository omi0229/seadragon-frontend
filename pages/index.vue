<template>

    <div>
        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: push; max-height: 600" v-show="list.length > 0">
            <ul class="uk-slideshow-items">
                <li v-for="item in list">
                    <template v-if="item.href">
                        <a :href="item.href" :target="item.target === 1 ? '_blank' : '_top'" class="uk-text-decoration-none">
                            <img :src="item.web_img_path" alt="" uk-cover>
                        </a>
                    </template>
                    <template v-else>
                        <img :src="item.web_img_path" alt="" uk-cover>
                    </template>
                </li>
            </ul>
            <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
            <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
        </div>
    </div>

</template>

<script>
    import { init } from '~/plugins/app.js';

    export default {
        layout: 'default',
        data() {
            return {
                list: [],
            }
        },
        asyncData({$axios, store, route}) {
            let api = process.env.API_URL + '/api/banners/list';
            return $axios.get(api).then(res => {
                return {
                    list: res.data,
                };
            })
        },
        async fetch ({ $axios, store, params }) {
            await init($axios, store);
        },
        mounted() {
            this.$store.commit('disabledLoading');
        },
    }
</script>

<style scoped lang="scss">



</style>
