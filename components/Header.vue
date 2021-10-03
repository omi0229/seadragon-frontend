<template>
    <div id="header">
        <div class="top">
            <a href="/"><img src="/S__111558660.jpg"/></a>
        </div>
        <div class="nav" uk-navbar>
            <div class="nav-item">
                <a href="#">最新消息</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <!-- v-for -->
                        <li v-for="item in $store.state.news_types_list">
                            <a :href="'/news/' + item.id">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="nav-item">
                <a href="#">烹飪教學</a>
            </div>
            <div class="nav-item">
                <a href="#">線上購物</a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <!-- v-for -->
                        <li v-for="item in $store.state.directory_list">
                            <a :href="'/directory/' + item.id">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
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
            font-size: 2.5vmin;

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

        .uk-navbar-dropdown {
            padding: 5px 10px !important;
        }
    }

</style>
