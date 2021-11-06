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
                  <div class="uk-padding-small uk-padding-remove-vertical">
                      <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
                  </div>
                  <div class="uk-text-large">
                      最後確認
                  </div>
              </div>
              <h3 class="uk-margin-top uk-margin-small-bottom" v-show="step === 1">購物明細</h3>
              <h3 class="uk-margin-top uk-margin-small-bottom" v-show="step === 2">付款方式</h3>
              <hr class="uk-padding-remove-vertical uk-margin-remove-top">
              <div v-if="step === 1">
                  <table class="uk-table uk-table-responsive uk-table-divider">
                      <thead>
                          <tr>
                              <th class="uk-text-center width-20">圖片</th>
                              <th class="width-25">商品</th>
                              <th class="width-25">規格</th>
                              <th class="uk-text-center width-15">數量</th>
                              <th class="uk-text-center width-10">價格</th>
                              <th class="uk-text-center width-10">小計</th>
                          </tr>
                      </thead>
                      <tbody>
                          <!-- v-for -->
                          <tr v-for="(item, key) in list">
                              <td class="uk-text-center"><img :src="item.img" style="width: 150px; height: 100px; object-fit: cover;" /></td>
                              <td class="uk-text-middle">{{ item.product_specification.product.title }}</td>
                              <td class="uk-text-middle">{{ item.product_specification.name }}</td>
                              <td class="uk-text-center uk-text-middle">
                                  <div class="uk-inline">
                                      <a class="uk-form-icon" uk-icon="icon: minus; ratio: 0.7" @click.stop.prevent="addCount(-1, key)"></a>
                                      <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: plus; ratio: 0.7" @click.stop.prevent="addCount(1, key)"></a>
                                      <input class="uk-input uk-text-center" type="text" placeholder="數量" v-model.number="item.count">
                                  </div>
                                  <div class="uk-text-danger" v-if="item.product_specification.inventory < item.count">剩餘庫存數：{{ item.product_specification.inventory }}</div>
                              </td>
                              <td class="uk-text-center uk-text-middle">{{ item.product_specification.selling_price.toLocaleString() }}</td>
                              <td class="uk-text-center uk-text-middle">{{ (item.count * item.product_specification.selling_price).toLocaleString() }}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div v-if="step === 2">
                  <h4 class="uk-text-bold uk-margin-remove-bottom">配送方式</h4>
                  <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                      <label><input class="uk-radio" type="radio" name="radio2" checked> 宅配到府</label>
                      <label><input class="uk-radio" type="radio" name="radio2"> 超商自取</label>
                  </div>
              </div>
              <div class="uk-text-right">
                  <button class="uk-button uk-button-small uk-button-primary uk-padding uk-padding-remove-vertical" type="button" @click="next">下一步</button>
              </div>
          </div>

        </div>

        <div id="modal-confirm" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-body">
                    <div class="uk-text-center uk-text-warning"><span uk-icon="icon: warning; ratio: 3.5"></span></div>
                    <div class="uk-text-center uk-margin-top"><h3>確定送出？</h3></div>
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
    import { find } from 'lodash';
    import { init, randomNum, notification} from '~/plugins/app.js';
    import Captcha from '~/components/Captcha';

    export default {
        layout: 'default',
        components: { Captcha },
        middleware: 'authenticated',
        data() {
            return {
                step: 1,
                list: [],
                config: {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.member.token
                    }
                },
            }
        },
        async asyncData({$axios, store, route}) {

        },
        async fetch ({ $axios, store, params }) {
            await init(store);
        },
        mounted() {
          this.getShoppingCart().then(res => {
            this.list = res.data.data;
            this.$store.commit('disabledLoading');
          })
        },
        methods: {
          getShoppingCart() {
            return new Promise(resolve => {
              let form = {cart_id: localStorage.getItem('cart_id')};
              this.$axios.post(process.env.API_URL + '/api/cart/show-cart', form, this.config).then(res => {
                resolve(res);
              });
            });
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

                inventory_status ? this.step = 2 : notification('庫存不足', 'danger', 1000);
                this.$store.commit('disabledLoading');
              })
            }
          },
          addCount(num, key) {
            this.list[key].count += num;
          },
          auth() {
            if (!this.form.cellphone) {
              return {'status': false, 'message': '請輸入行動電話'}
            }

            if (this.form.cellphone.length !== 10) {
              return {'status': false, 'message': '行動電話長度須為10碼'}
            }

            if (this.form.cellphone.substr(0, 2) !== '09') {
              return {'status': false, 'message': '行動電話格式錯誤'}
            }

            if (!this.form.name) {
              return {'status': false, 'message': '請輸入姓名'}
            }

            if (this.input.captcha !== this.captcha.answers) {
              return {'status': false, 'message': '驗證碼錯誤'}
            }

            return { 'status': true }
          },
          confirm() {
            UIkit.notification.closeAll();

            if (!this.auth().status) {
              UIkit.notification({
                message: '<span uk-icon=\'icon: close;ratio: 1.5\'></span> ' + this.auth().message + '',
                status: 'danger',
                timeout: 1000
              })

              return false;
            }

            UIkit.modal('#modal-confirm').show();
          },
          send() {
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

.uk-modal-dialog {
  width: 400px;
}

</style>
