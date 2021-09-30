<template>

    <div>
        {{data}}
        <nuxt-link class="test" to="/">首頁</nuxt-link>
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
        // asyncData({$axios}) {
        //     const api = 'http://localhost:82/api/testtest';
        //     return $axios.get(api).then(respons => {
        //         return {
        //             data: respons.data,
        //         };
        //     })
        // },
        mounted() {
            console.log(this.$route.params.id);
        },
    }
</script>

<style scoped lang="scss">



</style>
