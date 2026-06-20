<template>
  <div class="project-page">
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <section class="container mx-auto pt-8 pb-20">
      <div class="flex justify-between items-center mb-2">
        <div class="w-full">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
        </div>
      </div>

      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4">
          <h3 class="text-2xl text-gray-900">Detail Kampanye</h3>
        </div>
        <div class="w-1/4 text-right">
          <nuxt-link
            to="/dashboard"
            class="bg-green-button hover:bg-green-button text-white font-bold px-4 py-2 rounded-lg inline-flex items-center"
          >
            ← Kembali
          </nuxt-link>
        </div>
      </div>

      <div class="w-full border border-gray-200 bg-white rounded-xl p-8 shadow-sm mb-8">
        <div class="text-gray-900 font-bold text-2xl mb-3">{{ campaign.data.nama }}</div>
        <p class="text-sm font-bold text-gray-500 mb-1">Deskripsi Singkat</p>
        <p class="text-gray-700 mb-4">{{ campaign.data.short_description }}</p>
        <p class="text-sm font-bold text-gray-500 mb-1">Deskripsi Lengkap</p>
        <p class="text-gray-700 mb-4">{{ campaign.data.description }}</p>
        <p class="text-sm font-bold text-gray-500 mb-1">Yang Didapat Investor</p>
        <ul class="list-disc ml-5 mb-4">
          <li v-for="perk in campaign.data.perks" :key="perk">{{ perk }}</li>
        </ul>
        <p class="text-sm font-bold text-gray-500 mb-1">Target Modal</p>
        <p class="text-3xl font-semibold text-gray-700">
          Rp {{ new Intl.NumberFormat('id-ID').format(campaign.data.goal_amount) }}
        </p>
      </div>

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl text-gray-900">Galeri Foto</h3>
        <div class="flex items-center space-x-3">
          <input
            type="file"
            ref="file"
            @change="selectFile"
            accept="image/*"
            class="border border-gray-300 p-1 rounded-lg text-sm text-gray-600"
          />
          <button
            @click="upload"
            :disabled="!selectedFiles || uploading"
            class="bg-green-button hover:bg-green-button text-white font-bold px-4 py-2 rounded-lg inline-flex items-center disabled:opacity-50"
          >
            {{ uploading ? 'Mengunggah...' : 'Upload' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-10">
        <div
          class="relative bg-white border border-gray-200 rounded-xl overflow-hidden"
          v-for="image in campaign.data.images"
          :key="image.image_url"
        >
          <figure class="item-thumbnail">
            <img :src="image.image_url" alt="" class="rounded w-full object-cover h-36" />
          </figure>
          <div v-if="image.is_primary" class="absolute top-2 left-2 bg-orange-button text-white text-xs px-2 py-0.5 rounded-full">
            Utama
          </div>
        </div>
        <div
          v-if="!campaign.data.images || campaign.data.images.length === 0"
          class="col-span-4 flex flex-col items-center justify-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl"
        >
          <svg class="w-10 h-10 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>Belum ada foto. Upload foto kampanye Anda.</p>
        </div>
      </div>

      <h3 class="text-2xl text-gray-900 mb-4">Transaksi Investor</h3>
      <div v-if="transactions.data && transactions.data.length > 0" class="block mb-2">
        <div
          class="w-full border border-gray-200 bg-white rounded-xl p-6 flex flex-col mb-3 shadow-sm"
          v-for="transaction in transactions.data"
          :key="transaction.id"
        >
          <div class="text-gray-900 font-bold text-lg mb-1">{{ transaction.nama }}</div>
          <p class="text-sm text-gray-600">
            Rp {{ new Intl.NumberFormat('id-ID').format(transaction.amount) }}
            &middot;
            {{ transaction.created_at ? new Date(transaction.created_at).toLocaleDateString('id-ID') : '-' }}
          </p>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
        <p>Belum ada investor yang mendanai kampanye ini.</p>
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
  async asyncData({ $axios, params }) {
    try {
      const campaign = await $axios.$get('/api/v1/campaigns/' + params.id)
      const transactions = await $axios.$get('/api/v1/campaigns/' + params.id + '/transactions')
      return { campaign, transactions }
    } catch (e) {
      return { campaign: { data: {} }, transactions: { data: [] } }
    }
  },
  data() {
    return {
      selectedFiles: undefined,
      uploading: false,
    }
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files
    },
    async load() {
      const campaign = await this.$axios.$get('/api/v1/campaigns/' + this.$route.params.id)
      this.campaign = campaign
    },
    async upload() {
      if (!this.selectedFiles) return
      this.uploading = true
      let formData = new FormData()
      formData.append('campaign_id', this.$route.params.id)
      formData.append('file', this.selectedFiles.item(0))
      formData.append('is_primary', true)
      try {
        await this.$axios.post('/api/v1/campaign-images', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        this.$store.dispatch('showToast', {
          message: 'Foto kampanye berhasil diunggah!',
          type: 'success',
        })
        this.selectedFiles = undefined
        this.$refs.file.value = ''
        await this.load()
      } catch (error) {
        let errorMsg = 'Gagal mengunggah foto.'
        if (error.response && error.response.data && error.response.data.meta) {
          errorMsg = error.response.data.meta.message
        }
        this.$store.dispatch('showToast', { message: errorMsg, type: 'error' })
      } finally {
        this.uploading = false
      }
    },
  },
}
</script>