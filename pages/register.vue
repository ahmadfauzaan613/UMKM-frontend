<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
      <div class="w-full lg:w-5/6 px-10 lg:px-0">
        <h2 class="font-normal mb-6 mt-48 text-3xl text-white">
          Sign Up Account
        </h2>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3">Nama Lengkap</label>
            <input
              type="text"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Nama Lengkap"
              v-model="register.name"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3">Alamat Email</label>
            <input
              type="email"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Email"
              v-model="register.email"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3">Pekerjaan</label>
            <input
              type="text"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Pekerjaan / Industri"
              v-model="register.occupation"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3">Password</label>
            <input
              type="password"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="password"
              v-model="register.password"
              @keyup.enter="userRegister"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <button
              @click="userRegister"
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              Continue Sign Up
            </button>
          </div>
        </div>
        <div class="text-center">
          <p class="text-white text-md">
            Already have account?
            <nuxt-link to="/login" class="no-underline text-orange-button">Sign In</nuxt-link>.
          </p>
        </div>
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
    }
  },
  methods: {
    async userRegister() {
      try {
        const response = await this.$store.dispatch('auth/register', this.register)
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