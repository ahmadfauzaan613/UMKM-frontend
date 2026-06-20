/**
 * Transaction Service
 * Handle transaction related API calls
 */

export class TransactionService {
  constructor($axios) {
    this.$axios = $axios
  }

  async getUserTransactions() {
    const response = await this.$axios.get('/api/v1/transactions')
    return response.data
  }

  async getCampaignTransactions(campaignId) {
    const response = await this.$axios.get(`/api/v1/campaigns/${campaignId}/transactions`)
    return response.data
  }

  async createTransaction(transactionData) {
    const response = await this.$axios.post('/api/v1/transactions', {
      campaign_id: transactionData.campaign_id,
      amount: transactionData.amount,
    })
    return response.data
  }

  async handlePaymentNotification(notificationData) {
    const response = await this.$axios.post(
      '/api/v1/transactions/notification',
      notificationData
    )
    return response.data
  }
}
