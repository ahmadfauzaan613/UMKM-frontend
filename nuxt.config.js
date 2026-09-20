const apiBaseUrl = process.env.API_BASE_URL || 'https://api-umkm.oj3nglab.xyz'

export default {
  srcDir: 'app/',

  // Keep public/ at the project root while Nuxt 2 serves its custom static dir.
  dir: {
    static: '../public',
  },

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
      { name: 'theme-color', content: '#24145f' },
      {
        hid: 'description',
        name: 'description',
        content: 'Platform investasi untuk UMKM Indonesia',
      },
      { hid: 'og:title', property: 'og:title', content: 'Investasi UMKM' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Temukan dan dukung usaha lokal Indonesia melalui Investasi UMKM.',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/money-bag.svg' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
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

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  publicRuntimeConfig: {
    apiBaseUrl,
  },

  axios: {
    baseURL: apiBaseUrl,
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
