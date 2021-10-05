export const state = () => ({
  loading: true,
  to_top: false,
  cart_count: 0,
  news_types_list: [],
  directory_list: [],
});

export const mutations = {
  enabledLoading(state) {
    document.body.style.overflowY = 'hidden';
    state.loading = true;
  },
  disabledLoading(state) {
    document.body.style.overflowY = 'auto';
    state.loading = false;
  },
  enabledToTop(state) {
    state.to_top = true;
  },
  disabledToTop(state) {
    state.to_top = false;
  },
  setCartCount(state, result) {
    state.cart_count = result;
  },
  setNewsTypesList(state, result) {
    state.news_types_list = result;
  },
  setDirectoryList(state, result) {
    state.directory_list = result;
  }
};
