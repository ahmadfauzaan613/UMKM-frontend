export const state = () => ({
  counter: 0,
  toasts: []
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  ADD_TOAST(state, toast) {
    state.toasts.push(toast)
  },
  REMOVE_TOAST(state, id) {
    state.toasts = state.toasts.filter(t => t.id !== id)
  }
}

export const actions = {
  showToast({ commit }, { message, type = 'success', duration = 3000 }) {
    const id = Date.now()
    commit('ADD_TOAST', { id, message, type })
    setTimeout(() => {
      commit('REMOVE_TOAST', id)
    }, duration)
  }
}