export const state = () => ({
  news_types_list: [],
});

export const mutations = {
  increment(state) {
    state.news_types_list.push('abcde');
  }
}
