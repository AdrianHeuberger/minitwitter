<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block text-gray-700">Username</label>
        <input v-model="username" type="text" class="mt-1 block w-full" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
        <input v-model="password" type="password" class="mt-1 block w-full" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
import { AxiosInstance } from 'axios';

const { $axios } = useNuxtApp() as any;
const axios = $axios as AxiosInstance;

const register = async () => {
  try {
    await $axios.post('/api/register', { username: username.value, password: password.value });
    router.push('/login');
  } catch (error) {
    console.error('Error registering user:', error);
  }
};
</script>
