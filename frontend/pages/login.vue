<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-2"
          />
        </div>

        <div v-if="error" class="p-3 text-red-600 bg-red-50 rounded">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 border border-transparent rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface LoginCredentials {
  username: string
  password: string
}

const router = useRouter()
const { fetchApi } = useApi()

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  const response = await fetchApi<{ token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })

  loading.value = false

  if (response.error) {
    error.value = response.error.message
    return
  }

  if (response.data?.token) {
    localStorage.setItem('token', response.data.token)
    router.push('/')
  }
}

interface ApiResponse<T> {
  data?: T;
  error?: { message: string };
}

function useApi(): { fetchApi: <T>(url: string, options: RequestInit) => Promise<ApiResponse<T>> } {
  throw new Error('Function not implemented.')
}
</script>
