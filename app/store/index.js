export const state = () => ({
  counter: 0,
  toasts: [],
  toastSequence: 0,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  ADD_TOAST(state, toast) {
    state.toastSequence += 1
    state.toasts.push({ ...toast, id: `${Date.now()}-${state.toastSequence}` })
  },
  REMOVE_TOAST(state, id) {
    state.toasts = state.toasts.filter(t => t.id !== id)
  }
}

export const actions = {
  showToast({ commit, state }, { message, type = 'success', duration = 3000 }) {
    const id = `${Date.now()}-${state.toastSequence + 1}`
    commit('ADD_TOAST', { id, message, type })
    setTimeout(() => {
      commit('REMOVE_TOAST', id)
    }, duration)
  }
}
