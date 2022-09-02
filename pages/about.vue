<template>
    <div class="uk-flex">
        <InfoMenu></InfoMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="/about">關於海龍王</a></li>
          </ul>

          <div class="uk-flex uk-flex-column uk-margin-auto" v-html="content"></div>

        </div>

        <!-- Google Analyist -->
        <Ga />
    </div>
</template>

<script>
    import InfoMenu from '~/components/InfoMenu';

    export default {
        layout: 'default',
        components: { InfoMenu },
        data() {
            return {
                content: '',
            }
        },
        async asyncData({$axios, store, route}) {
            return $axios.get(process.env.API_URL + '/api/pages/about').then(res => {
                return {
                    content: res.data.content,
                };
            })
        },
        mounted() {
            this.$store.commit('disabledLoading');
        },
        methods: {

        },
    }
</script>

<style scoped lang="scss">

.container {
  padding: 25px 4vmin 75px;
  width: calc(100% - 15vmin);
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  flex-basis: calc(100% - 200px);

  @media (max-width: 960px) {
    width: 95%;
    min-width: 95%;
    max-width: 95%;
    flex-basis: 95%;
  }
}

</style>
