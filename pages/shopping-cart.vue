<template>
    <div class="uk-flex">
        <div class="container">
          <ul class="uk-breadcrumb">
              <li><a href="/">Home</a></li>
              <li><a href="/shopping-cart">購物車</a></li>
          </ul>

          <div class="form-content uk-flex uk-flex-column uk-margin-auto">
              <div class="uk-flex uk-flex-middle uk-flex-center">
                  <div class="process uk-text-bold uk-text-primary">
                      購物明細
                  </div>
                  <div class="uk-padding-small uk-padding-remove-vertical web" :class="{'uk-text-primary': step > 1}">
                      <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
                  </div>
                  <div class="uk-padding-small uk-padding-remove-vertical mobile" :class="{'uk-text-primary': step > 1}">
                      <span uk-icon="icon: chevron-right; ratio: 1.2"></span>
                  </div>
                  <div class="process" :class="{'uk-text-bold': step > 1, 'uk-text-primary': step > 1}">
                      付款方式
                  </div>
                  <div class="uk-padding-small uk-padding-remove-vertical web" :class="{'uk-text-primary': step > 2}">
                      <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
                  </div>
                  <div class="uk-padding-small uk-padding-remove-vertical mobile" :class="{'uk-text-primary': step > 2}">
                      <span uk-icon="icon: chevron-right; ratio: 1.2"></span>
                  </div>
                  <div class="process" :class="{'uk-text-bold': step > 2, 'uk-text-primary': step > 2}">
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
                                  <td class="uk-text-middle">
                                      <div class="uk-flex uk-flex-middle">
                                          <div class="uk-width-1-4 mobile">商品</div>
                                          <div class="uk-width-3-4 uk-width-1-1@m">{{ item.product_specification.product.title }}</div>
                                      </div>
                                  </td>
                                  <td class="uk-text-middle">
                                      <div class="uk-flex uk-flex-middle">
                                          <div class="uk-width-1-4 mobile">規格</div>
                                          <div class="uk-width-3-4 uk-width-1-1@m">{{ item.product_specification.name }}</div>
                                      </div>
                                  </td>
                                  <td class="uk-text-middle reponsive-td">
                                      <div class="uk-flex uk-flex-middle">
                                          <div class="uk-width-1-4 mobile">數量</div>
                                          <div class="uk-width-3-4 uk-width-1-1@m">
                                              <div class="uk-inline">
                                                  <a class="uk-form-icon" uk-icon="icon: minus; ratio: 0.7" @click.stop.prevent="addCount(-1, key)"></a>
                                                  <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: plus; ratio: 0.7" @click.stop.prevent="addCount(1, key)"></a>
                                                  <input class="uk-input uk-text-center" type="text" maxlength="4" placeholder="數量" v-model.number="item.count">
                                              </div>
                                              <div class="uk-text-danger" v-if="item.product_specification.inventory < item.count">剩餘庫存數：{{ item.product_specification.inventory }}</div>
                                          </div>
                                      </div>
                                  </td>
                                  <td class="uk-text-middle reponsive-td">
                                      <div class="uk-flex uk-flex-middle">
                                          <div class="uk-width-1-4 mobile">價格</div>
                                          <div class="uk-width-3-4 uk-width-1-1@m">{{ item.product_specification.selling_price.toLocaleString() }}</div>
                                      </div>
                                  </td>
                                  <td class="uk-text-middle reponsive-td">
                                      <div class="uk-flex uk-flex-middle">
                                          <div class="uk-width-1-4 mobile">小計</div>
                                          <div class="uk-width-3-4 uk-width-1-1@m">{{ (item.count * item.product_specification.selling_price).toLocaleString() }}</div>
                                      </div>
                                  </td>
                                  <td class="uk-text-middle reponsive-remove"><button class="uk-button-danger" @click="removeProduct(item.id)">移除</button></td>
                              </tr>
                          </tbody>
                      </table>
                      <div class="uk-flex uk-flex-middle uk-flex-right uk-margin-small-top">
                          <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">小計：</div>
                          <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger">$ {{ shoppingCartPrice.toLocaleString() }}</div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-flex-right calculate-list">
                          <div class="uk-width-3-4 uk-width-5-6@m uk-text-right"><input class="uk-input uk-form-small discount" maxlength="13" placeholder="請輸入優惠代碼" v-model="discount_codes" @keyup.enter="discountMethod('enter')" @focusout="discountMethod('focusout')" /></div>
                          <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger"> - $ {{ discount.status && shoppingCartPrice >= discount.info.full_amount ? discount.info.discount.toLocaleString() : 0}}</div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-flex-right calculate-list">
                          <div class="uk-width-3-4 uk-width-5-6@m uk-text-right uk-flex uk-flex-middle uk-flex-right">
                              <div>優惠劵：</div>
                              <div>
                                  <select class="uk-select uk-form-small discount" v-model="coupon_record_id">
                                      <template v-if="coupon_list.length <= 0">
                                          <option value="" disabled v-if="coupon_list.length <= 0">無優惠劵項目</option>
                                      </template>
                                      <template v-else>
                                          <option value="">請選擇優惠劵</option>
                                          <!-- v-for -->
                                          <option :value="item.id" v-for="item in coupon_list">{{ item.coupon.title }}</option>
                                      </template>
                                  </select>
                              </div>
                          </div>
                          <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger"> - $ {{ couponDiscount }}</div>
                      </div>
                      <div class="uk-flex uk-flex-right calculate-list">
                          <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">配送方式：</div>
                          <div class="uk-width-1-4 uk-width-1-6@m uk-text-right">
                              <div>
                                  <label class="delivery-method"><input class="uk-radio" type="radio" value="0" v-model="receiver.delivery_method"> 自取</label>
                              </div>
                              <div class="mtp-5">
                                  <label class="delivery-method"><input class="uk-radio" type="radio" value="1" v-model="receiver.delivery_method"> 宅配到府</label>
                              </div>
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-flex-right calculate-list" v-if="receiver.delivery_method !== '0'">
                          <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">運費<span v-if="receiver.freight_name">({{receiver.freight_name}})</span>：</div>
                          <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger"> $ {{ freight }}</div>
                      </div>
                      <div class="uk-flex uk-flex-middle uk-flex-right calculate-list">
                          <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">本訂單需付款總金額：</div>
                          <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger">$ {{ allTotal }}</div>
                      </div>
