<template>
  <div class="project-page">
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <section class="container mx-auto pt-8 pb-20">
      <div class="flex justify-between items-center mb-2">
        <div class="w-full mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
        </div>
      </div>
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h3 class="text-2xl text-gray-900">Buat Kampanye Baru</h3>
        </div>
        <button
          @click="save"
          :disabled="loading"
          class="bg-green-button hover:bg-green-button text-white font-bold px-6 py-2 rounded-lg inline-flex items-center disabled:opacity-50"
        >
          <svg v-if="!loading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ loading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>

      <div class="w-full border border-gray-200 bg-white rounded-xl p-8 shadow-sm">
        <form class="w-full" @submit.prevent="save">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nama UMKM
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-button"
                type="text"
                placeholder="Contoh: Dapur Bunda"
                v-model="campaign.nama_campaign"
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Modal yang Dibutuhkan (Rp)
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-button"
                type="number"
                placeholder="Contoh: 5000000"
                v-model.number="campaign.goal_amount"
                required
              />
            </div>
            <div class="w-full px-3 mt-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Deskripsi Singkat
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-button"
                type="text"
                placeholder="Deskripsi singkat mengenai UMKM mu"
                v-model="campaign.short_description"
                required
              />
            </div>
            <div class="w-full px-3 mt-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Apa yang Didapat Investor
              </label>
              <input
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-button"
                type="text"
                placeholder="Contoh: Mendapat keuntungan usaha 10%, Balik modal, Kontrak 2 tahun"
                v-model="campaign.perks"
                required
              />
            </div>
            <div class="w-full px-3 mt-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Deskripsi Lengkap
              </label>
              <textarea
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-button"
                rows="5"
                placeholder="Isi deskripsi panjang untuk kampanye Anda"
                v-model="campaign.description"
                required
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </section>

    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      loading: false,
      campaign: {
        nama_campaign: '',
        short_description: '',
        description: '',
        goal_amount: 0,
        perks: '',
      },
    }
  },
  methods: {
    async save() {
      this.loading = true
      try {
        let response = await this.$axios.$post('/api/v1/campaigns', this.campaign)
        this.$store.dispatch('showToast', {
          message: 'Kampanye berhasil dibuat!',
          type: 'success',
        })
        this.$router.push({
          name: 'dashboard-projects-id',
          params: { id: response.data.id },
        })
      } catch (error) {
        let errorMsg = 'Gagal membuat kampanye. Periksa kembali data Anda.'
        if (error.response && error.response.data && error.response.data.meta) {
          errorMsg = error.response.data.meta.message
        }
        this.$store.dispatch('showToast', { message: errorMsg, type: 'error' })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>