<template>
          <div class="container mx-auto h-screen flex justify-center items-center">
        <div class="w-full lg:w-1/3 px-10 lg:px-0">
          <div class="flex justify-center items-center mx-auto mt-6 mb-8">
            <img src="/404-illustration.svg" alt="Ilustrasi halaman tidak ditemukan" class="w-full" />
          </div>
          <h1 class="font-semibold mb-3 text-3xl text-center">
            {{ error.statusCode === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kendala' }}
          </h1>
          <p class="text-center font-light" v-if="error.statusCode === 404">
            Tautan ini mungkin sudah berubah atau alamatnya salah.
          </p>
          <p class="text-center font-light" v-else>
            Halaman belum dapat ditampilkan. Silakan kembali ke beranda.
          </p>
          <div class="mb-4 mt-6">
            <nuxt-link
              to="/"
              class="block w-full bg-orange-button hover:bg-green-button text-white text-center font-semibold px-6 py-4 text-lg rounded-full"
            >
              Kembali ke beranda
            </nuxt-link>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props:['error'],
    layout: 'success',
}
</script>
