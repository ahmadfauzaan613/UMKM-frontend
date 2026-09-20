<template>
  <footer class="site-footer py-16 text-white">
    <div class="container mx-auto">
      <div class="site-footer__main">
        <div class="site-footer__brand">
          <img src="/logo-footer.svg" alt="Logo Investasi UMKM" class="mb-4 h-10" />
          <p class="font-light text-white text-opacity-75">
            Menghubungkan dukungan Anda dengan usaha lokal yang ingin berkembang.
          </p>
        </div>
        <nav aria-label="Navigasi footer" class="site-footer__links">
          <h2>Jelajahi</h2>
          <a href="/#projects">Kampanye UMKM</a>
          <a href="/#features">Cara kerja</a>
          <nuxt-link to="/register">Buat akun</nuxt-link>
        </nav>
        <div class="site-footer__links">
          <h2>Hubungi kami</h2>
          <a href="mailto:support@umkm.id">support@umkm.id</a>
          <span>Margonda, Depok</span>
        </div>
      </div>
      <div class="site-footer__legal">
        <span>© {{ year }} Investasi UMKM</span>
        <span>Platform dukungan untuk UMKM Indonesia</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return { year: new Date().getFullYear() }
  },
}
</script>
