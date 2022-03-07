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
              <li><a href="/account/record">訂單紀錄</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <h2 class="uk-modal-title uk-margin-top">訂單紀錄</h2>
              <div>
                  <div class="uk-text-danger"> 請輸入欲查詢的日期區間，最大區間以六個月內為限。 </div>
                  <div class="uk-flex uk-flex-wrap uk-flex-middle inquire">
                      <div class="uk-width-1-1 uk-width-1-3@m">
                          <div class="uk-inline">
                              <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: future" href="javascript:void(0)" @click="toNow('start')"></a>
                              <input class="start-date uk-input" type="text" />
                          </div>
                      </div>
                      <div class="uk-text-center record-width width-5 web"> 至 </div>
                      <div class="uk-width-1-1 uk-width-1-3@m">
                          <div class="uk-inline">
                              <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: future" href="javascript:void(0)" @click="toNow('end')"></a>
                              <input class="end-date uk-input" type="text" />
                          </div>
                      </div>
                      <div class="record-width inquire-button"> <button class="uk-button-primary" @click="inquireMethod">查詢</button> </div>
                  </div>
                  <template v-if="list.length > 0">
                      <table class="uk-table uk-table-striped uk-table-hover web">
                          <thead>
                          <tr>
                              <th>訂單編號</th>
                              <th>訂購日期</th>
                              <th class="uk-text-center">付款方式</th>
                              <th class="uk-text-center">訂單金額</th>
                              <th class="uk-text-center">付款狀態</th>
                              <th class="uk-text-center">處理狀態</th>
                              <th></th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          <!-- v-for -->
                          <tr v-for="item in list">
                              <td>{{ item.merchant_trade_no }}</td>
                              <td>{{ orderDate(item.created_at) }}</td>
                              <td class="uk-text-center uk-text-bold">{{ paymentFormat(item.payment_method) }}</td>
                              <td class="uk-text-center uk-text-bold">{{ orderTotal(item.freight, item.order_products, item.discount_record, item.coupon_record) }}</td>
                              <td class="uk-text-center uk-text-bold" :class="item.payment_status === 1 ? 'uk-text-primary' : 'uk-text-danger'">{{ paymentStatusFormat(item.payment_status) }}</td>
                              <td class="uk-text-center uk-text-bold" :class="orderStatusColor(item.order_status)">{{ orderStatusFormat(item.order_status) }}</td>
                              <td class="uk-text-center"> <button class="uk-button-primary" @click="orderContent(item.id)">內容</button> </td>
                              <td class="uk-text-center"> <button class="uk-button-primary" @click="buyAgain(item.id)">再次購買</button> </td>
                          </tr>
                          </tbody>
                      </table>

                      <div class="mobile">
                          <ul uk-accordion>
                              <li :class="{'uk-open': key === 0}" v-for="(item, key) in list">
                                  <div class="uk-accordion-title">
                                      <span class="uk-text-muted uk-text-default">{{ item.merchant_trade_no }}</span>
                                      <span class="uk-margin-small-right uk-margin-small-left"></span>
                                      <span :class="orderStatusColor(item.order_status)">{{ orderStatusFormat(item.order_status) }}</span>
                                  </div>
                                  <div class="uk-accordion-content">
                                      <div>訂單編號：{{ item.merchant_trade_no }}</div>
                                      <div>訂購日期：{{ orderDate(item.created_at) }}</div>
                                      <div>付款方式：{{ paymentFormat(item.payment_method) }}</div>
                                      <div>訂單金額：{{ orderTotal(item.freight, item.order_products, item.discount_record, item.coupon_record) }}</div>
                                      <div>付款狀態：<span :class="item.payment_status === 1 ? 'uk-text-primary' : 'uk-text-danger'">{{ paymentStatusFormat(item.payment_status) }}</span></div>
                                      <div>處理狀態：<span :class="orderStatusColor(item.order_status)">{{ orderStatusFormat(item.order_status) }}</span></div>
                                      <div class="uk-margin-top uk-text-right">
                                          <button class="uk-button-primary" @click="buyAgain(item.id)">再次購買</button>
                                          <button class="uk-button-primary" @click="orderContent(item.id)">內容</button>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                      </div>

                  </template>
                  <template v-else>
                      <div class="uk-text-center empty">
                          <h3 class="uk-text-danger uk-text-bold">此時段無任何訂單</h3>
                          <a href="/"><h4 class="uk-text-primary uk-text-bold">回首頁</h4></a>
                      </div>
                  </template>
              </div>
          </div>

        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { loginAuth, notification, setOrderTotal, getCartCount } from '~/plugins/app.js';
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
                value: {
                    start_date: null,
                    end_date: null,
                },
            }
        },
        computed: {
            orderDate() {
                return date => {
                    return moment(date).format('Y/MM/DD HH:mm');
                }
            },
            paymentFormat() {
                return payment => {
                    switch(payment) {
                      case 1:
                          return '信用卡';
                      case 2:
                          return 'ATM';
                      case 3:
                          return 'Line Pay';
                      default:
                          return '';
                    }
                }
            },
            paymentStatusFormat() {
                return status => {
                    switch(status) {
                        case 0:
                            return '尚未付款';
                        case 1:
                            return '付款成功';
                        case -1:
                            return '付款金額錯誤';
                        case -2:
                            return '付款失敗';
                        default:
                            return '';
                    }
                }
            },
            orderStatusFormat() {
              return status => {
                switch (Number(status)) {
                  case -2:
                  case -1:
                    return '已取消';
                  case 0:
                  case 1:
                    return '待處理';
                  case 2:
                    return '已出貨';
                  case 3:
                    return '已完成';
                  default:
                    return '';
                }
              }
            },
            orderStatusColor() {
                return status => {
                    switch(status) {
                        case -2:
                        case -1:
                            return 'uk-text-danger';
                        case 0:
                        case 1:
                            return 'uk-text-default';
                        case 2:
                        case 3:
                            return 'uk-text-default uk-text-primary';
                        default:
                            return '';
                    }
                }
            },
            orderTotal() {
                return (freight, list, discount_record = null, coupon_record = null) => {
                    return setOrderTotal(freight, list, discount_record, coupon_record);
                }
            },
        },
        async mounted() {
            loginAuth(this.$store, true);
            await this.getOrderList(moment().add(-1, 'months').format('Y-MM-DD'), moment().format('Y-MM-DD')).then(res => {
                this.list = res.data.data
            });

            this.value.start_date = document.getElementsByClassName("start-date").flatpickr({
                locale: 'zh_tw',
                defaultDate: moment().add(-1, 'months').format('Y-MM-DD')
            });
            this.value.end_date = document.getElementsByClassName("end-date").flatpickr({
                locale: 'zh_tw',
                defaultDate: moment().format('Y-MM-DD')
            });　

            this.$store.commit('disabledLoading');
        },
        methods: {
          getOrderList(start_date, end_date) {
            return new Promise(resolve => {
                let url = process.env.API_URL + '/api/order/list/' + this.id + '/all';
                url += '?start_date=' + start_date;
                url += '&end_date=' + end_date;
                this.$axios.get(url, this.config).then(res => {
                    resolve(res);
                });
            })
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

              this.$store.commit('enabledLoading');
              setTimeout(() => {
                  this.getOrderList(start_date.format('Y-MM-DD'), end_date.format('Y-MM-DD')).then(res => {
                      this.list = res.data.data
                      this.$store.commit('disabledLoading');
                  })
              }, 2000);
          },
          orderContent(order_id) {
              location.href = '/account/order/' + order_id;
          },
          buyAgain(order_id) {
              let url = process.env.API_URL + '/api/cart/buy-again';
              this.$axios.post(url, { order_id, cart_id: localStorage.getItem('cart_id'), }, this.config).then(res => {
                  if (res.data.status) {
                      getCartCount(this.$store, localStorage.getItem('cart_id'));
                      UIkit.notification({message: '<span uk-icon=\'icon: check;ratio: 1.5\'></span> 購物車已更新！(已下架商品無法加入購物車)', status: 'success', timeout: 1000})
                  }
              });
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
    &.width-5 {
      width: 5%;
    }

    &.width-10 {
      width: 10%;
      min-width: 100px;
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

  .uk-accordion {
    button {
      padding: 5px 20px;
    }
  }

  .uk-inline {
    width: 100%;
  }

  .uk-accordion-title {
    @media (max-width: 960px) {
      border: 1px solid #e6e6e6;
      padding: 10px;
      background-color: #fafafa;
    }
  }

  .uk-accordion-content {
    @media (max-width: 960px) {
      border: 1px solid #e6e6e6;
      padding: 10px;
      margin-top: 0;
    }
  }
}

.uk-modal-dialog {
  width: 400px;
}

</style>
