import { useRuntimeConfig } from 'nuxt/app'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchError } from 'ofetch'

export type ApiResponse<T> = {
  data: T | null
  error: ApiError | null
}

export type ApiError = {
  message: string
  statusCode: number
}

export const useApi = () => {
  const config = useRuntimeConfig()

  const fetchApi = async <T>(
    endpoint: string,
    options: UseFetchOptions<T> = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const { data, error } = await useFetch<T>(endpoint, {
        baseURL: config.public.apiBase as string,
        ...options,
        onResponseError: (context: FetchError) => {
          console.error('API Error:', {
            status: context.response?.status,
            statusText: context.response?.statusText,
            url: context.request
          })
        }
      })

      if (error.value) {
        return {
          data: null,
          error: {
            message: error.value.message || 'An error occurred',
            statusCode: error.value.statusCode as number ?? 500
          }
        }
      }

      return {
        data: data.value as T,
        error: null
      }
    } catch (err) {
      const fetchError = err as FetchError
      return {
        data: null,
        error: {
          message: fetchError.message || 'An unexpected error occurred',
          statusCode: fetchError.statusCode ?? 500
        }
      }
    }
  }

  return {
    fetchApi
  }
}

function useFetch<T>(endpoint: string, arg1: unknown): { data: any; error: any } | PromiseLike<{ data: any; error: any }> {
  throw new Error('Function not implemented.')
}

