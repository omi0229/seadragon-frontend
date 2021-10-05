export const init = ($axios, store) => {
    return new Promise(async resolve => {
        await $axios.get(process.env.API_URL + '/api/news-type/list/all').then(res => {
            store.commit('setNewsTypesList', res.data);
        });

        await $axios.get(process.env.API_URL + '/api/directory/list/all').then(res => {
            store.commit('setDirectoryList', res.data);
        });

        resolve();
    });
};
