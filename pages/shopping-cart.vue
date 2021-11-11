<template>
    <div class="uk-flex">
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="/shopping-cart">購物車</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <div class="uk-flex uk-flex-middle uk-flex-center">
                  <div class="uk-text-large uk-text-bold uk-text-primary">
                      購物明細
                  </div>
                  <div class="uk-padding-small uk-padding-remove-vertical" :class="{'uk-text-primary': step > 1}">
                      <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
                  </div>
                  <div class="uk-text-large" :class="{'uk-text-bold': step > 1, 'uk-text-primary': step > 1}">
                      付款方式
                  </div>
                  <div class="uk-padding-small uk-padding-remove-vertical" :class="{'uk-text-primary': step > 2}">
                      <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
                  </div>
                  <div class="uk-text-large" :class="{'uk-text-bold': step > 2, 'uk-text-primary': step > 2}">
                      最後確認
                  </div>
              </div>
              <h3 class="uk-margin-top uk-margin-small-bottom" v-show="step === 1">購物明細</h3>
              <h3 class="uk-margin-top uk-margin-small-bottom" v-show="step === 2">付款方式</h3>
              <h3 class="uk-margin-top uk-margin-small-bottom" v-show="step === 3">最後確認</h3>
              <hr class="uk-padding-remove-vertical uk-margin-remove-top">
              <div v-if="step === 1">
                  <template v-if="list.length > 0">
                      <table class="uk-table uk-table-responsive uk-table-divider">
                          <thead>
                              <tr>
                                  <th class="uk-text-center width-15">圖片</th>
                                  <th class="width-20">商品</th>
                                  <th class="width-20">規格</th>
                                  <th class="uk-text-center width-15">數量</th>
                                  <th class="uk-text-center width-10">價格</th>
                                  <th class="uk-text-center width-10">小計</th>
                                  <th class="uk-text-center width-15"></th>
                              </tr>
                          </thead>
                          <tbody>
                              <!-- v-for -->
                              <tr v-for="(item, key) in list">
                                  <td class="uk-text-center"><img :src="item.img" /></td>
                                  <td class="uk-text-middle">{{ item.product_specification.product.title }}</td>
                                  <td class="uk-text-middle">{{ item.product_specification.name }}</td>
                                  <td class="uk-text-center uk-text-middle">
                                      <div class="uk-inline">
                                          <a class="uk-form-icon" uk-icon="icon: minus; ratio: 0.7" @click.stop.prevent="addCount(-1, key)"></a>
                                          <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: plus; ratio: 0.7" @click.stop.prevent="addCount(1, key)"></a>
                                          <input class="uk-input uk-text-center" type="text" maxlength="4" placeholder="數量" v-model.number="item.count">
                                      </div>
                                      <div class="uk-text-danger" v-if="item.product_specification.inventory < item.count">剩餘庫存數：{{ item.product_specification.inventory }}</div>
                                  </td>
                                  <td class="uk-text-center uk-text-middle">{{ item.product_specification.selling_price.toLocaleString() }}</td>
                                  <td class="uk-text-center uk-text-middle">{{ (item.count * item.product_specification.selling_price).toLocaleString() }}</td>
                                  <td class="uk-text-center uk-text-middle"><button class="uk-button-danger" @click="removeProduct(item.id)">移除</button></td>
                              </tr>
                          </tbody>
                      </table>
                      <div class="uk-margin-top">
                        共 <span class="uk-text-bold uk-text-danger">{{ shoppingCartProduct }}</span> 項商品，數量 <span class="uk-text-bold uk-text-danger">{{ shoppingCartCount }}</span> 個，本次線上購物訂單金額 <span class="uk-text-bold uk-text-danger">{{ shoppingCartPrice }}</span> 元
                      </div>
                  </template>
                  <template v-else>
                      <div class="uk-text-center">
                          <div class="uk-text-lead uk-text-danger">您的購物車內沒有任何商品</div>
                          <div class="uk-margin-small-top"><a href="/directory" class="uk-link-heading uk-text-primary">繼續選購</a></div>
                      </div>
                  </template>
              </div>
              <div v-if="step === 2">
                  <h4 class="uk-text-bold uk-margin-remove-bottom">配送方式</h4>
                  <div class="uk-margin-small-top">
                      <label><input class="uk-radio" type="radio" value="1" v-model="receiver.delivery_method"> 宅配到府</label>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">付款方式</h4>
                  <div class="uk-margin-small-top">
                      <label><input class="uk-radio" type="radio" value="1" v-model="receiver.payment_method"> 信用卡</label>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">訂購人資訊</h4>
                  <div class="uk-card uk-card-default uk-padding uk-margin-small-top">
                      <div class="uk-flex uk-flex-middle">
                          <div class="uk-width-1-6">姓名</div>
                          <div class="uk-width-1-3">
                              <input class="uk-input uk-form-small" maxlength="20" placeholder="請輸入姓名" disabled v-model="name" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">行動電話</div>
                          <div class="uk-width-1-3">
                              <input class="uk-input uk-form-small" maxlength="10" placeholder="請輸入行動電話" disabled v-model="cellphone" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">市內電話</div>
                          <div class="uk-width-1-3">
                              <input class="uk-input uk-form-small" maxlength="20" placeholder="請輸入市內電話" v-model="form.telephone" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">E-mail</div>
                          <div class="uk-width-1-3">
                            <input class="uk-input uk-form-small" maxlength="200" placeholder="請輸入E-mail" v-model="form.email" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <label class="uk-width-1-6">郵遞區號</label>
                          <div class="uk-flex uk-flex-middle uk-width-5-6">
                            <div class="uk-width-1-4 uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <select class="uk-select uk-form-small" v-model="form.country" @change="selectCountry">
                                    <option value="">請選擇城市</option>
                                    <!-- v-for -->
                                    <option :value="item.id" v-for="item in select.counties">{{ item.name }}</option>
                                </select>
                            </div>
                            <div class="uk-width-1-4 uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <select class="uk-select uk-form-small" v-model="form.city" @change="selectCity">
                                    <option value="">請選擇地區</option>
                                    <!-- v-for -->
                                    <option :value="item.city" v-for="item in select.cities">{{ item.city }}</option>
                                </select>
                            </div>
                            <div class="uk-width-1-4">
                                <input class="uk-input uk-form-small" type="text" placeholder="郵遞區號" v-model="form.zipcode" disabled>
                            </div>
                          </div>
                      </div>
                      <div class="uk-margin-top uk-flex uk-flex-middle">
                          <label class="uk-width-1-6" for="form_address">地址</label>
                          <div class="uk-flex uk-flex-middle uk-width-5-6">
                              <input type="text" id="form_address" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入通訊地址" v-model="form.address">
                          </div>
                      </div>
                      <div class="uk-margin-top uk-flex uk-flex-middle">
                          <input id="synchronize" type="checkbox" class="uk-checkbox uk-margin-remove-top" v-model="value.synchronize">
                          <label for="synchronize" class="uk-margin-left">將訂購人資料同步至會員資料</label>
                      </div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">收件人資訊</h4>
                  <div class="uk-card uk-card-default uk-padding uk-margin-small-top">
                      <div class="uk-flex uk-flex-middle">
                          <input id="is_orderer" type="checkbox" class="uk-checkbox uk-margin-remove-top" v-model="value.is_orderer">
                          <label for="is_orderer" class="uk-margin-left">同訂購人資料</label>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">姓名</div>
                          <div class="uk-width-1-3">
                              <input class="uk-input uk-form-small" maxlength="20" placeholder="請輸入姓名" v-model="receiver.name" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">行動電話</div>
                          <div class="uk-width-1-3">
                              <input class="uk-input uk-form-small" maxlength="10" placeholder="請輸入行動電話" v-model="receiver.cellphone" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">E-mail</div>
                          <div class="uk-width-1-3">
                            <input class="uk-input uk-form-small" maxlength="200" placeholder="請輸入E-mail" v-model="receiver.email" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <label class="uk-width-1-6">郵遞區號</label>
                          <div class="uk-flex uk-flex-middle uk-width-5-6">
                            <div class="uk-width-1-4 uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <select class="uk-select uk-form-small" v-model="receiver.country" @change="selectCountry('receiver')">
                                    <option value="">請選擇城市</option>
                                    <!-- v-for -->
                                    <option :value="item.id" v-for="item in select.main_island_counties">{{ item.name }}</option>
                                </select>
                            </div>
                            <div class="uk-width-1-4 uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <select class="uk-select uk-form-small" v-model="receiver.city" @change="selectCity('receiver')">
                                    <option value="">請選擇地區</option>
                                    <!-- v-for -->
                                    <option :value="item.city" v-for="item in select.main_island_cities">{{ item.city }}</option>
                                </select>
                            </div>
                            <div class="uk-width-1-4">
                                <input class="uk-input uk-form-small" type="text" placeholder="郵遞區號" v-model="receiver.zipcode" disabled>
                            </div>
                          </div>
                      </div>
                      <div class="uk-margin-top uk-flex uk-flex-middle">
                          <label class="uk-width-1-6" for="register_address">地址</label>
                          <div class="uk-flex uk-flex-middle uk-width-5-6">
                              <input type="text" id="register_address" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入通訊地址" v-model="receiver.address">
                          </div>
                      </div>
                      <div class="uk-alert-danger" uk-alert>
                          <p>1. 目前服務區域僅限台灣本島。</p>
                          <p>2. 商品的寄送「海龍王」有最終的決定權，請務必詳細填寫。</p>
                      </div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">發票資訊</h4>
                  <div class="uk-margin-small-top">
                      <div>
                          <label><input class="uk-radio" type="radio" value="1" v-model="receiver.invoice_method"> 個人收銀發票</label>
                      </div>
                      <div class="uk-margin-top">
                          <label><input class="uk-radio" type="radio" value="2" v-model="receiver.invoice_method"> 公司戶收銀發票</label>
                          <div class="uk-flex uk-flex-middle uk-margin-small-top" v-show="receiver.invoice_method === '2'">
                              <div class="uk-width-1-6">統一編號</div>
                              <div class="uk-width-1-3">
                                  <input class="uk-input uk-form-small" maxlength="8" placeholder="請輸入統一編號" v-model="receiver.invoice_tax_id_number" />
                              </div>
                          </div>
                          <div class="uk-flex uk-flex-middle uk-margin-top" v-show="receiver.invoice_method === '2'">
                              <div class="uk-width-1-6">發票抬頭</div>
                              <div class="uk-width-1-3">
                                  <input class="uk-input uk-form-small" maxlength="100" placeholder="請輸入發票抬頭" v-model="receiver.invoice_name" />
                              </div>
                          </div>
                      </div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">備註</h4>
                  <div class="uk-margin-small-top">
                      <textarea class="uk-textarea" rows="5" placeholder="如：送貨前請電話聯絡、限本人簽收…等" v-model="receiver.bookmark"></textarea>
                  </div>
              </div>
              <div v-if="step === 3">
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
                          <tr v-for="(item, key) in list">
                              <td class="uk-text-center"><img :src="item.img" /></td>
                              <td class="uk-text-middle">{{ item.product_specification.product.title }}</td>
                              <td class="uk-text-middle">{{ item.product_specification.name }}</td>
                              <td class="uk-text-center uk-text-middle"> {{ item.count }} </td>
                              <td class="uk-text-center uk-text-middle">{{ item.product_specification.selling_price.toLocaleString() }}</td>
                              <td class="uk-text-center uk-text-middle">{{ (item.count * item.product_specification.selling_price).toLocaleString() }}</td>
                          </tr>
                      </tbody>
                  </table>
                  <div class="uk-flex uk-flex-middle uk-flex-right">
                      <div class="uk-width-5-6 uk-text-right">小計：</div>
                      <div class="uk-width-1-6 uk-text-right uk-text-danger">$ {{ shoppingCartPrice.toLocaleString() }}</div>
                  </div>
                  <div class="uk-flex uk-flex-middle uk-flex-right">
                      <div class="uk-width-5-6 uk-text-right">運費：</div>
                      <div class="uk-width-1-6 uk-text-right uk-text-danger">$ {{ delivery_fee.toLocaleString() }}</div>
                  </div>
                  <div class="uk-flex uk-flex-middle uk-flex-right">
                      <div class="uk-width-5-6 uk-text-right">本訂單需付款總金額：</div>
                      <div class="uk-width-1-6 uk-text-right uk-text-danger">$ {{ (shoppingCartPrice + delivery_fee).toLocaleString() }}</div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">付款方式與寄送資料</h4>
                  <div class="uk-card uk-card-default uk-padding uk-margin-small-top">
                      <div class="uk-flex uk-flex-middle">
                          <div class="uk-width-1-6"> 配送方式 </div>
                          <div class="uk-width-5-6"> 宅配到府 </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6"> 付款方式 </div>
                          <div class="uk-width-5-6"> 信用卡 </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6"> 收件者 </div>
                          <div class="uk-width-5-6"> {{ receiver.name }} </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6"> 聯絡電話 </div>
                          <div class="uk-width-5-6"> {{ receiver.cellphone }} </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6"> E-mail </div>
                          <div class="uk-width-5-6"> {{ receiver.email }} </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">寄送地址</div>
                          <div class="uk-width-5-6"> {{ receiver.zipcode }} {{ receiver.country }}{{ receiver.city }}{{ receiver.address }}</div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-6">發票類型</div>
                          <div class="uk-width-5-6">
                              <template v-if="receiver.invoice_method === '1'">個人收銀發票</template>
                              <template v-if="receiver.invoice_method === '2'">公司戶收銀發票</template>
                          </div>
                      </div>
                      <!-- v-if -->
                      <div class="uk-flex uk-flex-middle uk-margin-top" v-if="receiver.invoice_method === '2'">
                          <div class="uk-width-1-6">統一編號</div>
                          <div class="uk-width-5-6"> {{ receiver.invoice_tax_id_number }} </div>
                      </div>
                      <!-- v-if -->
                      <div class="uk-flex uk-flex-middle uk-margin-top" v-if="receiver.invoice_method === '2'">
                          <div class="uk-width-1-6">發票抬頭</div>
                          <div class="uk-width-5-6"> {{ receiver.invoice_name }} </div>
                      </div>
                      <!-- v-if -->
                      <div class="uk-flex uk-margin-top" v-if="receiver.bookmark">
                          <div class="uk-width-1-6">備註</div>
                          <div class="uk-width-5-6" v-html="receiver.bookmark"></div>
                      </div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">訂購注意事項</h4>
                  <div class="uk-card uk-card-default uk-padding uk-text-bold uk-margin-small-top">
                      <p>非常感謝您訂購 海龍王 的商品！</p>
                      <p>訂單送出後，我們將在24HR內簡訊送出一份完整的訂購需求。</p>
                      <p>因商品流動問題，如遇缺貨，客服將主動與您電話聯繫。</p>
                      <p>如有訂購問題聯繫官方 LINE: ( 待補 ) 或</p>
                      <p>來電 ( 待補 )，竭誠為您服務。</p>
                      <p>訂單內容：請於會員中心的訂單查詢。</p>
                      <p class="uk-margin-remove-bottom">※海龍王 仍保有決定是否接受訂單及出貨與否之權利。</p>
                  </div>
              </div>
              <div class="uk-text-right uk-margin-top" v-if="list.length > 0">
                  <button class="uk-button uk-button-small uk-padding uk-padding-remove-vertical uk-button-default" type="button" @click="last" v-if="step > 1">上一步</button>
                  <button class="uk-button uk-button-small uk-padding uk-padding-remove-vertical uk-button-primary" type="button" @click="next" v-if="step !== 3 && list.length > 0">下一步</button>
                <button class="uk-button uk-button-small uk-button-primary" type="button" @click="confirm" v-if="step === 3">確認並送出訂單</button>
              </div>
          </div>

        </div>

        <div class="uk-hidden">
            <form id="form" type="post" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="post">
                <input type="hidden" :name="item.key" :value="item.value" v-for="item in ECPay" />
            </form>
        </div>

        <div id="modal-confirm" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body">
                    <div class="uk-text-center uk-text-warning"><span uk-icon="icon: warning; ratio: 3.5"></span></div>
                    <div class="uk-text-center uk-margin-top"><h3>確定送出訂單？</h3></div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-small uk-button-default uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-small uk-button-primary" type="button" @click="send">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { find, filter } from 'lodash';
    import { init, notification} from '~/plugins/app.js';
    import twzipcode from 'twzipcode-data'

    export default {
        layout: 'default',
        middleware: 'authenticated',
        data() {
            let origin_zipcode = twzipcode();
            return {
                step: 1,
                list: [],
                config: {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.member.token
                    }
                },
                name: '',
                cellphone: '',
                form: {
                  email: '',
                  telephone: '',
                  country: '',
                  city: '',
                  zipcode: '',
                  address: '',
                },
                receiver: {
                  delivery_method: '1',
                  payment_method: '1',
                  cellphone: '',
                  name: '',
                  email: '',
                  country: '',
                  city: '',
                  zipcode: '',
                  address: '',
                  invoice_method: '1',
                  invoice_tax_id_number: '',
                  invoice_name: '',
                  bookmark: '',
                },
                select: {
                  counties: [],
                  cities: [],
                  main_island_counties: [],
                  main_island_cities: [],
                },
                value: {
                    synchronize: false,
                    is_orderer: false,
                },
                delivery_fee: 0, // 運費
                origin_zipcode,
                ECPay: [],
            }
        },
        async fetch ({ $axios, store, params }) {
            await init(store);
        },
        watch: {
          'value.is_orderer'(new_data, old_data) {
            this.receiver.cellphone = new_data ? this.cellphone : '';
            this.receiver.name = new_data ? this.name : '';
            this.receiver.email = new_data ? this.form.email : '';
            this.receiver.country = new_data ? this.form.country : '';
            this.selectCountry('receiver');
            this.receiver.city = new_data ? this.form.city : '';
            this.receiver.zipcode = new_data ? this.form.zipcode : '';
            this.receiver.address = new_data ? this.form.address : '';
          },
        },
        computed: {
          shoppingCartProduct() {
            return this.list.length;
          },
          shoppingCartCount() {
            let count = 0;
            this.list.forEach(p => {
              count += p.count;
            })
            return count;
          },
          shoppingCartPrice() {
            let price = 0;
            this.list.forEach(p => {
              price += p.count * p.product_specification.selling_price;
            })
            return price;
          },
        },
        mounted() {
          this.select.counties = this.origin_zipcode.counties;
          this.select.main_island_counties = filter(this.select.counties, v => {
              return v.name !== '澎湖縣' && v.name !== '金門縣' && v.name !== '連江縣';
          });

          this.setMemberInfo(this.$store.state.member);
          this.getShoppingCart().then(res => {
            this.list = res.data.data;
            this.$store.commit('disabledLoading');
          })
        },
        methods: {
          setMemberInfo(member) {
            this.name = member.name;
            this.cellphone = member.cellphone;
            this.form.email = member.email;
            this.form.telephone = member.telephone;
            this.form.country = member.country;
            this.selectCountry();
            this.form.city = member.city;
            this.form.zipcode = member.zipcode;
            this.form.address = member.address;
          },
          selectCountry(type = null) {
            if(type === 'receiver') {
                this.receiver.city = '';
                this.receiver.zipcode = '';
                this.select.main_island_cities = filter(this.origin_zipcode.zipcodes, v => {
                    return v.county === this.receiver.country && v.city !== '釣魚臺列嶼' && v.city !== '東沙群島' && v.city !== '南沙群島' && v.city !== '琉球鄉' && v.city !== '綠島鄉' && v.city !== '蘭嶼鄉';
                });
            } else {
                this.form.city = '';
                this.form.zipcode = '';
                this.select.cities = filter(this.origin_zipcode.zipcodes, v => { return v.county === this.form.country });
            }
          },
          selectCity(type = null) {
            if(type === 'receiver') {
                this.receiver.zipcode = '';
                if (this.receiver.city) {
                    this.receiver.zipcode = find(this.select.main_island_cities, ['city', this.receiver.city]).zipcode;
                }
            } else {
                this.form.zipcode = '';
                if (this.form.city) {
                    this.form.zipcode = find(this.select.cities, ['city', this.form.city]).zipcode;
                }
            }
          },
          getShoppingCart() {
            return new Promise(resolve => {
              let form = {cart_id: localStorage.getItem('cart_id')};
              this.$axios.post(process.env.API_URL + '/api/cart/show-cart', form, this.config).then(res => {
                resolve(res);
              });
            });
          },
          removeProduct(id) {
            this.$store.commit('enabledLoading');
            this.$axios.delete(process.env.API_URL + '/api/cart/remove-cart-product/' + id, this.config).then(res => {
              if (res.data.status) {
                this.getShoppingCart().then(cart => {
                  this.list = cart.data.data;
                  this.$store.commit('disabledLoading');
                })
              }
            });
          },
          removeAllProduct(uu_id) {
            this.$axios.delete(process.env.API_URL + '/api/cart/remove-cart-all-product/' + uu_id, this.config);
          },
          last() {
            if (this.step > 1) {
              UIkit.scroll().scrollTo('#header');
              this.step--
            }
          },
          next() {
            this.$store.commit('enabledLoading');
            if (this.step === 1) {
              let inventory_status = true;
              this.getShoppingCart().then(res => {
                res.data.data.forEach(v => {
                  let obj = find(this.list, ['specifications_id', v.specifications_id]);
                  if (obj) {
                    obj.product_specification.inventory = v.product_specification.inventory;
                    if (obj.product_specification.inventory < obj.count) {
                      inventory_status = false;
                    }
                  }
                });

                inventory_status ? this.step = 2 : notification('庫存不足', 'danger');
                this.$store.commit('disabledLoading');
                if (this.step === 2) {
                  UIkit.scroll().scrollTo('#header');
                }
              })
            } else if (this.step === 2) {
              this.$store.commit('disabledLoading');
              if (!this.receiverAuth().status) {
                notification(this.receiverAuth().message, 'danger');
                return false;
              }

              if (this.receiver.invoice_method === '2' && (!(this.receiver.invoice_tax_id_number && this.receiver.invoice_name))) {
                notification('請填寫統一編號以及發票抬頭', 'danger');
                return false;
              }

              this.step = 3;
              if (this.step === 3) {
                UIkit.scroll().scrollTo('#header');
              }
            }
          },
          addCount(num, key) {
            this.list[key].count += num;
          },
          receiverAuth() {
            if (!this.receiver.cellphone) {
              return {'status': false, 'message': '請輸入收件人行動電話'}
            }

            if (this.receiver.cellphone.length !== 10) {
              return {'status': false, 'message': '收件人行動電話長度須為10碼'}
            }

            if (this.receiver.cellphone.substr(0, 2) !== '09') {
              return {'status': false, 'message': '收件人行動電話格式錯誤'}
            }

            if (!this.receiver.name) {
              return {'status': false, 'message': '請輸入收件人姓名'}
            }

            if (!(this.receiver.country && this.receiver.city && this.receiver.zipcode && this.receiver.address)) {
              return {'status': false, 'message': '請輸入收件人完整地址'}
            }

            return {'status': true}
          },
          confirm() {
            UIkit.notification.closeAll();
            UIkit.modal('#modal-confirm').show();
          },
          send() {
            this.$store.commit('enabledLoading');

            if (this.receiver.invoice_method === '1') {
              this.receiver.invoice_tax_id_number = this.receiver.invoice_name = '';
            }

            let obj = {
              member_id: this.$store.state.member.id,
              list: this.list,
              form: this.form,
              receiver: this.receiver,
              synchronize: this.value.synchronize,
            }

            this.ECPay = [];
            this.$axios.post(process.env.API_URL + '/api/order/create', obj, this.config).then(res => {
              for (const [key, value] of Object.entries(res.data.ecpay)) {
                this.ECPay.push({
                  key: key,
                  value: value,
                })
              }

              setTimeout(() => {
                document.getElementById('form').submit();
              }, 1000)

              if (res.data.status) {
                // this.removeAllProduct(localStorage.getItem('cart_id'));
              }
            });

            UIkit.modal('#modal-confirm').hide();
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

  h4:not(:first-child) {
    margin-top: 35px;
  }
}

.uk-modal-dialog {
  width: 400px;
}

</style>
