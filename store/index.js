export const state = () => ({
  loading: true,
  to_top: false,
  cart_count: 0,
  news_types_list: [],
  cooking_types_list: [],
  directory_list: [],
  member: {
      id: '',
      cellphone: '',
      name: '',
      telephone: '',
      zipcode: '',
      country: '',
      city: '',
      address: '',
      token: '',
  },
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
  setCookingTypesList(state, result) {
    state.cooking_types_list = result;
  },
  setDirectoryList(state, result) {
    state.directory_list = result;
  },
  clearLoginMember(state) {
    state.member.id = '';
    state.member.cellphone = '';
    state.member.name = '';
    state.member.telephone = '';
    state.member.zipcode = '';
    state.member.country = '';
    state.member.city = '';
    state.member.address = '';
    state.member.token = '';
  },
  setLoginMember(state, result) {
    state.member.id = result.id ? result.id : '';
    state.member.cellphone = result.cellphone ? result.cellphone : '';
    state.member.name = result.name ? result.name : '';
    state.member.telephone = result.telephone ? result.telephone : '';
    state.member.zipcode = result.zipcode ? result.zipcode : '';
    state.member.country = result.country ? result.country : '';
    state.member.city = result.city ? result.city : '';
    state.member.address = result.address ? result.address : '';
    state.member.token = result.token ? result.token : '';
  }
};
