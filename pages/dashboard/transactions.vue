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
              <nuxt-link class="text-gray-500 hover:text-gray-800" to="/dashboard">
                Ide UMKM Anda
              </nuxt-link>
            </li>
            <li class="mr-6">
              <nuxt-link class="text-gray-800 font-bold border-b-2 border-orange-button pb-1" to="/dashboard/transactions">
                Transaksi Investasi Anda
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <hr class="mb-6" />

      <div v-if="transactions.data && transactions.data.length > 0" class="block mb-2">
        <div
          class="w-full lg:max-w-full lg:flex mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          v-for="transaction in transactions.data"
          :key="transaction.id"
        >
          <div
            class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
            :style="transaction.campaign.image_url ? 'background-image: url(' + transaction.campaign.image_url + ')' : 'background-color:#e5e7eb'"
          ></div>
          <div class="w-full bg-white p-8 flex flex-col justify-between leading-normal">
            <div>
              <div class="text-gray-900 font-bold text-xl mb-1">
                {{ transaction.campaign.nama }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                Rp {{ new Intl.NumberFormat('id-ID').format(transaction.amount) }}
              </p>
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                :class="statusClass(transaction.status)"
              >
                {{ transaction.status || 'Pending' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <p class="text-xl">Belum ada transaksi investasi.</p>
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
  async asyncData({ $axios }) {
    try {
      const transactions = await $axios.$get('/api/v1/transactions')
      return { transactions }
    } catch (e) {
      return { transactions: { data: [] } }
    }
  },
  methods: {
    statusClass(status) {
      if (status === 'paid') return 'bg-green-100 text-green-700'
      if (status === 'pending') return 'bg-yellow-100 text-yellow-700'
      if (status === 'cancelled') return 'bg-red-100 text-red-700'
      return 'bg-gray-100 text-gray-600'
    },
  },
}
</script>