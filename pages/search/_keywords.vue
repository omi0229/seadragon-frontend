<template>
    <div class="uk-flex">
        <SearchMenu></SearchMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">搜尋結果</a></li>
              <li><a href="#">烹飪教學</a></li>
          </ul>

          <div class="uk-flex uk-margin-auto uk-flex-wrap" v-if="result.cooking.list.length > 0">
                <!-- v-for -->
                <div class="uk-width-1-3 uk-margin-small-top" v-for="item in result.cooking.list">
                    <div class="uk-card uk-card-body item-img">
                        <template v-if="item.target === 1">
                            <a :href="'https://www.youtube.com/watch?v=' + item.youtube_id" target="_blank" class="uk-text-decoration-none">
                                <img :src="'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg'" />
                            </a>
                            <div class="uk-margin-small uk-text-emphasis uk-text-large">
                                <a :href="'https://www.youtube.com/watch?v=' + item.youtube_id" target="_blank" class="uk-link-heading uk-text-decoration-none">{{item.title}}</a>
                            </div>
                        </template>
                        <template v-else>
                            <a :href="'#modal-media-youtube-' + item.youtube_id" class="uk-text-decoration-none" uk-toggle>
                                <img :src="'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg'" />
                            </a>
                            <div class="uk-margin-small-top uk-text-emphasis uk-text-large">
                                <a :href="'#modal-media-youtube-' + item.youtube_id" class="uk-link-heading uk-text-decoration-none" uk-toggle>{{item.title}}</a>
                            </div>
                            <div :id="'modal-media-youtube-' + item.youtube_id" class="uk-flex-top uk-modal" uk-modal>
                                <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
                                    <button class="uk-modal-close-outside" type="button" uk-close></button>
                                    <iframe :src="'https://www.youtube.com/embed/' + item.youtube_id" uk-video uk-responsive></iframe>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <Pagination :all_count="result.cooking.all_count" :page_count="result.cooking.page_count" :page_item_count="result.cooking.page_item_count" @get-data="getCookingData"></Pagination>
          </div>
          <div class="uk-margin-auto not-find" v-else>
              查無相關烹飪教學影片!!
          </div>

          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">搜尋結果</a></li>
              <li><a href="#">相關線上購物產品</a></li>
          </ul>

          <div class="uk-flex uk-margin-auto uk-flex-wrap" v-if="result.product.list.length > 0">
              <!-- v-for -->
              <div class="uk-width-1-3 uk-margin-small-top" v-for="item in result.product.list">
                  <div class="uk-card uk-card-body item-img">
                      <a :href="'/product-info/' + item.id" class="uk-text-decoration-none">
                          <img :src="item.img" />
                      </a>
                      <div class="uk-text-center uk-margin-small uk-text-emphasis uk-text-large">
                          <a :href="'/product-info/' + item.id" class="uk-link-heading uk-text-decoration-none">{{item.product.title}}</a>
                      </div>
                      <div class="uk-text-center uk-text-danger uk-text-bold uk-text-large">
                          <!-- v-if -->
                          <span v-if="item.product.sales_status !== 0 && item.product_specification.data.length > 0">
                              ${{ item.product_specification.data[0].selling_price }}
                              <span v-show="item.product_specification.data[0].unit">/</span>
                              {{ item.product_specification.data[0].unit }}
                          </span>
                      </div>
                  </div>
              </div>

              <Pagination :all_count="result.product.all_count" :page_count="result.product.page_count" :page_item_count="result.product.page_item_count" @get-data="getProductData"></Pagination>
          </div>
          <div class="uk-margin-auto not-find" v-else>
              查無相關線上購物產品資料!!
          </div>

        </div>
    </div>
</template>

<script>
    import SearchMenu from '~/components/SearchMenu';
    import Pagination from "~/components/Pagination";

    export default {
        layout: 'default',
        components: { Pagination, SearchMenu },
        data() {
            return {
                keywords: '',
                result: {
                  cooking: {
                    list: [],
                    all_count: 0,
                    page_count: 0,
                    page_item_count: 0,
                  },
                  product: {
                    list: [],
                    all_count: 0,
                    page_count: 0,
                    page_item_count: 0,
                  }
                },
            }
        },
        async asyncData({$axios, store, route, redirect}) {
            let keywords = route.params.keywords;
            if (!keywords) {
                redirect('/');
            }

            return {
                keywords: keywords,
            };
        },
        async mounted() {
            await this.$axios.get(process.env.API_URL + '/api/search/all/' + this.keywords).then(res => {
                this.result = res.data;
            });

            this.$store.commit('disabledLoading');
        },
        methods: {
            getProductData(page) {
                this.$store.commit('enabledLoading');
                this.$axios.get(process.env.API_URL + '/api/search/product/'+ this.keywords +'/' + page).then(res => {
                    this.result.product = res.data;
                    this.$store.commit('disabledLoading');
                });
            },
            getCookingData(page) {
                this.$store.commit('enabledLoading');
                this.$axios.get(process.env.API_URL + '/api/search/cooking/'+ this.keywords +'/' + page).then(res => {
                    this.result.cooking = res.data;
                    this.$store.commit('disabledLoading');
                });
            },
        }
    }
</script>

<style scoped lang="scss">

.container {
  padding: 25px 4vmin 75px;
  width: calc(100% - 15vmin);
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  flex-basis: calc(100% - 200px);

  .not-find {
    padding: 20px 0;
    color: #c30d23;
    font-size: 14pt;
    font-weight: 600;
    font-family: 'Noto Sans TC', '微軟正黑體', 'Microsoft JhengHei', sans-serif;
    text-align: center;
  }
}

body > div > div > iframe {
  width: 85vw;
  height: 85vh;
}

.item-img {
  img {
    height: 30vmin;
    width: 100%;
    object-fit: cover;
  }
}

</style>
