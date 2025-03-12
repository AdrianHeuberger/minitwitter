<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label class="block text-gray-700">Username</label>
        <input v-model="username" type="text" class="mt-1 block w-full" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
        <input v-model="password" type="password" class="mt-1 block w-full" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/api/login', { username: username.value, password: password.value });
    localStorage.setItem('token', response.data.token);
    router.push('/');
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>
