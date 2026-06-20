export default {
  generate: {
    fallback: true,
  },

  ssr: false,

  target: 'static',

  head: {
    title: 'Investasi UMKM',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Platform investasi untuk UMKM Indonesia',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/money-bag.svg' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
    ],
  },

  css: [
    '~/assets/css/tailwind.css',
  ],

  plugins: [
    '~/plugins/axios',
  ],

  components: true,

  alias: {
    '@': '<srcDir>',
    '~': '<srcDir>',
  },

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080',
  },

  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8080',
  },

  auth: {
    strategies: {
      local: {
        scheme: 'bearer',
        endpoints: {
          login: { url: '/api/v1/sessions', method: 'post', propertyName: 'data.token' },
          logout: false,
          user: { url: '/api/v1/user/fetch', method: 'get', propertyName: 'data' },
        },
        token: {
          property: 'token',
          type: 'Bearer',
          global: true,
        },
        user: {
          property: false,
          autoFetch: false,
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/dashboard',
    },
  },

  build: {},
}