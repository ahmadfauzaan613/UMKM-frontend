<template>
  <div class="landing-page">
    <section class="landing-hero pt-5">
      <div class="header__bg"></div>
      <div class="container mx-auto relative">
        <Navbar />
        <div class="flex items-center pt-10 px-5 md:px-0">
          <div class="w-1/2">
            <h1 class="text-3xl text-white mb-5">
              Kami siap membantu <u class="hero-underline">UMKM</u> Untuk
              <br />
              Untuk memulai &amp; <u class="hero-underline">mendanai</u> <br />
              kebutuhan mereka
            </h1>
            <p class="text-white text-lg font-light mb-8">
              Buatlah ide terbaik Anda untuk menjadi <br />
              produk nyata dan jadilah kontributor
            </p>
            <a
              href="#projects"
              class="bg-orange-button hover:bg-green-button text-white font-semibold px-12 py-3 text-xl rounded-full"
            >
              Temukan UMKM
            </a>
          </div>
          <div class="w-1/2 flex justify-center">
            <img src="/Group-2.png" alt="crowdfunding project" />
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto pt-24" id="features">
      <div class="flex justify-between items-center mb-10">
        <div class="w-auto">
          <h2 class="text-3xl text-gray-900 mb-8">
            Hanya Butuh 3 Langkah Untuk <br />
            Menjalankan Ide Cemerlang Anda!
          </h2>
        </div>
      </div>
      <div class="flex">
        <div class="w-full px-56 mb-5">
          <img src="/line-step.svg" alt="" class="w-full" />
        </div>
      </div>
      <div class="flex justify-between items-center text-center">
        <div class="w-1/3">
          <figure class="flex justify-center items-center">
            <img src="/step-1-illustration.svg" alt="" class="h-30 mb-8" />
          </figure>
          <div class="step-content">
            <h3 class="font-medium">Sign Up</h3>
            <p class="font-light">
              Daftarkan Akun Anda Dan Mulailah <br />Untuk Menginvestasikan Dana Anda Pada UMKM
            </p>
          </div>
        </div>
        <div class="w-1/3">
          <figure class="flex justify-center items-center -mt-24">
            <img src="/step-2-illustration.svg" alt="" class="h-30 mb-8" />
          </figure>
          <div class="step-content">
            <h3 class="font-medium">Buka UMKM</h3>
            <p class="font-light">
              Pilih Beberapa Ide UMKM, <br />
              Dan Mulailah Untuk Menginvestasikan Dana Anda Pada UMKM
            </p>
          </div>
        </div>
        <div class="w-1/3">
          <figure class="flex justify-center items-center -mt-48">
            <img src="/step-3-illustration.svg" alt="" class="h-30 mb-8" />
          </figure>
          <div class="step-content">
            <h3 class="font-medium">Jalankan</h3>
            <p class="font-light">
              Saatnya buat mimpi Anda <br />
              menjadi nyata.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto pt-24" id="projects">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <h2 class="text-3xl text-gray-900 mb-8">
            UMKM Yang Bisa <br />
            Anda Investasikan
          </h2>
        </div>
      </div>

      <div v-if="campaigns.data && campaigns.data.length > 0" class="grid grid-cols-3 gap-4 mt-3">
        <div
          v-for="campaign in campaigns.data"
          :key="campaign.id"
          class="card-project w-full p-5 border border-gray-500 rounded-20"
        >
          <div class="item">
            <figure class="item-image">
              <img
                :src="campaign.image_url || '/placeholder.png'"
                alt=""
                class="rounded-20 w-full object-cover h-48"
              />
            </figure>
            <div class="item-meta">
              <h4 class="text-3xl font-medium text-gray-900 mt-5">
                {{ campaign.nama }}
              </h4>
              <p class="text-md font-light text-gray-900 h-12 overflow-hidden">
                {{ campaign.short_description }}
              </p>
              <div class="relative pt-4 progress-bar">
                <div class="overflow-hidden h-3 mb-4 text-xs flex rounded-lg bg-gray-200">
                  <div
                    :style="'width: ' + progressPercent(campaign) + '%'"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
                  ></div>
                </div>
              </div>
              <div class="flex progress-info">
                <div>{{ progressPercent(campaign) }}%</div>
                <div class="ml-auto font-semibold">
                  Rp {{ new Intl.NumberFormat('id-ID').format(campaign.goal_amount) }}
                </div>
              </div>
            </div>
            <button
              @click="$router.push({ name: 'projects-id', params: { id: campaign.id } })"
              class="mt-5 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-2 text-lg rounded-full"
            >
              Danai UMKM Ini
            </button>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="text-xl">Belum ada kampanye tersedia.</p>
      </div>
    </section>

    <section class="container mx-auto pt-24" id="testimonials">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <h2 class="text-3xl text-gray-900 mb-8">
            Lihat Apa Yang Dikatakan <br />
            Oleh Mereka
          </h2>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="w-2/12 flex justify-center items-start">
          <img src="/testimonial-line.svg" alt="" />
        </div>
        <div class="w-8/12 mt-16">
          <h2 class="text-3xl text-gray-900 font-light">
            "Investasi di website UMKM ini sangat mudah dan nyaman.
            Hanya perlu mencari ide, klik dan sudah mendanai."
          </h2>
          <div class="testimonial-info mt-8">
            <div class="name text-xl font-semibold">Adit</div>
            <div class="title text-xl font-light text-gray-400">Investor</div>
          </div>
          <div class="testimonial-icon mt-10">
            <img src="/mom.png" alt="" class="w-20 mr-5 inline-block testimonial-user rounded-full" />
            <img src="/girl.png" alt="" class="w-20 mr-5 inline-block testimonial-user rounded-full" />
            <img src="/boy.png" alt="" class="w-20 mr-5 inline-block testimonial-user active rounded-full" />
          </div>
        </div>
        <div class="w-2/12"></div>
      </div>
    </section>

    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const campaigns = await $axios.$get('/api/v1/campaigns')
      return { campaigns }
    } catch (e) {
      return { campaigns: { data: [] } }
    }
  },
  methods: {
    progressPercent(campaign) {
      if (!campaign.goal_amount || campaign.goal_amount === 0) return 0
      return Math.min(
        Math.round((campaign.current_amount / campaign.goal_amount) * 100),
        100
      )
    },
  },
}
</script>
