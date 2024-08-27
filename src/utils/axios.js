import axios from 'axios'
import router from '@/router'

const apiClient = axios.create({
  baseURL: `https://api.voltautouz.uz/api/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access')}`,
    'Accept-Language': `${localStorage.getItem('locale')}`,
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refresh')
        const refreshResponse = await axios.post('https://api.voltautouz.uz/api/dashboard/admin-login/refresh/', {
          refresh: refreshToken,
        })
        const newAccessToken = refreshResponse.data.data.access
        localStorage.setItem('access', newAccessToken)
        // Reconfigure the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(error.config) // Retry the original request
      } catch (refreshError) {
        console.error('Error refreshing access token:', refreshError)
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
