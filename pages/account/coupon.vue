<script src="../../static/plugins/flatpickr/dist/l10n/zh-tw.js"></script>
<template>
    <div class="uk-flex">
        <link rel="stylesheet" href="/plugins/flatpickr/dist/flatpickr.min.css">
        <script src="/plugins/flatpickr/dist/flatpickr.min.js"></script>
        <script src="/plugins/flatpickr/dist/l10n/zh-tw.js"></script>

        <AccountMenu></AccountMenu>
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="#">會員中心</a></li>
              <li><a href="/account/coupon">優惠劵</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <h2 class="uk-modal-title uk-margin-top">優惠劵</h2>
              <div>
                  <div class="uk-text-danger"> 請輸入欲查詢的日期區間，最大區間以六個月內為限。 </div>
                  <div class="uk-flex uk-flex-wrap uk-flex-middle inquire">
                      <div class="uk-width-1-1 uk-width-1-5@m">
                          <div class="uk-inline">
                              <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: future" href="javascript:void(0)" @click="toNow('start')"></a>
                              <input class="start-date uk-input" type="text" />
                          </div>
                      </div>
                      <div class="uk-text-center record-width width-5 web"> 至 </div>
                      <div class="uk-width-1-1 uk-width-1-5@m">
                          <div class="uk-inline">
                              <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: future" href="javascript:void(0)" @click="toNow('end')"></a>
                              <input class="end-date uk-input" type="text" />
                          </div>
                      </div>
                      <div class="uk-text-center record-width width-2 web"> </div>
                      <div class="uk-width-1-1 uk-width-1-5@m">
                          <select class="uk-select" v-model="value.used">
                              <option value="">所有資料</option>
                              <option value="1">已使用</option>
                              <option value="0">未使用</option>
                          </select>
                      </div>
                      <div class="record-width inquire-button"> <button class="uk-button-primary" @click="inquireMethod">查詢</button> </div>
                  </div>
                  <!-- v-for -->
                  <div class="uk-margin-top uk-flex uk-child-width-1-1 uk-child-width-1-2@m uk-flex-wrap" v-if="list.length > 0">
                      <div class="coupon-container cursor" v-for="item in list" @click="showInfo(item.id)">
                          <div class="coupon" :class="item.used_at ? 'bg-success' : 'uk-background-primary'">
                              <div class="uk-flex uk-flex-middle uk-position-relative coupon-body" :class="item.used_at ? 'used' : ''">
                                  <div class="coupon-discount">
                                      $ {{ item.coupon.discount }}
                                  </div>
                                  <div>
                                      <div class="uk-text-large"></div>
                                      <div class="uk-text-small">
                                          <div class="size-12">使用條件：訂單滿{{item.coupon.full_amount}}可使用</div>
                                          <div class="size-12">有效期間：{{ item.coupon.start_date.substr(0, 10) }} - {{ item.coupon.end_date.substr(0, 10) }}</div>
                                      </div>
                                  </div>
                                  <div class="uk-position-bottom-right uk-text-large" v-if="item.used_at">已使用</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="uk-text-center empty" v-else>
                      <h3 class="uk-text-danger uk-text-bold">無搜尋結果或是您目前尚無優惠劵！</h3>
                  </div>
              </div>
          </div>

        </div>

        <div id="modal-info" class="uk-flex-top" uk-modal="bg-close: false">
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-title">優惠劵資訊</div>
                <hr />
                <div class="uk-modal-body coupon-body">
                    <div class="uk-flex uk-flex-wrap uk-flex-middle">
                        <div class="uk-width-1-1 uk-width-1-4@m"> 標題</div>
                        <div class="uk-width-1-1 uk-width-3-4@m uk-text-bold"> {{ info.coupon.title }}</div>
                    </div>
                    <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-small-top">
                        <div class="uk-width-1-1 uk-width-1-4@m"> 使用期限</div>
                        <div class="uk-width-1-1 uk-width-3-4@m uk-text-bold"> {{ info.coupon.start_date.substr(0, 10) }} - {{ info.coupon.end_date.substr(0, 10) }}</div>
                    </div>
                    <div class="uk-flex uk-flex-wrap uk-margin-small-top">
                        <div class="uk-width-1-1 uk-width-1-4@m"> 使用條件</div>
                        <div class="uk-width-1-1 uk-width-3-4@m uk-text-bold">
                            <div>1. 訂單金額滿 $ {{ info.coupon.full_amount }}</div>
                            <div v-if="info.coupon.product_specifications.length > 0">
                                <div>2. 訂單包含以下商品：</div>
                                <div>
                                    <!-- v-for -->
                                    <span v-for="item in info.coupon.product_specifications">
                                        {{ item.product.title }} - <span class="uk-text-primary">{{ item.name }}</span>,
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-small-top">
                        <div class="uk-width-1-1 uk-width-1-4@m"> 折扣金額</div>
                        <div class="uk-width-1-1 uk-width-3-4@m uk-text-bold"> {{ info.coupon.discount }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment';
    import { find } from 'lodash';
    import { loginAuth, notification } from '~/plugins/app.js';
    import AccountMenu from '~/components/AccountMenu';

    export default {
        layout: 'default',
        components: { AccountMenu },
        middleware: 'authenticated',
        data() {
            return {
                id: this.$store.state.member.id,
                config: {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.member.token
                    }
                },
                list: [],
                info: {
                    coupon: {
                        title: '',
                        start_date: '',
                        end_date: '',
                        full_amount: '',
                        discount: '',
                        product_specifications: [],
                    }
                },
                value: {
                    start_date: null,
                    end_date: null,
                    used: '0',
                },
            }
        },
        computed: {

        },
        async mounted() {
            loginAuth(this.$store, true);

            if (sessionStorage.getItem('coupon')) {
                let obj = {
                    coupon_id: sessionStorage.getItem('coupon'),
                    member_id: this.$store.state.member.id,
                    cart_id: localStorage.getItem('cart_id'),
                };
                await this.$axios.post(process.env.API_URL + '/api/member/get-coupon', obj, this.config).then(res => {
                    sessionStorage.removeItem('coupon')
                });
            }

            this.value.start_date = document.getElementsByClassName("start-date").flatpickr({
                locale: 'zh_tw',
                defaultDate: moment().add(-1, 'months').format('Y-MM-DD')
            });
            this.value.end_date = document.getElementsByClassName("end-date").flatpickr({
                locale: 'zh_tw',
                defaultDate: moment().format('Y-MM-DD')
            });

            await this.getCouponList(this.id, false, moment().add(-1, 'months').format('Y-MM-DD'), moment().format('Y-MM-DD')).then(res => {
                this.list = res.data.data;
            })

            this.$store.commit('disabledLoading');
        },
        methods: {
          getCouponList(id, used = null, start_date = null, end_date = null) {
              return new Promise(resolve => {
                  let url = process.env.API_URL + '/api/member/coupon-list/' + this.id;

                  if (used === false || used === true) {
                      url += '/' + used;
                  }

                  if (start_date && end_date) {
                      url += '?' + 'start_date=' + moment(start_date).format('Y-MM-DD') + '&end_date=' + moment(end_date).format('Y-MM-DD');
                  }

                  this.$axios.get(url, this.config).then(res => {
                      resolve(res);
                  });
              })
          },
          showInfo(id) {
              this.info = find(this.list, {id: id});
              console.log(this.info);
              UIkit.modal('#modal-info').show();
          },
          toNow(type) {
              type === 'start' ? this.value.start_date.setDate(moment().format('Y-MM-DD')) : this.value.end_date.setDate(moment().format('Y-MM-DD'));
          },
          inquireMethod() {
              let start_date = moment(this.value.start_date.selectedDates[0]);
              let end_date = moment(this.value.end_date.selectedDates[0]);
              if(end_date.valueOf() - start_date.valueOf() > 15897600000) {
                  notification('查詢最大區間以六個月內為限', 'danger');
                  return false;
              }

              if(end_date.valueOf() - start_date.valueOf() < 0) {
                  notification('結束日期不得小於開始日期', 'danger');
                  return false;
              }

              let used = null
              if (this.value.used === '0') {
                  used = false;
              } else if (this.value.used === '1') {
                  used = true;
              }

              this.$store.commit('enabledLoading');
              this.getCouponList(this.id, used, start_date, end_date).then(res => {
                  this.list = res.data.data;
                  this.$store.commit('disabledLoading');
              })
          },
          orderContent(order_id) {
              location.href = '/account/order/' + order_id;
          },
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

  .coupon-container {

    &:nth-child(odd) {
      padding: 5px 5px 5px 0;

      @media (max-width: 960px) {
        padding: 5px 0;
      }
    }

    &:nth-child(even) {
      padding: 5px 0 5px 5px;

      @media (max-width: 960px) {
        padding: 5px 0;
      }
    }

    .coupon {
      padding: 10px;
      border-radius: 10px;

      .coupon-body {
        height: 100px;
        padding: 10px 10px 10px 0;
        border-radius: 10px;
        border: 2px solid #fff;
        box-sizing: border-box;
        color: #fff;

        &.used {
          border: 0;
        }

        .coupon-discount {
          text-align: center;
          flex-basis: 100px;
          font-size: 30px;
        }
      }
    }
  }

  .form-content {
    max-width: 1000px;

    .empty {
      margin-top: 35px;

      @media (max-width: 960px) {
        margin-top: 50px;
      }
    }
  }

  .record-width {
    &.width-2 {
      width: 2%;
    }
    &.width-5 {
      width: 5%;
    }
  }

  .inquire {
    @media (max-width: 960px) {
      margin-bottom: 35px;
    }

    > div {
      @media (max-width: 960px) {
        margin-top: 10px;
      }
    }
  }

  .inquire-button {
    width: 10%;
    min-width: 100px;
    text-align: center;

    @media (max-width: 960px) {
      width: 100%;
      text-align: right;
    }

    button {
      padding: 5px 20px;
    }
  }

  .uk-inline {
    width: 100%;
  }

}

.coupon-body {
  padding: 0 15px;
}

</style>
