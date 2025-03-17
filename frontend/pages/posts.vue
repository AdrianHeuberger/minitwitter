<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface ApiError {
  message: string
  statusCode: number
}

export function useApi() {
  async function fetchApi<T>(url: string): Promise<{ data: T | null, error: ApiError | null }> {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: 'Failed to fetch data', statusCode: 500 } }
    }
  }

  return { fetchApi }
}

interface Post {
  id: number
  content: string
  userId: number
  sentiment?: 'safe' | 'dangerous'
}

const { fetchApi } = useApi()
const posts = ref<Post[] | null>(null)
const error = ref<ApiError | null>(null)
const isLoading = ref(true)

async function fetchPosts() {
  try {
    isLoading.value = true
    const response = await fetchApi<Post[]>('/api/posts')
    posts.value = response.data
    error.value = response.error
  } catch (err) {
    error.value = {
      message: 'Failed to load posts',
      statusCode: 500
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Posts</h1>
    
    <div v-if="error" class="p-4 bg-red-50 text-red-500 rounded-lg mb-4">
      {{ error.message }}
    </div>

    <div v-else-if="isLoading" class="p-4 text-gray-500">
      Loading posts...
    </div>

    <div v-else-if="posts" class="space-y-4">
      <article 
        v-for="post in posts" 
        :key="post.id" 
        class="p-4 bg-gray-50 rounded-lg border border-gray-200"
      >
        <p class="text-gray-900">{{ post.content }}</p>
        <div 
          v-if="post.sentiment" 
          class="mt-2 text-sm"
          :class="{
            'text-green-600': post.sentiment === 'safe',
            'text-red-600': post.sentiment === 'dangerous'
          }"
        >
          Sentiment: {{ post.sentiment }}
        </div>
      </article>
    </div>

    <div v-else class="p-4 text-gray-500">
      No posts found
    </div>
  </div>
</template>