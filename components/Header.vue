<template>
    <div id="header">
        <div class="top">
            <nuxt-link to="/"><img src="/S__111558660.jpg"/></nuxt-link>
        </div>
        <div class="nav">
            <div class="nav-item">
                <nuxt-link to="/news">最新消息</nuxt-link>
            </div>
            <div class="nav-item">
                <nuxt-link to="#">烹飪教學</nuxt-link>
            </div>
            <div class="nav-item">
                <nuxt-link to="#">線上購物</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">

    #header {

        .top {
            height: 25vmin;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        img {
            height: 22vmin;
        }

        .nav {
            height: 54px;
            background-color: rgb(238, 238, 238);
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 2.8vmin;

            .nav-item {
                padding: 0 35px;

                a {
                    color: #000;
                    text-decoration: none;
                }

                a:hover {
                    color: rgb(255, 221, 0);
                }
            }
        }
    }

</style>
