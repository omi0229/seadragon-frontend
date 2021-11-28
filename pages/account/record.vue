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
                  <div class="uk-flex uk-flex-middle">
                      <div class="uk-width-1-3">
                          <div class="uk-inline">
                              <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: future" href="javascript:void(0)" @click="toNow('start')"></a>
                              <input class="start-date uk-input" type="text" />
                          </div>
                      </div>
                      <div class="uk-text-center record-width width-5"> 至 </div>
                      <div class="uk-width-1-3">
                          <div class="uk-inline">
                              <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: future" href="javascript:void(0)" @click="toNow('end')"></a>
                              <input class="end-date uk-input" type="text" />
                          </div>
                      </div>
                      <div class="uk-text-center record-width width-10"> <button class="uk-button-primary inquire-button" @click="inquireMethod">查詢</button> </div>
                  </div>
                  <template v-if="list.length > 0">
                      <table class="uk-table uk-table-striped uk-table-hover">
                          <thead>
                          <tr>
                              <th>訂單編號</th>
                              <th>訂購日期</th>
                              <th class="uk-text-center">付款方式</th>
                              <th class="uk-text-center">訂單金額</th>
                              <th class="uk-text-center">付款狀態</th>
                              <th class="uk-text-center">處理狀態</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          <!-- v-for -->
                          <tr v-for="item in list">
                              <td>{{ item.merchant_trade_no }}</td>
                              <td>{{ orderDate(item.created_at) }}</td>
                              <td class="uk-text-center uk-text-bold">{{ paymentFormat(item.payment_method) }}</td>
                              <td class="uk-text-center uk-text-bold">{{ orderTotal(item.freight, item.order_products) }}</td>
                              <td class="uk-text-center uk-text-bold" :class="item.payment_status ? 'uk-text-primary' : 'uk-text-danger'">{{ paymentStatusFormat(item.payment_status) }}</td>
                              <td class="uk-text-center uk-text-bold" :class="orderStatusColor(item.order_status)">{{ orderStatusFormat(item.order_status) }}</td>
                            <td class="uk-text-center"> <button class="uk-button-primary" @click="orderContent(item.id)">內容</button> </td>
                          </tr>
                          </tbody>
                      </table>
                  </template>
                  <template v-else>
                      <div class="uk-text-center uk-margin-top">
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
    import { init, loginAuth, notification } from '~/plugins/app.js';
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
        async fetch ({ $axios, store, params }) {
            await init(store);
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
                            return 'uk-text-primary';
                        default:
                            return '';
                    }
                }
            },
            orderTotal() {
                return (freight, list) => {
                    let price = 0;
                    list.forEach(v => { price += v.price * v.count });
                    price += freight;
                    return price.toLocaleString();
                }
            },
        },
        async mounted() {
            loginAuth(this.$store, true);
            await this.getOrderList(moment().add(-6, 'months').format('Y-MM-DD'), moment().format('Y-MM-DD')).then(res => {
                this.list = res.data.data
            });

            this.value.start_date = document.getElementsByClassName("start-date").flatpickr({
                locale: 'zh_tw',
                defaultDate: moment().add(-6, 'months').format('Y-MM-DD')
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
        },
    }
</script>

<style scoped lang="scss">

label {
  margin-bottom: 0;
  min-width: 90px;
}

.container {
  padding: 25px 4vmin 75px;
  width: calc(100% - 15vmin);
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  flex-basis: calc(100% - 200px);

  .form-content {
    max-width: 1000px;
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

  .inquire-button {
    padding: 5px 20px;
  }

  .uk-inline {
    width: 100%;
  }
}

.uk-modal-dialog {
  width: 400px;
}

</style>
