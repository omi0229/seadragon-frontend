<template>
    <div class="uk-flex">
        <SearchMenu></SearchMenu>
        <div class="container">
          <ul id="cooking_start" class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">搜尋結果</a></li>
              <li><a href="#">烹飪教學</a></li>
          </ul>

          <div class="uk-flex uk-margin-auto uk-flex-wrap" v-if="result.cooking.list.length > 0">
                <!-- v-for -->
                <div id="cooking_list" class="uk-width-1-1 uk-width-1-3@m uk-margin-small-top" v-for="item in result.cooking.list">
                    <div class="uk-card uk-card-body item-img">
                        <template v-if="item.target === 1">
                            <a :href="'https://www.youtube.com/watch?v=' + item.youtube_id" target="_blank" class="uk-text-decoration-none">
                                <img :src="'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg'" />
                            </a>
                            <div class="uk-margin-small uk-text-emphasis">
                                <a :href="'https://www.youtube.com/watch?v=' + item.youtube_id" target="_blank" class="uk-link-heading uk-text-decoration-none">{{item.title}}</a>
                            </div>
                        </template>
                        <template v-else>
                            <a :href="'#modal-media-youtube-' + item.youtube_id" class="uk-text-decoration-none" uk-toggle>
                                <img :src="'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg'" />
                            </a>
                            <div class="uk-margin-small-top uk-text-emphasis">
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

                <Pagination id="cooking_end" :all_count="result.cooking.all_count" :page_count="result.cooking.page_count" :page_item_count="result.cooking.page_item_count" @get-data="getCookingData"></Pagination>
          </div>
          <div class="uk-margin-auto not-find" v-else>
              查無相關烹飪教學影片!!
          </div>

          <ul id="product_start" class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">搜尋結果</a></li>
              <li><a href="#">相關線上購物產品</a></li>
          </ul>

          <div class="uk-flex uk-margin-auto uk-flex-wrap" v-if="result.product.list.length > 0">
              <!-- v-for -->
              <div id="product_list" class="uk-width-1-2 uk-width-1-3@m uk-margin-small-top content" v-for="item in result.product.list">
                  <div class="uk-card uk-card-body content-imag item-img">
                      <a :href="'/product-info/' + item.id" class="uk-text-decoration-none product-style web">
                          <img :src="item.img"/>
                          <div>加入購物車</div>
                      </a>
                      <a :href="'/product-info/' + item.id" class="uk-text-decoration-none mobile">
                          <img :src="item.mobile_img"/>
                      </a>
                      <div class="uk-text-center content-title padding uk-text-emphasis">
                          <a :href="'/product-info/' + item.id" class="uk-link-heading uk-text-decoration-none">{{item.product.title}}</a>
                      </div>
                      <div class="uk-text-center uk-text-danger uk-text-bold">
                          <!-- v-if -->
                          <span v-if="item.product.sales_status !== 0 && item.product_specification.data.length > 0">
                              ${{ item.product_specification.data[0].selling_price }}
                              <span v-show="item.product_specification.data[0].unit">/</span>
                              {{ item.product_specification.data[0].unit }}
                          </span>
                      </div>
                      <div class="mobile content-link">
                          <a :href="'/product-info/' + item.id" class="uk-text-center uk-text-decoration-none">加入購物車</a>
                      </div>
                  </div>
              </div>

              <Pagination id="product_end" :all_count="result.product.all_count" :page_count="result.product.page_count" :page_item_count="result.product.page_item_count" @get-data="getProductData"></Pagination>
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
            this.$store.commit('enabledLoading');

            await this.$axios.get(process.env.API_URL + '/api/search/all/' + this.keywords).then(res => {
                this.result = res.data;
            });

            this.$store.commit('disabledLoading');
        },
        methods: {
            getCookingData(page) {
                this.$store.commit('enabledLoading');
                this.$axios.get(process.env.API_URL + '/api/search/cooking/'+ this.keywords +'/' + page).then(res => {
                    this.result.cooking = res.data;
                    this.$store.commit('disabledLoading');

                    UIkit.scroll('#cooking_end').scrollTo('#cooking_start');
                });
            },
            getProductData(page) {
                this.$store.commit('enabledLoading');
                this.$axios.get(process.env.API_URL + '/api/search/product/'+ this.keywords +'/' + page).then(res => {
                    this.result.product = res.data;
                    this.$store.commit('disabledLoading');

                    UIkit.scroll('#product_end').scrollTo('#product_start');
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

  @media (max-width: 960px) {
    padding: 25px 4vmin;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    flex-basis: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .not-find {
    padding: 20px 0;
    color: #c30d23;
    font-size: 14pt;
    font-weight: 600;
    font-family: 'Noto Sans TC', '微軟正黑體', 'Microsoft JhengHei', sans-serif;
    text-align: center;
  }

  .content {
    .content-image {
      position: relative;
      z-index: 0;
    }

    .content-title {
      padding-top: 5px;
      position: relative;
      background: #fff;
      max-height: 66.4px;
      z-index: 1;
      margin-bottom: 10px;

      @media (max-width: 960px) {
          margin-bottom: 0;
      }

      a {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .content-link {
      padding: 15px 20px 0;
      box-sizing: border-box;

      > a {
        display: block;
        font-weight: 600;
        font-size: 14px;
        font-family: 'Montserrat', 'Noto Sans TC', 'Noto Sans SC', 'Mitr', 'Athiti', sans-serif;
        color: #fff;
        background-color: #338fb8;
        padding: 12px;
      }
    }
  }

}

body > div > div > iframe {
  aspect-ratio: 2 / 1;
  width: 168vmin;

  @media (max-width: 960px) {
    width: 150vmin;
  }
}

#cooking_list {
  .item-img {
    font-size: 1.5rem;

    @media (max-width: 960px) {
      font-size: 18px;
    }

    img {
      height: 35vmin;
      width: 100%;
      object-fit: cover;

      @media (max-width: 960px) {
        height: initial;
      }
    }

    a {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

#product_list {

    @media (max-width: 960px) {
      margin-bottom: 20px;
    }

  .item-img {
    font-size: 1.5rem;

    @media (max-width: 960px) {
      font-size: 18px;
    }

    img {
      @include product-image;
    }

    .padding {
      padding: 10px 0;
      @media (max-width: 960px) {
        padding: 0;
      }

      a {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  $mobile_padding: 2px;

  @media (max-width: 960px) {
    > div:nth-child(odd) {
      padding-right: $mobile_padding;
    }

    > div:nth-child(even) {
      padding-left: $mobile_padding;
    }
  }
}

.uk-card-body {
  padding: 20px;
  @media (max-width: 960px) {
    padding: 0;
  }
}

</style>
