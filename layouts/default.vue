<template>
    <div>
        <div class="loading" v-if="$store.state.loading">
            <div uk-spinner="ratio: 1.8"></div>
        </div>
        <Header></Header>
        <Nuxt class="default-content" />
        <Footer></Footer>
        <a href="#" uk-totop uk-scroll class="to-top" :class="$store.state.to_top ? 'opacity-1' : 'opacity-0'"></a>
    </div>
</template>

<script>
    export default {
        head({$store, $route}) {
            if ($route.name !== 'product-info-id') {
                return {
                    title: $store.state.config.basic_title || '海龍王',
                    meta: [
                        {hid: 'keywords', name: 'keywords', content: $store.state.config.seo_keyword || '海龍王'},
                        {hid: 'description', name: 'description', content: $store.state.config.seo_description || '海龍王'},
                    ],
                };
            }
        },
        mounted() {
            let scroll = document.getElementsByTagName('body');
            if (scroll[0]) {
                scroll[0].onscroll = () => {
                    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
                        this.$store.commit('enabledToTop');
                    } else {
                        this.$store.commit('disabledToTop');
                    }
                };
            }
        }
    }
</script>

<style scoped lang="scss">

    .loading {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 2000;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .to-top {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 6vmin;
        bottom: 6vmin;
        width: 50px;
        height: 50px;
        background-color: #E9E9E9;
        transition: opacity 0.3s;
        z-index: 2;

        &.opacity-0 {
            opacity: 0;
        }

        &.opacity-1 {
            opacity: 1;
        }
    }

    .default-content {
      min-height: calc(100vh - 295px - 238.4px);
    }

</style>
