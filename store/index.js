export const state = () => ({
  loading: true,
  to_top: false,
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
  setNewsTypesList(state, result) {
    state.news_types_list = result;
  },
  setDirectoryList(state, result) {
    state.directory_list = result;
  }
};
