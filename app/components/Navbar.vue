<template>
  <header class="site-header">
    <nuxt-link to="/" class="site-brand" aria-label="Investasi UMKM, beranda" @click.native="closeMenu">
      <img src="/money-bag.svg" alt="" class="site-brand__logo" />
      <span>Investasi <span class="site-brand__accent">UMKM</span></span>
    </nuxt-link>

    <button
      class="site-menu-toggle"
      type="button"
      :aria-expanded="mobileOpen ? 'true' : 'false'"
      aria-controls="primary-navigation"
      :aria-label="mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
      @click="mobileOpen = !mobileOpen"
    >
      <span></span><span></span><span></span>
    </button>

    <nav id="primary-navigation" class="site-nav" :class="{ 'site-nav--open': mobileOpen }">
      <ul class="site-nav__links">
        <li><nuxt-link to="/" exact active-class="is-active" @click.native="closeMenu">Beranda</nuxt-link></li>
        <li><a href="/#projects" @click="closeMenu">Jelajahi UMKM</a></li>
        <li><a href="/#features" @click="closeMenu">Cara kerja</a></li>
        <li><a href="/#testimonials" @click="closeMenu">Cerita investor</a></li>
      </ul>

      <ul v-if="!$store.state.auth.loggedIn" class="site-nav__account">
        <li><nuxt-link to="/login" class="site-nav__login" @click.native="closeMenu">Masuk</nuxt-link></li>
        <li><nuxt-link to="/register" class="site-nav__signup" @click.native="closeMenu">Buat akun</nuxt-link></li>
      </ul>

      <div v-else class="site-profile">
        <button
          class="site-profile__toggle"
          type="button"
          :aria-expanded="profileOpen ? 'true' : 'false'"
          aria-haspopup="true"
          @click="profileOpen = !profileOpen"
          @keydown.esc="profileOpen = false"
        >
          <img
            :src="($store.state.auth.user && $store.state.auth.user.image_url) || '/avatar.jpg'"
            :alt="'Foto profil ' + (($store.state.auth.user && $store.state.auth.user.nama) || 'pengguna')"
            class="site-profile__avatar"
          />
          <span>{{ ($store.state.auth.user && $store.state.auth.user.nama) || 'Akun saya' }}</span>
          <span class="site-profile__chevron" aria-hidden="true">⌄</span>
        </button>
        <ul v-if="profileOpen" class="site-profile__menu">
          <li><nuxt-link to="/dashboard" @click.native="closeMenu">Dashboard</nuxt-link></li>
          <li><button type="button" @click="logout">Keluar</button></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobileOpen: false,
      profileOpen: false,
    }
  },
  watch: {
    $route() {
      this.closeMenu()
    },
  },
  methods: {
    closeMenu() {
      this.mobileOpen = false
      this.profileOpen = false
    },
    async logout() {
      await this.$auth.logout()
      this.$store.dispatch('showToast', {
        message: 'Anda telah keluar dari akun.',
        type: 'success',
      })
      this.closeMenu()
      this.$router.push('/')
    },
  },
}
</script>
