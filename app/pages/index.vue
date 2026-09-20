<template>
  <div class="landing-page">
    <section class="landing-hero pt-5">
      <div class="header__bg" aria-hidden="true"></div>
      <div class="container mx-auto relative">
        <Navbar />
        <div class="landing-hero__content flex flex-col md:flex-row items-center px-5 md:px-0">
          <div class="w-full md:w-1/2">
            <p class="eyebrow text-white mb-4">Platform dukungan usaha lokal</p>
            <h1 class="text-4xl lg:text-5xl text-white mb-5">
              Dukung <span class="hero-underline">UMKM Indonesia</span> untuk tumbuh.
            </h1>
            <p class="text-white text-lg font-light mb-8 max-w-xl">
              Temukan usaha lokal dengan cerita dan rencana yang jelas. Pilih kampanye
              yang ingin Anda dukung dan ikuti perkembangannya.
            </p>
            <a
              href="#projects"
              class="inline-flex items-center bg-orange-button hover:bg-green-button text-white font-semibold px-8 py-3 text-lg rounded-full transition-colors duration-200"
            >
              Temukan UMKM
            </a>
          </div>
          <div class="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img src="/Group-2.png" alt="Ilustrasi kolaborasi untuk mendukung usaha lokal" class="landing-hero__image" />
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto pt-24" id="features">
      <div class="section-heading mb-10">
        <p class="eyebrow text-purple-700 mb-3">Mulai dengan mudah</p>
        <h2 class="text-3xl lg:text-4xl text-gray-900">Tiga langkah untuk ikut mendukung usaha lokal</h2>
      </div>
      <div class="steps-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        <article class="step-item">
          <img src="/step-1-illustration.svg" alt="" class="step-item__image" />
          <span class="step-item__number">01</span>
          <h3 class="font-semibold text-xl mb-2">Buat akun</h3>
          <p class="font-light text-gray-600">Daftar untuk menjelajahi kampanye dan menyimpan aktivitas investasi Anda.</p>
        </article>
        <article class="step-item">
          <img src="/step-2-illustration.svg" alt="" class="step-item__image" />
          <span class="step-item__number">02</span>
          <h3 class="font-semibold text-xl mb-2">Pilih UMKM</h3>
          <p class="font-light text-gray-600">Baca cerita, kebutuhan modal, dan manfaat yang ditawarkan setiap usaha.</p>
        </article>
        <article class="step-item">
          <img src="/step-3-illustration.svg" alt="" class="step-item__image" />
          <span class="step-item__number">03</span>
          <h3 class="font-semibold text-xl mb-2">Ikuti perkembangannya</h3>
          <p class="font-light text-gray-600">Pantau transaksi dan dukungan Anda melalui dashboard pribadi.</p>
        </article>
      </div>
    </section>

    <section class="container mx-auto pt-24" id="projects">
      <div class="section-heading flex flex-col md:flex-row md:items-end md:justify-between">
        <div>
          <p class="eyebrow text-purple-700 mb-3">Pilihan untuk didukung</p>
          <h2 class="text-3xl lg:text-4xl text-gray-900 mb-8">Kenali kampanye UMKM</h2>
        </div>
      </div>

      <div v-if="campaignsError" class="empty-state mt-3" role="alert">
        <p class="text-lg text-gray-700 mb-4">Kampanye belum dapat dimuat. Periksa koneksi Anda, lalu coba lagi.</p>
        <button @click="loadCampaigns" :disabled="campaignsLoading" class="bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-3 rounded-full disabled:opacity-60">
          {{ campaignsLoading ? 'Memuat...' : 'Coba lagi' }}
        </button>
      </div>
      <div v-else-if="campaigns.data && campaigns.data.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        <div
          v-for="campaign in campaigns.data"
          :key="campaign.id"
          class="card-project w-full p-5 rounded-20"
        >
          <div class="item">
            <figure class="item-image">
              <img
                :src="campaign.image_url || '/umkm.jpg'"
                :alt="'Foto kampanye ' + campaign.nama"
                class="rounded-20 w-full object-cover h-48"
              />
            </figure>
            <div class="item-meta">
              <h3 class="text-2xl font-semibold text-gray-900 mt-5">
                {{ campaign.nama }}
              </h3>
              <p class="text-md font-light text-gray-700 campaign-summary">
                {{ campaign.short_description }}
              </p>
              <div class="relative pt-4 progress-bar">
                <div class="overflow-hidden h-2 mb-3 text-xs flex rounded-lg bg-gray-200" role="progressbar" :aria-valuenow="progressPercent(campaign)" aria-valuemin="0" aria-valuemax="100" :aria-label="'Dana terkumpul untuk ' + campaign.nama">
                  <div
                    :style="'width: ' + progressPercent(campaign) + '%'"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress"
                  ></div>
                </div>
              </div>
              <div class="flex justify-between progress-info text-sm text-gray-600">
                <span>{{ progressPercent(campaign) }}% terkumpul</span>
                <span class="font-semibold text-gray-800">Target {{ formatCurrency(campaign.goal_amount) }}</span>
              </div>
            </div>
            <nuxt-link
              :to="{ name: 'projects-id', params: { id: campaign.id } }"
              class="mt-5 button-cta block w-full text-center bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-3 text-base rounded-full transition-colors duration-200"
            >
              Lihat kampanye
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
          <p class="text-xl text-gray-700">Belum ada kampanye tersedia.</p>
          <p class="text-gray-500 mt-2">Kampanye UMKM akan muncul di sini setelah tersedia.</p>
      </div>
    </section>

    <section class="container mx-auto pt-24" id="testimonials">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <p class="eyebrow text-purple-700 mb-3">Cerita komunitas</p>
          <h2 class="text-3xl lg:text-4xl text-gray-900 mb-8">Dukungan kecil membuka peluang besar</h2>
        </div>
      </div>
      <div class="flex flex-col md:flex-row mb-10">
        <div class="hidden md:w-2/12 md:flex justify-center items-start">
          <img src="/testimonial-line.svg" alt="" aria-hidden="true" />
        </div>
        <div class="w-full md:w-8/12 mt-0 md:mt-16">
          <h2 class="text-2xl md:text-3xl text-gray-900 font-light">
            "Investasi di website UMKM ini sangat mudah dan nyaman.
            Hanya perlu mencari ide, klik dan sudah mendanai."
          </h2>
          <div class="testimonial-info mt-8">
            <div class="name text-xl font-semibold">Adit Pratama</div>
            <div class="title text-xl font-light text-gray-500">Investor</div>
          </div>
          <div class="testimonial-icon mt-10">
            <img src="/mom.png" alt="Foto anggota komunitas UMKM" class="w-16 h-16 mr-3 inline-block testimonial-user rounded-xl object-cover" />
            <img src="/girl.png" alt="Foto anggota komunitas UMKM" class="w-16 h-16 mr-3 inline-block testimonial-user rounded-xl object-cover" />
            <img src="/boy.png" alt="Foto Adit Pratama" class="w-16 h-16 mr-3 inline-block testimonial-user active rounded-xl object-cover" />
          </div>
        </div>
        <div class="hidden md:block md:w-2/12"></div>
      </div>
    </section>

    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Dukung UMKM Indonesia',
    }
  },
  async asyncData({ $axios }) {
    try {
      const campaigns = await $axios.$get('/api/v1/campaigns')
      return { campaigns: campaigns || { data: [] }, campaignsError: false }
    } catch (e) {
      return { campaigns: { data: [] }, campaignsError: true }
    }
  },
  data() {
    return { campaignsLoading: false }
  },
  methods: {
    progressPercent(campaign) {
      if (!campaign.goal_amount || campaign.goal_amount === 0) return 0
      return Math.min(Math.round((campaign.current_amount / campaign.goal_amount) * 100), 100)
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(Number(amount) || 0)
    },
    async loadCampaigns() {
      this.campaignsLoading = true
      try {
        const campaigns = await this.$axios.$get('/api/v1/campaigns')
        this.campaigns = campaigns || { data: [] }
        this.campaignsError = false
      } catch (error) {
        this.campaignsError = true
      } finally {
        this.campaignsLoading = false
      }
    },
  },
}
</script>
