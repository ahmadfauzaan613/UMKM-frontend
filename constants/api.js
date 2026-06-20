/**
 * API Endpoints Constants
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/v1/sessions',
    REGISTER: '/api/v1/users',
    CHECK_EMAIL: '/api/v1/email_checkers',
    FETCH_USER: '/api/v1/user/fetch',
    UPLOAD_AVATAR: '/api/v1/avatars',
  },

  // Campaign
  CAMPAIGN: {
    LIST: '/api/v1/campaigns',
    DETAIL: (id) => `/api/v1/campaigns/${id}`,
    CREATE: '/api/v1/campaigns',
    UPDATE: (id) => `/api/v1/campaigns/${id}`,
    UPLOAD_IMAGE: '/api/v1/campaign-images',
  },

  // Transaction
  TRANSACTION: {
    LIST: '/api/v1/transactions',
    CREATE: '/api/v1/transactions',
    CAMPAIGN_TRANSACTIONS: (id) => `/api/v1/campaigns/${id}/transactions`,
    NOTIFICATION: '/api/v1/transactions/notification',
  },
}

/**
 * Toast Types
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

/**
 * User Roles
 */
export const USER_ROLES = {
  OWNER: 'Pemilik UMKM',
  INVESTOR: 'Investor',
}

/**
 * Campaign Status
 */
export const CAMPAIGN_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

/**
 * Transaction Status
 */
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  EXPIRED: 'expired',
}
