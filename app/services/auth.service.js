/**
 * Auth Service
 * Handle authentication related API calls
 */

export class AuthService {
  constructor($axios) {
    this.$axios = $axios
  }

  async login(credentials) {
    const response = await this.$axios.post('/api/v1/sessions', {
      email: credentials.email,
      password: credentials.password,
    })
    return response.data
  }

  async register(formData) {
    const response = await this.$axios.post('/api/v1/users', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      occupation: formData.occupation,
    })
    return response.data
  }

  async fetchUser() {
    const response = await this.$axios.get('/api/v1/user/fetch')
    return response.data
  }

  async checkEmailAvailability(email) {
    const response = await this.$axios.post('/api/v1/email_checkers', {
      email,
    })
    return response.data
  }

  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.$axios.post('/api/v1/avatars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}
