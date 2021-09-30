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
    export default {
        layout: 'default',
        data() {
            return {
                data: '12345',
            }
        },
        asyncData({$axios}) {
            const api = 'http://localhost:82/api/testtest';
            return $axios.get(api).then(respons => {
                return {
                    data: respons.data,
                };
            })
        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">



</style>
