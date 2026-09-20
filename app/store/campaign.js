export const state = () => ({
  campaigns: {
    data: [],
    loading: false,
    error: null,
  },
  currentCampaign: null,
  campaignDetail: null,
})

export const getters = {
  getAllCampaigns: (state) => state.campaigns.data,
  getCampaignLoading: (state) => state.campaigns.loading,
  getCampaignError: (state) => state.campaigns.error,
  getCurrentCampaign: (state) => state.currentCampaign,
  getCampaignDetail: (state) => state.campaignDetail,
}

export const mutations = {
  SET_CAMPAIGNS(state, campaigns) {
    state.campaigns.data = campaigns
  },
  SET_CAMPAIGN_LOADING(state, loading) {
    state.campaigns.loading = loading
  },
  SET_CAMPAIGN_ERROR(state, error) {
    state.campaigns.error = error
  },
  SET_CURRENT_CAMPAIGN(state, campaign) {
    state.currentCampaign = campaign
  },
  SET_CAMPAIGN_DETAIL(state, campaign) {
    state.campaignDetail = campaign
  },
  ADD_CAMPAIGN(state, campaign) {
    state.campaigns.data.push(campaign)
  },
  UPDATE_CAMPAIGN(state, updatedCampaign) {
    const index = state.campaigns.data.findIndex(c => c.id === updatedCampaign.id)
    if (index !== -1) {
      state.campaigns.data.splice(index, 1, updatedCampaign)
    }
  },
}

export const actions = {
  async fetchCampaigns({ commit }) {
    commit('SET_CAMPAIGN_LOADING', true)
    commit('SET_CAMPAIGN_ERROR', null)
    try {
      const response = await this.$axios.get('/api/v1/campaigns')
      const { data } = response.data
      commit('SET_CAMPAIGNS', data || [])
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal mengambil campaign'
      commit('SET_CAMPAIGN_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_CAMPAIGN_LOADING', false)
    }
  },

  async fetchCampaignDetail({ commit }, id) {
    commit('SET_CAMPAIGN_LOADING', true)
    commit('SET_CAMPAIGN_ERROR', null)
    try {
      const response = await this.$axios.get(`/api/v1/campaigns/${id}`)
      const { data } = response.data
      commit('SET_CAMPAIGN_DETAIL', data)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal mengambil detail campaign'
      commit('SET_CAMPAIGN_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_CAMPAIGN_LOADING', false)
    }
  },

  async createCampaign({ commit }, formData) {
    commit('SET_CAMPAIGN_LOADING', true)
    commit('SET_CAMPAIGN_ERROR', null)
    try {
      const response = await this.$axios.post('/api/v1/campaigns', {
        name: formData.name,
        short_description: formData.short_description,
        description: formData.description,
        goal_amount: formData.goal_amount,
        perks: formData.perks,
      })
      const { data } = response.data
      commit('ADD_CAMPAIGN', data)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal membuat campaign'
      commit('SET_CAMPAIGN_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_CAMPAIGN_LOADING', false)
    }
  },

  async updateCampaign({ commit }, { id, formData }) {
    commit('SET_CAMPAIGN_LOADING', true)
    commit('SET_CAMPAIGN_ERROR', null)
    try {
      const response = await this.$axios.put(`/api/v1/campaigns/${id}`, {
        name: formData.name,
        short_description: formData.short_description,
        description: formData.description,
        goal_amount: formData.goal_amount,
        perks: formData.perks,
      })
      const { data } = response.data
      commit('UPDATE_CAMPAIGN', data)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal update campaign'
      commit('SET_CAMPAIGN_ERROR', errorMessage)
      throw error
    } finally {
      commit('SET_CAMPAIGN_LOADING', false)
    }
  },

  async uploadCampaignImage({ commit }, { id, image }) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('campaign_id', id)

    try {
      const response = await this.$axios.post('/api/v1/campaign-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.meta?.message || 'Gagal upload image campaign'
      commit('SET_CAMPAIGN_ERROR', errorMessage)
      throw error
    }
  },
}
