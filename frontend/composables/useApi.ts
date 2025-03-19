import { useFetch } from "nuxt/app"
export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
}

export interface ApiError {
  message: string
  statusCode: number
}

export const useApi = () => {
  const fetchApi = async <T>(url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(`http://localhost:80${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        return { data: null, error: { message: data.message || 'Error occurred', statusCode: response.status } }
      }
      
      return { data, error: null }
    } catch (err) {
      return { 
        data: null, 
        error: { message: 'Network error', statusCode: 500 } 
      }
    }
  }

  return { fetchApi }
}