<!--                      <div class="uk-margin-top">-->
<!--                        共 <span class="uk-text-bold uk-text-danger">{{ shoppingCartProduct }}</span> 項商品，數量 <span class="uk-text-bold uk-text-danger">{{ shoppingCartCount }}</span> 個，本次線上購物訂單金額 <span class="uk-text-bold uk-text-danger">{{ shoppingCartPrice }}</span> 元-->
<!--                      </div>-->
                  </template>
                  <template v-else>
                      <div class="uk-text-center">
                          <div class="uk-text-lead uk-text-danger">您的購物車內沒有任何商品</div>
                          <div class="uk-margin-small-top"><a href="/directory" class="uk-link-heading uk-text-primary">繼續選購</a></div>
                      </div>
                  </template>
              </div>
              <div v-if="step === 2">
<!--                  <h4 class="uk-text-bold uk-margin-remove-bottom">配送方式</h4>-->
<!--                  <div class="uk-margin-small-top">-->
<!--                      <label><input class="uk-radio" type="radio" value="1" v-model="receiver.delivery_method"> 宅配到府</label>-->
<!--                  </div>-->
                  <h4 class="uk-text-bold uk-margin-remove-bottom">付款方式</h4>
                  <div class="uk-margin-small-top">
                      <label><input class="uk-radio" type="radio" value="1" v-model="receiver.payment_method"> 信用卡</label>
                      <label><input class="uk-radio" type="radio" value="2" v-model="receiver.payment_method"> ATM</label>
                      <label><input class="uk-radio" type="radio" value="3" v-model="receiver.payment_method"> Line Pay</label>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">訂購人資訊</h4>
                  <div class="uk-card uk-card-default uk-padding uk-margin-small-top">
                      <div class="uk-flex uk-flex-wrap uk-flex-middle">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">姓名</div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="20" placeholder="請輸入姓名" disabled v-model="name" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">行動電話</div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="10" placeholder="請輸入行動電話" disabled v-model="cellphone" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">市內電話</div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="20" placeholder="請輸入市內電話" v-model="form.telephone" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">E-mail</div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="200" placeholder="請輸入E-mail" v-model="form.email" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <label class="uk-width-1-1 uk-width-1-6@m form-margin">郵遞區號</label>
                          <div class="uk-flex uk-flex-middle uk-width-1-1 uk-width-5-6@m">
                            <div class="uk-width-1-3 uk-width-1-4@m uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <select class="uk-select uk-form-small" v-model="form.country" @change="selectCountry">
                                    <option value="">請選擇城市</option>
                                    <!-- v-for -->
                                    <option :value="item.id" v-for="item in select.counties">{{ item.name }}</option>
                                </select>
                            </div>
                            <div class="uk-width-1-3 uk-width-1-4@m uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <select class="uk-select uk-form-small" v-model="form.city" @change="selectCity">
                                    <option value="">請選擇地區</option>
                                    <!-- v-for -->
                                    <option :value="item.city" v-for="item in select.cities">{{ item.city }}</option>
                                </select>
                            </div>
                            <div class="uk-width-1-3 uk-width-1-4@m">
                                <input class="uk-input uk-form-small" type="text" placeholder="郵遞區號" v-model="form.zipcode" disabled>
                            </div>
                          </div>
                      </div>
                      <div class="uk-margin-top uk-flex uk-flex-wrap uk-flex-middle">
                          <label class="uk-width-1-1 uk-width-1-6@m form-margin" for="form_address">地址</label>
                          <div class="uk-width-1-1 uk-width-5-6@m">
                              <input type="text" id="form_address" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-1-1 uk-width-3-4@m" placeholder="請輸入通訊地址" v-model="form.address">
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
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">姓名 <span class="uk-text-danger">*</span></div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="5" placeholder="請輸入姓名" v-model="receiver.name" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">行動電話 <span class="uk-text-danger">*</span></div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="10" placeholder="請輸入行動電話" v-model="receiver.cellphone" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">E-mail <span class="uk-text-danger">*</span></div>
                          <div class="uk-width-1-1 uk-width-1-3@m">
                              <input class="uk-input uk-form-small" maxlength="200" placeholder="請輸入E-mail" v-model="receiver.email" />
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top" v-if="receiver.delivery_method !== '0'">
                          <label class="uk-width-1-1 uk-width-1-6@m form-margin">郵遞區號 <span class="uk-text-danger">*</span></label>
                          <div class="uk-flex uk-flex-wrap uk-flex-middle uk-width-1-1 uk-width-5-6@m">
                              <div class="uk-width-1-3 uk-width-1-4@m uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                  <select class="uk-select uk-form-small" v-model="receiver.country" @change="selectCountry('receiver')">
                                      <option value="">請選擇城市</option>
                                      <!-- v-for -->
                                      <option :value="item.id" v-for="item in select.main_island_counties">{{ item.name }}</option>
                                  </select>
                              </div>
                              <div class="uk-width-1-3 uk-width-1-4@m uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                  <select class="uk-select uk-form-small" v-model="receiver.city" @change="selectCity('receiver')">
                                      <option value="">請選擇地區</option>
                                      <!-- v-for -->
                                      <option :value="item.city" v-for="item in select.main_island_cities">{{ item.city }}</option>
                                  </select>
                              </div>
                              <div class="uk-width-1-3 uk-width-1-4@m">
                                  <input class="uk-input uk-form-small" type="text" placeholder="郵遞區號" v-model="receiver.zipcode" disabled>
                              </div>
                          </div>
                      </div>
                      <div class="uk-margin-top uk-flex uk-flex-wrap uk-flex-middle">
                          <label class="uk-width-1-1 uk-width-1-6@m form-margin" for="register_address">地址 <span class="uk-text-danger" v-if="receiver.delivery_method !== '0'">*</span></label>
                          <div class="uk-width-1-1 uk-width-5-6@m">
                              <template v-if="receiver.delivery_method !== '0'">
                                  <input type="text" id="register_address" maxlength="200" class="uk-input uk-form-width-medium uk-form-small uk-width-3-4" placeholder="請輸入通訊地址" v-model="receiver.address">
                              </template>
                              <template v-else>
                                  {{ receiver.address }}
                              </template>
                          </div>
                      </div>
                      <div class="uk-alert-danger" uk-alert>
                          <p>1. 目前服務區域僅限台灣本島。</p>
                          <p>2. 商品的寄送「海龍王」有最終的決定權，請務必詳細填寫。</p>
                          <p>3. 如選擇自取務必備註「來店取貨日期與時間」。</p>
                      </div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">發票資訊</h4>
                  <div class="uk-margin-small-top">
                      <div>
                          <label><input class="uk-radio" type="radio" value="1" v-model="receiver.invoice_method"> 個人收銀發票</label>
                      </div>
                      <div class="uk-margin-top">
                          <label><input class="uk-radio" type="radio" value="2" v-model="receiver.invoice_method"> 公司戶收銀發票</label>
                          <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-small-top" v-show="receiver.invoice_method === '2'">
                              <div class="uk-width-1-1 uk-width-1-6@m form-margin">統一編號 <span class="uk-text-danger">*</span></div>
                              <div class="uk-width-1-1 uk-width-1-3@m">
                                  <input class="uk-input uk-form-small" maxlength="8" placeholder="請輸入統一編號" v-model="receiver.invoice_tax_id_number" />
                              </div>
                          </div>
                          <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top" v-show="receiver.invoice_method === '2'">
                              <div class="uk-width-1-1 uk-width-1-6@m form-margin">發票抬頭 <span class="uk-text-danger">*</span></div>
                              <div class="uk-width-1-1 uk-width-1-3@m">
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
                              <td class="uk-text-middle">
                                  <div class="uk-flex uk-flex-middle">
                                      <div class="uk-width-1-4 mobile">商品</div>
                                      <div class="uk-width-3-4 uk-width-1-1@m">{{ item.product_specification.product.title }}</div>
                                  </div>
                              </td>
                              <td class="uk-text-middle">
                                  <div class="uk-flex uk-flex-middle">
                                      <div class="uk-width-1-4 mobile">規格</div>
                                      <div class="uk-width-3-4 uk-width-1-1@m">{{ item.product_specification.name }}</div>
                                  </div>
                              </td>
                              <td class="uk-text-middle reponsive-td">
                                  <div class="uk-flex uk-flex-middle">
                                      <div class="uk-width-1-4 mobile">數量</div>
                                      <div class="uk-width-3-4 uk-width-1-1@m">{{ item.count }}</div>
                                  </div>
                              </td>
                              <td class="uk-text-middle reponsive-td">
                                  <div class="uk-flex uk-flex-middle">
                                      <div class="uk-width-1-4 mobile">價格</div>
                                      <div class="uk-width-3-4 uk-width-1-1@m">{{ item.product_specification.selling_price.toLocaleString() }}</div>
                                  </div>
                              </td>
                              <td class="uk-text-middle reponsive-td">
                                  <div class="uk-flex uk-flex-middle">
                                      <div class="uk-width-1-4 mobile">小計</div>
                                      <div class="uk-width-3-4 uk-width-1-1@m">{{ (item.count * item.product_specification.selling_price).toLocaleString() }}</div>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <hr class="mobile">
                  <div class="uk-flex uk-flex-middle uk-flex-right uk-margin-small-top">
                      <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">小計：</div>
                      <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger">$ {{ shoppingCartPrice.toLocaleString() }}</div>
                  </div>
                  <!-- v-if -->
                  <div class="uk-flex uk-flex-middle uk-flex-right calculate-list" v-if="discount_codes && discount.status && shoppingCartPrice >= discount.info.full_amount">
                      <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">優惠代碼({{ discount_codes }})：</div>
                      <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger"> - $ {{ discount.status && shoppingCartPrice >= discount.info.full_amount ? discount.info.discount.toLocaleString() : 0}}</div>
                  </div>
                  <!-- v-if -->
                  <div class="uk-flex uk-flex-middle uk-flex-right calculate-list" v-if="coupon_record_id && couponDiscount">
                      <div class="uk-width-3-4 uk-width-5-6@m uk-text-right uk-flex uk-flex-middle uk-flex-right">
                          <div>優惠劵({{ CouponTitle(coupon_record_id) }})：</div>
                      </div>
                      <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger"> - $ {{ couponDiscount }}</div>
                  </div>
                  <div class="uk-flex uk-flex-middle uk-flex-right calculate-list">
                      <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">配送方式：</div>
                      <div class="uk-width-1-4 uk-width-1-6@m uk-text-right">
                          {{ receiver.delivery_method !== '0' ? '宅配到府' : '自取' }}
                      </div>
                  </div>
                <div class="uk-flex uk-flex-middle uk-flex-right calculate-list" v-if="receiver.delivery_method !== '0'">
                      <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">運費<span v-if="receiver.freight_name">({{receiver.freight_name}})</span>：</div>
                      <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger"> $ {{ freight }}</div>
                  </div>
                  <div class="uk-flex uk-flex-middle uk-flex-right calculate-list">
                      <div class="uk-width-3-4 uk-width-5-6@m uk-text-right">本訂單需付款總金額：</div>
                      <div class="uk-width-1-4 uk-width-1-6@m uk-text-right uk-text-danger">$ {{ allTotal }}</div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">付款方式與寄送資料</h4>
                  <div class="uk-card uk-card-default uk-padding uk-margin-small-top">
                      <div class="uk-flex uk-flex-wrap uk-flex-middle">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin"> 配送方式 </div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold">
                            {{ receiver.delivery_method !== '0' ? '宅配到府' : '自取' }}
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin"> 付款方式 </div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold">
                              <!-- v-if -->
                              <span v-if="receiver.payment_method === '1'">信用卡</span>
                              <span v-else-if="receiver.payment_method === '2'">ATM</span>
                              <span v-else-if="receiver.payment_method === '3'">Line Pay</span>
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin"> 收件者 </div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold"> {{ receiver.name }} </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin"> 聯絡電話 </div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold"> {{ receiver.cellphone }} </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin"> E-mail </div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold"> {{ receiver.email }} </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">寄送地址</div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold">
                            <template v-if="receiver.delivery_method !== '0'">
                                {{ receiver.zipcode }} {{ receiver.country }}{{ receiver.city }}{{ receiver.address }}
                            </template>
                            <template v-else>
                                (自取){{ receiver.address }}
                            </template>
                          </div>
                      </div>
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">發票類型</div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold">
                              <template v-if="receiver.invoice_method === '1'">個人收銀發票</template>
                              <template v-if="receiver.invoice_method === '2'">公司戶收銀發票</template>
                          </div>
                      </div>
                      <!-- v-if -->
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top" v-if="receiver.invoice_method === '2'">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">統一編號</div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold"> {{ receiver.invoice_tax_id_number }} </div>
                      </div>
                      <!-- v-if -->
                      <div class="uk-flex uk-flex-wrap uk-flex-middle uk-margin-top" v-if="receiver.invoice_method === '2'">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">發票抬頭</div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold"> {{ receiver.invoice_name }} </div>
                      </div>
                      <!-- v-if -->
                      <div class="uk-flex uk-flex-wrap uk-margin-top" v-if="receiver.bookmark">
                          <div class="uk-width-1-1 uk-width-1-6@m form-margin">備註</div>
                          <div class="uk-width-1-1 uk-width-5-6@m uk-text-bold bookmark" v-html="receiver.bookmark"></div>
                      </div>
                  </div>
                  <h4 class="uk-text-bold uk-margin-remove-bottom">訂購注意事項</h4>
                  <div class="uk-card uk-card-default uk-padding uk-text-bold uk-margin-small-top notice">
                      <p>非常感謝您訂購海龍王水產市集的商品!</p>
                      <p>訂單送出成立後，系統會於24小時內進行商品庫存確認，</p>
                      <p>如遇缺貨，客服人員會主動與您電話聯繫。</p>
                      <br />
                      <p>如有商品或訂單相關問題，</p>
                      <p>請加入官方<a href="https://lin.ee/omPdiFU" target="_blank">LINE@</a>，或搜尋ID:@560orams(務必輸入@)，聯繫客服為您處理。</p>
                      <p>我的帳戶(會員中心)>訂單記錄(查看訂單)，查詢商品資訊、訂單消費紀錄、發票開立狀況、</p>
                      <p>付款資訊及配送資訊及申請訂單取消狀態，日期搜尋最大區間以六個月內為限。</p>
                      <p class="uk-margin-remove-bottom">※海龍王水產市集保有決定是否接受訂單及出貨與否之權利。</p>
                  </div>
              </div>
              <div class="uk-text-right uk-margin-top" v-if="list.length > 0">
                  <button class="uk-button uk-button-small uk-padding uk-padding-remove-vertical uk-button-default" type="button" @click="last" v-if="step > 1">上一步</button>
                  <button class="uk-button uk-button-small uk-padding uk-padding-remove-vertical uk-button-primary" type="button" @click="next" v-if="step !== 3 && list.length > 0">下一步</button>
                <button class="uk-button uk-button-small uk-button-primary" type="button" @click="confirm" v-if="step === 3">確認並送出訂單</button>
              </div>
          </div>

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

        <div class="uk-hidden">
            <form id="form" type="post" :action="url.payment" method="post">
                <input type="hidden" :name="item.key" :value="item.value" v-for="item in ECPay" />
            </form>
        </div>

        <!-- Google Analyist -->
        <Ga />
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import { find, filter, map } from 'lodash';
    import { notification, getCartCount} from '~/plugins/app';
    import twzipcode from 'twzipcode-data'

    export default {
        layout: 'default',
        middleware: 'authenticated',
        async asyncData({store}) {
          store.commit('stateLoading');
          return {};
        },
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
                  freight: 0, // 運費
                  freight_id: null, // 運費
                  freight_name: '', // 運費
                  invoice_method: '1',
                  invoice_tax_id_number: '',
                  invoice_name: '',
                  bookmark: '',
                },
                discount_codes: '', // 優惠代碼
                discount: {
                    status: false,
                    info: {
                        title: '',
                        full_amount: 0,
                        discount: 0,
                    },
                },
                coupon_record_id: '', // 優惠劵
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
                origin_zipcode,
                ECPay: [],
                freight_list: [],
                coupon_list: [],
                origin_coupon_list: [],
                url: {
                    payment: '',
                },
                page_read_finish: false,
                timer: {
                  change_count: null,
                }
            }
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

            if (this.receiver.delivery_method !== '0') {
              this.receiver.address = new_data ? this.form.address : '';
            }
          },
          'list': {
            handler(new_data, old_data) {
              if (this.page_read_finish) {
                if (!this.timer.change_count) {
                  this.timer.change_count = setInterval(() => {
                    let data = {
                      'cart_id': localStorage.getItem('cart_id'),
                      'list': new_data,
                    };
                    // 更新購物車數量
                    this.$axios.post(process.env.API_URL + '/api/cart/refresh-cart', data);
                    clearInterval(this.timer.change_count);
                    setTimeout(() => this.timer.change_count = null, 1)
                  }, 1000)
                }
              }

              this.coupon_list = filter(this.origin_coupon_list, v => {
                if (v.coupon.product_specifications.length > 0) {
                  let specifications_list = map(new_data, v => { return v.specifications_id })
                  let filter_list = filter(v.coupon.product_specifications, s => {
                    return specifications_list.includes(s.id);
                  })

                  if (this.shoppingCartPrice > v.coupon.full_amount && filter_list.length > 0) {
                    return true;
                  }
                } else {
                  if (this.shoppingCartPrice > v.coupon.full_amount) {
                    return true;
                  }
                }
              });

              if (!find(this.coupon_list, {id: this.coupon_record_id})) {
                this.coupon_record_id = '';
              }
            },
            deep: true,
          },
          'receiver.delivery_method'(new_data, old_data) {
            if (new_data === '0') {
              this.receiver.freight = 0;
              this.receiver.address = this.$store.state.config.basic_address;
            }
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
          freight() {
            this.receiver.freight = 0;
            this.receiver.freight_id = null;
            this.receiver.freight_name = '';

            if (this.receiver.delivery_method !== '0') {
              this.freight_list.some(v => {
                if (this.shoppingCartPrice >= v.start_total && this.shoppingCartPrice <= v.end_total) {
                  this.receiver.freight = v.freight;
                  this.receiver.freight_id = v.id;
                  this.receiver.freight_name = v.floor2_type;
                  return true;
                }
              })
            }

            return this.receiver.freight;
          },
          shoppingCartDiscountPrice() {
            return this.discount.status ? this.shoppingCartPrice - this.discount.info.discount : this.shoppingCartPrice;
          },
          couponDiscount() {
            if (!this.coupon_record_id) {
              return 0;
            }

            let info = find(this.coupon_list, {id: this.coupon_record_id});

            return info.coupon.discount;
          },
          CouponTitle() {
            return coupon_record_id => {
              if (coupon_record_id) {
                let info = find(this.coupon_list, {id: this.coupon_record_id});
                return info.coupon.title;
              }

              return '';
            }
          },
          allTotal() {
            if (this.discount.status && this.shoppingCartPrice >= this.discount.info.full_amount) {
              return (this.shoppingCartDiscountPrice - this.couponDiscount + this.receiver.freight).toLocaleString();
            } else {
              return (this.shoppingCartPrice - this.couponDiscount + this.receiver.freight).toLocaleString();
            }
          },
        },
        async mounted() {
          this.select.counties = this.origin_zipcode.counties;
          this.select.main_island_counties = filter(this.select.counties, v => {
              return v.name !== '澎湖縣' && v.name !== '金門縣' && v.name !== '連江縣';
          });

          this.setMemberInfo(this.$store.state.member);

          await this.$axios.get(process.env.API_URL + '/api/order/get/payment_url', this.config).then(res => {
              this.url.payment = res.data;
          });

          await this.getFreightList().then(res => {
            this.freight_list = res.data.data
          })

          // 取得這次購物可使用的優惠劵清單
          await this.getCouponUse(this.$store.state.member.id, null, null).then(res => {
            this.coupon_list = this.origin_coupon_list = res.data.data;
          });

          await this.getShoppingCart().then(res => {
            this.list = res.data.data;
            this.$store.commit('disabledLoading');
            setTimeout(() => this.page_read_finish = true, 1);
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
          getFreightList() {
              return new Promise(resolve => {
                this.$axios.get(process.env.API_URL + '/api/order/freight', this.config).then(res => {
                  resolve(res);
                });
              })
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

                  getCartCount(this.$store, localStorage.getItem('cart_id'))
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
            if (this.step === 1) {

              let shopping_cart_auth = true;
              this.list.some(v => {
                if (!v.count) {
                  notification('請選擇數量！', 'danger', 500);
                  shopping_cart_auth = false;
                  return true;
                }

                if (v.count < 0 || isNaN(v.count)) {
                  notification('數量格式錯誤！', 'danger', 500);
                  shopping_cart_auth = false;
                  return true;
                }
              });

              if (!shopping_cart_auth) {
                return false;
              }

              this.$store.commit('enabledLoading');
              this.getShoppingCart().then(async res => {

                let inventory_status = this.__inventorySum(res);
                inventory_status ? this.step = 2 : notification('庫存不足', 'danger');

                // if (this.step === 2) {

                  // // 取得這次購物可使用的優惠劵清單
                  // await this.getCouponUse(this.$store.state.member.id, this.shoppingCartPrice, map(this.list, v => { return v.specifications_id })).then(res => {
                  //   this.coupon_list = res.data.data;
                  //   this.$store.commit('disabledLoading');
                  //   UIkit.scroll().scrollTo('#header');
                  // });

                // } else {
                  this.$store.commit('disabledLoading');
                  UIkit.scroll().scrollTo('#header');
                // }
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
          getCouponUse(member_id, all_total, product_list) { // 這次購物可使用的優惠劵
            return new Promise(resolve => {
              let obj = {member_id, all_total, product_list};

              this.$axios.post(process.env.API_URL + '/api/member/coupon-use', obj, this.config).then(res => {
                resolve(res);
              })
            })
          },
          __inventorySum(res) {
            let inventory_status = true
            res.data.data.forEach(v => {
              let obj = find(this.list, ['specifications_id', v.specifications_id]);
              if (obj) {
                obj.product_specification.inventory = v.product_specification.inventory;
                if (obj.product_specification.inventory < obj.count) {
                  inventory_status = false;
                }
              }
            });

            return inventory_status;
          },
          addCount(num, key) {
            if ((num > 0 || (num < 0 && this.list[key].count > 1)) && this.list[key].count < 9999) {
              this.list[key].count += num;
            }
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

            if (!this.receiver.email) {
              return {'status': false, 'message': '請輸入E-mail'}
            }

            if (this.receiver.email) {
              let emailRegxp = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/;
              if (!emailRegxp.test(this.receiver.email)) {
                return {'status': false, 'message': 'E-mail格式錯誤'}
              }
            }

            // 若是自取則不用驗證
            if (this.receiver.delivery_method !== '0') {
              if (!(this.receiver.country && this.receiver.city && this.receiver.zipcode && this.receiver.address)) {
                return {'status': false, 'message': '請輸入收件人完整地址'}
              }
            }

            return {'status': true}
          },
          confirm() {
            UIkit.notification.closeAll();
            UIkit.modal('#modal-confirm').show();
          },
          async send() {
            this.$store.commit('enabledLoading');

            let inventory_status = true;
            await this.getShoppingCart().then(res => {
              if (!this.__inventorySum(res)) {
                inventory_status = false;
              }
            })

            if (!inventory_status) {
              this.$store.commit('disabledLoading');
              UIkit.modal('#modal-confirm').hide();
              notification('庫存不足', 'danger')
              this.step = 1;
              UIkit.scroll().scrollTo('#header');
              return false;
            }

            if (this.receiver.invoice_method === '1') {
              this.receiver.invoice_tax_id_number = this.receiver.invoice_name = '';
            }

            // 若為自取，則不帶入郵遞區號、縣市、區域，只帶入海龍王的地址
            if (this.receiver.delivery_method === '0') {
              this.receiver.zipcode = this.receiver.country = this.receiver.city = '';
            }

            let obj = {
              member_id: this.$store.state.member.id,
              list: this.list,
              form: this.form,
              receiver: this.receiver,
              synchronize: this.value.synchronize,
              discount_codes: this.discount_codes,
              coupon_record_id: this.coupon_record_id,
            }

            this.ECPay = [];
            this.$axios.post(process.env.API_URL + '/api/order/create', obj, this.config).then(res => {
              if (obj.synchronize) {
                let user = JSON.parse(Cookies.get('user'));
                user.zipcode = obj.form.zipcode;
                user.country = obj.form.country;
                user.city = obj.form.city;
                user.address = obj.form.address;
                Cookies.set('user', JSON.stringify(user));
              }

              if (this.receiver.payment_method === '3') { // Line Pay 付款
                if (res.data.linepay && res.data.linepay.returnCode === '0000') {
                  location.href = res.data.linepay.info.paymentUrl.web;
                } else {
                  notification('Line Pay 付款失敗', 'danger')
                }
              } else { // 綠界
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

              if (res.data.status) {
                this.removeAllProduct(localStorage.getItem('cart_id'));
              }
            });

            UIkit.modal('#modal-confirm').hide();
          },
          async discountMethod(event) {
              if(this.discount_codes.trim()) {
                  if (event === 'enter') {
                      this.$store.commit('enabledLoading');
                  }
                  await this.$axios.post(process.env.API_URL + '/api/discount-code/search', { member_id: this.$store.state.member.id, discount_codes: this.discount_codes }, this.config).then(res => {
                      this.discount.status = res.data.status;
                      if(this.discount.status) {
                          this.discount.info.title = res.data.data.title;
                          this.discount.info.full_amount = res.data.data.full_amount;
                          this.discount.info.discount = res.data.data.discount;
                      } else {

                          notification('無此優惠代碼', 'danger');

                          this.discount.info.title = '';
                          this.discount.info.full_amount = 0;
                          this.discount.info.discount = 0;
                      }
                      if (event === 'enter') {
                          this.$store.commit('disabledLoading');
                      }
                  });
              } else {
                this.discount.info.title = '';
                this.discount.info.full_amount = 0;
                this.discount.info.discount = 0;
              }
          },
        },
    }
</script>

<style scoped lang="scss">

label {
  margin-bottom: 0;

  &:not(.delivery-method) {
    min-width: 90px;
  }
}

.container {
  padding: 25px 4vmin 75px;
  width: calc(100% - 15vmin);
  min-width: calc(100% - 200px);
  max-width: calc(100% - 200px);
  flex-basis: calc(100% - 200px);

  @media (max-width: 960px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    flex-basis: 100%;
  }

  .form-content {
    max-width: 1000px;
  }

  .process {
    font-size: 1.5rem;
    line-height: 1.5;

    @media (max-width: 960px) {
      font-size: 18px;
    }
  }

  tr {
    img {
      @include product-image;
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

  .reponsive-td {
    text-align: center;

    @media (max-width: 960px) {
      text-align: initial;
    }
  }

  .reponsive-remove {
    text-align: center;

    @media (max-width: 960px) {
      text-align: right;
    }

    button {
      @media (max-width: 960px) {
        padding: 5px 20px;
      }
    }
  }

  .form-margin {
    @media (max-width: 960px) {
      margin-bottom: 5px;
    }
  }

  h4:not(:first-child) {
    margin-top: 35px;
  }

  .bookmark {
    word-break: break-all;
  }

  .notice {
    @media (max-width: 960px) {
      font-size: 14px;
    }

    p {
      @media (max-width: 960px) {
        margin-bottom: 5px;
      }
    }

    p:not(:first-child) {
      @media (max-width: 960px) {
        margin-top: 5px;
      }
    }
  }

  .calculate-list {
    margin-top: 5px;
  }

  .discount {
    width: 150px;
    min-width: 150px;
  }
}

.uk-modal-dialog {
  width: 400px;
}

</style>
