require('dotenv').config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: '海龍王',
    htmlAttrs: {
      lang: 'zh-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/plugins/uikit-3.7.4/css/uikit.min.css' },
    ],
    script: [
      { src: '/plugins/uikit-3.7.4/js/uikit.min.js' },
      { src: '/plugins/uikit-3.7.4/js/uikit-icons.min.js' },
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-DPSDE8NPMJ' },
    ],
    bodyAttrs: {
      style: 'overflow-y: hidden;'
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      '~/static/plugins/uikit-3.7.4/css/uikit.min.css',
      '~/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/app.js',
    {src: '~/plugins/ga.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: process.env.BASE ? `.env.${process.env.BASE}` : '.env' }],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },

  axios: {
    // proxyHeaders: false
  },

  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  //   apiUrl: process.env.API_URL,
  // },

  styleResources: {
    scss: ['~assets/scss/*.scss']
  },
}
