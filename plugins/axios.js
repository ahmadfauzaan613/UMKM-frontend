export default function ({ $axios, store, redirect }) {
  // Set base URL from environment
  $axios.setBaseURL(process.env.API_BASE_URL || 'http://localhost:8080')

  // Request interceptor
  $axios.onRequest((config) => {
    // Log requests in development
    if (process.env.DEBUG === 'true') {
      console.log('Making request to ' + config.url)
    }
  })

  // Error interceptor
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    
    // Handle 401 Unauthorized
    if (code === 401) {
      store.dispatch('auth/logout')
      redirect('/login')
    }

    // Handle 403 Forbidden
    if (code === 403) {
      store.dispatch('showToast', {
        message: 'Anda tidak memiliki akses ke resource ini',
        type: 'error',
      })
    }

    // Handle 500 Server Error
    if (code === 500) {
      store.dispatch('showToast', {
        message: 'Terjadi kesalahan pada server',
        type: 'error',
      })
    }
  })
}
