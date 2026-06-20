export const state = () => ({
  user: null,
  token: null,
  loading: false,
  error: null,
})

export const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
  getLoading: (state) => state.loading,
  getError: (state) => state.error,
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_AUTH(state) {
    state.user = null
    state.token = null
    state.error = null
  },
}

export const actions = {
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await this.$axios.post('/api/v1/sessions', {
        email: credentials.email,
        password: credentials.password,
      })
      
      const { data, meta } = response.data
      commit('SET_USER', data)
      commit('SET_TOKEN', data.token)
      
      // Set default authorization header
      this.$axios.setHeader('Authorization', `Bearer ${data.token}`)
      
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Login gagal'
      commit('SET_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async register({ commit }, formData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await this.$axios.post('/api/v1/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        occupation: formData.occupation,
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Registrasi gagal'
      commit('SET_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchUser({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$axios.get('/api/v1/user/fetch')
      const { data } = response.data
      commit('SET_USER', data)
      return data
    } catch (error) {
      commit('CLEAR_AUTH')
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  logout({ commit }) {
    commit('CLEAR_AUTH')
    this.$axios.setHeader('Authorization', '')
  },

  setUser({ commit }, user) {
    commit('SET_USER', user)
  },

  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
}
