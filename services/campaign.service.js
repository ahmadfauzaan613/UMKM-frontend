/**
 * Campaign Service
 * Handle campaign related API calls
 */

export class CampaignService {
  constructor($axios) {
    this.$axios = $axios
  }

  async getCampaigns() {
    const response = await this.$axios.get('/api/v1/campaigns')
    return response.data
  }

  async getCampaignById(id) {
    const response = await this.$axios.get(`/api/v1/campaigns/${id}`)
    return response.data
  }

  async createCampaign(formData) {
    const response = await this.$axios.post('/api/v1/campaigns', {
      name: formData.name,
      short_description: formData.short_description,
      description: formData.description,
      goal_amount: formData.goal_amount,
      perks: formData.perks,
    })
    return response.data
  }

  async updateCampaign(id, formData) {
    const response = await this.$axios.put(`/api/v1/campaigns/${id}`, {
      name: formData.name,
      short_description: formData.short_description,
      description: formData.description,
      goal_amount: formData.goal_amount,
      perks: formData.perks,
    })
    return response.data
  }

  async uploadCampaignImage(id, image) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('campaign_id', id)

    const response = await this.$axios.post('/api/v1/campaign-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}
