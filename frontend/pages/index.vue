<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Your Feed</h1>
    <div v-for="post in posts" :key="post.id" class="mb-4">
      <div class="bg-white p-4 rounded">
        <p>{{ post.content }}</p>
        <button @click="deletePost(post.id)" class="bg-red-500 text-white px-4 py-2 mt-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const posts = ref([]);
const token = localStorage.getItem('token');

const fetchPosts = async () => {
  try {
    const response = await useFetch('/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const deletePost = async (id: number) => {
  try {
    await useFetch(`/api/posts/${id}`, {
      method: 'delete
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

onMounted(fetchPosts);
</script>
