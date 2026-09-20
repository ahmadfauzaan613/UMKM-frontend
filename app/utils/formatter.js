/**
 * Currency Formatter
 * Format numbers to Indonesian Rupiah
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Number Formatter
 * Format numbers with thousand separator
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num)
}

/**
 * Calculate Progress Percentage
 * Calculate campaign funding progress percentage
 */
export function calculateProgress(currentAmount, goalAmount) {
  if (!goalAmount || goalAmount === 0) return 0
  return Math.min(Math.round((currentAmount / goalAmount) * 100), 100)
}

/**
 * Truncate Text
 * Truncate text to specified length
 */
export function truncateText(text, length = 100) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Format Date
 * Format date to Indonesian locale
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Format DateTime
 * Format date and time to Indonesian locale
 */
export function formatDateTime(date) {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
