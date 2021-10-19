import axios from 'axios';

export const init = store => {
    return new Promise(async resolve => {
        await axios.get(process.env.API_URL + '/api/news-type/list/all').then(res => {
            store.commit('setNewsTypesList', res.data);
        });

        await axios.get(process.env.API_URL + '/api/cooking-type/list/all').then(res => {
            store.commit('setCookingTypesList', res.data);
        });

        await axios.get(process.env.API_URL + '/api/directory/list/all').then(res => {
            store.commit('setDirectoryList', res.data);
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
