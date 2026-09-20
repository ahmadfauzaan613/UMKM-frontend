<template>
  <div class="project-page">
    <section class="project-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <section class="container project-container mx-auto -mt-56">
      <div class="flex flex-col lg:flex-row mt-3">
        <div class="w-full lg:w-3/4 lg:mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <figure class="item-image">
              <img :src="default_image" :alt="'Foto kampanye ' + campaign.data.nama" class="rounded-20 w-full object-cover" style="max-height:420px" />
            </figure>
          </div>
          <div class="flex flex-wrap -mx-2">
            <div
              v-for="image in campaign.data.images"
              :key="image.image_url"
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20 cursor-pointer"
            >
              <figure class="item-thumbnail">
                <img
                  :src="image.image_url"
                  @click="changeImage(image.image_url)"
                  :alt="'Lihat foto lain kampanye ' + campaign.data.nama"
                  role="button"
                  tabindex="0"
                  @keydown.enter="changeImage(image.image_url)"
                  class="rounded-20 w-full object-cover h-24"
                />
              </figure>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/4 mt-6 lg:mt-0">
          <div
            class="bg-white w-full p-5 border border-gray-200 rounded-20 lg:sticky"
            style="top: 15px"
          >
            <h3 class="font-semibold text-gray-700 mb-2">Pemilik UMKM:</h3>
            <div class="flex mt-3">
              <div class="w-1/4">
                <img
                  :src="(campaign.data.User && campaign.data.User.image_url) || '/avatar.jpg'"
                  :alt="'Foto profil ' + ((campaign.data.User && campaign.data.User.nama) || 'pemilik UMKM')"
                  class="w-12 h-12 inline-block rounded-xl object-cover"
                />
              </div>
              <div class="w-3/4 ml-5 mt-1">
                <div class="font-semibold text-xl text-gray-800">
                  {{ (campaign.data.User && campaign.data.User.nama) || 'Pemilik UMKM' }}
                </div>
                <div class="font-light text-md text-gray-400">
                {{ campaign.data.backer_count || 0 }} investor sudah mendanai kampanye ini
                </div>
              </div>
            </div>

            <h4 class="mt-5 font-semibold">Apa yang akan didapat investor:</h4>
            <ul class="list-check mt-3">
              <li v-for="perk in campaign.data.perks" :key="perk">{{ perk }}</li>
            </ul>

            <template v-if="$store.state.auth.loggedIn">
              <input
                type="number"
                class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                placeholder="Nominal Investasi (Rp)"
                v-model.number="transactions.amount"
                min="1"
                step="1"
                @keyup.enter="fund"
              />
              <button
                @click="fund"
                :disabled="loading"
                class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full disabled:opacity-50"
              >
                {{ loading ? 'Memproses...' : 'Danai UMKM Ini' }}
              </button>
            </template>
            <template v-else>
              <button
                @click="$router.push({ path: '/login' })"
                class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full"
              >
                Login untuk Mendanai
              </button>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center">
        <div class="w-full md:w-3/4 md:mr-6">
          <h1 class="text-3xl lg:text-4xl text-gray-900 mb-2 font-semibold">
            {{ campaign.data.nama }}
          </h1>
          <p class="font-light text-lg lg:text-xl mb-5 text-gray-600">{{ campaign.data.short_description }}</p>
          <p class="font-light text-base lg:text-lg mb-5 whitespace-pre-line">{{ campaign.data.description }}</p>
          <div class="relative progress-bar">
            <div class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-3" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100" :aria-label="'Dana terkumpul untuk ' + campaign.data.nama">
              <div
                :style="'width: ' + progressPercent + '%'"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 progress-info mb-6">
            <div class="text-lg font-semibold">{{ progressPercent }}% terkumpul</div>
            <div class="ml-auto font-semibold text-lg">
              Target Rp {{ new Intl.NumberFormat('id-ID').format(campaign.data.goal_amount) }}
            </div>
          </div>
        </div>
        <div class="w-1/4 hidden md:block"></div>
      </div>
    </section>

    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const campaign = await $axios.$get('/api/v1/campaigns/' + params.id)
    return { campaign }
  },
  data() {
    return {
      default_image: '',
      loading: false,
      transactions: {
        amount: 0,
        campaign_id: Number.parseInt(this.$route.params.id),
      },
    }
  },
  computed: {
    progressPercent() {
      const c = this.campaign.data
      if (!c.goal_amount || c.goal_amount === 0) return 0
      return Math.min(Math.round((c.current_amount / c.goal_amount) * 100), 100)
    },
  },
  methods: {
    changeImage(url) {
      this.default_image = url
    },
    async fund() {
      const amount = Number(this.transactions.amount)
      if (!Number.isSafeInteger(amount) || amount <= 0) {
        this.$store.dispatch('showToast', {
          message: 'Masukkan nominal investasi yang valid.',
          type: 'error',
        })
        return
      }
      this.loading = true
      let redirectingToPayment = false
      try {
        let response = await this.$axios.post('/api/v1/transactions', this.transactions)
        const paymentUrl = response.data && response.data.data && response.data.data.payment_url
        if (!paymentUrl) throw new Error('Payment URL is missing')
        redirectingToPayment = true
        this.$store.dispatch('showToast', {
          message: 'Transaksi dibuat! Mengarahkan ke halaman pembayaran...',
          type: 'success',
        })
        setTimeout(() => {
          window.location.assign(paymentUrl)
        }, 1000)
      } catch (error) {
        let errorMsg = 'Gagal membuat transaksi. Coba lagi.'
        if (error.response && error.response.data && error.response.data.meta) {
          errorMsg = error.response.data.meta.message
        }
        this.$store.dispatch('showToast', { message: errorMsg, type: 'error' })
      } finally {
        if (!redirectingToPayment) this.loading = false
      }
    },
  },
  mounted() {
    if (this.campaign.data.images && this.campaign.data.images.length > 0) {
      this.default_image = this.campaign.data.images.find(i => i.is_primary)?.image_url
        || this.campaign.data.images[0].image_url
    } else {
      this.default_image = this.campaign.data.image_url || '/umkm.jpg'
    }
  },
}
</script>
