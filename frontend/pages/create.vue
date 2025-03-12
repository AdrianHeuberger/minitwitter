<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create Post</h1>
    <form @submit.prevent="createPost">
      <div class="mb-4">
        <label class="block text-gray-700">Content</label>
        <textarea v-model="content" class="mt-1 block w-full"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Create</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const content = ref('');
const router = useRouter();
const token = localStorage.getItem('token');
import { AxiosInstance } from 'axios';
const { $axios } = useNuxtApp() as unknown as { $axios: AxiosInstance };

const createPost = async () => {
  try {
    await $axios.post('/api/posts', { content: content.value }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    router.push('/');
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
</script>
