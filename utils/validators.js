/**
 * Validation Helpers
 * Common validation functions
 */

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidPassword(password) {
  // Minimum 6 characters
  return password && password.length >= 6
}

export function isValidName(name) {
  return name && name.trim().length >= 3
}

export function isValidCampaignName(name) {
  return name && name.trim().length >= 5
}

export function isValidAmount(amount) {
  return amount && parseInt(amount) > 0
}

/**
 * Error Handler
 * Extract error message from API response
 */
export function getErrorMessage(error) {
  if (error.response?.data?.meta?.message) {
    return error.response.data.meta.message
  }
  if (error.message) {
    return error.message
  }
  return 'Terjadi kesalahan yang tidak terduga'
}

/**
 * Success Handler
 * Extract success message from API response
 */
export function getSuccessMessage(response) {
  return response?.meta?.message || 'Berhasil'
}
