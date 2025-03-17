import { ref } from 'vue'
import { useApi } from './useApi'

interface LoginCredentials {
  username: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    id: number
    username: string
  }
}

export const useAuth = () => {
  const { fetchApi } = useApi()
  const error = ref<string | null>(null)
  const loading = ref(false)

  const login = async (credentials: LoginCredentials) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetchApi<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.error) {
        error.value = response.error.message
        return null
      }

      return response.data
    } catch (err) {
      error.value = 'Login failed. Please try again.'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    error,
    loading
  }
}