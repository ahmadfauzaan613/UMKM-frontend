<template>
  <div class="min-h-screen flex justify-center items-center">
    <div
      class="hidden md:block lg:w-1/3 bg-white min-h-screen auth-background rounded-tr-lg rounded-br-lg"
    ></div>
    <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
      <div class="w-full lg:w-1/2 px-6 md:px-10 lg:px-0 py-12">
        <h1 class="font-semibold mb-2 text-3xl text-white">Masuk ke akun Anda</h1>
        <p class="text-white text-opacity-75 mb-8">Lanjutkan mendukung usaha lokal pilihan Anda.</p>
        <form @submit.prevent="userLogin">
          <div class="mb-6">
            <label for="login-email" class="font-medium text-base text-white block mb-2">Alamat email</label>
            <input
              id="login-email"
              type="email"
              v-model="login.email"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="nama@email.com"
              autocomplete="email"
              required
            />
          </div>
          <div class="mb-6">
            <label for="login-password" class="font-medium text-base text-white block mb-2">Kata sandi</label>
            <input
              id="login-password"
              type="password"
              v-model="login.password"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Masukkan kata sandi"
              autocomplete="current-password"
              minlength="6"
              required
            />
          </div>
          <div class="mb-6">
            <button
              type="submit"
              :disabled="loading"
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full transition-colors duration-200 disabled:opacity-60"
            >
              {{ loading ? 'Memeriksa akun...' : 'Masuk' }}
            </button>
          </div>
          <p class="text-center text-white text-md">
            Belum punya akun?
            <nuxt-link to="/register" class="no-underline text-orange-button">Daftar sekarang</nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    async userLogin() {
      if (this.loading) return
      this.loading = true
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        this.$auth.setUser(response.data.data)
        this.$store.dispatch('showToast', {
          message: 'Selamat datang kembali, ' + response.data.data.nama + '!',
          type: 'success',
        })
        this.$router.push({ path: '/' })
      } catch (error) {
        let errorMsg = 'Email atau password salah.'
        if (error.response && error.response.data && error.response.data.meta) {
          errorMsg = error.response.data.meta.message
        }
        this.$store.dispatch('showToast', {
          message: errorMsg,
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.auth-background {
  background-image: url("/1592608119.jpg");
  background-position: center;
  background-size: cover;
}
</style>
