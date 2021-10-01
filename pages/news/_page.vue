<template>

    <div class="container">
      <ul class="uk-breadcrumb">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/news">最新消息</nuxt-link></li>
      </ul>
    </div>

</template>

<script>
    export default {
        layout: 'default',
        data() {
            return {
                list: [],
            }
        },
        asyncData({$axios, route}) {
            let page = route.params.page || '1';
            const api = process.env.apiUrl + '/api/news/list/' + page;
            return $axios.get(api).then(res => {
                return {
                    list: res.data,
                };
            })
        },
        mounted() {
            // console.log(this.$route.params.page);
            // console.log(process.env.apiUrl);
        },
    }
</script>

<style scoped lang="scss">

  .container {
    padding: 25px 4vmin;
  }

</style>
