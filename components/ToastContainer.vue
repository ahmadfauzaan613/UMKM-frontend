<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
    <transition-group name="toast-list" tag="div" class="flex flex-col space-y-3">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center justify-between w-full p-4 rounded-xl shadow-2xl border backdrop-blur-md transform transition-all duration-300 ease-out"
        :class="toastClass(toast.type)"
      >
        <div class="flex items-center space-x-3">
          <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold">
            <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p class="text-sm font-medium text-gray-100">
            {{ toast.message }}
          </p>
        </div>
        <button
          @click="remove(toast.id)"
          class="flex-shrink-0 ml-4 text-gray-400 hover:text-white focus:outline-none transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  computed: {
    toasts() {
      return this.$store.state.toasts
    }
  },
  methods: {
    remove(id) {
      this.$store.commit('REMOVE_TOAST', id)
    },
    toastClass(type) {
      if (type === 'success') {
        return 'bg-emerald-950/95 border-emerald-500/30 text-emerald-100 shadow-emerald-950/40'
      } else if (type === 'error') {
        return 'bg-rose-950/95 border-rose-500/30 text-rose-100 shadow-rose-950/40'
      }
      return 'bg-slate-950/95 border-slate-500/30 text-slate-100 shadow-slate-950/40'
    }
  }
}
</script>

<style scoped>
.toast-list-enter-active, .toast-list-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-list-enter {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}
</style>
