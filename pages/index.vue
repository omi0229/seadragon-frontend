<template>

    <div>
        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: push; max-height: 600">
            <ul class="uk-slideshow-items">
                <li>
                    <img src="images/banner1.jpg" alt="" uk-cover>
                </li>
                <li>
                    <img src="images/banner2.jpg" alt="" uk-cover>
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
                data: '',
            }
        },
        asyncData({$axios}) {

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
