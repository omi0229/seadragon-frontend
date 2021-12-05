<template>
    <div class="uk-flex">
        <AccountMenu></AccountMenu>
        <div class="container" v-cloak>
            <ul class="uk-breadcrumb">
                <li><a href="/">Home</a></li>
                <li><a href="#">會員中心</a></li>
                <li><a href="/account/record">訂單紀錄</a></li>
                <li><a :href="'/account/order/' + order_id"> {{ info.merchant_trade_no }} </a></li>
            </ul>

            <div class="form-content uk-margin-auto">
                <ul uk-tab>
                    <li class="uk-active"><a href="#">訂單資料</a></li>
                    <li><a href="#">購物明細</a></li>
                </ul>
                <ul class="uk-switcher uk-margin">
                    <li>
                        <h4 class="uk-text-bold uk-margin-remove-bottom">訂單資料</h4>
                        <div class="uk-card uk-card-default uk-padding uk-margin-small-top">
                            <div class="uk-flex uk-flex-middle">
                                <div class="uk-width-1-6"> 訂單編號 </div>
                                <div class="uk-width-5-6"> {{ info.merchant_trade_no }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 訂單金額 </div>
                                <div class="uk-width-5-6 uk-text-bold uk-text-danger"> $ {{ orderTotal(info.freight, info.order_products) }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 付款狀態 </div>
                                <div class="uk-width-5-6 uk-text-bold" :class="info.payment_status ? 'uk-text-primary' : 'uk-text-danger'"> {{ paymentStatusFormat(info.payment_status) }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 付款方式 </div>
                                <!-- v-if -->
                                <div class="uk-width-5-6" v-if="info.payment_status !== 0"> {{ paymentFormat(info.payment_method) }} </div>
                                <div class="uk-width-5-6" v-else>
                                    <label class="uk-margin-remove-bottom"><input class="uk-radio" type="radio" value="1" v-model="payment_method"> 信用卡</label>
                                    <label class="uk-margin-remove-bottom uk-margin-small-left"><input class="uk-radio" type="radio" value="2" v-model="payment_method"> ATM</label>
                                </div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-flex uk-flex-middle uk-margin-top" v-if="info.payment_status === 0 && (payment_method === '1' || (payment_method === '2' && !info.vAccount))">
                                <div class="uk-width-1-6"> </div>
                                <div class="uk-width-5-6"> <button class="uk-button-small uk-button-primary" @click="confirm"> 前往付款 </button></div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-flex uk-flex-middle uk-margin-top" v-if="atmDelay">
                                <div class="uk-width-1-6"> </div>
                                <div class="uk-width-5-6"> <button class="uk-button-small uk-button-primary" @click="confirm"> 重新取號 </button></div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-flex uk-flex-middle uk-margin-top" v-if="info.payment_method === 2">
                                <div class="uk-width-1-6"> 取號狀態 </div>
                                <!-- v-if -->
                                <div class="uk-width-5-6 uk-text-bold" v-if="info.vAccount"> 已取號 </div>
                                <div class="uk-width-5-6 uk-text-bold" v-else> 未取號 </div>
                            </div>
                            <div class="uk-padding-small uk-margin-top" style="border: 1px solid #e1e1e1;" v-if="info.vAccount">
                                <div class="uk-text-primary">ATM繳費資訊</div>
                                <!-- v-if -->
                                <div class="uk-flex uk-flex-middle uk-margin-top">
                                    <div class="uk-width-1-6"> 繳費虛擬帳號 </div>
                                    <!-- v-if -->
                                    <div class="uk-width-5-6 uk-text-bold"> {{ info.vAccount }} </div>
                                </div>
                                <!-- v-if -->
                                <div class="uk-flex uk-flex-middle uk-margin-top">
                                    <div class="uk-width-1-6"> 繳費銀行代碼 </div>
                                    <div class="uk-width-5-6 uk-text-bold"> {{ info.BankCode }} </div>
                                </div>
                                <!-- v-if -->
                                <div class="uk-flex uk-flex-middle uk-margin-top">
                                    <div class="uk-width-1-6"> 繳費期限 </div>
                                    <div class="uk-width-5-6 uk-text-bold uk-text-danger"> {{ info.ExpireDate }} </div>
                                </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 處理狀態 </div>
                                <div class="uk-width-5-6 uk-text-bold" :class="orderStatusColor(info.order_status)"> {{ orderStatusFormat(info.order_status) }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 訂單日期 </div>
                                <div class="uk-width-5-6"> {{ orderDate(info.created_at) }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 配送方式 </div>
                                <div class="uk-width-5-6"> 宅配到府 </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 收件者 </div>
                                <div class="uk-width-5-6"> {{ info.name }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> 聯絡電話 </div>
                                <div class="uk-width-5-6"> {{ info.cellphone }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6"> E-mail </div>
                                <div class="uk-width-5-6"> {{ info.email }} </div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6">寄送地址</div>
                                <div class="uk-width-5-6"> {{ info.zipcode }} {{ info.country }}{{ info.city }}{{ info.address }}</div>
                            </div>
                            <div class="uk-flex uk-flex-middle uk-margin-top">
                                <div class="uk-width-1-6">發票類型</div>
                                <div class="uk-width-5-6">
                                    <template v-if="info.invoice_method === 1">個人收銀發票</template>
                                    <template v-if="info.invoice_method === 2">公司戶收銀發票</template>
                                </div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-flex uk-flex-middle uk-margin-top" v-if="info.invoice_method === 2">
                                <div class="uk-width-1-6">統一編號</div>
                                <div class="uk-width-5-6"> {{ info.invoice_tax_id_number }} </div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-flex uk-flex-middle uk-margin-top" v-if="info.invoice_method === 2">
                                <div class="uk-width-1-6">發票抬頭</div>
                                <div class="uk-width-5-6"> {{ info.invoice_name }} </div>
                            </div>
                            <!-- v-if -->
                            <div class="uk-flex uk-margin-top" v-if="info.bookmark">
                                <div class="uk-width-1-6">備註</div>
                                <div class="uk-width-5-6" v-html="info.bookmark"></div>
                            </div>
                  </div>
                    </li>
                    <li>
                        <h4 class="uk-text-bold uk-margin-remove-bottom">購物明細</h4>
                        <table class="uk-table uk-table-responsive uk-table-divider">
                            <thead>
                                <tr>
                                    <th class="uk-text-center width-15">圖片</th>
                                    <th class="width-24">商品</th>
                                    <th class="width-30">規格</th>
                                    <th class="uk-text-center width-15">數量</th>
                                    <th class="uk-text-center width-10">價格</th>
                                    <th class="uk-text-center width-10">小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- v-for -->
                                <tr v-for="item in info.order_products">
                                    <td class="uk-text-center"><img :src="item.img" /></td>
                                    <td class="uk-text-middle">{{ item.product.title }}</td>
                                    <td class="uk-text-middle">{{ item.product_specifications.name }}</td>
                                    <td class="uk-text-center uk-text-middle">{{ item.count }}</td>
                                    <td class="uk-text-center uk-text-middle">{{ item.price.toLocaleString() }}</td>
                                    <td class="uk-text-center uk-text-middle">{{ (item.count * item.price).toLocaleString() }}</td>
                                </tr>
                            </tbody>
                          </table>
                          <div class="uk-flex uk-flex-middle uk-flex-right">
                              <div class="uk-width-5-6 uk-text-right">小計：</div>
                              <div class="uk-width-1-6 uk-text-right uk-text-danger">$ {{ orderTotal(0, info.order_products).toLocaleString() }}</div>
                          </div>
                          <div class="uk-flex uk-flex-middle uk-flex-right">
                              <div class="uk-width-5-6 uk-text-right">運費<span v-if="info.freight_name">({{ info.freight_name }})</span>：</div>
                              <div class="uk-width-1-6 uk-text-right uk-text-danger">$ {{ info.freight.toLocaleString() }}</div>
                          </div>
                          <div class="uk-flex uk-flex-middle uk-flex-right">
                              <div class="uk-width-5-6 uk-text-right">本訂單需付款總金額：</div>
                              <div class="uk-width-1-6 uk-text-right uk-text-danger">$ {{ orderTotal(info.freight, info.order_products).toLocaleString() }}</div>
                          </div>
                    </li>
                </ul>
            </div>
        </div>

        <div id="modal-confirm" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body">
                    <div class="uk-text-center uk-text-warning"><span uk-icon="icon: warning; ratio: 3.5"></span></div>
                    <div class="uk-text-center uk-margin-top"><h3>即將連結至付款頁面，確定前往？</h3></div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="send">確定</button>
                </div>
            </div>
        </div>

        <div class="uk-hidden">
            <form id="form" type="post" :action="url.payment" method="post">
                <input type="hidden" :name="item.key" :value="item.value" v-for="item in ECPay" />
            </form>
        </div>

    </div>
</template>

<script>
    import moment from 'moment';
    import { init, loginAuth, notification } from '~/plugins/app.js';
    import AccountMenu from '~/components/AccountMenu';

    export default {
        components: { AccountMenu },
        layout: 'default',
        middleware: 'authenticated',
        data() {
            return {
                order_id: null,
                info: {
                    merchant_trade_no: null,
                    name: '',
                    cellphone: '',
                    email: '',
                    zipcode: '',
                    country: '',
                    city: '',
                    address: '',
                    freight: 0,
                    payment_method: '',
                    TradeNo: '',
                    BankCode: '',
                    vAccount: '',
                    ExpireDate: '',
                    invoice_method: null,
                    invoice_tax_id_number: '',
                    invoice_name: '',
                    bookmark: '',
                    payment_status: null,
                    order_status: null,
                    order_products: [],
                },
                payment_method: '1',
                config: {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.member.token
                    }
                },
                ECPay: [],
                url: {
                    payment: '',
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
              switch (payment) {
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
              switch (status) {
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
              switch (status) {
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
          atmDelay() {
            if (this.info.payment_status !== 1 && this.payment_method === '2' && this.info.vAccount) {
              let ExpireDate = this.info.ExpireDate + ' 23:59:59';
              if (moment().valueOf() > moment(ExpireDate).valueOf()) {
                return true;
              }
              return false;
            }
            return false;
          },
        },
        async mounted() {
          let path_array = location.pathname.split('/');
          if (path_array.length !== 4) {
            location.href = '/';
          }

          await this.$axios.get(process.env.API_URL + '/api/order/get/payment_url', this.config).then(res => {
            this.url.payment = res.data;
          });

          this.order_id = path_array[3];
          this.getOrderInfo(this.order_id).then(res => {
            !res.data.data ? location.href = '/' : this.info = res.data.data;
            this.payment_method = this.info.payment_method.toString();
            this.$store.commit('disabledLoading');
          });
        },
        methods: {
          getOrderInfo(order_id) {
              return new Promise(resolve => {
                  this.$axios.get(process.env.API_URL + '/api/order/info/' + order_id, this.config).then(res => {
                      resolve(res);
                  });
              })
          },
          confirm() {
              UIkit.notification.closeAll();
              UIkit.modal('#modal-confirm').show();
          },
          send() {
              UIkit.modal('#modal-confirm').hide();
              this.$store.commit('enabledLoading');
              let data = { order_id: this.order_id, list: this.info.order_products, payment_method: this.payment_method};
              this.$axios.post(process.env.API_URL + '/api/order/payment', data, this.config).then(res => {
                  if (res.data.status) {
                      for (const [key, value] of Object.entries(res.data.ecpay)) {
                          this.ECPay.push({
                              key: key,
                              value: value,
                          })
                      }
                      setTimeout(() => {
                          document.getElementById('form').submit();
                      }, 1000)
                  }
              });
          },
        }
    }
</script>

<style scoped lang="scss">

[v-cloak] {
  display: none;
}

.container {
  padding: 25px 4vmin 75px;
  width: calc(100% - 15vmin);
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  flex-basis: calc(100% - 200px);

  .form-content {
    max-width: 1000px;
    margin-top: 25px;

    .uk-tab > * > a {
      font-size: 16px;
    }

    tr {
      img {
        width: 100%;
        height: 100px;
        object-fit: cover;
      }
    }

    th {
      &.width-10 {
        width: 10%;
      }

      &.width-15 {
        width: 15%;
      }

      &.width-20 {
        width: 20%;
      }

      &.width-25 {
        width: 25%;
      }
    }

  }
}

</style>
