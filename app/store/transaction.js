export const state = () => ({
  transactions: {
    data: [],
    loading: false,
    error: null,
  },
  campaignTransactions: {
    data: [],
    loading: false,
  },
})

export const getters = {
  getUserTransactions: (state) => state.transactions.data,
  getTransactionLoading: (state) => state.transactions.loading,
  getTransactionError: (state) => state.transactions.error,
  getCampaignTransactions: (state) => state.campaignTransactions.data,
}

export const mutations = {
  SET_TRANSACTIONS(state, transactions) {
    state.transactions.data = transactions
  },
  SET_TRANSACTION_LOADING(state, loading) {
    state.transactions.loading = loading
  },
  SET_TRANSACTION_ERROR(state, error) {
    state.transactions.error = error
  },
  SET_CAMPAIGN_TRANSACTIONS(state, transactions) {
    state.campaignTransactions.data = transactions
  },
  ADD_TRANSACTION(state, transaction) {
    state.transactions.data.push(transaction)
  },
}

export const actions = {
  async fetchUserTransactions({ commit }) {
    commit('SET_TRANSACTION_LOADING', true)
    commit('SET_TRANSACTION_ERROR', null)
    try {
      const response = await this.$axios.get('/api/v1/transactions')
      const { data } = response.data
      commit('SET_TRANSACTIONS', data || [])
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal mengambil transaksi'
      commit('SET_TRANSACTION_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_TRANSACTION_LOADING', false)
    }
  },

  async fetchCampaignTransactions({ commit }, campaignId) {
    commit('SET_TRANSACTION_LOADING', true)
    try {
      const response = await this.$axios.get(`/api/v1/campaigns/${campaignId}/transactions`)
      const { data } = response.data
      commit('SET_CAMPAIGN_TRANSACTIONS', data || [])
      return data
    } catch (error) {
      throw error
    } finally {
      commit('SET_TRANSACTION_LOADING', false)
    }
  },

  async createTransaction({ commit }, transactionData) {
    commit('SET_TRANSACTION_LOADING', true)
    commit('SET_TRANSACTION_ERROR', null)
    try {
      const response = await this.$axios.post('/api/v1/transactions', {
        campaign_id: transactionData.campaign_id,
        amount: transactionData.amount,
      })
      const { data } = response.data
      commit('ADD_TRANSACTION', data)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal membuat transaksi'
      commit('SET_TRANSACTION_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_TRANSACTION_LOADING', false)
    }
  },

  async handlePaymentNotification({ commit }, notificationData) {
    try {
      const response = await this.$axios.post('/api/v1/transactions/notification', notificationData)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
