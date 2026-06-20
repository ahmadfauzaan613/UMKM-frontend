<template>
  <div class="project-page">
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
          <ul class="flex mt-2">
            <li class="mr-6">
              <nuxt-link class="text-gray-800 font-bold border-b-2 border-orange-button pb-1" to="/dashboard">
                Ide UMKM Anda
              </nuxt-link>
            </li>
            <li class="mr-6">
              <nuxt-link class="text-gray-500 hover:text-gray-800" to="/dashboard/transactions">
                Transaksi Investasi Anda
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="w-1/4 text-right">
          <nuxt-link
            to="/dashboard/projects/create"
            class="bg-orange-button hover:bg-green-button text-white font-bold py-3 px-5 rounded-lg inline-flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Buat Ide UMKM Baru
          </nuxt-link>
        </div>
      </div>

      <hr class="mb-6" />

      <div v-if="campaigns.data && campaigns.data.length > 0" class="block mb-2">
        <div
          class="w-full lg:max-w-full lg:flex mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          v-for="campaign in campaigns.data"
          :key="campaign.id"
        >
          <div
            class="border h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
            :style="campaign.image_url ? 'background-image: url(' + campaign.image_url + ')' : 'background-color:#e5e7eb'"
          ></div>
          <nuxt-link
            :to="'/dashboard/projects/' + campaign.id"
            class="w-full bg-white p-8 flex flex-col justify-between leading-normal"
          >
            <div class="mb-4">
              <div class="text-gray-900 font-bold text-xl mb-1">{{ campaign.nama }}</div>
              <p class="text-sm text-gray-500 mb-2">
                Target: Rp {{ new Intl.NumberFormat('id-ID').format(campaign.goal_amount) }}
                &middot;
                {{ progressPercent(campaign) }}% terkumpul
              </p>
              <p class="text-gray-700 text-base">{{ campaign.short_description }}</p>
            </div>
            <div class="flex items-center">
              <span class="bg-green-button text-white py-1 px-4 rounded-lg text-sm font-semibold">
                Lihat Detail
              </span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-xl mb-4">Anda belum memiliki kampanye.</p>
        <nuxt-link to="/dashboard/projects/create" class="bg-orange-button hover:bg-green-button text-white font-bold py-2 px-6 rounded-lg">
          Buat Kampanye Pertama
        </nuxt-link>
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
  async asyncData({ $axios, app }) {
    try {
      const campaigns = await $axios.$get(
        '/api/v1/campaigns?user_id=' + app.$auth.user.id
      )
      return { campaigns }
    } catch (e) {
      return { campaigns: { data: [] } }
    }
  },
  methods: {
    progressPercent(campaign) {
      if (!campaign.goal_amount || campaign.goal_amount === 0) return 0
      return Math.min(Math.round((campaign.current_amount / campaign.goal_amount) * 100), 100)
    },
  },
}
</script>