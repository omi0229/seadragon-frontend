import axios from 'axios';

export const init = store => {
    return new Promise(async resolve => {
        await axios.get(process.env.API_URL + '/api/news-type/list/all').then(res => {
            store.dispatch('setNewsTypesList', res.data);
        });

        await axios.get(process.env.API_URL + '/api/cooking-type/list/all').then(res => {
            store.dispatch('setCookingTypesList', res.data);
        });

        await axios.get(process.env.API_URL + '/api/directory/list/all').then(res => {
            store.dispatch('setDirectoryList', res.data);
        });

        resolve();
    });
};

export const getCartCount = (store, cart_id) => {
    axios.post(process.env.API_URL + '/api/cart/get-cart-count', {cart_id: cart_id}).then(res => {
        store.commit('setCartCount', res.data);
    });
}

// 密碼規則(8碼以上數字+英文)
export const passwordRule = password => {
    let rules = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!rules.test(password)) {
        return false
    }

    return true;
}

// 電子郵件規則
export const emailRule = email => {
    let rules = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/;
    if (!rules.test(email)) {
        return false
    }

    return true;
}

// 亂數產生數字
export const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export const notification = (message, type, second = 1000) => {

    let icon = type === 'success' ? 'check' : 'close'

    UIkit.notification.closeAll();
    UIkit.notification({
        message: '<span uk-icon=\'icon: ' + icon + ';ratio: 1.5\'></span> ' + message,
        status: type,
        timeout: second
    })
}

export const loginAuth = (store, reload = false) => {
  if (store.state.user_expired_time) {
    let timer = setInterval(() => {
      if (new Date().getTime() > Number(store.state.user_expired_time)) {
        store.commit('clearExpiredTime');
        store.commit('clearLoginMember');
        if (reload) {
          store.commit('enabledLoading');
          window.location.reload();
        }

        clearInterval(timer);
      }
    }, 1000)
  }
}

export const modalMessage = () => {
  return new Promise(resolve => {
    let message = '';
    if (sessionStorage.getItem('success_modal')) {
      switch (sessionStorage.getItem('success_modal')) {
        case 'register_success':
          message = '註冊成功';
          break;
        case 'login_success':
          message = '登入成功';
          break;
        case 'sms_code_send_success':
          message = '簡訊已發送';
          break;
        case 'order_success':
          message = '訂購完成';
          break;
      }

      sessionStorage.removeItem('success_modal')
    }
    resolve(message);
  });
}
