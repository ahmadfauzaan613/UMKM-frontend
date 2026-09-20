<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
      <div class="w-full lg:w-5/6 px-6 md:px-10 lg:px-0 py-12">
        <h1 class="font-semibold mb-2 text-3xl text-white">Buat akun</h1>
        <p class="text-white text-opacity-75 mb-8">Bergabung untuk menemukan usaha lokal yang menarik.</p>
        <form @submit.prevent="userRegister">
          <div class="mb-5">
            <label for="register-name" class="font-medium text-base text-white block mb-2">Nama lengkap</label>
            <input
              id="register-name"
              type="text"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Nama lengkap Anda"
              v-model="register.name"
              autocomplete="name"
              minlength="3"
              required
            />
          </div>
          <div class="mb-5">
            <label for="register-email" class="font-medium text-base text-white block mb-2">Alamat email</label>
            <input
              id="register-email"
              type="email"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="nama@email.com"
              v-model="register.email"
              autocomplete="email"
              required
            />
          </div>
          <div class="mb-5">
            <label for="register-occupation" class="font-medium text-base text-white block mb-2">Pekerjaan</label>
            <input
              id="register-occupation"
              type="text"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Pekerjaan atau bidang usaha"
              v-model="register.occupation"
              autocomplete="organization-title"
              required
            />
          </div>
          <div class="mb-5">
            <label for="register-password" class="font-medium text-base text-white block mb-2">Kata sandi</label>
            <input
              id="register-password"
              type="password"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Minimal 6 karakter"
              v-model="register.password"
              autocomplete="new-password"
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
              {{ loading ? 'Membuat akun...' : 'Daftar' }}
            </button>
          </div>
          <p class="text-center text-white text-md">
            Sudah punya akun?
            <nuxt-link to="/login" class="no-underline text-orange-button">Masuk</nuxt-link>
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
      register: {
        name: '',
        email: '',
        occupation: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    async userRegister() {
      if (this.loading) return
      this.loading = true
      try {
        await this.$store.dispatch('auth/register', this.register)
        this.$store.dispatch('showToast', {
          message: 'Registrasi berhasil! Silakan login dengan akun Anda.',
          type: 'success',
        })
        this.$router.push({ path: '/login' })
      } catch (error) {
        let errorMsg = 'Registrasi gagal. Periksa kembali data Anda.'
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
  background-image: url("/umkm.jpg");
  background-position: center;
  background-size: cover;
}
</style>
