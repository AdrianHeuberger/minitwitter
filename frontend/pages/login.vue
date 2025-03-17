<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg">
      <h2 class="text-center text-3xl font-bold text-gray-900">Sign in</h2>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md -space-y-px">
          <div>
            <input
              v-model="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-center text-sm">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, error, loading } = useAuth()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  const response = await login({
    username: username.value,
    password: password.value
  })

  if (response) {
    router.push('/')
  }
}
</script>

<script lang="ts">
import { useApi } from './composables/useApi' // Nuxt will auto-import this

interface LoginCredentials {
  username: string
  password: string
}

export const useAuth = () => {
  const error = ref<string | null>(null)
  const loading = ref(false)
  const { fetchApi } = useApi()

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null

    const response = await fetchApi<{ token: string }>('/auth/login', {
      method: 'POST',
      body: credentials
    })

    loading.value = false

    if (response.error) {
      error.value = response.error.message
      return false
    }

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      return true
    }

    return false
  }

  return {
    login,
    error,
    loading
  }
}
</script>
