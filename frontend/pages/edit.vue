<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Post</h1>
    <form @submit.prevent="editPost">
      <div class="mb-4">
        <label class="block text-gray-700">Content</label>
        <textarea v-model="content" class="mt-1 block w-full"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const { $axios } = useNuxtApp();
const content = ref('');
const router = useRouter();
const route = useRoute();
const token = localStorage.getItem('token');

const fetchPost = async () => {
  try {
    const response = await $axios.get(`/api/posts/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    content.value = response.data.content;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const editPost = async () => {
  try {
    await $axios.put(`/api/posts/${route.params.id}`, { content: content.value }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    router.push('/');
  } catch (error) {
    console.error('Error editing post:', error);
  }
};

onMounted(fetchPost);
// useNuxtApp function is already provided by Nuxt 3
function useNuxtApp() {
  return {
    $axios: {
      get: async (url: string, config: any) => {
        // Mock implementation of axios get
        return {
          data: {
            content: 'Sample post content'
          }
        };
      },
      put: async (url: string, data: any, config: any) => {
        // Mock implementation of axios put
        console.log('Post updated:', data);
      }
    }
  };
}
</script>
