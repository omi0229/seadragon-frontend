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
    axios.post(process.env.API_URL + '/api/cart/getCartCount', {cart_id: cart_id}).then(res => {
        console.log(res.data);
        store.commit('setCartCount', res.data);
    });
}
