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
      email: '',
      telephone: '',
      zipcode: '',
      country: '',
      city: '',
      address: '',
      token: '',
  },
  user_expired_time: 0,
});

import Cookies from 'js-cookie';

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
    state.member.email = '';
    state.member.telephone = '';
    state.member.zipcode = '';
    state.member.country = '';
    state.member.city = '';
    state.member.address = '';
    state.member.token = '';

    if (Cookies.get('user')) {
      Cookies.remove('user');
    }
  },
  setLoginMember(state, result) {
    state.member.id = result.id ? result.id : '';
    state.member.cellphone = result.cellphone ? result.cellphone : '';
    state.member.name = result.name ? result.name : '';
    state.member.email = result.email ? result.email : '';
    state.member.telephone = result.telephone ? result.telephone : '';
    state.member.zipcode = result.zipcode ? result.zipcode : '';
    state.member.country = result.country ? result.country : '';
    state.member.city = result.city ? result.city : '';
    state.member.address = result.address ? result.address : '';
    state.member.token = result.access_token ? result.access_token : '';
  },
  setUpdateInfoMember(state, result) {
    state.member.name = result.name ? result.name : '';
    state.member.email = result.email ? result.email : '';
    state.member.telephone = result.telephone ? result.telephone : '';
    state.member.zipcode = result.zipcode ? result.zipcode : '';
    state.member.country = result.country ? result.country : '';
    state.member.city = result.city ? result.city : '';
    state.member.address = result.address ? result.address : '';
  },
  clearExpiredTime(state) {
    state.user_expired_time = 0;
    if (Cookies.get('user_expired_time')) {
      Cookies.remove('user_expired_time');
    }
  },
  setExpiredTime(state, result) {
    state.user_expired_time = result;
  },
};

const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  async nuxtServerInit({commit, dispatch, redirect}, {req}) {
    let parse = req.headers && req.headers.cookie ? cookieparser.parse(req.headers.cookie) : null;
    if (parse && parse.user && parse.user_expired_time && new Date().getTime() <= Number(parse.user_expired_time)) {
      commit('setLoginMember', JSON.parse(parse.user));
      commit('setExpiredTime', Number(parse.user_expired_time));
    } else {
      commit('clearExpiredTime');
      commit('clearLoginMember');
    }
  },
  async setNewsTypesList({ commit }, result) {
    commit('setNewsTypesList', result)
  },
  async setCookingTypesList({ commit }, result) {
    commit('setCookingTypesList', result)
  },
  async setDirectoryList({ commit }, result) {
    commit('setDirectoryList', result)
  },
}

export const getters = {
  isAuthenticated: (state) => {
    if (!state.user_expired_time) {
      return false;
    }

    if (new Date().getTime() > state.user_expired_time) {
      return false;
    }

    return true;
  }
}
